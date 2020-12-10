import { Schema, model } from 'mongoose'

const pprogramSchema = new Schema({
  machineNumber: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Machine'
  },
  moldeNumber: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Molde'
  },
  partNumber: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Model'
  },
  cycleTime: {
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
  }
})

export default model('PProgram', pprogramSchema)
