import { Schema, model } from 'mongoose'

const pmachineSchema = new Schema({
  machineNumber: {
    type: String,
    required: true
  },
  machineSerial: {
    type: String,
    required: true
  },
  closingForce: {
    type: Number,
    required: true
  },
  spindleDiameter: {
    type: Number,
    required: true
  }
})

export default model('PMachine', pmachineSchema)
