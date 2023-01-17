import { Schema } from "mongoose";

export type UserDoc = {
  _id: Schema.Types.ObjectId;
  /**
   * Username is meant more as a human-readable ID. It should ideally
   * not get used much on the frontend - as it is designed to be static.
   */
  username: string;
  name: string;
  active: boolean;
};

export type BookingDoc = {
  _id: Schema.Types.ObjectId;
  from: Date;
  to: Date;
  owner: Schema.Types.ObjectId;
  game: Schema.Types.ObjectId;
};

export type GameDoc = {
  _id: Schema.Types.ObjectId;
  /** How is this game identified */
  name: string;
  /** Quick description (optional)  */
  description?: string;

  /** URL that can be submitted by the user when creating the document */
  photo?: string;

  owner: Schema.Types.ObjectId;
};
