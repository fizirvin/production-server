import { Schema, model } from 'mongoose'

const materialSchema = new Schema(
  {
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
  },
  {
    versionKey: false
  }
)

export default model('Material', materialSchema)
