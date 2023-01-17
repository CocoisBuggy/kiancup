// This is where all the mongoDB utilities will go
import mongoose, { Schema } from "mongoose";
import { BookingDoc, GameDoc, UserDoc } from "./types";

mongoose.connect(
  `mongodb://localhost:${process.env.NEXT_db_port}/${process.env.NEXT_db_name}`
);

// A reference to a user document
const userRef = { type: Schema.Types.ObjectId, required: true, ref: "User" };

const BookingSchema = new mongoose.Schema<BookingDoc>({
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  owner: userRef,
  game: { type: Schema.Types.ObjectId, required: true, ref: "Game" },
});

const GameSchema = new mongoose.Schema<GameDoc>({
  name: { type: String, required: true, unique: true },
  description: String,
  photo: {
    type: String,
    required: false,
    validate: {
      validator: (value: string) => {
        new URL(value);
        return true;
      },
      message: "Must be a Valid URL",
    },
  },
  owner: userRef,
});

const UserSchema = new mongoose.Schema<UserDoc>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  active: Boolean,
});

export const UserModel = mongoose.model("User", UserSchema);
export const GameModel = mongoose.model("Game", GameSchema);
export const BookingModel = mongoose.model("Booking", BookingSchema);
