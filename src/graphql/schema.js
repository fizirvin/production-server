import { buildSchema } from 'graphql'

module.exports = buildSchema(`

    scalar Decimal
    scalar Date

    type RootQuery {
        login(name: String, password: String): AuthData

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
        locations(page: Int, add: Int): LocationsData!
        spares(page: Int, add: Int): SparesData!
        ingoings(page: Int, add: Int): IngoingsData!
        outgoings(page: Int, add: Int): OutgoingsData!
        deleteReport: Hola

        cycles(shot: ID): [Cycles]
        calendarcycles: [Calendar]
        production(today: String, filter: String, period: String, shifts: String): ProductionData

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
        updateReports: Extracted
        extractResines: Extracted
        extractDowntimes: Extracted
        extractNgs: Extracted
        extractProductions: Extracted
        extractReports: Extracted
        updateReportsProd: Extracted

        profilesLabels( team: String ): [ProfileLabelsQuery]
    }

    type ProfileLabelsQuery {
        _id: ID!
        number: String!
        firstname: String!
        lastname: String!
        gender: String!
        team: String!
        position: String!
        active: Boolean!
        picture_URL: String
    }

    type AuthData {
        token: String!
        userId: ID!
        name: String!
    }

    type Calendar{
        _id: String
        molde: String
        items: [CalendarProductions]
    }

    type CalendarProductions{
        _id: String
        date: String
        shift: String
        machine: String
        real: Int
        cycles: Int
        quantity: Int
        status: String
        total: Int
        percent: String
    }

    type Hola{
        hola: String
    }

    type Extracted{
        total: Int
    }

    type ProductionData{
        fields: [Field]
        rows: [RowsData]
    }

    type Field{
        field: String
        value: String
    }

    type RowsData{
        row: String
        data: [Data]
        subData: [SubData]
        second: [Second]
    }

    type Data{
        date: String
        field: String
        value: Decimal
    }

    type SubData{
        row: String
        data: [Data]
    }

    type Second{
        row: String
        data: [Data]
        second: [SubData]
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
        molde: Molde!
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

    type Cycles {
        _id: ID!
        date: String! 
        shift: String! 
        machine: String!  
        real: Int!
        cycles: Int!
        quantity: Int
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
        machine: Machine!
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
        shift: String
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
        date: String
        dates: Dates
    }

    type Downtime{
        _id: ID
        issue: ID
        mins: Int
        shift: String
        date: String
        dates: Dates
    }

    type Ng{
        _id: ID
        defect: ID
        model: ID
        molde: ID
        pieces: Int
        shift: String
        date: String
        dates: Dates
        
    }

    type Resine{
        _id: ID
        resine: ID
        purge: Int
        shift: String
        date: String
        dates: Dates
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

    type Spare{
        _id: ID
        code: String
        name: String
        number: String
        image: String
        optimal: Int
        stock: Int
        price: Decimal
        location: Location
        loCode: String
        user: String!
        createdAt: Date!
        updatedAt: Date
    }

    type SparesData{
        total: Int
        items: [Spare!]
    }

    type Location{
        _id: ID
        code: String
        name: String
        area: String
        user: String!
        createdAt: Date!
        updatedAt: Date
    }

    type LocationsData{
        total: Int
        items: [Location!]
    }

    type Ingoing{
        _id: ID
        date: String
        spare: Spare
        quantity: Int
        origin: String
        provider: String
        price: Decimal
        spCode: String
        user: String!
        createdAt: Date!
        updatedAt: Date
    }

    type IngoingsData{
        total: Int
        items: [Ingoing!]
    }

    type Outgoing{
        _id: ID
        date: String
        shift: String
        team: String
        machine: Machine
        molde: Molde
        operator: Profile
        spare: Spare
        quantity: Int
        origin: String
        image: String
        description: String
        repairman: Profile
        method: String
        user: String!
        createdAt: Date!
        updatedAt: Date
    }

    type OutgoingsData{
        total: Int
        items: [Outgoing!]
    }

    

    type Deleted{
        _id: String
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
        newLocation(input: NewLocation): Location!
        newSpare(input: NewSpare): Spare!
        newIngoing(input: NewIngoing): Ingoing!
        newOutgoing(input: NewOutgoing): Outgoing!

        updateMolde(_id: ID, input: UpdateMolde): Molde!
        updateMachine(_id: ID, input: UpdateMachine): Machine!
        updateModel(_id: ID, input: UpdateModel): Model!
        updateProgram(_id: ID, input: UpdateProgram): Program!
        updateMaterial(_id: ID, input: UpdateMaterial): Material!
        updateIssue(_id: ID, input: UpdateIssue): Issue!
        updateDefect(_id: ID, input: UpdateDefect): Defect!
        updateShot(_id: ID, input: UpdateShot): Shot!
        updateProfile(_id: ID, input: UpdateProfile): Profile!
        updateUser(_id: ID, input: UpdateUser): User!
        updateReport(_id: ID, input: UpdateReport): Report!
        updateLocation(_id: ID, input: UpdateLocation): Location!
        updateSpare(_id: ID, input: UpdateSpare): Spare!
        updateIngoing(_id: ID, input: UpdateIngoing): Ingoing!
        updateOutgoing(_id: ID, input: UpdateOutgoing): Outgoing!


        finishShot(_id: ID, input: FinishShot): Shot!

        deleteMaterial(_id: ID, user: ID): Deleted
        deleteIssue(_id: ID, user: ID): Deleted
        deleteDefect(_id: ID, user: ID): Deleted
        deleteProfile(_id: ID, user: ID): Deleted
        deleteUser(_id: ID, user: ID): Deleted
        deleteProgram(_id: ID, user: ID): Deleted
        deleteMolde(_id: ID, user: ID): Deleted
        deleteModel(_id: ID, user: ID): Deleted
        deleteMachine(_id: ID, user: ID): Deleted
        deleteShot(_id: ID, user: ID): Deleted
        deleteReport(_id: ID, user: ID): Deleted
        deleteLocation(_id: ID, user: ID): Deleted
        deleteSpare(_id: ID, user: ID): Deleted
        deleteIngoing(_id: ID, user: ID): Deleted
        deleteOutgoing(_id: ID, user: ID): Deleted    
    }

    input NewOutgoing {
        date: String
        shift: String
        team: String
        machine: ID
        molde: ID
        operator: ID
        spare: ID
        quantity: Int
        origin: String
        image: String
        description: String
        repairman: ID
        method: String
        user: ID!
    }

    input UpdateOutgoing {
        date: String
        shift: String
        team: String
        machine: ID
        molde: ID
        operator: ID
        spare: ID
        quantity: Int
        origin: String
        image: String
        description: String
        repairman: ID
        method: String
    }

    input NewIngoing {
        date: String
        spare: ID
        quantity: Int
        origin: String
        provider: String
        price: Decimal
        user: ID!
    }

    input UpdateIngoing {
        date: String
        spare: ID
        quantity: Int
        origin: String
        provider: String
        price: Decimal
    }

    input NewSpare {
        code: String!
        name: String!
        number: String!
        optimal: Int!
        location: ID!
        user: ID!
    }

    input UpdateSpare {
        code: String
        name: String
        number: String
        optimal: Int
        location: ID
    }

    input NewLocation {
        code: String!
        name: String!
        area: String!
        user: ID!
    }

    input UpdateLocation {
        code: String
        name: String
        area: String
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

    input UpdateMolde {
        number: String!
        serial: String!
        cavities: Int!
        lifecycles: Int!
        tcycles: Int!
        shot: Int!
        quantity: Int!
        active: Boolean
    }

    input NewMachine {
        number: String!
        serial: String!
        closingForce: Int!
        spindleDiameter: Int!
        user: ID!
    }

    input UpdateMachine {
        number: String
        serial: String
        closingForce: Int
        spindleDiameter: Int
    }

    input NewModel {
        number: String!
        name: String!
        family: String!
        user: ID!
    }

    input UpdateModel {
        number: String
        name: String
        family: String
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

    input UpdateProgram {
        machine: ID
        molde: ID
        model: ID
        time: Decimal
        cycles: Int
        capacity: Int
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

    input NewIssue {
        name: String!
        code: String!
        user: ID!
    }

    input UpdateIssue {
        name: String
        code: String
    }

    input NewDefect {
        name: String!
        code: String!
        injection: Boolean!
        user: ID!
    }

    input UpdateDefect {
        name: String
        code: String
        injection: Boolean
    }

    input NewShot{
        molde: ID!
        date: String!
        shift: String!
        comments: String
        user: ID!
    }

    input UpdateShot{
        molde: ID!
        date: String!
        shift: String!
        comments: String
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

    input NewUser {
        name: String!
        password: String!
        level: String!
        user: ID!
    }

    input UpdateUser {
        level: String
        active: Boolean
        password: String
    }

    input NewReport {
        date: String!
        shift: String!
        machine: ID!
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
        oper: ID
        insp: ID
        production: [ProductionInput]
        downtimes: [DowntimeInput]
        ngs: [NgInput]
        resines: [ResineInput]
        user: ID!
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

    input DowntimeInput{
        issue: ID
        mins: Int
    }

    input UpdateReport {
        date: String!
        shift: String!
        machine: ID!
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
        oper: ID
        insp: ID
        production: [ProductionInput]
        downtimes: [DowntimeInput]
        ngs: [NgInput]
        resines: [ResineInput]
        user: ID!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)
