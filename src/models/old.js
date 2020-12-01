import { Schema, model } from 'mongoose'

const injectionReportSchema = new Schema(
  {
    reportDate: {
      type: Date
    },
    shift: {
      type: String
    },
    createdAt: {
      type: Date,
      required: false
    },
    updatedAt: {
      type: Date,
      required: false
    },
    machine: {
      type: Schema.Types.ObjectId,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: false
    },
    TReal: {
      type: Number
    },
    TNG: {
      type: Number
    },
    TOK: {
      type: Number
    },
    TPlan: {
      type: Number
    },
    TProd: {
      type: Number
    },
    TWTime: {
      type: Schema.Types.Decimal128
    },
    TDTime: {
      type: Schema.Types.Decimal128
    },
    TAvailability: {
      type: Schema.Types.Decimal128
    },
    TPerformance: {
      type: Schema.Types.Decimal128
    },
    TQuality: {
      type: Schema.Types.Decimal128
    },
    TOEE: {
      type: Schema.Types.Decimal128
    },
    production: [
      {
        program: {
          type: Schema.Types.ObjectId
        },
        partNumber: {
          type: Schema.Types.ObjectId
        },
        molde: {
          type: Schema.Types.ObjectId
        },
        real: {
          type: Number
        },
        ng: {
          type: Number
        },
        ok: {
          type: Number
        },
        plan: {
          type: Number
        },
        prod: {
          type: Number
        },
        wtime: {
          type: Schema.Types.Decimal128
        },
        dtime: {
          type: Schema.Types.Decimal128
        },
        availability: {
          type: Schema.Types.Decimal128
        },
        performance: {
          type: Schema.Types.Decimal128
        },
        quality: {
          type: Schema.Types.Decimal128
        },
        oee: {
          type: Schema.Types.Decimal128
        },
        cycles: {
          type: Number,
          required: false
        }
      }
    ],
    downtimeDetail: [
      {
        issueId: {
          type: Schema.Types.ObjectId
        },
        mins: {
          type: Number
        }
      }
    ],
    defects: [
      {
        defect: {
          type: Schema.Types.ObjectId
        },
        defectPcs: {
          type: Number
        },
        molde: {
          type: Schema.Types.ObjectId
        },
        partNumber: {
          type: Schema.Types.ObjectId
        },
        program: {
          type: Schema.Types.ObjectId
        }
      }
    ],
    resines: [
      {
        resine: {
          type: Schema.Types.ObjectId
        },
        purge: {
          type: Number
        }
      }
    ],
    comments: {
      type: String,
      required: false
    },
    workers: {
      team: {
        type: String,
        required: false
      },
      operator: {
        type: Schema.Types.ObjectId,
        required: false
      },
      inspector: {
        type: Schema.Types.ObjectId,
        required: false
      }
    }
  },
  {
    versionKey: false
  }
)

export default model('Old', injectionReportSchema)
