import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import { rows } from '../constants/rows'
import zoneDate from '../functions/zoneDate'
import fullDate from '../functions/fullDate'
import allDate from '../functions/allDate'
import stringDate from '../functions/stringDate'
import setFields from '../functions/setFields'
import keyValue from '../functions/keyValue'
import keyValueDowntime from '../functions/keyValueDowntime'
import keyValueResine from '../functions/keyValueResine'
import keyValueDefect from '../functions/keyValueDefect'
import machineList from '../functions/machineList'
import moldesList from '../functions/moldesList'
import modelsList from '../functions/modelsList'
import downtimeList from '../functions/downtimeList'
import resinesList from '../functions/resinesList'
import defectList from '../functions/defectList'

import filterMachines from '../functions/filterMachines'
import filterMoldes from '../functions/filterMoldes'
import filterModels from '../functions/filterModels'
import filterNgsMachinesSub from '../functions/filterNgsMachinesSub'
import filterNgsMoldesSub from '../functions/filterNgsMoldesSub'
import filterNgsModelsSub from '../functions/filterNgsModelsSub'
import filterDowntimesSub from '../functions/filterDowntimesSub'
import filterResinesSub from '../functions/filterResinesSub'

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
import Location from '../models/location'
import Spare from '../models/spare'
import Ingoing from '../models/ingoing'
import Outgoing from '../models/outgoing'

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

const safeResines = false
const safeDowntimes = false
const safeNgs = false
const safeProductions = false
const safeReports = false

