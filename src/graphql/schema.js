import { buildSchema } from 'graphql'

module.exports = buildSchema(`

    scalar Decimal
    scalar Date

    type RootQuery {
        machines(page: Int, add: Int): MachinesData!
        moldes(page: Int, add: Int): MoldesData!
        models(page: Int, add: Int): ModelsData!
        programs(page: Int, add: Int): ProgramsData!
        materials(page: Int, add: Int): MaterialsData!
        issues(page: Int, add: Int): IssuesData!
        defects(page: Int, add: Int): DefectsData!
        shots(page: Int, add: Int): ShotsData!
        profiles(page: Int, add: Int): ProfilesData!
        users(page: Int, add: Int): UsersData!
        reports(page: Int, add: Int): ReportsData!

        updateMachines: Hola
        updateMoldes: Hola
        updateModels: Hola
        updatePrograms: Hola
        updateMaterials: Hola
        updateIssues: Hola
        updateDefects: Hola
        updateShots: Hola
        updateProfiles: Hola
        updateUsers: Hola
        extractResines: Extracted
        extractDowntimes: Extracted
        extractNgs: Extracted
        extractProductions: Extracted
        extractReports: Extracted
    }

    type Hola{
        hola: String
    }

    type Extracted{
        total: Int
    }

    type Molde {
        _id: ID!
        number: String
        serial: String
        cavities: Int
        lifecycles: Int
        percent: Decimal
        tcycles: Int
        shot: Int
        quantity: Int
        active: Boolean
        user: String
        createdAt: Date
        updatedAt: Date
    }

    type MoldesData{
        total: Int
        items: [Molde!]
    }

    type Machine {
        _id: ID!
        number: String!
        serial: String!
        closingForce: Int!
        spindleDiameter: Int!
        user: String!
        createdAt: Date!
        updatedAt: Date!
    }

    type MachinesData{
        total: Int
        items: [Machine!]
    }

    type Model {
        _id: ID!
        number: String!
        name: String!
        family: String!
        user: String!
        createdAt: Date!
        updatedAt: Date
    }

    type ModelsData{
        total: Int
        items: [Model!]
    }

    type Program {
        _id: ID!
        machine: Machine!
        molde: Molde!
        model: Model!
        time: Decimal!
        cycles: Int!
        capacity: Int!
        user: String!
        createdAt: Date!
        updatedAt: Date
    }

    type ProgramsData{
        total: Int
        items: [Program!]
    }

    type Material{
        _id: ID!
        number: String!
        manufacturer: String!
        description: String!
        color: String!
        acronym: String!
        identification: String!
        type: String!
        unit: String!
        user: String!
        createdAt: Date!
        updatedAt: Date
    }

    type MaterialsData{
        total: Int
        items: [Material!]
    }

    type Issue {
        _id: ID!
        name: String!
        code: String!
        user: String!
        createdAt: Date!
        updatedAt: Date
    }

    type IssuesData{
        total: Int
        items: [Issue!]
    }

    type Defect {
        _id: ID!
        name: String!
        code: String!
        injection: Boolean!
        user: String!
        createdAt: Date!
        updatedAt: Date
    }

    type DefectsData{
        total: Int
        items: [Defect!]
    }
    

    type Shot{
        _id: ID!
        molde: String!
        date: String!
        shift: String!
        quantity: Int
        end: String
        shiftEnd: String
        active: Boolean!
        comments: String
        user: String!
        createdAt: Date!
        updatedAt: Date
    }

    type ShotsData{
        total: Int
        items: [Shot!]
    }

    type Profile {
        _id: ID!
        number: String!
        firstname: String!
        lastname: String!
        gender: String!
        entry: String!
        department: String!
        area: String!
        team: String!
        position: String!
        active: Boolean!
        createdAt: Date!
        updatedAt: Date
        user: String!
        picture_URL: String
    }

    type ProfilesData{
        total: Int
        items: [Profile!]
    }

    type User {
        _id: ID!
        name: String!
        password: String!
        level: String!
        active: Boolean!
        user: String!
        createdAt: Date!
        updatedAt: Date
    }

    type UsersData{
        total: Int
        items: [User!]
    }

    type Report {
        _id: ID!
        date: String!
        shift: String!
        machine: String!
        real: Int!
        ng: Int!
        ok: Int!
        plan: Int!
        tprod: Int!
        cycles: Int!
        ptime: Int!
        wtime: Decimal!
        dtime: Decimal!
        avail: Decimal!
        perf: Decimal!
        qual: Decimal!
        oee: Decimal!
        purge: Int
        comments: String
        team: String
        oper: String
        insp: String
        production: [Production]
        downtimes: [Downtime]
        ngs: [Ng]
        resines: [Resine]
        progrs: Int
        user: String!
        dates: Dates!
        createdAt: Date!
        updatedAt: Date
    }

    type Production{
        _id: ID
        program: ID
        molde: ID
        model: ID
        real: Int
        ng: Int
        ok: Int
        plan: Int
        prod: Int
        cycles: Int
        wtime: Decimal
        dtime: Decimal
        avail: Decimal
        perf: Decimal
        qual: Decimal
        oee: Decimal
    }

    type Downtime{
        _id: ID
        issue: ID
        mins: Int
    }

    type Ng{
        _id: ID
        defect: ID
        model: ID
        molde: ID
        pieces: Int
    }

    type Resine{
        _id: ID
        resine: ID
        purge: Int
    }

    type Dates{
        y: String!
        m: String!
        dm: String!
        dw: String!
        w: String!
        dy: String!
        q: String!
    }

    type ReportsData{
        total: Int
        items: [Report!]
    }

    type RootMutation {
        newMolde(input: NewMolde): Molde!
        newMachine(input: NewMachine): Machine!
        newModel(input: NewModel): Model!
        newProgram(input: NewProgram): Program!
        newMaterial(input: NewMaterial): Material!
        newIssue(input: NewIssue): Issue!
        newDefect(input: NewDefect): Defect!
        newShot(input: NewShot): Shot!
        newProfile(input: NewProfile): Profile!
        newUser(input: NewUser): User!
        newReport(input: NewReport): Report!

        updateMolde(input: UpdateMolde): Molde!
        updateMachine(input: UpdateMachine): Machine!
        updateModel(input: UpdateModel): Model!
        updateProgram(input: UpdateProgram): Program!
        updateMaterial(input: UpdateMaterial): Material!
        updateIssue(input: UpdateIssue): Issue!
        updateDefect(input: UpdateDefect): Defect!
        updateShot(input: UpdateShot): Shot!
        updateProfile(input: UpdateProfile): Profile!
        updateUser(input: UpdateUser): User!

        finishShot(_id: ID, input: FinishShot): Shot!
    }

    input NewMolde {
        number: String!
        serial: String!
        cavities: Int!
        lifecycles: Int!
        tcycles: Int!
        shot: Int!
        quantity: Int!
        user: ID!
    }

    input NewMachine {
        number: String!
        serial: String!
        closingForce: Int!
        spindleDiameter: Int!
        user: ID!
    }

    input NewModel {
        number: String!
        name: String!
        family: String!
        user: ID!
    }

    input NewProgram {
        machine: ID!
        molde: ID!
        model: ID!
        time: Decimal!
        cycles: Int!
        capacity: Int!
        user: ID!
    }

    input NewMaterial{
        number: String!
        manufacturer: String!
        description: String!
        color: String!
        acronym: String!
        identification: String!
        type: String!
        unit: String!
        user: ID!
    }

    input NewIssue {
        name: String!
        code: String!
        user: ID!
    }

    input NewDefect {
        name: String!
        code: String!
        injection: Boolean!
        user: ID!
    }

    input NewShot{
        molde: ID!
        date: String!
        shift: String!
        comments: String
        user: ID!
    }

    input FinishShot{
        end: String!
        shiftEnd: String!
        quantity: Int!
    }

    input NewProfile {
        firstname: String!
        lastname: String!
        gender: String!
        entry: String!
        department: String!
        area: String!
        team: String!
        position: String!
        user: ID!
    }

    input NewUser {
        name: String!
        password: String!
        level: String!
        user: ID!
    }

    input NewReport {
        date: String!
        shift: String!
        machine: String!
        real: Int!
        ng: Int!
        ok: Int!
        plan: Int!
        tprod: Int!
        cycles: Int!
        ptime: Int!
        wtime: Decimal!
        dtime: Decimal!
        avail: Decimal!
        perf: Decimal!
        qual: Decimal!
        oee: Decimal!
        purge: Int
        comments: String
        team: String
        oper: String
        insp: String
        production: [ProductionInput]
        downtimes: [DowntimeInput]
        ngs: [NgInput]
        resines: [ResineInput]
        progs: Int!
    }

    input ProductionInput{
        program: ID
        molde: ID
        model: ID
        real: Int
        ng: Int
        ok: Int
        plan: Int
        prod: Int
        cycles: Int
        wtime: Decimal
        dtime: Decimal
        avail: Decimal
        perf: Decimal
        qual: Decimal
        oee: Decimal
    }

    input DowntimeInput{
        issue: ID
        mins: Int
    }

    input NgInput{
        defect: ID
        model: ID
        molde: ID
        pieces: Int
    }

    input ResineInput{
        resine: ID
        purge: Int
    }

    input UpdateMolde {
        number: String
        name: String
        family: String
    }

    input UpdateMachine {
        number: String
        serial: String
        closingForce: Int
        spindleDiameter: Int
    }

    input UpdateModel {
        number: String
        name: String
        family: String
    }

    input UpdateProgram {
        machine: ID
        molde: ID
        model: ID
        time: Decimal
        cycles: Int
        capacity: Int
    }

    input UpdateMaterial{
        number: String
        manufacturer: String
        description: String
        color: String
        acronym: String
        identification: String
        type: String
        unit: String
    }

    input UpdateIssue {
        name: String
        code: String
    }

    input UpdateDefect {
        name: String
        code: String
        injection: Boolean
    }

    input UpdateShot{
        molde: ID
        date: String
        shift: String
        quantity: Int
        end: String
        shiftEnd: String
        active: Boolean
        comments: String
    }

    input UpdateProfile {
        number: String
        firstname: String
        lastname: String
        gender: String
        entry: String
        department: String
        area: String
        team: String
        position: String
        active: Boolean
        picture_URL: String
    }

    input UpdateUser {
        level: String
        active: Boolean
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)
