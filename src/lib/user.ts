import { Booking } from "./booking";
import { Game } from "./game";
import { BookingModel, GameModel } from "./models";
import { UserDoc } from "./types";

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
}
