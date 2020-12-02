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
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export default model('Machine', machineSchema)
