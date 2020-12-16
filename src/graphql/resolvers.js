import zoneDate from '../functions/zoneDate'
import fullDate from '../functions/fullDate'
import allDate from '../functions/allDate'
import stringDate from '../functions/stringDate'
import setFields from '../functions/setFields'

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

import PMachine from '../models/pmachine'
import PMolde from '../models/pmolde'
import PModel from '../models/pmodel'
import PProgram from '../models/pprogram'
import PMaterial from '../models/pmaterial'
import PIssue from '../models/pissue'
import PDefect from '../models/pdefect'
import PShot from '../models/pshot'
import PUser from '../models/puser'
import PProfile from '../models/pprofile'

const safeResines = true
const safeDowntimes = false
const safeNgs = true
const safeProductions = false
const safeReports = false

const graphqlResolver = {
  deleteReport: async function () {
    await Report.deleteMany({ date: '2020-12-16' })
    await Production.deleteMany({ date: '2020-12-16' })
    await Resine.deleteMany({ date: '2020-12-16' })
    await Downtime.deleteMany({ date: '2020-12-16' })
    await Ng.deleteMany({ date: '2020-12-16' })

    return { hola: 'hola' }
  },
  updateMachines: async function () {
    const past = await PMachine.find()

    past.map(async (item) => {
      const newItem = new Machine({
        _id: item._id,
        number: item.machineNumber,
        serial: item.machineSerial,
        closingForce: item.closingForce,
        spindleDiameter: item.spindleDiameter,
        user: '5edde9dfd3888a26048cdd20',
        createdAt: '2020-05-27T14:00:00.000+00:00',
        updatedAt: '2020-12-09T14:00:00.000+00:00'
      })

      await newItem.save()
    })

    // await Machine.updateMany({}, { $unset: { __v: '' } })
    return { hola: 'hola' }
  },
  updateMoldes: async function () {
    const past = await PMolde.find()

    past.map(async (item) => {
      const newItem = new Molde({
        _id: item._id,
        number: item.moldeNumber,
        serial: item.moldeSerial,
        cavities: item.cavities,
        lifecycles: item.lifecycles,
        tcycles: item.tcycles,
        shot: item.shot,
        quantity: item.quantity,
        active: item.active,
        user: '5edde9dfd3888a26048cdd20',
        createdAt: '2020-05-27T14:00:00.000+00:00',
        updatedAt: '2020-12-09T14:00:00.000+00:00'
      })

      await newItem.save()
    })

    // await Molde.updateMany({}, { $unset: { __v: '' } })
    return { hola: 'hola' }
  },
  updateModels: async function () {
    const past = await PModel.find()

    past.map(async (item) => {
      const newItem = new Model({
        _id: item._id,
        number: item.partNumber,
        name: item.partName,
        family: item.family,
        user: '5edde9dfd3888a26048cdd20',
        createdAt: '2020-05-27T14:00:00.000+00:00',
        updatedAt: '2020-12-09T14:00:00.000+00:00'
      })

      await newItem.save()
    })
    // await Model.updateMany({}, { $unset: { __v: '' } })
    return { hola: 'hola' }
  },
  updatePrograms: async function () {
    const past = await PProgram.find()

    past.map(async (item) => {
      const newItem = new Program({
        _id: item._id,
        machine: item.machineNumber,
        molde: item.moldeNumber,
        model: item.partNumber,
        time: item.cycleTime,
        cycles: item.cycles,
        capacity: item.capacity,
        user: '5edde9dfd3888a26048cdd20',
        createdAt: '2020-05-27T14:00:00.000+00:00',
        updatedAt: '2020-12-09T14:00:00.000+00:00'
      })

      await newItem.save()
    })
    // await Program.updateMany({}, { $unset: { __v: '' } })
    return { hola: 'hola' }
  },
  updateMaterials: async function () {
    const past = await PMaterial.find()

    past.map(async (item) => {
      const newItem = new Material({
        _id: item._id,
        number: item.number,
        description: item.description,
        color: item.color,
        type: item.type,
        unit: item.unit,
        acronym: item.acronym,
        identification: item.identification,
        manufacturer: item.manufacturer,
        user: '5edde9dfd3888a26048cdd20',
        createdAt: '2020-05-27T14:00:00.000+00:00',
        updatedAt: '2020-12-09T14:00:00.000+00:00'
      })

      await newItem.save()
    })

    // await Material.updateMany({}, { $unset: { __v: '' } })
    return { hola: 'hola' }
  },
  updateIssues: async function () {
    const past = await PIssue.find()

    past.map(async (item) => {
      const newItem = new Issue({
        _id: item._id,
        name: item.issueName,
        code: item.issueCode,
        user: '5edde9dfd3888a26048cdd20',
        createdAt: '2020-05-27T14:00:00.000+00:00',
        updatedAt: '2020-12-09T14:00:00.000+00:00'
      })

      await newItem.save()
    })
    // await Issue.updateMany({}, { $unset: { __v: '' } })
    return { hola: 'hola' }
  },
  updateDefects: async function () {
    const past = await PDefect.find()

    past.map(async (item) => {
      const newItem = new Defect({
        _id: item._id,
        name: item.defectName,
        code: item.defectCode,
        injection: item.isInjection,
        user: '5edde9dfd3888a26048cdd20',
        createdAt: '2020-05-27T14:00:00.000+00:00',
        updatedAt: '2020-12-09T14:00:00.000+00:00'
      })

      await newItem.save()
    })
    // await Defect.updateMany({}, { $unset: { __v: '' } })
    return { hola: 'hola' }
  },
  updateShots: async function () {
    const past = await PShot.find()

    past.map(async (item) => {
      const newItem = new Shot({
        _id: item._id,
        molde: item.molde,
        date: item.date,
        shift: item.shift,
        comments: item.comments,
        active: item.active,
        end: item.end,
        shiftEnd: item.shiftEnd,
        quantity: item.quantity,
        user: '5edde9dfd3888a26048cdd20',
        createdAt: `${item.date}T14:00:00.000+00:00`,
        updatedAt: '2020-12-12T14:00:00.000+00:00'
      })

      await newItem.save()
    })
    // await Shot.updateMany({}, { $unset: { __v: '' } })
    return { hola: 'hola' }
  },
  updateUsers: async function () {
    const past = await PUser.find()

    past.map(async (item) => {
      const newItem = new User({
        _id: item._id,
        name: item.name,
        level: item.level,
        password: item.password,
        active: item.active,
        user: '5edde9dfd3888a26048cdd20',
        createdAt: '2020-05-27T14:00:00.000+00:00',
        updatedAt: '2020-12-09T14:00:00.000+00:00'
      })

      await newItem.save()
    })
    // await User.updateMany({}, { $unset: { __v: '' } })
    return { hola: 'hola' }
  },
  updateProfiles: async function () {
    const past = await PProfile.find()

    past.map(async (item) => {
      const newItem = new Profile({
        _id: item._id,
        number: item.number,
        firstname: item.firstname,
        lastname: item.lastname,
        entry: stringDate(item.entry),
        team: item.team,
        gender: item.gender,
        department: item.department,
        area: item.area,
        position: item.position,
        active: item.active,
        user: '5edde9dfd3888a26048cdd20',
        createdAt: item.createdAt,
        updatedAt: '2020-12-09T14:00:00.000+00:00'
      })

      await newItem.save()
    })

    // await Profile.updateMany({}, { $unset: { __v: '' } })

    //   {
    //     $rename: {
    //       entr: 'entry'
    //     }
    //   }
    return { hola: 'hola' }
  },
  updateReports: async function () {
    const past = await Report.find({ cycles: 0 })
    let updates = 0
    past.map(async (item) => {
      const production = await Production.find({ report: item._id })
      const cycles =
        production.reduce((a, b) => {
          return a + b.cycles
        }, 0) || 0

      const resines = await Resine.find({ report: item._id })
      const purge =
        resines.reduce((a, b) => {
          return a + b.purge
        }, 0) || 0

      await Report.findByIdAndUpdate(item._id, {
        cycles: cycles,
        purge: purge
      })
      updates++
    })

    return { total: updates }
  },
  updateReportsProd: async function () {
    const past = await Report.find({ tprod: 0 })
    let updates = 0
    past.map(async (item) => {
      const production = await Production.find({ report: item._id })

      const tprod = production.reduce((a, b) => {
        return a + b.prod || 0
      }, 0)

      await Report.findByIdAndUpdate(item._id, {
        tprod: tprod
      })
      updates++
    })

    return { total: updates }
  },
  extractResines: async function () {
    let totalExtracted = 0
    const total = await Old.find()
    total.map(async ({ _id, resines, reportDate, shift }) => {
      if (resines.length > 0 && safeResines) {
        await resines.map((resine) => {
          const input = {
            report: _id,
            resine: resine.resine,
            purge: resine.purge,
            date: stringDate(reportDate),
            dates: allDate(reportDate),
            shift
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
    total.map(async ({ _id, downtimeDetail, reportDate, shift }) => {
      if (downtimeDetail.length > 0 && safeDowntimes) {
        await downtimeDetail.map((dt) => {
          const input = {
            report: _id,
            issue: dt.issueId,
            mins: dt.mins,
            date: stringDate(reportDate),
            dates: allDate(reportDate),
            shift
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
    total.map(async ({ _id, defects, reportDate, shift }) => {
      if (defects.length > 0 && safeNgs) {
        await defects.map((defect) => {
          const input = {
            report: _id,
            defect: defect.defect,
            model: defect.partNumber,
            molde: defect.molde,
            pieces: defect.defectPcs,
            date: stringDate(reportDate),
            dates: allDate(reportDate),
            shift
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

    total.map(async ({ _id, production, reportDate, shift }) => {
      if (production.length > 1) {
        dosprod++
      }

      if (production.length > 0 && safeProductions) {
        await production.map((prods) => {
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
          const comentarios = comments || ''
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
    const perPage = 100
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
    const perPage = 100
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
    const perPage = 100
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
    const perPage = 100
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
    const perPage = 100
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
    const perPage = 100
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
    const perPage = 200
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
    const perPage = 100
    const total = await Shot.find().countDocuments()
    if (total === 0) return { total: 0, items: [] }

    const array = await Shot.find()
      .skip((page - 1) * perPage + add)
      .limit(perPage)
      .populate({ path: 'user', model: 'User' })
      .populate({ path: 'molde', model: 'Molde' })
      .sort({ date: -1 })

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
  profiles: async function ({ page, add }) {
    if (!page) {
      page = 1
    }
    if (!add) {
      add = 0
    }
    const perPage = 100
    const total = await Profile.find().countDocuments()
    if (total === 0) return { total: 0, items: [] }

    const array = await Profile.find({ active: true })
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
    const perPage = 100
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
    const perPage = 100
    const total = await Report.find().countDocuments()
    if (total === 0) return { total: 0, items: [] }

    const array = await Report.find()
      .skip((page - 1) * perPage + add)
      .limit(perPage)
      .populate({ path: 'user', model: 'User' })
      .populate({ path: 'machine', model: 'Machine' })
      .sort({ date: -1 })

    const items = array.map(async (item) => {
      const {
        _id,
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

      const productions = await Production.find(
        { report: _id },
        {
          _id: 0,
          report: 0,
          dates: 0,
          date: 0,
          shift: 0
        }
      )
      const resines = await Resine.find(
        { report: _id },
        {
          _id: 0,
          report: 0,
          dates: 0,
          date: 0,
          shift: 0
        }
      )
      const ngs = await Ng.find(
        { report: _id },
        {
          _id: 0,
          report: 0,
          dates: 0,
          date: 0,
          shift: 0
        }
      )
      const downtimes = await Downtime.find(
        { report: _id },
        {
          _id: 0,
          report: 0,
          dates: 0,
          date: 0,
          shift: 0
        }
      )

      const formatProductions = productions.map((item) => {
        return {
          ...item._doc,
          dtime: +item._doc.dtime,
          wtime: +item._doc.wtime,
          perf: +item._doc.perf,
          avail: +item._doc.avail,
          qual: +item._doc.qual,
          oee: +item._doc.oee
        }
      })

      const object = {
        ...item._doc,
        createdAt: fullDate(createdAt),
        updatedAt: fullDate(updatedAt),
        user: user.name,
        machine: machine,
        dtime: +dtime,
        wtime: +wtime,
        perf: +perf,
        avail: +avail,
        qual: +qual,
        oee: +oee,
        production: formatProductions,
        resines: resines,
        ngs: ngs,
        downtimes: downtimes
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
    const { createdAt, updatedAt, _id } = item._doc

    const newShot = await Shot.findById(_id)
      .populate({
        path: 'molde',
        model: 'Molde',
        select: {
          serial: 0,
          cavities: 0,
          lifecycles: 0,
          shot: 0,
          quantity: 0,
          active: 0,
          user: 0,
          createdAt: 0,
          updatedAt: 0
        }
      })
      .populate({
        path: 'user',
        model: 'User',
        select: {
          password: 0,
          level: 0,
          active: 0,
          createdAt: 0,
          updatedAt: 0,
          user: 0,
          _id: 0
        }
      })

    const object = {
      ...newShot._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: newShot._doc.user.name
    }

    return object
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
    const typeDate = new Date(input.date)

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
      progrs: input.production.length,
      dates: allDate(typeDate)
    })

    const already = await Report.find({
      machine: newItem.machine,
      date: newItem.date,
      shift: newItem.shift
    })
    if (!already.length == 0) {
      const error = new Error(
        'production for this machine, shift and date is already reported'
      )
      throw error
    }

    const report = await newItem.save()

    const { _id, date, shift } = report._doc

    const production = input.production.map(async (item) => {
      const newProduction = new Production({
        report: _id,
        date: date,
        dates: allDate(typeDate),
        shift: shift,
        ...item
      })

      const productionSaved = await newProduction.save()
      return { ...productionSaved._doc }
    })

    const downtimes = input.downtimes.map(async (item) => {
      const newDowntime = new Downtime({
        report: _id,
        date: date,
        dates: allDate(typeDate),
        shift: shift,
        ...item
      })

      const downtimeSaved = await newDowntime.save()
      return { ...downtimeSaved._doc }
    })

    const ngs = input.ngs.map(async (item) => {
      const newNg = new Ng({
        report: _id,
        date: date,
        dates: allDate(typeDate),
        shift: shift,
        ...item
      })

      const ngSaved = await newNg.save()
      return { ...ngSaved._doc }
    })

    const resines = input.resines.map(async (item) => {
      const newResine = new Resine({
        report: _id,
        date: date,
        dates: allDate(typeDate),
        shift: shift,
        ...item
      })

      const resineSaved = await newResine.save()
      return { ...resineSaved._doc }
    })

    const createdReport = await Report.findById(_id)
      .populate({
        path: 'user',
        model: 'User',
        select: {
          password: 0,
          level: 0,
          active: 0,
          createdAt: 0,
          updatedAt: 0,
          user: 0,
          _id: 0
        }
      })
      .populate({ path: 'machine', model: 'Machine' })
      .sort({ date: -1 })

    const object = {
      ...createdReport._doc,
      production,
      downtimes,
      ngs,
      resines,
      createdAt: fullDate(createdReport._doc.createdAt),
      updatedAt: fullDate(createdReport._doc.updatedAt),
      dtime: parseFloat(createdReport._doc.dtime),
      wtime: parseFloat(createdReport._doc.wtime),
      perf: parseFloat(createdReport._doc.perf),
      avail: parseFloat(createdReport._doc.avail),
      qual: parseFloat(createdReport._doc.qual),
      oee: parseFloat(createdReport._doc.oee),
      user: createdReport._doc.user.name
    }

    return object
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
      .populate({ path: 'machine', model: 'Machine' })
      .populate({ path: 'molde', model: 'Molde' })
      .populate({ path: 'model', model: 'Model' })

    const { createdAt, updatedAt, user, time } = item._doc

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
      time: parseFloat(time),
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
      .populate({
        path: 'molde',
        model: 'Molde',
        select: {
          serial: 0,
          cavities: 0,
          lifecycles: 0,
          shot: 0,
          quantity: 0,
          active: 0,
          user: 0,
          createdAt: 0,
          updatedAt: 0
        }
      })
      .populate({
        path: 'user',
        model: 'User',
        select: {
          password: 0,
          level: 0,
          active: 0,
          createdAt: 0,
          updatedAt: 0,
          user: 0,
          _id: 0
        }
      })

    const { createdAt, updatedAt, user } = item._doc

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: user.name
    }
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

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: existingUser.name
    }
  },
  updateReport: async function ({ _id, input }) {
    const typeDate = new Date(input.date)

    const itemInput = {
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
      progrs: input.production.length,
      dates: allDate(typeDate)
    }
    const updatedReport = await Report.findByIdAndUpdate(_id, itemInput, {
      new: true
    })
      .populate({
        path: 'machine',
        model: 'Machine'
      })
      .populate({
        path: 'user',
        model: 'User'
      })

    await Production.deleteMany({ report: _id })
    await Resine.deleteMany({ date: _id })
    await Downtime.deleteMany({ date: _id })
    await Ng.deleteMany({ date: _id })

    const production = input.production.map(async (item) => {
      const newProduction = new Production({
        report: _id,
        date: updatedReport._doc.date,
        dates: allDate(typeDate),
        shift: updatedReport._doc.shift,
        ...item
      })

      const productionSaved = await newProduction.save()
      return { ...productionSaved._doc }
    })

    const downtimes = input.downtimes.map(async (item) => {
      const newDowntime = new Downtime({
        report: _id,
        date: updatedReport._doc.date,
        dates: allDate(typeDate),
        shift: updatedReport._doc.shift,
        ...item
      })

      const downtimeSaved = await newDowntime.save()
      return { ...downtimeSaved._doc }
    })

    const ngs = input.ngs.map(async (item) => {
      const newNg = new Ng({
        report: _id,
        date: updatedReport._doc.date,
        dates: allDate(typeDate),
        shift: updatedReport._doc.shift,
        ...item
      })

      const ngSaved = await newNg.save()
      return { ...ngSaved._doc }
    })

    const resines = input.resines.map(async (item) => {
      const newResine = new Resine({
        report: _id,
        date: updatedReport._doc.date,
        dates: allDate(typeDate),
        shift: updatedReport._doc.shift,
        ...item
      })

      const resineSaved = await newResine.save()
      return { ...resineSaved._doc }
    })

    return {
      ...updatedReport._doc,
      production,
      downtimes,
      ngs,
      resines,
      createdAt: fullDate(updatedReport._doc.createdAt),
      updatedAt: fullDate(updatedReport._doc.updatedAt),
      dtime: parseFloat(updatedReport._doc.dtime),
      wtime: parseFloat(updatedReport._doc.wtime),
      perf: parseFloat(updatedReport._doc.perf),
      avail: parseFloat(updatedReport._doc.avail),
      qual: parseFloat(updatedReport._doc.qual),
      oee: parseFloat(updatedReport._doc.oee),
      user: updatedReport._doc.user.name
    }
  },
  production: async function () {
    const today = '2020-12-10'
    const filter = 'machine'
    const period = 'day'

    const fields = setFields(period, today, filter)

    const items = fields.map(async (item) => {
      const data = await Production.aggregate([
        { $match: { date: item.value, shift: '1' } },
        {
          $group: {
            _id: { date: '$date' },
            real: { $sum: '$real' },
            ng: { $sum: '$ng' },
            ok: { $sum: '$ok' },
            plan: { $sum: '$plan' },
            cycles: { $sum: '$cycles' },
            wtime: { $sum: '$wtime' },
            dtime: { $sum: '$dtime' }
          }
        }
      ]).then((response) => {
        return (
          response.length && {
            ...response[0],
            date: item.value,
            wtime: +response[0].wtime,
            dtime: +response[0].dtime
          }
        )
      })
      console.log(data)
      return await data

      // const { createdAt, updatedAt, tcycles, lifecycles, user } = item._doc
      // const totalCycles = tcycles + cycles
      // const percent = ((totalCycles / lifecycles) * 100).toFixed(2)

      // const object = {
      //   ...item._doc,
      //   createdAt: fullDate(createdAt),
      //   updatedAt: fullDate(updatedAt),
      //   tcycles: totalCycles,
      //   percent,
      //   user: user.name
      // }

      // return object
    })

    return { hola: 'hola' }
  }
}

export default graphqlResolver
