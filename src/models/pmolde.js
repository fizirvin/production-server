import { Schema, model } from 'mongoose'

const pmoldeSchema = new Schema({
  moldeNumber: {
    type: String,
    required: true
  },
  moldeSerial: {
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
  }
})

export default model('PMolde', pmoldeSchema)
