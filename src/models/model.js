import { Schema, model } from 'mongoose'

const modelSchema = new Schema(
  {
    number: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    family: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export default model('Model', modelSchema)
