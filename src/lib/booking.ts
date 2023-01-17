import { Game } from "./game";
import { GameModel, UserModel } from "./models";
import { BookingDoc } from "./types";
import { User } from "./user";

export class Booking {
  doc: BookingDoc;

  constructor(doc: BookingDoc) {
    this.doc = doc;
  }

  async owner(): Promise<User> {
    const userDoc = await UserModel.findById(this.doc.owner);
    if (!userDoc) {
      throw new Error(
        "User not found - Database relational integrity violation"
      );
    }

    return new User(userDoc);
  }

  async game(): Promise<Game> {
    const gameDoc = await GameModel.findById(this.doc.game);
    if (!gameDoc) {
      throw new Error(
        "Game not found - Database relational integrity violation"
      );
    }

    return new Game(gameDoc);
  }
}