const graphqlResolver = {
  deleteReport: async function () {
    // await Report.deleteMany({ date: '2020-12-16' })
    // await Production.deleteMany({ date: '2020-12-16' })
    // await Resine.deleteMany({ date: '2020-12-16' })
    // await Downtime.deleteMany({ date: '2020-12-16' })
    // await Ng.deleteMany({ date: '2020-12-16' })

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
      const totalCyc = item.tcycles || 0
      const newItem = new Molde({
        _id: item._id,
        number: item.moldeNumber,
        serial: item.moldeSerial,
        cavities: item.cavities,
        lifecycles: item.lifecycles,
        tcycles: totalCyc,
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
  login: async function ({ name, password }) {
    const user = await User.findOne({ name })
    if (!user) {
      const error = new Error('Name is incorrect.')
      error.code = 401
      throw error
    }

    const isEqual = await bcrypt.compare(password, user._doc.password)
    if (!isEqual) {
      const error = new Error('Password is incorrect.')
      error.code = 402
      throw error
    }
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        name: user.name
      },
      'somesupersecretsecret',
      { expiresIn: '1h' }
    )
    return { token: token, userId: user._id, name: user.name }
  },
  profilesLabels: async function ({ team }) {
    return await Profile.find({ active: true, team }, null, {
      sort: { team: -1, firstname: 1 }
    })
  },
  locations: async function ({ page, add }) {
    if (!page) {
      page = 1
    }
    if (!add) {
      add = 0
    }
    const perPage = 100
    const total = await Location.find().countDocuments()
    if (total === 0) return { total: 0, items: [] }

    const array = await Location.find()
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
  spares: async function ({ page, add }) {
    if (!page) {
      page = 1
    }
    if (!add) {
      add = 0
    }
    const perPage = 100
    const total = await Spare.find().countDocuments()
    if (total === 0) return { total: 0, items: [] }

    const array = await Spare.find()
      .skip((page - 1) * perPage + add)
      .limit(perPage)
      .populate({ path: 'location', model: 'Location' })
      .populate({ path: 'user', model: 'User' })
      .sort({ _id: 1 })

    const items = array.map(async (item) => {
      const stockIn = await Ingoing.aggregate([
        { $match: { spare: item._id } },
        {
          $group: {
            _id: '$spare',
            quantity: { $sum: '$quantity' }
          }
        }
      ]).then((response) => {
        return (response.length && response[0].quantity) || 0
      })

      const stockOut = await Outgoing.aggregate([
        { $match: { spare: item._id } },
        {
          $group: {
            _id: '$spare',
            quantity: { $sum: '$quantity' }
          }
        }
      ]).then((response) => {
        return (response.length && response[0].quantity) || 0
      })

      const lastPrice = await Ingoing.find({ origin: 'PO', spare: item._id })
        .sort({ date: -1 })
        .limit(1)

      const price = lastPrice[0] ? lastPrice[0].price : 0

      const { createdAt, updatedAt, user, location } = item._doc
      const stock = stockIn - stockOut

      const object = {
        ...item._doc,
        createdAt: fullDate(createdAt),
        updatedAt: fullDate(updatedAt),
        stock,
        price: +price,
        loCode: `${location.code} ${location.name}`,
        user: user.name
      }

      return object
    })

    return { total, items }
  },
  ingoings: async function ({ page, add }) {
    if (!page) {
      page = 1
    }
    if (!add) {
      add = 0
    }
    const perPage = 100
    const total = await Ingoing.find().countDocuments()
    if (total === 0) return { total: 0, items: [] }

    const array = await Ingoing.find()
      .skip((page - 1) * perPage + add)
      .limit(perPage)
      .populate({ path: 'user', model: 'User' })
      .populate({ path: 'spare', model: 'Spare' })
      .sort({ _id: 1 })

    const items = array.map((item) => {
      const { createdAt, updatedAt, user, spare, price } = item._doc

      const setPrice = price ? +price : null
      const object = {
        ...item._doc,
        price: setPrice,
        spCode: `${spare.code} ${spare.name}`,
        createdAt: fullDate(createdAt),
        updatedAt: fullDate(updatedAt),
        user: user.name
      }

      return object
    })
    return { total, items }
  },
  outgoings: async function ({ page, add }) {
    if (!page) {
      page = 1
    }
    if (!add) {
      add = 0
    }
    const perPage = 100
    const total = await Outgoing.find().countDocuments()
    if (total === 0) return { total: 0, items: [] }

    const array = await Outgoing.find()
      .skip((page - 1) * perPage + add)
      .limit(perPage)
      .populate({ path: 'machine', model: 'Machine' })
      .populate({ path: 'molde', model: 'Molde' })
      .populate({ path: 'operator', model: 'Profile' })
      .populate({ path: 'spare', model: 'Spare' })
      .populate({ path: 'repairman', model: 'Profile' })
      .populate({ path: 'user', model: 'User' })
      .sort({ _id: 1 })

    const items = array.map((item) => {
      const {
        createdAt,
        updatedAt,
        user,
        spare,
        operator,
        repairman
      } = item._doc
      const object = {
        ...item._doc,
        spCode: `${spare.code} ${spare.name}`,
        op: `${operator.firstname} ${operator.lastname}`,
        rep: `${repairman.firstname} ${repairman.lastname}`,
        createdAt: fullDate(createdAt),
        updatedAt: fullDate(updatedAt),
        user: user.name
      }

      return object
    })
    return { total, items }
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
      .sort({ code: 1 })

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
      .sort({ code: 1 })

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

    let filterItems = [...items]

    if (shift === '2') {
      const removeItem = items.find(
        (item) => item.date === date && item.shift === '1'
      )
      if (!removeItem) {
        filterItems = [...items]
      } else {
        filterItems = items.filter((item) => item._id !== removeItem._id)
      }
    }
    if (!active && shiftEnd === '1') {
      const removeItem = items.find(
        (item) => item.date === end && item.shift === '2'
      )
      if (!removeItem) {
        filterItems = [...filterItems]
      } else {
        filterItems = filterItems.filter((item) => item._id !== removeItem._id)
      }
    }

    return filterItems
  },
  newLocation: async function ({ input }) {
    const date = new Date()
    const newItem = new Location({
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
  newSpare: async function ({ input }) {
    const newItem = new Spare(input)
    const item = await newItem.save()
    const { _id } = item._doc

    const newSpare = await Spare.findById(_id)
      .populate({ path: 'location', model: 'Location' })
      .populate({ path: 'user', model: 'User' })

    const { createdAt, updatedAt, user, location } = newSpare._doc

    return {
      ...newSpare._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      price: 0,
      stock: 0,
      loCode: `${location.code} ${location.name}`,
      user: user.name
    }
  },
  newIngoing: async function ({ input }) {
    const newItem = new Ingoing(input)
    const item = await newItem.save()
    const { _id } = item._doc

    const newIngoing = await Ingoing.findById(_id)
      .populate({ path: 'user', model: 'User' })
      .populate({ path: 'spare', model: 'Spare' })

    const { createdAt, updatedAt, user, spare, price } = newIngoing._doc
    const setPrice = price ? +price : null
    return {
      ...newIngoing._doc,
      price: setPrice,
      spCode: `${spare.code} ${spare.name}`,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: user.name
    }
  },
  newOutgoing: async function ({ input }) {
    const newItem = new Outgoing(input)
    const item = await newItem.save()
    const { _id } = item._doc

    const newOutgoing = await Outgoing.findById(_id)
      .populate({ path: 'machine', model: 'Machine' })
      .populate({ path: 'molde', model: 'Molde' })
      .populate({ path: 'operator', model: 'Profile' })
      .populate({ path: 'spare', model: 'Spare' })
      .populate({ path: 'repairman', model: 'Profile' })
      .populate({ path: 'user', model: 'User' })

    const {
      createdAt,
      updatedAt,
      user,
      spare,
      operator,
      repairman
    } = newOutgoing._doc

    return {
      ...newOutgoing._doc,
      spCode: `${spare.code} ${spare.name}`,
      op: `${operator.firstname} ${operator.lastname}`,
      rep: `${repairman.firstname} ${repairman.lastname}`,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: user.name
    }
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
    if (validator.isEmpty(input.password)) {
      const error = new Error('Invalid input.')
      error.code = 422
      throw error
    }
    if (!validator.isLength(input.password, { min: 5 })) {
      const error = new Error('Password too short!')
      error.code = 422
      throw error
    }
    const existingName = await User.findOne({ name: input.name })
    if (existingName) {
      const error = new Error('name is already registered!')
      error.code = 500
      throw error
    }
    const date = new Date()
    const newItem = new User({
      ...input,
      active: true,
      password: await bcrypt.hash(input.password, 12),
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
      return {
        ...productionSaved._doc,
        dtime: +productionSaved._doc.dtime,
        wtime: +productionSaved._doc.wtime,
        perf: +productionSaved._doc.perf,
        avail: +productionSaved._doc.avail,
        qual: +productionSaved._doc.qual,
        oee: +productionSaved._doc.oee
      }
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
  updateLocation: async function ({ _id, input }) {
    const item = await Location.findByIdAndUpdate(_id, input, { new: true })
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
  updateSpare: async function ({ _id, input }) {
    const item = await Spare.findByIdAndUpdate(_id, input, { new: true })
      .populate({ path: 'location', model: 'Location' })
      .populate({ path: 'user', model: 'User' })
    const { createdAt, updatedAt, user, location } = item._doc

    const stockIn = await Ingoing.aggregate([
      { $match: { spare: _id } },
      {
        $group: {
          _id: '$spare',
          quantity: { $sum: '$quantity' }
        }
      }
    ]).then((response) => {
      return (response.length && response[0].quantity) || 0
    })

    const stockOut = await Outgoing.aggregate([
      { $match: { spare: _id } },
      {
        $group: {
          _id: '$spare',
          quantity: { $sum: '$quantity' }
        }
      }
    ]).then((response) => {
      return (response.length && response[0].quantity) || 0
    })

    const lastPrice = await Ingoing.find({ origin: 'PO', spare: item._id })
      .sort({ date: -1 })
      .limit(1)

    const price = lastPrice[0] ? lastPrice[0].price : 0

    const stock = stockIn - stockOut

    return {
      ...item._doc,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      stock,
      price: +price,
      loCode: `${location.code} ${location.name}`,
      user: user.name
    }
  },
  updateIngoing: async function ({ _id, input }) {
    const item = await Ingoing.findByIdAndUpdate(_id, input, { new: true })
      .populate({ path: 'user', model: 'User' })
      .populate({ path: 'spare', model: 'Spare' })

    const { createdAt, updatedAt, user, spare, price } = item._doc
    const setPrice = price ? +price : null

    return {
      ...item._doc,
      price: setPrice,
      spCode: `${spare.code} ${spare.name}`,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: user.name
    }
  },
  updateOutgoing: async function ({ _id, input }) {
    const item = await Outgoing.findByIdAndUpdate(_id, input, { new: true })
      .populate({ path: 'machine', model: 'Machine' })
      .populate({ path: 'molde', model: 'Molde' })
      .populate({ path: 'operator', model: 'Profile' })
      .populate({ path: 'spare', model: 'Spare' })
      .populate({ path: 'repairman', model: 'Profile' })
      .populate({ path: 'user', model: 'User' })

    const { createdAt, updatedAt, user, spare, operator, repairman } = item._doc

    return {
      ...item._doc,
      spCode: `${spare.code} ${spare.name}`,
      op: `${operator.firstname} ${operator.lastname}`,
      rep: `${repairman.firstname} ${repairman.lastname}`,
      createdAt: fullDate(createdAt),
      updatedAt: fullDate(updatedAt),
      user: user.name
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
    await Resine.deleteMany({ report: _id })
    await Downtime.deleteMany({ report: _id })
    await Ng.deleteMany({ report: _id })

    const production = input.production.map(async (item) => {
      const newProduction = new Production({
        report: _id,
        date: updatedReport._doc.date,
        dates: allDate(typeDate),
        shift: updatedReport._doc.shift,
        ...item
      })

      const productionSaved = await newProduction.save()
      return {
        ...productionSaved._doc,
        dtime: +productionSaved._doc.dtime,
        wtime: +productionSaved._doc.wtime,
        perf: +productionSaved._doc.perf,
        avail: +productionSaved._doc.avail,
        qual: +productionSaved._doc.qual,
        oee: +productionSaved._doc.oee
      }
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
  production: async function ({
    today,
    filter = 'machine',
    period = 'day',
    shifts = ['1', '2']
  }) {
    if (today) {
      today = today + 'T14:00:00.000+00:00'
    }
    if (!today) {
      const day = new Date()
      today = stringDate(day) + 'T14:00:00.000+00:00'
    }

    if (shifts === '1') {
      shifts = ['1']
    }
    if (shifts === '2') {
      shifts = ['2']
    }
    if (shifts === 'both') {
      shifts = ['1', '2']
    }

    const fields = setFields(period, today)
    const maxMinFields = () => {
      if (period === 'day') {
        return { min: fields[0].min, max: fields[6].max }
      }
      if (period === 'week') {
        return { min: fields[0].min, max: fields[4].max }
      }
      if (period === 'month') {
        return { min: fields[0].min, max: fields[1].max }
      }
    }

    const data = await Production.find(
      {
        date: { $gte: maxMinFields().min, $lte: maxMinFields().max },
        shift: { $in: shifts }
      },
      {
        _id: 0,
        shift: 0,
        dates: 0,
        program: 0,
        avail: 0,
        perf: 0,
        qual: 0
      }
    )
      .populate({
        path: 'report',
        model: 'Report',
        select: {
          _id: 0,
          dates: 0,
          date: 0,
          shift: 0,
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
        populate: {
          path: 'machine',
          model: Machine,
          select: {
            serial: 0,
            closingForce: 0,
            spindleDiameter: 0,
            user: 0,
            createdAt: 0,
            updatedAt: 0
          }
        }
      })
      .populate({
        path: 'molde',
        Model: 'Molde',
        select: {
          serial: 0,
          cavities: 0,
          lifecycles: 0,
          tcycles: 0,
          shot: 0,
          quantity: 0,
          active: 0,
          user: 0,
          createdAt: 0,
          updatedAt: 0
        }
      })
      .populate({
        path: 'model',
        Model: 'Model',
        select: {
          number: 0,
          family: 0,
          user: 0,
          createdAt: 0,
          updatedAt: 0
        }
      })
      .then(async (response) => {
        const resines = await Resine.find(
          {
            date: { $gte: maxMinFields().min, $lte: maxMinFields().max },
            shift: { $in: shifts }
          },
          {
            _id: 0,
            dates: 0,
            shift: 0
          }
        )
          .populate({
            path: 'report',
            model: 'Report',
            select: {
              _id: 0,
              dates: 0,
              date: 0,
              shift: 0,
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
            populate: {
              path: 'machine',
              model: Machine,
              select: {
                serial: 0,
                closingForce: 0,
                spindleDiameter: 0,
                user: 0,
                createdAt: 0,
                updatedAt: 0
              }
            }
          })
          .populate({
            path: 'resine',
            model: 'Material',
            select: {
              number: 0,
              manufacturer: 0,
              description: 0,
              identification: 0,
              type: 0,
              unit: 0,
              user: 0,
              createdAt: 0,
              updatedAt: 0
            }
          })

        const downtimes = await Downtime.find(
          {
            date: { $gte: maxMinFields().min, $lte: maxMinFields().max },
            shift: { $in: shifts }
          },
          {
            _id: 0,
            dates: 0,
            shift: 0
          }
        )
          .populate({
            path: 'report',
            model: 'Report',
            select: {
              _id: 0,
              dates: 0,
              date: 0,
              shift: 0,
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
            populate: {
              path: 'machine',
              model: Machine,
              select: {
                serial: 0,
                closingForce: 0,
                spindleDiameter: 0,
                user: 0,
                createdAt: 0,
                updatedAt: 0
              }
            }
          })
          .populate({
            path: 'issue',
            model: 'Issue',
            select: {
              name: 0,
              user: 0,
              createdAt: 0,
              updatedAt: 0
            }
          })

        const ngs = await Ng.find(
          {
            date: { $gte: maxMinFields().min, $lte: maxMinFields().max },
            shift: { $in: shifts }
          },
          {
            _id: 0,
            dates: 0,
            shift: 0
          }
        )
          .populate({
            path: 'report',
            model: 'Report',
            select: {
              _id: 0,
              dates: 0,
              date: 0,
              shift: 0,
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
            populate: {
              path: 'machine',
              model: Machine,
              select: {
                serial: 0,
                closingForce: 0,
                spindleDiameter: 0,
                user: 0,
                createdAt: 0,
                updatedAt: 0
              }
            }
          })
          .populate({
            path: 'defect',
            model: 'Defect',
            select: {
              name: 0,
              injection: 0,
              user: 0,
              createdAt: 0,
              updatedAt: 0
            }
          })

        const issues = downtimeList(downtimes)
        const materials = resinesList(resines)
        const defects = defectList(ngs)
        const machines = machineList(response)
        const models = modelsList(response)
        const moldes = moldesList(response)

        const rowsFields = rows.map((row) => {
          const data = fields.map((item) => {
            return {
              date: item.value,
              field: item.field,
              value: keyValue(response, resines, row.key, item.min, item.max)
            }
          })
          const total = {
            field: 'total',
            value:
              data.reduce((a, b) => {
                return +(a + +b.value).toFixed(2)
              }, 0) || 0
          }

          const subData = () => {
            if (filter === 'machine') {
              return filterMachines(
                machines,
                fields,
                response,
                resines,
                row.key
              )
            }
            if (filter === 'molde') {
              if (row.key === 'purge') {
                return []
              }
              return filterMoldes(moldes, fields, response, row.key)
            }
            if (filter === 'model') {
              if (row.key === 'purge') {
                return []
              }
              return filterModels(models, fields, response, row.key)
            }
          }

          const downtimeSub = issues.map((issue) => {
            const sub = fields.map((item) => {
              return {
                date: item.value,
                field: item.field,
                value: keyValueDowntime(
                  downtimes,
                  issue._id,
                  item.min,
                  item.max
                )
              }
            })
            const subtotal = {
              field: 'total',
              value:
                sub.reduce((a, b) => {
                  return +(a + +b.value).toFixed(2)
                }, 0) || 0
            }
            const subSecond = () => {
              if (filter === 'machine') {
                const machines = machineList(response)
                return filterDowntimesSub(
                  machines,
                  fields,
                  downtimes,
                  issue._id
                )
              }
              if (filter === 'molde' || filter === 'model') {
                return []
              }
            }

            return {
              row: issue.code,
              data: [...sub, subtotal],
              second: subSecond
            }
          })

          const resinesSub = materials.map((material) => {
            const sub = fields.map((item) => {
              return {
                date: item.value,
                field: item.field,
                value: keyValueResine(resines, material._id, item.min, item.max)
              }
            })
            const subtotal = {
              field: 'total',
              value:
                sub.reduce((a, b) => {
                  return +(a + +b.value).toFixed(2)
                }, 0) || 0
            }

            const subSecond = () => {
              if (filter === 'machine') {
                return filterResinesSub(machines, fields, resines, material._id)
              }
              if (filter === 'molde' || filter === 'model') {
                return []
              }
            }

            return {
              row: `${material.acronym} ${material.color}`,
              data: [...sub, subtotal],
              second: subSecond
            }
          })

          const ngsSub = defects.map((defect) => {
            const sub = fields.map((item) => {
              return {
                date: item.value,
                field: item.field,
                value: keyValueDefect(ngs, defect._id, item.min, item.max)
              }
            })
            const subtotal = {
              field: 'total',
              value:
                sub.reduce((a, b) => {
                  return +(a + +b.value).toFixed(2)
                }, 0) || 0
            }

            const subSecond = () => {
              if (filter === 'machine') {
                return filterNgsMachinesSub(machines, fields, ngs, defect._id)
              }
              if (filter === 'molde') {
                return filterNgsMoldesSub(moldes, fields, ngs, defect._id)
              }
              if (filter === 'model') {
                return filterNgsModelsSub(models, fields, ngs, defect._id)
              }
            }
            return {
              row: defect.code,
              data: [...sub, subtotal],
              second: subSecond
            }
          })

          if (
            row.key === 'real' ||
            row.key === 'ok' ||
            row.key === 'plan' ||
            row.key === 'wtime' ||
            row.key === 'cycles'
          ) {
            return {
              row: row.row,
              data: [...data, total],
              subData: subData,
              second: []
            }
          }
          if (row.key === 'oee') {
            const wtime =
              response.reduce((a, b) => {
                return +(a + +b.wtime).toFixed(2)
              }, 0) || 0
            const dtime =
              response.reduce((a, b) => {
                return +(a + +b.dtime).toFixed(2)
              }, 0) || 0
            const real =
              response.reduce((a, b) => {
                return a + +b.real
              }, 0) || 0
            const ok =
              response.reduce((a, b) => {
                return +(a + +b.ok).toFixed(0)
              }, 0) || 0
            const prod =
              response.reduce((a, b) => {
                return +(a + +b.prod).toFixed(0)
              }, 0) || 0
            const time = wtime + dtime
            const preperf = (real / prod) * 100
            const perf = +preperf.toFixed(2) || 0
            const preav = (wtime / time) * 100
            const avail = +preav.toFixed(2) || 0
            const preq = (ok / real) * 100
            const qual = +preq.toFixed(2) || 0
            const preoee = (avail * perf * qual) / 10000
            const oee = +preoee.toFixed(2) || 0
            const oeetotal = {
              field: 'total',
              value: oee
            }
            return {
              row: row.row,
              data: [...data, oeetotal],
              subData: subData,
              second: []
            }
          }

          if (row.key === 'ng') {
            return {
              row: row.row,
              data: [...data, total],
              subData: subData,
              second: ngsSub.sort((x, y) => {
                const valueA = y.data.find((d) => d.field === 'total').value
                const valueB = x.data.find((d) => d.field === 'total').value
                return valueA - valueB
              })
            }
          }
          if (row.key === 'dtime') {
            return {
              row: row.row,
              data: [...data, total],
              subData: subData,
              second: downtimeSub.sort((x, y) => {
                const valueA = y.data.find((d) => d.field === 'total').value
                const valueB = x.data.find((d) => d.field === 'total').value
                return valueA - valueB
              })
            }
          }
          if (row.key === 'purge') {
            return {
              row: row.row,
              data: [...data, total],
              subData: subData,
              second: resinesSub.sort((x, y) => {
                const valueA = y.data.find((d) => d.field === 'total').value
                const valueB = x.data.find((d) => d.field === 'total').value
                return valueA - valueB
              })
            }
          }
        })
        return rowsFields
      })

    const formatFields = fields.map((field) => {
      return { field: field.field, value: field.value }
    })

    return { fields: formatFields, rows: data }
  },
  calendarcycles: async function () {
    const fdate = new Date()
    const finalDate = stringDate(fdate)

    const items = await Shot.find(
      { active: true },
      { comments: 0, user: 0, createdAt: 0, updatedAt: 0, active: 0 }
    ).populate({
      path: 'molde',
      model: 'Molde',
      select: {
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

    const shots = items.map(async (shot) => {
      const { molde, date, shift } = shot._doc

      const ProductionsArray = await Production.find(
        {
          molde: molde._id.toString(),
          date: { $gte: date, $lte: finalDate }
        },
        {
          dates: 0,
          program: 0,
          model: 0,
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
          populate: [
            {
              path: 'machine',
              model: 'Machine',
              select: {
                serial: 0,
                closingForce: 0,
                spindleDiameter: 0,
                user: 0,
                createdAt: 0,
                updatedAt: 0
              }
            }
          ]
        })
        .sort({ date: 1, shift: 1 })

      const cycles = ProductionsArray.map((cycle) => {
        return {
          _id: cycle._doc._id,
          date: cycle._doc.date,
          shift: cycle._doc.shift,
          machine: cycle._doc.report.machine.number,
          real: cycle._doc.real,
          cycles: cycle._doc.cycles,
          quantity: molde.quantity
        }
      })
      let filterItems = [...cycles]
      if (shift === '2') {
        const removeItem = cycles.find(
          (item) => item.date === date && item.shift === '1'
        )
        if (!removeItem) {
          filterItems = [...items]
        } else {
          filterItems = cycles.filter((item) => item._id !== removeItem._id)
        }
      }

      const colorItems = filterItems.map((cyc, index) => {
        const quantity = filterItems.slice(0, index + 1).reduce((a, b) => {
          return a + b.real || 0
        }, 0)
        const status = cyc.quantity >= quantity ? 'green' : 'red'

        return {
          ...cyc,
          status,
          total: quantity,
          percent: ((quantity / cyc.quantity) * 100).toFixed(0)
        }
      })

      return { _id: molde._id, molde: molde.number, items: colorItems }
    })

    return shots
  },
  deleteLocation: async function ({ _id, user }) {
    if (!_id || !user) {
      const error = new Error('invalid')
      error.code = 401
      error.name = 'deleting location'
      throw error
    }
    const spareItem = await Spare.findOne({ location: _id })
    if (spareItem) {
      const error = new Error(`There is a spare with this location`)
      error.code = 401
      error.name = 'deleting location'
      throw error
    }
    const userId = await User.findOne(
      { _id: user, active: true, level: '1' },
      {
        password: 0,
        level: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
        user: 0,
        _id: 0
      }
    )
    if (!userId) {
      const error = new Error('No user found')
      error.code = '401'
      throw error
    }

    const item = await Location.findByIdAndDelete(_id).select({
      user: 0,
      createdAt: 0,
      updatedAt: 0
    })
    if (!item) {
      const error = new Error('No item found')
      error.name = 'deleting location'
      error.code = 401
      throw error
    }

    return { _id: item._id }
  },
  deleteSpare: async function ({ _id, user }) {
    if (!_id || !user) {
      const error = new Error('invalid')
      error.code = 401
      error.name = 'deleting spare'
      throw error
    }
    const ingoingItem = await Ingoing.findOne({ spare: _id })
    if (ingoingItem) {
      const error = new Error(
        `There is a Ingoing with this spare at ${ingoingItem.date}`
      )
      error.code = 401
      error.name = 'deleting spare'
      throw error
    }
    const userId = await User.findOne(
      { _id: user, active: true, level: '1' },
      {
        password: 0,
        level: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
        user: 0,
        _id: 0
      }
    )
    if (!userId) {
      const error = new Error('No user found')
      error.code = '401'
      throw error
    }

    const item = await Spare.findByIdAndDelete(_id).select({
      user: 0,
      createdAt: 0,
      updatedAt: 0
    })
    if (!item) {
      const error = new Error('No item found')
      error.name = 'deleting spare'
      error.code = 401
      throw error
    }

    return { _id: item._id }
  },
  deleteIngoing: async function ({ _id, user }) {
    if (!_id || !user) {
      const error = new Error('invalid')
      error.code = 401
      error.name = 'deleting ingoing'
      throw error
    }

    const userId = await User.findOne(
      { _id: user, active: true, level: '1' },
      {
        password: 0,
        level: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
        user: 0,
        _id: 0
      }
    )
    if (!userId) {
      const error = new Error('No user found')
      error.code = '401'
      throw error
    }

    const item = await Ingoing.findByIdAndDelete(_id).select({
      user: 0,
      createdAt: 0,
      updatedAt: 0
    })
    if (!item) {
      const error = new Error('No item found')
      error.name = 'deleting ingoing'
      error.code = 401
      throw error
    }

    return { _id: item._id }
  },
  deleteOutgoing: async function ({ _id, user }) {
    if (!_id || !user) {
      const error = new Error('invalid')
      error.code = 401
      error.name = 'deleting outgoing'
      throw error
    }

    const userId = await User.findOne(
      { _id: user, active: true, level: '1' },
      {
        password: 0,
        level: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
        user: 0,
        _id: 0
      }
    )
    if (!userId) {
      const error = new Error('No user found')
      error.code = '401'
      throw error
    }

    const item = await Outgoing.findByIdAndDelete(_id).select({
      user: 0,
      createdAt: 0,
      updatedAt: 0
    })
    if (!item) {
      const error = new Error('No item found')
      error.name = 'deleting outgoing'
      error.code = 401
      throw error
    }

    return { _id: item._id }
  },
  deleteMaterial: async function ({ _id, user }) {
    if (!_id || !user) {
      const error = new Error('invalid')
      error.code = 401
      error.name = 'deleting material'
      throw error
    }
    const resineItem = await Resine.findOne(
      { resine: _id },
      {
        report: 0,
        resine: 0,
        purge: 0,
        dates: 0,
        shift: 0
      }
    )
    if (resineItem) {
      const error = new Error(
        `There is a report with this material at ${resineItem.date}`
      )
      error.code = 401
      error.name = 'deleting material'
      throw error
    }
    const userId = await User.findOne(
      { _id: user, active: true, level: '1' },
      {
        password: 0,
        level: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
        user: 0,
        _id: 0
      }
    )
    if (!userId) {
      const error = new Error('No user found')
      error.code = '401'
      throw error
    }

    const item = await Material.findByIdAndDelete(_id).select({
      number: 0,
      description: 0,
      color: 0,
      type: 0,
      unit: 0,
      acronym: 0,
      identification: 0,
      manufacturer: 0,
      user: 0,
      createdAt: 0,
      updatedAt: 0
    })
    if (!item) {
      const error = new Error('No item found')
      error.name = 'deleting material'
      error.code = 401
      throw error
    }

    return { _id: item._id }
  },
  deleteIssue: async function ({ _id, user }) {
    if (!_id || !user) {
      const error = new Error('invalid deleting')
      error.code = 401
      error.name = 'deleting issue'
      throw error
    }
    const issueItem = await Downtime.findOne(
      { issue: _id },
      {
        report: 0,
        issue: 0,
        mins: 0,
        dates: 0,
        shift: 0
      }
    )
    if (issueItem) {
      const error = new Error(
        `There is a report with this issue at ${issueItem.date}`
      )
      error.code = 401
      error.name = 'deleting issue'
      throw error
    }
    const userId = await User.findOne(
      { _id: user, active: true, level: '1' },
      {
        password: 0,
        level: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
        user: 0,
        _id: 0
      }
    )
    if (!userId) {
      const error = new Error('No user found')
      error.code = '401'
      throw error
    }

    const item = await Issue.findByIdAndDelete(_id).select({
      name: 0,
      code: 0,
      user: 0,
      createdAt: 0,
      updatedAt: 0
    })
    if (!item) {
      const error = new Error('No item found')
      error.name = 'deleting issue'
      error.code = 401
      throw error
    }

    return { _id: item._id }
  },
  deleteDefect: async function ({ _id, user }) {
    if (!_id || !user) {
      const error = new Error('invalid deleting')
      error.code = 401
      error.name = 'deleting defect'
      throw error
    }
    const defectItem = await Ng.findOne(
      { defect: _id },
      {
        report: 0,
        defect: 0,
        model: 0,
        molde: 0,
        pieces: 0,
        dates: 0,
        shift: 0
      }
    )
    if (defectItem) {
      const error = new Error(
        `There is a report with this defect at ${defectItem.date}`
      )
      error.code = 401
      error.name = 'deleting defect'
      throw error
    }
    const userId = await User.findOne(
      { _id: user, active: true, level: '1' },
      {
        password: 0,
        level: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
        user: 0,
        _id: 0
      }
    )
    if (!userId) {
      const error = new Error('No user found')
      error.code = '401'
      throw error
    }

    const item = await Defect.findByIdAndDelete(_id).select({
      name: 0,
      code: 0,
      injection: 0,
      user: 0,
      createdAt: 0,
      updatedAt: 0
    })
    if (!item) {
      const error = new Error('No item found')
      error.name = 'deleting defect'
      error.code = 401
      throw error
    }

    return { _id: item._id }
  },
  deleteProfile: async function ({ _id, user }) {
    if (!_id || !user) {
      const error = new Error('invalid deleting')
      error.code = 401
      error.name = 'deleting profile'
      throw error
    }
    const profileItem = await Report.findOne(
      {
        $or: [
          {
            insp: _id
          },
          {
            oper: _id
          }
        ]
      },
      {
        dates: 0,
        machine: 0,
        shift: 0,
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
      }
    )
    if (profileItem) {
      const error = new Error(
        `There is a report with this Employee at ${profileItem.date}`
      )
      error.code = 401
      error.name = 'deleting profile'
      throw error
    }
    const userId = await User.findOne(
      { _id: user, active: true, level: '1' },
      {
        password: 0,
        level: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
        user: 0,
        _id: 0
      }
    )
    if (!userId) {
      const error = new Error('No user found')
      error.code = '401'
      throw error
    }

    const item = await Profile.findByIdAndDelete(_id).select({
      number: 0,
      lastname: 0,
      entry: 0,
      team: 0,
      gender: 0,
      department: 0,
      area: 0,
      position: 0,
      active: 0,
      user: 0,
      createdAt: 0,
      updatedAt: 0
    })
    if (!item) {
      const error = new Error('No item found')
      error.name = 'deleting Profile'
      error.code = 401
      throw error
    }

    return { _id: item._id }
  },
  deleteUser: async function ({ _id, user }) {
    if (!_id || !user) {
      const error = new Error('invalid deleting')
      error.code = 401
      error.name = 'deleting user'
      throw error
    }
    const reportItem = await Report.findOne(
      {
        user: _id
      },
      {
        dates: 0,
        machine: 0,
        shift: 0,
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
      }
    )
    if (reportItem) {
      const error = new Error(
        `There is a report with this user at ${reportItem.date}`
      )
      error.code = 401
      error.name = 'deleting user'
      throw error
    }
    const moldeItem = await Molde.findOne({
      user: _id
    })
    if (moldeItem) {
      const error = new Error(`There is a molde with this user`)
      error.code = 401
      error.name = 'deleting User'
      throw error
    }
    const modelItem = await Model.findOne({
      user: _id
    })
    if (modelItem) {
      const error = new Error(`There is a model with this user`)
      error.code = 401
      error.name = 'deleting user'
      throw error
    }
    const machineItem = await Machine.findOne({
      user: _id
    })
    if (machineItem) {
      const error = new Error(`There is a machine with this user`)
      error.code = 401
      error.name = 'deleting user'
      throw error
    }
    const issueItem = await Issue.findOne({
      user: _id
    })
    if (issueItem) {
      const error = new Error(`There is a issue with this user`)
      error.code = 401
      error.name = 'deleting user'
      throw error
    }
    const defectItem = await Defect.findOne({
      user: _id
    })
    if (defectItem) {
      const error = new Error(`There is a defect with this user`)
      error.code = 401
      error.name = 'deleting user'
      throw error
    }
    const programItem = await Program.findOne({
      user: _id
    })
    if (programItem) {
      const error = new Error(`There is a program with this user`)
      error.code = 401
      error.name = 'deleting use'
      throw error
    }
    const profileItem = await Profile.findOne({
      user: _id
    })
    if (profileItem) {
      const error = new Error(`There is a profile with this user`)
      error.code = 401
      error.name = 'deleting user'
      throw error
    }
    const materialItem = await Material.findOne({
      user: _id
    })
    if (materialItem) {
      const error = new Error(`There is a material with this user`)
      error.code = 401
      error.name = 'deleting user'
      throw error
    }
    const shotlItem = await Shot.findOne({
      user: _id
    })
    if (shotlItem) {
      const error = new Error(`There is a shot with this user`)
      error.code = 401
      error.name = 'deleting user'
      throw error
    }
    const userlItem = await User.findOne({
      user: _id
    })
    if (userlItem) {
      const error = new Error(`There is a user with this user`)
      error.code = 401
      error.name = 'deleting user'
    }
    const userId = await User.findOne(
      { _id: user, active: true, level: '1' },
      {
        password: 0,
        level: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
        user: 0,
        _id: 0
      }
    )
    if (!userId) {
      const error = new Error('No user found')
      error.code = '401'
      throw error
    }
    if (userId._id === _id) {
      const error = new Error('delete yourself is not allowed')
      error.code = '401'
      throw error
    }

    const item = await User.findByIdAndDelete(_id).select({
      number: 0,
      level: 0,
      password: 0,
      active: 0,
      user: 0,
      createdAt: 0,
      updatedAt: 0
    })
    if (!item) {
      const error = new Error('No item found')
      error.name = 'deleting user'
      error.code = 401
      throw error
    }

    return { _id: item._id }
  },
  deleteProgram: async function ({ _id, user }) {
    if (!_id || !user) {
      const error = new Error('invalid deleting')
      error.code = 401
      error.name = 'deleting program'
      throw error
    }
    const productionItem = await Production.findOne(
      {
        program: _id
      },
      {
        dates: 0,
        shift: 0,
        real: 0,
        ng: 0,
        ok: 0,
        plan: 0,
        prod: 0,
        cycles: 0,
        ptime: 0,
        wtime: 0,
        dtime: 0,
        avail: 0,
        perf: 0,
        qual: 0,
        oee: 0,
        report: 0,
        molde: 0,
        model: 0,
        program: 0
      }
    )
    if (productionItem) {
      const error = new Error(
        `There is a report with this program at ${productionItem.date}`
      )
      error.code = 401
      error.name = 'deleting program'
      throw error
    }
    const userId = await User.findOne(
      { _id: user, active: true, level: '1' },
      {
        password: 0,
        level: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
        user: 0,
        _id: 0
      }
    )
    if (!userId) {
      const error = new Error('No user found')
      error.code = '401'
      throw error
    }

    const item = await Program.findByIdAndDelete(_id).select({
      machine: 0,
      molde: 0,
      model: 0,
      time: 0,
      cycles: 0,
      capacity: 0,
      user: 0,
      createdAt: 0,
      updatedAt: 0
    })
    if (!item) {
      const error = new Error('No item found')
      error.name = 'deleting program'
      error.code = 401
      throw error
    }

    return { _id: item._id }
  },
  deleteMolde: async function ({ _id, user }) {
    if (!_id || !user) {
      const error = new Error('invalid deleting')
      error.code = 401
      error.name = 'deleting molde'
      throw error
    }
    const productionItem = await Production.findOne(
      {
        molde: _id
      },
      {
        dates: 0,
        shift: 0,
        real: 0,
        ng: 0,
        ok: 0,
        plan: 0,
        prod: 0,
        cycles: 0,
        ptime: 0,
        wtime: 0,
        dtime: 0,
        avail: 0,
        perf: 0,
        qual: 0,
        oee: 0,
        report: 0,
        molde: 0,
        model: 0,
        program: 0
      }
    )
    if (productionItem) {
      const error = new Error(
        `There is a report with this molde at ${productionItem.date}`
      )
      error.code = 401
      error.name = 'deleting molde'
      throw error
    }
    const ngItem = await Ng.findOne(
      {
        molde: _id
      },
      {
        dates: 0,
        shift: 0,
        report: 0,
        defect: 0,
        model: 0,
        molde: 0,
        pieces: 0
      }
    )
    if (ngItem) {
      const error = new Error(
        `There is a defect report with this molde at ${ngItem.date}`
      )
      error.code = 401
      error.name = 'deleting molde'
      throw error
    }
    const programItem = await Program.findOne(
      {
        molde: _id
      },
      {
        machine: 0,
        molde: 0,
        model: 0,
        time: 0,
        cycles: 0,
        capacity: 0,
        user: 0,
        createdAt: 0,
        updatedAt: 0
      }
    )
    if (programItem) {
      const error = new Error(`There is a program with this molde`)
      error.code = 401
      error.name = 'deleting molde'
      throw error
    }
    const shotItem = await Shot.findOne(
      {
        molde: _id
      },
      {
        molde: 0,
        shift: 0,
        comments: 0,
        active: 0,
        end: 0,
        shiftEnd: 0,
        quantity: 0,
        user: 0,
        createdAt: 0,
        updatedAt: 0
      }
    )
    if (shotItem) {
      const error = new Error(
        `There is a shot with this molde at ${shotItem.date}`
      )
      error.code = 401
      error.name = 'deleting molde'
      throw error
    }
    const userId = await User.findOne(
      { _id: user, active: true, level: '1' },
      {
        password: 0,
        level: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
        user: 0,
        _id: 0
      }
    )
    if (!userId) {
      const error = new Error('No user found')
      error.code = '401'
      throw error
    }

    const item = await Molde.findByIdAndDelete(_id).select({
      machine: 0,
      molde: 0,
      model: 0,
      time: 0,
      cycles: 0,
      capacity: 0,
      user: 0,
      createdAt: 0,
      updatedAt: 0
    })
    if (!item) {
      const error = new Error('No item found')
      error.name = 'deleting molde'
      error.code = 401
      throw error
    }

    return { _id: item._id }
  },
  deleteModel: async function ({ _id, user }) {
    if (!_id || !user) {
      const error = new Error('invalid deleting')
      error.code = 401
      error.name = 'deleting model'
      throw error
    }
    const productionItem = await Production.findOne(
      {
        model: _id
      },
      {
        dates: 0,
        shift: 0,
        real: 0,
        ng: 0,
        ok: 0,
        plan: 0,
        prod: 0,
        cycles: 0,
        ptime: 0,
        wtime: 0,
        dtime: 0,
        avail: 0,
        perf: 0,
        qual: 0,
        oee: 0,
        report: 0,
        molde: 0,
        model: 0,
        program: 0
      }
    )
    if (productionItem) {
      const error = new Error(
        `There is a report with this model at ${productionItem.date}`
      )
      error.code = 401
      error.name = 'deleting model'
      throw error
    }
    const ngItem = await Ng.findOne(
      {
        molde: _id
      },
      {
        dates: 0,
        shift: 0,
        report: 0,
        defect: 0,
        model: 0,
        molde: 0,
        pieces: 0
      }
    )
    if (ngItem) {
      const error = new Error(
        `There is a defect report with this model at ${ngItem.date}`
      )
      error.code = 401
      error.name = 'deleting model'
      throw error
    }
    const programItem = await Program.findOne(
      {
        model: _id
      },
      {
        machine: 0,
        molde: 0,
        model: 0,
        time: 0,
        cycles: 0,
        capacity: 0,
        user: 0,
        createdAt: 0,
        updatedAt: 0
      }
    )
    if (programItem) {
      const error = new Error(`There is a program with this model`)
      error.code = 401
      error.name = 'deleting model'
      throw error
    }

    const userId = await User.findOne(
      { _id: user, active: true, level: '1' },
      {
        password: 0,
        level: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
        user: 0,
        _id: 0
      }
    )
    if (!userId) {
      const error = new Error('No user found or not valid')
      error.code = '401'
      throw error
    }

    const item = await Model.findByIdAndDelete(_id).select({
      machine: 0,
      molde: 0,
      model: 0,
      time: 0,
      cycles: 0,
      capacity: 0,
      user: 0,
      createdAt: 0,
      updatedAt: 0
    })
    if (!item) {
      const error = new Error('No item found')
      error.name = 'deleting model'
      error.code = 401
      throw error
    }

    return { _id: item._id }
  },
  deleteMachine: async function ({ _id, user }) {
    if (!_id || !user) {
      const error = new Error('invalid deleting')
      error.code = 401
      error.name = 'deleting machine'
      throw error
    }
    const reportItem = await Report.findOne(
      {
        machine: _id
      },
      {
        dates: 0,
        machine: 0,
        shift: 0,
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
      }
    )
    if (reportItem) {
      const error = new Error(
        `There is a report with this machine at ${reportItem.date}`
      )
      error.code = 401
      error.name = 'deleting machine'
      throw error
    }
    const programItem = await Program.findOne(
      {
        machine: _id
      },
      {
        machine: 0,
        molde: 0,
        model: 0,
        time: 0,
        cycles: 0,
        capacity: 0,
        user: 0,
        createdAt: 0,
        updatedAt: 0
      }
    )
    if (programItem) {
      const error = new Error(`There is a program with this machine`)
      error.code = 401
      error.name = 'deleting machine'
      throw error
    }

    const userId = await User.findOne(
      { _id: user, active: true, level: '1' },
      {
        password: 0,
        level: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
        user: 0,
        _id: 0
      }
    )
    if (!userId) {
      const error = new Error('No user found or not valid')
      error.code = '401'
      throw error
    }

    const item = await Machine.findByIdAndDelete(_id).select({
      machine: 0,
      molde: 0,
      model: 0,
      time: 0,
      cycles: 0,
      capacity: 0,
      user: 0,
      createdAt: 0,
      updatedAt: 0
    })
    if (!item) {
      const error = new Error('No item found')
      error.name = 'deleting machine'
      error.code = 401
      throw error
    }

    return { _id: item._id }
  },
  deleteShot: async function ({ _id, user }) {
    if (!_id || !user) {
      const error = new Error('invalid deleting')
      error.code = 401
      error.name = 'deleting shot'
      throw error
    }
    const userId = await User.findOne(
      { _id: user, active: true, level: '1' },
      {
        password: 0,
        level: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
        user: 0,
        _id: 0
      }
    )
    if (!userId) {
      const error = new Error('No user found or not valid')
      error.code = '401'
      throw error
    }

    const item = await Shot.findByIdAndDelete(_id).select({
      molde: 0,
      date: 0,
      shift: 0,
      comments: 0,
      active: 0,
      end: 0,
      shiftEnd: 0,
      quantity: 0,
      user: 0,
      createdAt: 0,
      updatedAt: 0
    })
    if (!item) {
      const error = new Error('No item found')
      error.name = 'deleting shot'
      error.code = 401
      throw error
    }

    return { _id: item._id }
  },
  deleteReport: async function ({ _id, user }) {
    if (!_id || !user) {
      const error = new Error('invalid deleting')
      error.code = 401
      error.name = 'deleting report'
      throw error
    }
    const userId = await User.findOne(
      { _id: user, active: true, level: '1' },
      {
        password: 0,
        level: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
        user: 0,
        _id: 0
      }
    )
    if (!userId) {
      const error = new Error('No user found or not valid')
      error.code = '401'
      throw error
    }

    const item = await Report.findByIdAndDelete(_id).select({
      dates: 0,
      machine: 0,
      shift: 0,
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
    })
    if (!item) {
      const error = new Error('No item found')
      error.name = 'deleting shot'
      error.code = 401
      throw error
    }

    await Production.deleteMany({ report: item._id })
    await Resine.deleteMany({ report: item._id })
    await Downtime.deleteMany({ report: item._id })
    await Ng.deleteMany({ report: item._id })

    return { _id: item._id }
  }
}

export default graphqlResolver
