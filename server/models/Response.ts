import mongoose, { trusted } from "mongoose";

const responseSchema = new mongoose.Schema(
  {
    Answers: { type: String },
    Keywords: { type: [String] },
  },
  {
    versionKey: false,
  }
);

const Response = mongoose.model("QnA", responseSchema);
export default Response;
