import { Schema, model } from 'mongoose'

const pmodelSchema = new Schema({
  partNumber: {
    type: String,
    required: true
  },
  partName: {
    type: String,
    required: true
  },
  family: {
    type: String,
    required: true
  }
})

export default model('PModel', pmodelSchema)
