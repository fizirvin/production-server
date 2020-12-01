import { Schema, model } from 'mongoose'

const resineSchema = new Schema(
  {
    report: {
      type: Schema.Types.ObjectId,
      required: true
    },
    resine: {
      type: Schema.Types.ObjectId,
      required: true
    },
    purge: {
      type: Number,
      required: true
    }
  },
  {
    versionKey: false
  }
)

export default model('Resine', resineSchema)
