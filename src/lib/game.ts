import { Booking } from "./booking";
import { UserModel } from "./models";
import { GameDoc } from "./types";
import { User } from "./user";

export class Game {
  doc: GameDoc;

  constructor(doc: GameDoc) {
    this.doc = doc;
  }

  /** Get the owner of this document */
  async owner(): Promise<User> {
    const userDoc = await UserModel.findById(this.doc.owner);
    if (userDoc === null)
      throw new Error(
        "User not found, this indicates a database integrity issue"
      );
    return new User(userDoc);
  }

  async nextBooking(): Promise<Booking> {
    throw new Error("Not implemented");
  }

  async allBookings(): Promise<Booking[]> {
    throw new Error("Not implemented");
  }

  async isAvailable(): Promise<Boolean> {
    throw new Error("Not implemented");
  }
}
