import { Schema, model } from 'mongoose'

const pmaterialSchema = new Schema({
  number: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  acronym: {
    type: String,
    required: true
  },
  identification: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  }
})

export default model('PMaterial', pmaterialSchema)
