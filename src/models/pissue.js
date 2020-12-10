import { Schema, model } from 'mongoose'

const pissueSchema = new Schema({
  issueName: {
    type: String,
    required: true
  },
  issueCode: {
    type: String,
    required: true
  }
})

export default model('PIssue', pissueSchema)
