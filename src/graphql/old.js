let ngrep = 0
let dtrep = 0
let resrep = 0
let dosprod = 0
let trepo = 0
const programs = await Program.find()
const moldes = await Molde.find()
const total = await Old.find()
total.map(
  ({
    _id,
    reportDate,
    shift,
    createdAt,
    updatedAt,
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
    production,
    downtimeDetail,
    defects,
    resines,
    comments,
    workers
  }) => {
    const dates = allDate(reportDate)
    // if (resines.length > 0) {
    //   resines.map((resine) => {
    //     const resines_input = {
    //       report: _id,
    //       resine: resine._id,
    //       purge: resine.purge
    //     }
    //     resrep++
    //     const newResine = new Resine(resines_input)
    //     newResine.save()
    //   })
    // }
    // if (downtimeDetail.length > 0) {
    //   downtimeDetail.map((dt) => {
    //     const downtime_input = {
    //       report: _id,
    //       issue: dt.issueId,
    //       mins: dt.mins
    //     }
    //     const newDowntime = new Downtime(downtime_input)
    //     newDowntime.save()
    //     dtrep++
    //   })
    // }
    // if (defects.length > 0) {
    //   defects.map((defect) => {
    //     const ng_input = {
    //       report: _id,
    //       defect: defect._id,
    //       model: defect.partNumber,
    //       molde: defect.molde,
    //       pieces: defect.defectPcs
    //     }
    //     ngrep++
    //     const newNg = new Ng(ng_input)
    //     newNg.save()
    //   })
    // }
    // if (production.length > 1) {
    //   dosprod++
    // }
    let te_prod = []
    if (!TProd) {
      production.map((prod) => {
        const program = prod.program.toString()
        const productivity = programs.find((p) => p._id.toString() === program)
        const item = Math.round(productivity.capacity * prod.wtime)
        te_prod = [...te_prod, item]
      })
    }
    let te_cycles = []
    production.map((prods) => {
      const cycles = prods.cycles
      const program = prods.program.toString()
      const productivity = programs.find((p) => p._id.toString() === program)
      const item = Math.round(productivity.capacity * prods.wtime)
      if (!cycles) {
        const molding = prods.molde.toString()
        const cavities = moldes.find((m) => m._id.toString() === molding)
          .cavities
        const realcycles = prods.real / cavities
        te_cycles = [...te_cycles, realcycles]
        // const production_input = {
        //   report: _id,
        //   program: program,
        //   molde: prods.molde,
        //   model: prods.partNumber,
        //   real: prods.real,
        //   ng: prods.ng,
        //   ok: prods.ok,
        //   plan: prods.plan,
        //   tprod: item,
        //   cycles: realcycles,
        //   ptime: parseInt(
        //     parseFloat(prods.wtime) + parseFloat(prods.dtime)
        //   ),
        //   wtime: prods.wtime,
        //   dtime: prods.dtime,
        //   avail: prods.availability,
        //   perf: prods.performance,
        //   qual: prods.quality,
        //   oee: prods.oee
        // }
        // const newProduction = new Production(production_input)
        // newProduction.save()
      } else {
        te_cycles = [...te_cycles, cycles]
        // const production_input = {
        //   report: _id,
        //   program: program,
        //   molde: prods.molde,
        //   model: prods.partNumber,
        //   real: prods.real,
        //   ng: prods.ng,
        //   ok: prods.ok,
        //   plan: prods.plan,
        //   tprod: item,
        //   cycles: prods.cycles,
        //   ptime: parseInt(
        //     parseFloat(prods.wtime) + parseFloat(prods.dtime)
        //   ),
        //   wtime: prods.wtime,
        //   dtime: prods.dtime,
        //   avail: prods.availability,
        //   perf: prods.performance,
        //   qual: prods.quality,
        //   oee: prods.oee
        // }
        // const newProduction = new Production(production_input)
        // newProduction.save()
      }
    })
    if (!workers) {
      if (!updatedAt) {
        if (!comments) {
          const reports_input = {
            _id,
            date: stringDate(reportDate),
            shift,
            machine,
            real: TReal,
            ng: TNG,
            ok: TOK,
            plan: TPlan,
            tprod: TProd || te_prod.reduce((a, b) => a + b, 0),
            cycles: te_cycles.reduce((a, b) => a + b, 0),
            ptime: parseInt(parseFloat(TWTime) + parseFloat(TDTime)),
            wtime: TWTime,
            dtime: TDTime,
            avail: TAvailability,
            perf: TPerformance,
            qual: TQuality,
            oee: TOEE,
            user: userId,
            dates,
            createdAt
          }
          const newReport = new Report(reports_input)
          newReport.save()
          trepo++
        } else {
          const reports_input = {
            _id,
            date: stringDate(reportDate),
            shift,
            machine,
            real: TReal,
            ng: TNG,
            ok: TOK,
            plan: TPlan,
            tprod: TProd || te_prod.reduce((a, b) => a + b, 0),
            cycles: te_cycles.reduce((a, b) => a + b, 0),
            ptime: parseInt(parseFloat(TWTime) + parseFloat(TDTime)),
            wtime: TWTime,
            dtime: TDTime,
            avail: TAvailability,
            perf: TPerformance,
            qual: TQuality,
            oee: TOEE,
            comments: comments,
            user: userId,
            dates,
            createdAt
          }
          const newReport = new Report(reports_input)
          newReport.save()
          trepo++
        }
      } else {
        if (!comments) {
          const reports_input = {
            _id,
            date: stringDate(reportDate),
            shift,
            machine,
            real: TReal,
            ng: TNG,
            ok: TOK,
            plan: TPlan,
            tprod: TProd || te_prod.reduce((a, b) => a + b, 0),
            cycles: te_cycles.reduce((a, b) => a + b, 0),
            ptime: parseInt(parseFloat(TWTime) + parseFloat(TDTime)),
            wtime: TWTime,
            dtime: TDTime,
            avail: TAvailability,
            perf: TPerformance,
            qual: TQuality,
            oee: TOEE,
            user: userId,
            dates,
            createdAt,
            updatedAt
          }
          const newReport = new Report(reports_input)
          newReport.save()
          trepo++
        } else {
          const reports_input = {
            _id,
            date: stringDate(reportDate),
            shift,
            machine,
            real: TReal,
            ng: TNG,
            ok: TOK,
            plan: TPlan,
            tprod: TProd || te_prod.reduce((a, b) => a + b, 0),
            cycles: te_cycles.reduce((a, b) => a + b, 0),
            ptime: parseInt(parseFloat(TWTime) + parseFloat(TDTime)),
            wtime: TWTime,
            dtime: TDTime,
            avail: TAvailability,
            perf: TPerformance,
            qual: TQuality,
            oee: TOEE,
            comments: comments,
            user: userId,
            dates,
            createdAt,
            updatedAt
          }
          const newReport = new Report(reports_input)
          newReport.save()
          trepo++
        }
      }
    } else {
      if (!updatedAt) {
        if (!comments) {
          const reports_input = {
            _id,
            date: stringDate(reportDate),
            shift,
            machine,
            real: TReal,
            ng: TNG,
            ok: TOK,
            plan: TPlan,
            tprod: TProd || te_prod.reduce((a, b) => a + b, 0),
            cycles: te_cycles.reduce((a, b) => a + b, 0),
            ptime: parseInt(parseFloat(TWTime) + parseFloat(TDTime)),
            wtime: TWTime,
            dtime: TDTime,
            avail: TAvailability,
            perf: TPerformance,
            qual: TQuality,
            oee: TOEE,
            team: workers.team,
            oper: workers.operator,
            insp: workers.inspector,
            user: userId,
            dates,
            createdAt
          }
          const newReport = new Report(reports_input)
          newReport.save()
          trepo++
        } else {
          const reports_input = {
            _id,
            date: stringDate(reportDate),
            shift,
            machine,
            real: TReal,
            ng: TNG,
            ok: TOK,
            plan: TPlan,
            tprod: TProd || te_prod.reduce((a, b) => a + b, 0),
            cycles: te_cycles.reduce((a, b) => a + b, 0),
            ptime: parseInt(parseFloat(TWTime) + parseFloat(TDTime)),
            wtime: TWTime,
            dtime: TDTime,
            avail: TAvailability,
            perf: TPerformance,
            qual: TQuality,
            oee: TOEE,
            comments: comments,
            team: workers.team,
            oper: workers.operator,
            insp: workers.inspector,
            user: userId,
            dates,
            createdAt
          }
          const newReport = new Report(reports_input)
          newReport.save()
          trepo++
        }
      } else {
        if (!comments) {
          const reports_input = {
            _id,
            date: stringDate(reportDate),
            shift,
            machine,
            real: TReal,
            ng: TNG,
            ok: TOK,
            plan: TPlan,
            tprod: TProd || te_prod.reduce((a, b) => a + b, 0),
            cycles: te_cycles.reduce((a, b) => a + b, 0),
            ptime: parseInt(parseFloat(TWTime) + parseFloat(TDTime)),
            wtime: TWTime,
            dtime: TDTime,
            avail: TAvailability,
            perf: TPerformance,
            qual: TQuality,
            oee: TOEE,
            team: workers.team,
            oper: workers.operator,
            insp: workers.inspector,
            user: userId,
            dates,
            createdAt,
            updatedAt
          }
          const newReport = new Report(reports_input)
          newReport.save()
          trepo++
        } else {
          const reports_input = {
            _id,
            date: stringDate(reportDate),
            shift,
            machine,
            real: TReal,
            ng: TNG,
            ok: TOK,
            plan: TPlan,
            tprod: TProd || te_prod.reduce((a, b) => a + b, 0),
            cycles: te_cycles.reduce((a, b) => a + b, 0),
            ptime: parseInt(parseFloat(TWTime) + parseFloat(TDTime)),
            wtime: TWTime,
            dtime: TDTime,
            avail: TAvailability,
            perf: TPerformance,
            qual: TQuality,
            oee: TOEE,
            comments: comments,
            team: workers.team,
            oper: workers.operator,
            insp: workers.inspector,
            user: userId,
            dates,
            createdAt,
            updatedAt
          }
          const newReport = new Report(reports_input)
          newReport.save()
          trepo++
        }
      }
    }
  }
)

