import { model, Schema, Document } from 'mongoose';
import {City} from "../interfaces/city.interface";

const citySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
    cityId: {
      type: String,
      required: true,
      unique: true
    },
});

const cityModel = model<City & Document>('City', citySchema);

export default cityModel;
