const types = `
type Service {
    id: ID
    codename: String
    persian_codename: String
    persian_accesses: String
    accesses: String
    planId: Plan
    users: [User]
}

input ServiceInput {
    id: ID
    codename: String
    accesses: String
    persian_accesses: String
    persian_codename: String
    planId: ID
}

input FindByServiceInput {
    serviceId: ID!
}

`;

const root = {
    query: `
        serviceFindAll: [Service]
        serviceFind(query: ServiceInput): Service
        `,
    mutation: `
        serviceCreate(input: ServiceInput): Service!
        serviceUpdate(input: ServiceInput): Service!
        serviceDelete(input: FindByServiceInput): Service!
        `,
};

module.exports = {
    types: types,
    root: root,
};