let ngrep = 0
let dtrep = 0
let resrep = 0
let dosprod = 0
let trepo = 0
let cerocycles = 0
const programs = await Program.find()
const moldes = await Molde.find()
const total = await Old.find()
total.map(
  ({
    _id,
    reportDate,
    shift,
    createdAt,
    updatedAt,
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
    production,
    downtimeDetail,
    defects,
    resines,
    comments,
    workers
  }) => {
    const dates = allDate(reportDate)
    if (resines.length > 0) {
      resines.map((resine) => {
        const resines_input = {
          report: _id,
          resine: resine._id,
          purge: resine.purge
        }
        resrep++
        const newResine = new Resine(resines_input)
        newResine.save()
      })
    }
    if (downtimeDetail.length > 0) {
      downtimeDetail.map((dt) => {
        const downtime_input = {
          report: _id,
          issue: dt.issueId,
          mins: dt.mins
        }
        const newDowntime = new Downtime(downtime_input)
        newDowntime.save()
        dtrep++
      })
    }
    if (defects.length > 0) {
      defects.map((defect) => {
        const ng_input = {
          report: _id,
          defect: defect._id,
          model: defect.partNumber,
          molde: defect.molde,
          pieces: defect.defectPcs
        }
        ngrep++
        const newNg = new Ng(ng_input)
        newNg.save()
      })
    }
    if (production.length > 1) {
      dosprod++
    }
    let te_prod = []
    if (!TProd) {
      production.map((prod) => {
        const program = prod.program.toString()
        const productivity = programs.find((p) => p._id.toString() === program)
        const item = Math.round(productivity.capacity * prod.wtime)
        te_prod = [...te_prod, item]
      })
    }
    let te_cycles = []
    production.map((prods) => {
      const cycles = prods.cycles || 0
      const program = prods.program.toString()
      const productivity = programs.find((p) => p._id.toString() === program)
      const item = Math.round(productivity.capacity * prods.wtime)
      if (cycles === 0) {
        cerocycles++
      }
      // te_cycles = [...te_cycles, cycles]
      const production_input = {
        report: _id,
        program: program,
        molde: prods.molde,
        model: prods.partNumber,
        real: prods.real,
        ng: prods.ng,
        ok: prods.ok,
        plan: prods.plan,
        tprod: item,
        cycles: cycles,
        ptime: parseInt(parseFloat(prods.wtime) + parseFloat(prods.dtime)),
        wtime: prods.wtime,
        dtime: prods.dtime,
        avail: prods.availability,
        perf: prods.performance,
        qual: prods.quality,
        oee: prods.oee
      }
      const newProduction = new Production(production_input)
      newProduction.save()

      if (!cycles) {
        const molding = prods.molde.toString()
        const cavities = moldes.find((m) => m._id.toString() === molding)
          .cavities
        const realcycles = prods.real / cavities
        te_cycles = [...te_cycles, realcycles]
        const production_input = {
          report: _id,
          program: program,
          molde: prods.molde,
          model: prods.partNumber,
          real: prods.real,
          ng: prods.ng,
          ok: prods.ok,
          plan: prods.plan,
          tprod: item,
          cycles: realcycles,
          ptime: parseInt(parseFloat(prods.wtime) + parseFloat(prods.dtime)),
          wtime: prods.wtime,
          dtime: prods.dtime,
          avail: prods.availability,
          perf: prods.performance,
          qual: prods.quality,
          oee: prods.oee
        }
        const newProduction = new Production(production_input)
        newProduction.save()
      } else {
        te_cycles = [...te_cycles, cycles]
        const production_input = {
          report: _id,
          program: program,
          molde: prods.molde,
          model: prods.partNumber,
          real: prods.real,
          ng: prods.ng,
          ok: prods.ok,
          plan: prods.plan,
          tprod: item,
          cycles: prods.cycles,
          ptime: parseInt(parseFloat(prods.wtime) + parseFloat(prods.dtime)),
          wtime: prods.wtime,
          dtime: prods.dtime,
          avail: prods.availability,
          perf: prods.performance,
          qual: prods.quality,
          oee: prods.oee
        }
        const newProduction = new Production(production_input)
        newProduction.save()
      }
    })
    if (!workers) {
      if (!updatedAt) {
        if (!comments) {
          const reports_input = {
            _id,
            date: stringDate(reportDate),
            shift,
            machine,
            real: TReal,
            ng: TNG,
            ok: TOK,
            plan: TPlan,
            tprod: TProd || te_prod.reduce((a, b) => a + b, 0),
            cycles: te_cycles.reduce((a, b) => a + b, 0),
            ptime: parseInt(parseFloat(TWTime) + parseFloat(TDTime)),
            wtime: TWTime,
            dtime: TDTime,
            avail: TAvailability,
            perf: TPerformance,
            qual: TQuality,
            oee: TOEE,
            user: userId,
            dates,
            createdAt
          }
          const newReport = new Report(reports_input)
          newReport.save()
          trepo++
        } else {
          const reports_input = {
            _id,
            date: stringDate(reportDate),
            shift,
            machine,
            real: TReal,
            ng: TNG,
            ok: TOK,
            plan: TPlan,
            tprod: TProd || te_prod.reduce((a, b) => a + b, 0),
            cycles: te_cycles.reduce((a, b) => a + b, 0),
            ptime: parseInt(parseFloat(TWTime) + parseFloat(TDTime)),
            wtime: TWTime,
            dtime: TDTime,
            avail: TAvailability,
            perf: TPerformance,
            qual: TQuality,
            oee: TOEE,
            comments: comments,
            user: userId,
            dates,
            createdAt
          }
          const newReport = new Report(reports_input)
          newReport.save()
          trepo++
        }
      } else {
        if (!comments) {
          const reports_input = {
            _id,
            date: stringDate(reportDate),
            shift,
            machine,
            real: TReal,
            ng: TNG,
            ok: TOK,
            plan: TPlan,
            tprod: TProd || te_prod.reduce((a, b) => a + b, 0),
            cycles: te_cycles.reduce((a, b) => a + b, 0),
            ptime: parseInt(parseFloat(TWTime) + parseFloat(TDTime)),
            wtime: TWTime,
            dtime: TDTime,
            avail: TAvailability,
            perf: TPerformance,
            qual: TQuality,
            oee: TOEE,
            user: userId,
            dates,
            createdAt,
            updatedAt
          }
          const newReport = new Report(reports_input)
          newReport.save()
          trepo++
        } else {
          const reports_input = {
            _id,
            date: stringDate(reportDate),
            shift,
            machine,
            real: TReal,
            ng: TNG,
            ok: TOK,
            plan: TPlan,
            tprod: TProd || te_prod.reduce((a, b) => a + b, 0),
            cycles: te_cycles.reduce((a, b) => a + b, 0),
            ptime: parseInt(parseFloat(TWTime) + parseFloat(TDTime)),
            wtime: TWTime,
            dtime: TDTime,
            avail: TAvailability,
            perf: TPerformance,
            qual: TQuality,
            oee: TOEE,
            comments: comments,
            user: userId,
            dates,
            createdAt,
            updatedAt
          }
          const newReport = new Report(reports_input)
          newReport.save()
          trepo++
        }
      }
    } else {
      if (!updatedAt) {
        if (!comments) {
          const reports_input = {
            _id,
            date: stringDate(reportDate),
            shift,
            machine,
            real: TReal,
            ng: TNG,
            ok: TOK,
            plan: TPlan,
            tprod: TProd || te_prod.reduce((a, b) => a + b, 0),
            cycles: te_cycles.reduce((a, b) => a + b, 0),
            ptime: parseInt(parseFloat(TWTime) + parseFloat(TDTime)),
            wtime: TWTime,
            dtime: TDTime,
            avail: TAvailability,
            perf: TPerformance,
            qual: TQuality,
            oee: TOEE,
            team: workers.team,
            oper: workers.operator,
            insp: workers.inspector,
            user: userId,
            dates,
            createdAt
          }
          const newReport = new Report(reports_input)
          newReport.save()
          trepo++
        } else {
          const reports_input = {
            _id,
            date: stringDate(reportDate),
            shift,
            machine,
            real: TReal,
            ng: TNG,
            ok: TOK,
            plan: TPlan,
            tprod: TProd || te_prod.reduce((a, b) => a + b, 0),
            cycles: te_cycles.reduce((a, b) => a + b, 0),
            ptime: parseInt(parseFloat(TWTime) + parseFloat(TDTime)),
            wtime: TWTime,
            dtime: TDTime,
            avail: TAvailability,
            perf: TPerformance,
            qual: TQuality,
            oee: TOEE,
            comments: comments,
            team: workers.team,
            oper: workers.operator,
            insp: workers.inspector,
            user: userId,
            dates,
            createdAt
          }
          const newReport = new Report(reports_input)
          newReport.save()
          trepo++
        }
      } else {
        if (!comments) {
          const reports_input = {
            _id,
            date: stringDate(reportDate),
            shift,
            machine,
            real: TReal,
            ng: TNG,
            ok: TOK,
            plan: TPlan,
            tprod: TProd || te_prod.reduce((a, b) => a + b, 0),
            cycles: te_cycles.reduce((a, b) => a + b, 0),
            ptime: parseInt(parseFloat(TWTime) + parseFloat(TDTime)),
            wtime: TWTime,
            dtime: TDTime,
            avail: TAvailability,
            perf: TPerformance,
            qual: TQuality,
            oee: TOEE,
            team: workers.team,
            oper: workers.operator,
            insp: workers.inspector,
            user: userId,
            dates,
            createdAt,
            updatedAt
          }
          const newReport = new Report(reports_input)
          newReport.save()
          trepo++
        } else {
          const reports_input = {
            _id,
            date: stringDate(reportDate),
            shift,
            machine,
            real: TReal,
            ng: TNG,
            ok: TOK,
            plan: TPlan,
            tprod: TProd || te_prod.reduce((a, b) => a + b, 0),
            cycles: te_cycles.reduce((a, b) => a + b, 0),
            ptime: parseInt(parseFloat(TWTime) + parseFloat(TDTime)),
            wtime: TWTime,
            dtime: TDTime,
            avail: TAvailability,
            perf: TPerformance,
            qual: TQuality,
            oee: TOEE,
            comments: comments,
            team: workers.team,
            oper: workers.operator,
            insp: workers.inspector,
            user: userId,
            dates,
            createdAt,
            updatedAt
          }
          const newReport = new Report(reports_input)
          newReport.save()
          trepo++
        }
      }
    }
  }
)
console.log(
  'ngood:',
  ngrep,
  'downtime:',
  dtrep,
  'resines:',
  resrep,
  'dobles:',
  dosprod,
  'reports:',
  trepo,
  'cerocycles :',
  cerocycles
)
