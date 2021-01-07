import { Schema, model } from 'mongoose'

const spareSchema = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    optimal: {
      type: Number,
      required: true
    },
    price: {
      type: Schema.Types.Decimal128,
      required: true
    },
    location: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Location'
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export default model('Spare', spareSchema)
