import { Schema, model } from 'mongoose'

const moldeSchema = new Schema(
  {
    number: {
      type: String,
      required: true
    },
    serial: {
      type: String,
      required: true
    },
    cavities: {
      type: Number,
      required: true
    },
    lifecycles: {
      type: Number,
      required: true
    },
    tcycles: {
      type: Number,
      required: true
    },
    shot: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt: {
      type: Date,
      required: false
    }
  },
  {
    versionKey: false
  }
)

export default model('Molde', moldeSchema)
