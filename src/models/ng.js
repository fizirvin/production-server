import { Schema, model } from 'mongoose'

const resineSchema = new Schema({
  report: {
    type: Schema.Types.ObjectId,
    required: true
  },
  defect: {
    type: Schema.Types.ObjectId,
    required: true
  },
  model: {
    type: Schema.Types.ObjectId,
    required: true
  },
  molde: {
    type: Schema.Types.ObjectId,
    required: true
  },
  pieces: {
    type: Number,
    required: true
  }
})

export default model('Ng', resineSchema)
