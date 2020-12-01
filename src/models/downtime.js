import { Schema, model } from 'mongoose'

const downtimeSchema = new Schema(
  {
    report: {
      type: Schema.Types.ObjectId,
      required: true
    },
    issue: {
      type: Schema.Types.ObjectId,
      required: true
    },
    mins: {
      type: Number,
      required: true
    }
  },
  {
    versionKey: false
  }
)

export default model('Downtime', downtimeSchema)
