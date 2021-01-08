import { Schema, model } from 'mongoose'

const outgoingSchema = new Schema(
  {
    date: {
      type: String,
      required: true
    },
    shift: {
      type: String,
      required: true
    },
    team: {
      type: String,
      required: true
    },
    machine: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Machine'
    },
    molde: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Molde'
    },
    operator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Profile'
    },
    spare: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Spare'
    },
    quantity: {
      type: Number,
      required: true
    },
    origin: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    repairman: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Profile'
    },
    method: {
      type: String,
      required: false
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

export default model('Outgoing', outgoingSchema)
