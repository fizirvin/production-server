import zoneDate from '../functions/zoneDate'
import fullDate from '../functions/fullDate'
import allDate from '../functions/allDate'
import stringDate from '../functions/stringDate'

import Molde from '../models/molde'
import Machine from '../models/machine'
import Model from '../models/model'
import Program from '../models/program'
import Material from '../models/material'
import Issue from '../models/issue'
import Defect from '../models/defect'
import Shot from '../models/shot'
import Profile from '../models/profile'
import User from '../models/user'

import Old from '../models/old'
import Report from '../models/report'
import Production from '../models/production'
import Resine from '../models/resine'
import Downtime from '../models/downtime'
import Ng from '../models/ng'

const safeResines = false
const safeDowntimes = false
const safeNgs = false
const safeProductions = false
const safeReports = false

const graphqlResolver = {
  updateMachines: async function () {
    await Machine.updateMany({}, { $unset: { __v: '' } })
    return { hola: 'hola' }
  },
  updateMoldes: async function () {
    await Molde.updateMany({}, { $unset: { __v: '' } })
    return { hola: 'hola' }
  },
  updateModels: async function () {
    await Model.updateMany({}, { $unset: { __v: '' } })
    return { hola: 'hola' }
  },
  updatePrograms: async function () {
    await Program.updateMany({}, { $unset: { __v: '' } })
    return { hola: 'hola' }
  },
  updateMaterials: async function () {
    await Material.updateMany({}, { $unset: { __v: '' } })
    return { hola: 'hola' }
  },
  updateIssues: async function () {
    await Issue.updateMany({}, { $unset: { __v: '' } })
    return { hola: 'hola' }
  },
  updateDefects: async function () {
    await Defect.updateMany({}, { $unset: { __v: '' } })
    return { hola: 'hola' }
  },
  updateShots: async function () {
    await Shot.updateMany({}, { $unset: { __v: '' } })
    return { hola: 'hola' }
  },
  updateUsers: async function () {
    await User.updateMany({}, { $unset: { __v: '' } })
    return { hola: 'hola' }
  },
  updateProfiles: async function () {
    await Profile.updateMany({}, { $unset: { __v: '' } })

    //   {
    //     $rename: {
    //       entr: 'entry'
    //     }
    //   }
    return { hola: 'hola' }
  },
  extractResines: async function () {
    let totalExtracted = 0
    const total = await Old.find()
    total.map(({ _id, resines }) => {
      if (resines.length > 0 && safeResines) {
        resines.map((resine) => {
          const input = {
            report: _id,
            resine: resine._id,
            purge: resine.purge
          }

          const newResine = new Resine(input)
          newResine.save()
          totalExtracted++
        })
      }
    })

    return { total: totalExtracted }
  },
  extractDowntimes: async function () {
    let totalExtracted = 0
    const total = await Old.find()
    total.map(({ _id, downtimeDetail }) => {
      if (downtimeDetail.length > 0 && safeDowntimes) {
        downtimeDetail.map((dt) => {
          const input = {
            report: _id,
            issue: dt.issueId,
            mins: dt.mins
          }

          const newDowntime = new Downtime(input)
          newDowntime.save()
          totalExtracted++
        })
      }
    })

    return { total: totalExtracted }
  },
  extractNgs: async function () {
    let totalExtracted = 0
    const total = await Old.find()
    total.map(({ _id, defects }) => {
      if (defects.length > 0 && safeNgs) {
        defects.map((defect) => {
          const input = {
            report: _id,
            defect: defect._id,
            model: defect.partNumber,
            molde: defect.molde,
            pieces: defect.defectPcs
          }

          const newNg = new Ng(input)
          newNg.save()
          totalExtracted++
        })
      }
    })

    return { total: totalExtracted }
  },
  extractProductions: async function () {
    let totalExtracted = 0
    let cerocycles = 0
    let dosprod = 0

    const total = await Old.find()

    const programs = await Program.find()
    const moldes = await Molde.find()

    total.map(({ _id, production, reportDate, shift }) => {
      if (production.length > 1) {
        dosprod++
      }

      if (production.length > 0 && safeProductions) {
        production.map((prods) => {
          const cycles = prods.cycles || 0
          const program = prods.program.toString()
          const productivity = programs.find(
            (p) => p._id.toString() === program
          )
          const item = Math.round(productivity.capacity * prods.wtime)
          const newprod = prods.prod || item

          if (cycles === 0) {
            cerocycles++
          }

          if (!cycles) {
            const molding = prods.molde.toString()
            const cavities = moldes.find((m) => m._id.toString() === molding)
              .cavities
            const realcycles = prods.real / cavities
            const production_input = {
              report: _id,
              date: stringDate(reportDate),
              dates: allDate(reportDate),
              shift,
              program: program,
              molde: prods.molde,
              model: prods.partNumber,
              real: prods.real,
              ng: prods.ng,
              ok: prods.ok,
              plan: prods.plan,
              prod: newprod,
              cycles: realcycles,
              wtime: prods.wtime,
              dtime: prods.dtime,
              avail: prods.availability,
              perf: prods.performance,
              qual: prods.quality,
              oee: prods.oee
            }
            const newProduction = new Production(production_input)
            newProduction.save()
            totalExtracted++
          } else {
            const production_input = {
              report: _id,
              date: stringDate(reportDate),
              dates: allDate(reportDate),
              shift,
              program: program,
              molde: prods.molde,
              model: prods.partNumber,
              real: prods.real,
              ng: prods.ng,
              ok: prods.ok,
              plan: prods.plan,
              prod: newprod,
              cycles: prods.cycles,
              wtime: prods.wtime,
              dtime: prods.dtime,
              avail: prods.availability,
              perf: prods.performance,
              qual: prods.quality,
              oee: prods.oee
            }
            const newProduction = new Production(production_input)
            newProduction.save()
            totalExtracted++
          }
        })
      }
    })
    console.log(cerocycles, dosprod)

    return { total: totalExtracted }
  },
  extractReports: async function () {
    let totalExtracted = 0
    const total = await Old.find()

    if (total.length > 0 && safeReports) {
      total.map(
        ({
          _id,
          reportDate,
          shift,
          machine,
          userId,
          TReal,
          TNG,
          TOK,
          TPlan,
          TProd,
          TWTime,
          TDTime,
          TAvailability,
          TPerformance,
          TQuality,
          TOEE,
          comments,
          workers,
          production,
          createdAt,
          updatedAt
        }) => {
          const comentarios = comments || 'no comments'
          const equipo = workers.team || 'no team'
          const operador = workers.operator || '5f17a67aa8d63200088369f2'
          const inspector = workers.inspector || '5f17a67aa8d63200088369f2'
          const T_PROD = TProd || 0

          const updated = updatedAt || createdAt

          const input = {
            _id,
            date: stringDate(reportDate),
            shift,
            machine,
            real: TReal,
            ng: TNG,
            ok: TOK,
            plan: TPlan,
            tprod: T_PROD,
            cycles: 0,
            ptime: parseInt(parseFloat(TWTime) + parseFloat(TDTime)),
            wtime: TWTime,
            dtime: TDTime,
            avail: TAvailability,
            perf: TPerformance,
            qual: TQuality,
            oee: TOEE,
            purge: 0,
            comments: comentarios,
            team: equipo,
            oper: operador,
            insp: inspector,
            user: userId,
            progrs: production.length,
            dates: allDate(reportDate),
            createdAt: createdAt,
            updatedAt: updated
          }

          const newReport = new Report(input)
          newReport.save()
          totalExtracted++
        }
      )
    }

    return { total: totalExtracted }
  },
  moldes: async function ({ page, add }) {
    if (!page) {
      page = 1
    }
    if (!add) {
      add = 0
    }
    const perPage = 25
    const total = await Molde.find().countDocuments()
    if (total === 0) return { total: 0, items: [] }

    const array = await Molde.find()
      .skip((page - 1) * perPage + add)
      .limit(perPage)
      .populate({ path: 'user', model: 'User' })
      .sort({ _id: 1 })

    const items = array.map(async (item) => {
      const cycles = await Production.aggregate([
        { $match: { molde: item._id } },
        {
          $group: {
            _id: '$molde',
            cycles: { $sum: '$cycles' },
            real: { $sum: '$real' }
          }
        }
      ]).then((response) => {
        return (response.length && response[0].cycles) || 0
      })

      const { createdAt, updatedAt, tcycles, lifecycles, user } = item._doc
      const totalCycles = tcycles + cycles
      const percent = ((totalCycles / lifecycles) * 100).toFixed(2)

      const object = {
        ...item._doc,
        createdAt: fullDate(createdAt),
        updatedAt: fullDate(updatedAt),
        tcycles: totalCycles,
        percent,
        user: user.name
      }

      return object
    })

    return { total, items }
  },
  machines: async function ({ page, add }) {
    if (!page) {
      page = 1
    }
    if (!add) {
      add = 0
    }
    const perPage = 25
    const total = await Machine.find().countDocuments()
    if (total === 0) return { total: 0, items: [] }

    const array = await Machine.find()
      .skip((page - 1) * perPage + add)
      .limit(perPage)
      .populate({ path: 'user', model: 'User' })
      .sort({ _id: 1 })

    const items = array.map((item) => {
      const { createdAt, updatedAt, user } = item._doc
      const object = {
        ...item._doc,
        createdAt: fullDate(createdAt),
        updatedAt: fullDate(updatedAt),
        user: user.name
      }

      return object
    })
    return { total, items }
  },
  models: async function ({ page, add }) {
    if (!page) {
      page = 1
    }
    if (!add) {
      add = 0
    }
    const perPage = 25
    const total = await Model.find().countDocuments()
    if (total === 0) return { total: 0, items: [] }

    const array = await Model.find()
      .skip((page - 1) * perPage + add)
      .limit(perPage)
      .populate({ path: 'user', model: 'User' })
      .sort({ _id: 1 })

    const items = array.map((item) => {
      const { createdAt, updatedAt, user } = item._doc
      const object = {
        ...item._doc,
        createdAt: fullDate(createdAt),
        updatedAt: fullDate(updatedAt),
        user: user.name
      }

      return object
    })
    return { total, items }
  },
  programs: async function ({ page, add }) {
    if (!page) {
      page = 1
    }
    if (!add) {
      add = 0
    }
    const perPage = 25
    const total = await Program.find().countDocuments()
    if (total === 0) return { total: 0, items: [] }

    const array = await Program.find()
      .skip((page - 1) * perPage + add)
      .limit(perPage)
      .populate({ path: 'user', model: 'User' })
      .populate({ path: 'machine', model: 'Machine' })
      .populate({ path: 'molde', model: 'Molde' })
      .populate({ path: 'model', model: 'Model' })
      .sort({ _id: 1 })

    const items = array.map((item) => {
      const { createdAt, updatedAt, time, user } = item._doc
      const object = {
        ...item._doc,
        createdAt: fullDate(createdAt),
        updatedAt: fullDate(updatedAt),
        time: parseFloat(time),
        user: user.name
      }

      return object
    })
    return { total, items }
  },
  materials: async function ({ page, add }) {
    if (!page) {
      page = 1
    }
    if (!add) {
      add = 0
    }
    const perPage = 25
    const total = await Material.find().countDocuments()
    if (total === 0) return { total: 0, items: [] }

    const array = await Material.find()
      .skip((page - 1) * perPage + add)
      .limit(perPage)
      .populate({ path: 'user', model: 'User' })
      .sort({ _id: 1 })

    const items = array.map((item) => {
      const { createdAt, updatedAt, user } = item._doc
      const object = {
        ...item._doc,
        createdAt: fullDate(createdAt),
        updatedAt: fullDate(updatedAt),
        user: user.name
      }

      return object
    })
    return { total, items }
  },
  issues: async function ({ page, add }) {
    if (!page) {
      page = 1
    }
    if (!add) {
      add = 0
    }
    const perPage = 25
    const total = await Issue.find().countDocuments()
    if (total === 0) return { total: 0, items: [] }

    const array = await Issue.find()
      .skip((page - 1) * perPage + add)
      .limit(perPage)
      .populate({ path: 'user', model: 'User' })
      .sort({ name: 1 })

    const items = array.map((item) => {
      const { createdAt, updatedAt, user } = item._doc
      const object = {
        ...item._doc,
        createdAt: fullDate(createdAt),
        updatedAt: fullDate(updatedAt),
        user: user.name
      }

      return object
    })
    return { total, items }
  },
  defects: async function ({ page, add }) {
    if (!page) {
      page = 1
    }
    if (!add) {
      add = 0
    }
    const perPage = 25
    const total = await Defect.find().countDocuments()
    if (total === 0) return { total: 0, items: [] }

    const array = await Defect.find()
      .skip((page - 1) * perPage + add)
      .limit(perPage)
      .populate({ path: 'user', model: 'User' })
      .sort({ name: 1 })

    const items = array.map((item) => {
      const { createdAt, updatedAt, user } = item._doc
      const object = {
        ...item._doc,
        createdAt: fullDate(createdAt),
        updatedAt: fullDate(updatedAt),
        user: user.name
      }

      return object
    })
    return { total, items }
  },
  shots: async function ({ page, add }) {
    if (!page) {
      page = 1
    }
    if (!add) {
      add = 0
    }
    const perPage = 25
    const total = await Shot.find().countDocuments()
    if (total === 0) return { total: 0, items: [] }

    const array = await Shot.find()
      .skip((page - 1) * perPage + add)
      .limit(perPage)
      .populate({ path: 'user', model: 'User' })
      .populate({ path: 'molde', model: 'Molde' })
      .sort({ _id: 1 })

    const items = array.map((item) => {
      const { createdAt, updatedAt, user } = item._doc
      const object = {
        ...item._doc,
        createdAt: fullDate(createdAt),
        updatedAt: fullDate(updatedAt),
        user: user.name
      }

      return object
    })
    return { total, items }
  },
  finishShot: async function ({ _id, input }) {
    const newShot = {
      ...input,
      active: false
    }
    const item = await Shot.findByIdAndUpdate(_id, newShot, {
      new: true
    }).populate({
      path: 'molde',
      model: 'Molde'
    })

    const { createdAt, updatedAt, user } = item._doc

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    console.log('hola')

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  },
  profiles: async function ({ page, add }) {
    if (!page) {
      page = 1
    }
    if (!add) {
      add = 0
    }
    const perPage = 25
    const total = await Profile.find().countDocuments()
    if (total === 0) return { total: 0, items: [] }

    const array = await Profile.find()
      .skip((page - 1) * perPage + add)
      .limit(perPage)
      .populate({ path: 'user', model: 'User' })
      .sort({ _id: 1 })

    const items = array.map((item) => {
      const { createdAt, updatedAt, user } = item._doc
      const object = {
        ...item._doc,
        createdAt: fullDate(createdAt),
        updatedAt: fullDate(updatedAt),
        user: user.name
      }

      return object
    })
    return { total, items }
  },
  users: async function ({ page, add }) {
    if (!page) {
      page = 1
    }
    if (!add) {
      add = 0
    }
    const perPage = 25
    const total = await User.find().countDocuments()
    if (total === 0) return { total: 0, items: [] }

    const array = await User.find()
      .skip((page - 1) * perPage + add)
      .limit(perPage)
      .populate({ path: 'user', model: 'User' })
      .sort({ _id: 1 })

    const items = array.map((item) => {
      const { createdAt, updatedAt, user } = item._doc
      const object = {
        ...item._doc,
        createdAt: fullDate(createdAt),
        updatedAt: fullDate(updatedAt),
        user: user.name
      }

      return object
    })
    return { total, items }
  },
  reports: async function ({ page, add }) {
    if (!page) {
      page = 1
    }
    if (!add) {
      add = 0
    }
    const perPage = 25
    const total = await Report.find().countDocuments()
    if (total === 0) return { total: 0, items: [] }

    const array = await Report.find()
      .skip((page - 1) * perPage + add)
      .limit(perPage)
      .populate({ path: 'user', model: 'User' })
      .populate({ path: 'machine', model: 'Machine' })
      .sort({ date: -1 })

    const items = array.map((item) => {
      const {
        createdAt,
        updatedAt,
        user,
        machine,
        dtime,
        wtime,
        perf,
        avail,
        qual,
        oee
      } = item._doc
      const object = {
        ...item._doc,
        createdAt: fullDate(createdAt),
        updatedAt: fullDate(updatedAt),
        user: user.name,
        machine: machine.number,
        dtime: parseFloat(dtime),
        wtime: parseFloat(wtime),
        perf: parseFloat(perf),
        avail: parseFloat(avail),
        qual: parseFloat(qual),
        oee: parseFloat(oee)
      }

      return object
    })
    return { total, items }
  },
  cycles: async function ({ shot }) {
    let finalDate = new Date()
    const item = await Shot.findById(shot)
    const { molde, date, shift, active, end, shiftEnd } = item._doc

    if (!active) {
      finalDate = end + 'T23:59:59.000Z'
    }

    const ProductionsArray = await Production.find(
      {
        molde: molde,
        date: { $gte: date, $lte: finalDate }
      },
      {
        dates: 0,
        program: 0,
        plan: 0,
        prod: 0,
        ng: 0,
        ok: 0,
        wtime: 0,
        dtime: 0,
        avail: 0,
        perf: 0,
        qual: 0,
        oee: 0
      }
    )
      .populate({
        path: 'report',
        model: 'Report',
        select: {
          dates: 0,
          date: 0,
          shift: 0,
          real: 0,
          real: 0,
          ng: 0,
          ok: 0,
          plan: 0,
          tprod: 0,
          cycles: 0,
          ptime: 0,
          wtime: 0,
          dtime: 0,
          avail: 0,
          perf: 0,
          qual: 0,
          oee: 0,
          purge: 0,
          comments: 0,
          team: 0,
          oper: 0,
          insp: 0,
          user: 0,
          progrs: 0,
          createdAt: 0,
          updatedAt: 0
        },
        populate: [{ path: 'machine', model: 'Machine' }]
      })
      .populate({
        path: 'molde',
        model: 'Molde',
        select: {
          _id: 0,
          number: 0,
          serial: 0,
          cavities: 0,
          lifecycles: 0,
          tcycles: 0,
          shot: 0,
          active: 0,
          user: 0,
          createdAt: 0,
          updatedAt: 0
        }
      })
      .sort({ date: 1, shift: 1 })

    const items = ProductionsArray.map((cycle) => {
      return {
        _id: cycle._id,
        date: cycle.date,
        shift: cycle.shift,
        machine: cycle.report.machine.number,
        real: cycle.real,
        cycles: cycle.cycles,
        quantity: cycle.molde.quantity
      }
    })

    return items
  },
  newMolde: async function ({ input }) {
    const newItem = new Molde({
      ...input,
      active: true
    })
    const item = await newItem.save()
    const { createdAt, updatedAt, lifecycles, tcycles, user } = item._doc
    const percent = ((tcycles / lifecycles) * 100).toFixed(2)

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      percent,
      user: existingUser.name
    }
  },
  newMachine: async function ({ input }) {
    const date = new Date()
    const newItem = new Machine(input)
    const item = await newItem.save()
    const { createdAt, updatedAt, user } = item._doc

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  },
  newModel: async function ({ input }) {
    const date = new Date()
    const newItem = new Model({
      ...input,
      createdAt: zoneDate(date)
    })
    const item = await newItem.save()
    const { createdAt, updatedAt, user } = item._doc

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  },
  newProgram: async function ({ input }) {
    const date = new Date()
    const newItem = new Program({
      ...input,
      createdAt: zoneDate(date)
    })
    const item = await newItem.save()
    const { createdAt, updatedAt, user, _id } = item._doc

    const newProgram = await Program.findById(_id)
      .populate({ path: 'machine', model: 'Machine' })
      .populate({ path: 'molde', model: 'Molde' })
      .populate({ path: 'model', model: 'Model' })

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...newProgram._doc,
      time: parseFloat(newProgram.time),
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  },
  newMaterial: async function ({ input }) {
    const date = new Date()
    const newItem = new Material({
      ...input,
      createdAt: zoneDate(date)
    })
    const item = await newItem.save()
    const { createdAt, updatedAt, user } = item._doc

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  },
  newIssue: async function ({ input }) {
    const date = new Date()
    const newItem = new Issue({
      ...input,
      createdAt: zoneDate(date)
    })
    const item = await newItem.save()
    const { createdAt, updatedAt, user } = item._doc

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  },
  newDefect: async function ({ input }) {
    const date = new Date()
    const newItem = new Defect({
      ...input,
      createdAt: zoneDate(date)
    })
    const item = await newItem.save()
    const { createdAt, updatedAt, user } = item._doc

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  },
  newShot: async function ({ input }) {
    const date = new Date()
    const newItem = new Shot({
      ...input,
      active: true,
      createdAt: zoneDate(date)
    })
    const item = await newItem.save()
    const { createdAt, updatedAt, user, _id } = item._doc

    const newShot = await Shot.findById(_id).populate({
      path: 'molde',
      model: 'Molde'
    })

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...item._doc,
      molde: newShot.molde.number,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  },
  newProfile: async function ({ input }) {
    const { team } = input
    const initial = team === 'amealco' ? 'B' : 'A'

    const workers = await Profile.find({
      number: { $regex: '^' + initial, $options: 'i' }
    })

    var prefix = ''
    if (workers.length >= 0 && workers.length < 9) {
      prefix = '00'
    } else if (workers.length >= 9 && workers.length < 99) {
      prefix = '0'
    }

    const num = (workers.length + 1).toString()
    const number = initial + prefix + num

    const date = new Date()

    const newItem = new Profile({
      ...input,
      active: true,
      number: number,
      createdAt: zoneDate(date)
    })
    const item = await newItem.save()
    const { createdAt, updatedAt, user } = item._doc

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  },
  newUser: async function ({ input }) {
    const date = new Date()
    const newItem = new User({
      ...input,
      active: true,
      createdAt: zoneDate(date)
    })
    const item = await newItem.save()
    const { createdAt, updatedAt, user } = item._doc

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  },
  newReport: async function ({ input }) {
    console.log(input)

    const date = new Date(input.date)

    const newItem = new Report({
      date: input.date,
      shift: input.shift,
      machine: input.machine,
      real: input.real,
      ng: input.ng,
      ok: input.ok,
      plan: input.plan,
      tprod: input.tprod,
      cycles: input.cycles,
      ptime: input.ptime,
      wtime: input.wtime,
      dtime: input.dtime,
      avail: input.avail,
      perf: input.perf,
      qual: input.qual,
      oee: input.oee,
      purge: input.purge,
      comments: input.comments,
      team: input.team,
      oper: input.oper,
      insp: input.insp,
      user: input.user,
      progrs: input.progrs,
      dates: allDate(date)
    })
    const report = await newItem.save()

    const { _id, createdAt, updatedAt, user } = report._doc

    const production = input.production.map(async (item) => {
      const newProduction = new Production({
        report: _id,
        date: input.date,
        dates: allDate(date),
        ...item
      })

      const productionSaved = await newProduction.save()
      return { ...productionSaved._doc }
    })

    const downtimes = input.downtimes.map(async (item) => {
      const newDowntime = new Downtime({
        report: _id,
        ...item
      })

      const downtimeSaved = await newDowntime.save()
      return { ...downtimeSaved._doc }
    })

    const ngs = input.ngs.map(async (item) => {
      const newNg = new Ng({
        report: _id,
        ...item
      })

      const ngSaved = await newNg.save()
      return { ...ngSaved._doc }
    })

    const resines = input.resines.map(async (item) => {
      const newResine = new Resine({
        report: _id,
        ...item
      })

      const resineSaved = await newResine.save()
      return { ...resineSaved._doc }
    })

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...report._doc,
      production,
      downtimes,
      ngs,
      resines,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      machine: machine.number,
      dtime: parseFloat(dtime),
      wtime: parseFloat(wtime),
      perf: parseFloat(perf),
      avail: parseFloat(avail),
      qual: parseFloat(qual),
      oee: parseFloat(oee),
      user: existingUser.name
    }
  },
  updateMolde: async function ({ _id, input }) {
    const item = await Molde.findByIdAndUpdate(_id, input, { new: true })
    const { createdAt, updatedAt, lifecycles, tcycles, user } = item._doc

    const cycles = await Production.aggregate([
      { $match: { molde: item._id } },
      {
        $group: {
          _id: '$molde',
          cycles: { $sum: '$cycles' },
          real: { $sum: '$real' }
        }
      }
    ]).then((response) => {
      return (response.length && response[0].cycles) || 0
    })

    const totalCycles = tcycles + cycles
    const percent = ((totalCycles / lifecycles) * 100).toFixed(2)

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      percent,
      user: existingUser.name
    }
  },
  updateMachine: async function ({ _id, input }) {
    const item = await Machine.findByIdAndUpdate(_id, input, { new: true })
    const { createdAt, updatedAt, user } = item._doc

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  },
  updateModel: async function ({ _id, input }) {
    const item = await Model.findByIdAndUpdate(_id, input, { new: true })
    const { createdAt, updatedAt, user } = item._doc

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  },
  updateProgram: async function ({ _id, input }) {
    const item = await Program.findByIdAndUpdate(_id, input, { new: true })
    const { createdAt, updatedAt, user } = item._doc

    const newProgram = await Program.findById(_id)
      .populate({ path: 'machine', model: 'Machine' })
      .populate({ path: 'molde', model: 'Molde' })
      .populate({ path: 'model', model: 'Model' })

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...item._doc,
      time: parseFloat(newProgram.time),
      machine: newProgram.machine.number,
      molde: newProgram.molde.number,
      model: newProgram.model.name,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  },
  updateMaterial: async function ({ _id, input }) {
    const item = await Material.findByIdAndUpdate(_id, input, { new: true })
    const { createdAt, updatedAt, user } = item._doc

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  },
  updateDefect: async function ({ _id, input }) {
    const item = await Defect.findByIdAndUpdate(_id, input, { new: true })
    const { createdAt, updatedAt, user } = item._doc

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  },
  updateIssue: async function ({ _id, input }) {
    const item = await Issue.findByIdAndUpdate(_id, input, { new: true })
    const { createdAt, updatedAt, user } = item._doc

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  },
  updateProfile: async function ({ _id, input }) {
    const item = await Profile.findByIdAndUpdate(_id, input, { new: true })
    const { createdAt, updatedAt, user } = item._doc

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  },
  updateUser: async function ({ _id, input }) {
    const item = await User.findByIdAndUpdate(_id, input, { new: true })
    const { createdAt, updatedAt, user } = item._doc

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  },
  updateShot: async function ({ _id, input }) {
    const item = await Shot.findByIdAndUpdate(_id, input, { new: true })
    const { createdAt, updatedAt, user } = item._doc

    const existingUser = await User.findById(user, {
      password: 0,
      level: 0,
      active: 0,
      createdAt: 0,
      user: 0,
      _id: 0
    })

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  }
}

export default graphqlResolver
