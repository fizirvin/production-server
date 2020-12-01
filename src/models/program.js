import { Schema, model } from 'mongoose'

const programSchema = new Schema(
  {
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
    model: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Model'
    },
    time: {
      type: Schema.Types.Decimal128,
      required: true
    },
    cycles: {
      type: Number,
      required: true
    },
    capacity: {
      type: Number,
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

export default model('Program', programSchema)
