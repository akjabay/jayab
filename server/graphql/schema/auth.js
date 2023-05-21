const types = `
type AuthData {
    user: UserData
    token: String
}

input AuthVerifyInput {
    email: String!
    password: String!
    code: String!
}
`;

const root = {
    query: `
        authLogin(query: UserInput): AuthData
        authCheckUsername(username: String!): Boolean!
        authLogout: ID!
        authFindMe: User!
        `,
    mutation: `
        authSignup(input: UserInput): User!
        authVerify(input: AuthVerifyInput): AuthData!
        authResetPassword(input: UserUpdateInput): User!
        authResetPasswordVerify(input: AuthVerifyInput): User!
        authEditProfile(input: UserUpdateInput): User!
        authUpdate(input: UserUpdateInput): User!
        `,
};

module.exports = {
    types: types,
    root: root,
};
