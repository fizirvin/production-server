import { Schema, model } from 'mongoose'

const reportSchema = new Schema(
  {
    date: {
      type: String,
      required: true
    },
    shift: {
      type: String,
      required: true
    },
    machine: {
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
    },
    purge: {
      type: Number,
      required: false
    },
    comments: {
      type: String,
      required: false
    },
    team: {
      type: String,
      required: false
    },
    oper: {
      type: Schema.Types.ObjectId,
      required: false
    },
    insp: {
      type: Schema.Types.ObjectId,
      required: false
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true
    },
    progrs: {
      type: Number,
      required: false
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
    // createdAt: {
    //   type: Date,
    //   required: false
    // },
    // updatedAt: {
    //   type: Date,
    //   required: false
    // }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export default model('Report', reportSchema)
