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
    },
    shift: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    dates: {
      y: {
        type: String,
        required: true
      },
      m: {
        type: String,
        required: true
      },
      dm: {
        type: String,
        required: true
      },
      dw: {
        type: String,
        required: true
      },
      w: {
        type: String,
        required: true
      },
      dy: {
        type: String,
        required: true
      },
      q: {
        type: String,
        required: true
      }
    }
  },
  {
    versionKey: false
  }
)

export default model('Downtime', downtimeSchema)
