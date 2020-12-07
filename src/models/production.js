import { Schema, model } from 'mongoose'

const productionSchema = new Schema(
  {
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
    prod: {
      type: Number,
      required: false
    },
    cycles: {
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
    },
    date: {
      type: String,
      required: true
    },
    dates: {
      y: {
        type: String,
        required: true
      },
      m: {
        type: String,
        required: true
      },
      dm: {
        type: String,
        required: true
      },
      dw: {
        type: String,
        required: true
      },
      w: {
        type: String,
        required: true
      },
      dy: {
        type: String,
        required: true
      },
      q: {
        type: String,
        required: true
      }
    }
  },
  {
    versionKey: false
  }
)

export default model('Production', productionSchema)
