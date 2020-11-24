import { Schema, model } from 'mongoose'

const productionSchema = new Schema({
  report: {
    type: Schema.Types.ObjectId,
    required: true
  },
  program: {
    type: Schema.Types.ObjectId,
    required: true
  },
  molde: {
    type: Schema.Types.ObjectId,
    required: true
  },
  model: {
    type: Schema.Types.ObjectId,
    required: true
  },
  real: {
    type: Number,
    required: true
  },
  ng: {
    type: Number,
    required: true
  },
  ok: {
    type: Number,
    required: true
  },
  plan: {
    type: Number,
    required: true
  },
  tprod: {
    type: Number,
    required: true
  },
  cycles: {
    type: Number,
    required: true
  },
  ptime: {
    type: Number,
    required: true
  },
  wtime: {
    type: Schema.Types.Decimal128,
    required: true
  },
  dtime: {
    type: Schema.Types.Decimal128,
    required: true
  },
  avail: {
    type: Schema.Types.Decimal128,
    required: true
  },
  perf: {
    type: Schema.Types.Decimal128,
    required: true
  },
  qual: {
    type: Schema.Types.Decimal128,
    required: true
  },
  oee: {
    type: Schema.Types.Decimal128,
    required: true
  }
})

export default model('Production', productionSchema)
