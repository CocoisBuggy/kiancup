import { Booking } from "./booking";
import { Game } from "./game";
import { BookingModel, GameModel } from "./models";
import { UserDoc } from "./types";

import fs from "fs";

const userFile = JSON.parse(
  fs.readFileSync("./users.json", "utf-8").toString()
);

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
