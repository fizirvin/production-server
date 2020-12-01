import { Schema, model } from 'mongoose'

const profileSchema = new Schema(
  {
    number: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    entry: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    area: {
      type: String,
      required: true
    },
    team: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt: {
      type: Date,
      required: false
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    picture_URL: {
      type: String,
      required: false
    }
  },
  {
    versionKey: false
  }
)

export default model('Profile', profileSchema)
