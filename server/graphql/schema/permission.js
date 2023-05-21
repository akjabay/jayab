const types = `
type Permission {
    id: ID!
    codename: String!
    persian_codename: String!
    users: [User]
    createdAt: String
    updatedAt: String
}

input PermissionInput {
    codename: String
    persian_codename: String
    permissionId: ID
}`;

const root = {
    query: `
        permissionFind(query: PermissionInput): [Permission]
        permissionFindAll: [Permission]
        `,
    mutation: `
        permissionCreate(input: PermissionInput): Permission!
        permissionUpdate(input: PermissionInput): Permission!
        `,
};

module.exports = {
    types: types,
    root: root,
};
