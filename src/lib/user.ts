import { Booking } from "./booking";
import { Game } from "./game";
import { BookingModel, GameModel, UserModel } from "./models";
import { UserDoc } from "./types";

import fs from "fs";

const userFile: { [key: string]: { name: string; password: string } } =
  JSON.parse(fs.readFileSync("./users.json", "utf-8").toString());

export class User {
  doc: UserDoc;

  constructor(doc: UserDoc) {
    this.doc = doc;
  }

  async games(): Promise<Game[]> {
    return (await GameModel.find({ owner: this.doc._id })).map(
      (doc) => new Game(doc)
    );
  }

  async bookings(): Promise<Booking[]> {
    return (await BookingModel.find({ owner: this.doc._id })).map(
      (doc) => new Booking(doc)
    );
  }

  /**
   * Check a password against the one on file - these should NEVER be transmitted in the
   * clear, passwords are to be hashed BEFORE being sent to the server
   *
   * code for client:
   * import sha256 from "crypto-js/sha256";
   * sha256(password).toString()
   */
  passwordCorrect(hashedPassword: string): boolean {
    return userFile[this.doc.username].password === hashedPassword;
  }
}

export function initUsers() {
  for (const username in userFile) {
    const user = userFile[username];

    const doc = new UserModel({
      name: user.name,
      username: username,
      active: true,
    });

    doc.save();
  }

  // now de-activate all users that no longer appear in the file
  // This means the relational integrity of the database is maintained,
  // but the user can be disabled and no longer able to log in.
  UserModel.updateMany(
    { username: { $nin: Object.keys(userFile) } },
    { active: false }
  ).exec();
}
