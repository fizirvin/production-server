import { Schema, model } from 'mongoose'

const shotSchema = new Schema({
  molde: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Molde'
  },
  date: {
    type: String,
    required: true
  },
  shift: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: false
  },
  end: {
    type: String,
    required: false
  },
  shiftEnd: {
    type: String,
    required: false
  },
  active: {
    type: Boolean,
    required: true
  },
  comments: {
    type: String,
    required: false
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
})

export default model('Shot', shotSchema)
