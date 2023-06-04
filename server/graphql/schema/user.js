const types = `
type User {
    _id: ID
    id: ID
    name: String
    username: String!
    telegramId: String
    phone: String
    email: String
    address: String
    bio: String
    status_auth: String
    cart: UserCart
    city: City
    likes: UserLikes
    permissions: [Permission]
    transactions: [UserTransactionItem]
    avatar_url: String
    is_superuser: Float
    commissionExpire: String
    commissionLimit: Float
    commissionPercentage: Float
    subscriptions: [UserSubscription]
    createdAt: String
    updatedAt: String
}

type UserData {
    _id: ID
    id: ID
    name: String
    username: String
    phone: String
    email: String
    address: String
    bio: String
    cart: UserCart
    city: City
    likes: UserLikes
    permissions: [Permission]
    avatar_url: String
    is_superuser: Float
    status_auth: String
    commissionExpire: String
    commissionLimit: Float
    commissionPercentage: Float
}

type UserSubscription {
    planId: Plan
    serviceId: Service
    duration: String
    payedDate: String
    expiresAt: String
    status: String
}

type UserCart {
    items: [UserCartItem]
}

type UserCartItem {
    productId: ID!
    quantity: Float!
}

type UserTransactionItem {
    transactionId: ID
}

type UserLikeItem {
    productId: Product
    likeTime: String!
}

type UserLikes {
    items: [UserLikeItem]
}

type UserLikesPagination {
    hits: [UserLikeItem]
    pagination: PaginationOutput
}

type Users {
    hits: [User]
    pagination: PaginationOutput
    status_auth: String
}


input UserInput {
    name: String
    username: String
    phone: String
    email: String
    address: String
    cityId: Int
    avatar_url: String
    password: String!
    is_superuser: Float
}

input UserUpdateInput {
    id: ID
    name: String
    bio: String
    username: String
    phone: String
    email: String
    address: String
    cityId: Int
    avatar_url: String
    password: String
    new_password: String
    permissions: String
    status_auth: String
    is_superuser: Float
    commissionExpire: String
    commissionLimit: Float
    commissionPercentage: Float
}

input UserCartInput {
    productId: ID!
    quantity: Float!
}

input UserFindInput {
    searchText: String
    pagination: Pagination
    status_auth: String
}

input UserServiceInput {
    planId: ID
    serviceId: ID
    duration: String
}
`;

const root = {
    query: `
        userFind(query: UserUpdateInput): User!
        userFindAll(query: UserFindInput): Users
        userFindByUsername(username: String!): User!
        userSearch(query: UserFindInput): Users
        userFindMyLikes(query: UserFindInput): UserLikesPagination
    `,
    mutation: `
        userCreate (input: UserInput): User!
        userUpdate (input: UserUpdateInput): User!
        userActivateService(input: UserServiceInput): User!

        userAddToCart (id: ID pid: String): User!
        userMinusFromCart (id: ID pid: String): User!
        userAddCartToCart (input: [UserCartInput!]): User!
        userRemoveFromCart (id: ID pid: String): User!
        userClearCart: User!

        userAddToLikes (id: ID pid: String): User!
        userRemoveFromLikes (id: ID pid: String): User!
        userClearLikes: User!

        userAddToRequestList (id: ID username: String): User!
        userRemoveFromRequestList (id: ID username: String): User!
        userClearRequestList: User!

        userUnfollow (id: ID username: String): User!
        userRemoveFromFollowers (id: ID username: String): User!

    `,
};

module.exports = {
    types: types,
    root: root,
};
