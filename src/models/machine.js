import { Schema, model } from 'mongoose'

const machineSchema = new Schema(
  {
    number: {
      type: String,
      required: true
    },
    serial: {
      type: String,
      required: true
    },
    closingForce: {
      type: Number,
      required: true
    },
    spindleDiameter: {
      type: Number,
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

export default model('Machine', machineSchema)
