import { Schema, model, Document } from "mongoose";

interface IFile extends Document {
  fileName: String;
  url: String;
}

const fileSchema: Schema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IFile>("file", fileSchema);
