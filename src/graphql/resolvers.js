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

const graphqlResolver = {
  items: async function () {
    // const profiles = await Profile.find()

    // profiles.map(async ({ _id, entry }) => {
    //   console.log(entry)
    //   // return await Profile.findByIdAndUpdate(
    //   //   _id,
    //   //   { entr: stringDate(date) },
    //   //   { new: true }
    //   // )
    // })
    // const moldes = await Molde.find()
    // const cycles = await Production.find({
    //   cycles: 0
    // })

    // console.log(cycles)
    // cycles.map(async (cycle) => {
    //   // console.log(cycle.program, cycle.report)
    //   const molde = cycle.molde.toString()
    //   const cavities = moldes.find((m) => m._id.toString() === molde).cavities
    //   const cyc = parseInt(cycle.real / cavities)

    //   console.log(cycle._id)
    //   return await Production.findByIdAndUpdate(
    //     cycle._id,
    //     { cycles: cyc },
    //     { new: true }
    //   )
    // })

    // const production = await Production.find().then((prod) => {
    //   return prod.reduce((a, b) => a + b.real, 0)
    // })

    // const old = await Old.find().then((prod) => {
    //   return prod.reduce((a, b) => a + b.TReal, 0)
    // })

    // console.log(production, old)
    // await Profile.updateMany(
    //   {},
    //   {
    //     $rename: {
    //       entr: 'entry'
    //     }
    //   }
    // )
    // await Shot.updateMany(
    //   {},
    //   {
    //     user: '5edde9dfd3888a26048cdd20',
    //     createdAt: '2020-05-27T14:00:00.000+00:00'
    //   }
    // )
    // await Profile.updateMany(
    //   {},
    //   {
    //     entr: '5edde9dfd3888a26048cdd20'
    //   }
    // )
    console.log('ya')
    return { hola: 'hola' }
  },
  old: async function () {
    return { hola: 'hola' }
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
        tcycles: totalCycles,
        percent,
        user: user.name
      }

      return (
        (updatedAt && {
          ...object,
          updatedAt: fullDate(updatedAt)
        }) ||
        object
      )
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
        user: user.name
      }

      return (
        (updatedAt && {
          ...object,
          updatedAt: fullDate(updatedAt)
        }) ||
        object
      )
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
        user: user.name
      }

      return (
        (updatedAt && {
          ...object,
          updatedAt: fullDate(updatedAt)
        }) ||
        object
      )
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
        time: parseFloat(time),
        user: user.name
      }

      return (
        (updatedAt && {
          ...object,
          updatedAt: fullDate(updatedAt)
        }) ||
        object
      )
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
        user: user.name
      }

      return (
        (updatedAt && {
          ...object,
          updatedAt: fullDate(updatedAt)
        }) ||
        object
      )
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
        user: user.name
      }

      return (
        (updatedAt && {
          ...object,
          updatedAt: fullDate(updatedAt)
        }) ||
        object
      )
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
        user: user.name
      }

      return (
        (updatedAt && {
          ...object,
          updatedAt: fullDate(updatedAt)
        }) ||
        object
      )
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
      const { createdAt, updatedAt, user, molde } = item._doc
      const object = {
        ...item._doc,
        createdAt: fullDate(createdAt),
        user: user.name,
        molde: molde.number
      }

      return (
        (updatedAt && {
          ...object,
          updatedAt: fullDate(updatedAt)
        }) ||
        object
      )
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
        user: user.name
      }

      return (
        (updatedAt && {
          ...object,
          updatedAt: fullDate(updatedAt)
        }) ||
        object
      )
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
        user: user.name
      }

      return (
        (updatedAt && {
          ...object,
          updatedAt: fullDate(updatedAt)
        }) ||
        object
      )
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
        user: user.name,
        machine: machine.number,
        dtime: parseFloat(dtime),
        wtime: parseFloat(wtime),
        perf: parseFloat(perf),
        avail: parseFloat(avail),
        qual: parseFloat(qual),
        oee: parseFloat(oee)
      }

      return (
        (updatedAt && {
          ...object,
          updatedAt: fullDate(updatedAt)
        }) ||
        object
      )
    })
    return { total, items }
  },
  newMolde: async function ({ input }) {
    const date = new Date()
    const newItem = new Molde({
      ...input,
      active: true,
      createdAt: zoneDate(date)
    })
    const item = await newItem.save()
    const { createdAt, lifecycles, tcycles, user } = item._doc
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
      percent,
      user: existingUser.name
    }
  },
  newMachine: async function ({ input }) {
    const date = new Date()
    const newItem = new Machine({
      ...input,
      createdAt: zoneDate(date)
    })
    const item = await newItem.save()
    const { createdAt, user } = item._doc

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
    const { createdAt, user } = item._doc

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
    const { createdAt, user, _id } = item._doc

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
    const { createdAt, user } = item._doc

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
    const { createdAt, user } = item._doc

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
    const { createdAt, user } = item._doc

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
    const { createdAt, user, _id } = item._doc

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
    console.log(input)

    const newItem = new Profile({
      ...input,
      active: true,
      number: number,
      createdAt: zoneDate(date)
    })
    const item = await newItem.save()
    const { createdAt, user } = item._doc

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
    const { createdAt, user } = item._doc

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
      user: existingUser.name
    }
  },
  newReport: async function ({ input }) {
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
      dates: allDate(input.date)
    })
    const report = await newItem.save()
    const { _id, createdAt, user } = report._doc

    const production = input.production.map(async (item) => {
      const newProduction = new Production({
        report: _id,
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
      ...item._doc,
      production,
      downtimes,
      ngs,
      resines,
      createdAt: fullDate(createdAt),
      user: existingUser.name
    }
  }
}

export default graphqlResolver
