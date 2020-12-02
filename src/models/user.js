import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    level: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
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

export default model('User', userSchema)
