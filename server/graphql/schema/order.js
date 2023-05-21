const types = `
type Order {
    id: ID!
    discountId: Discount
    paymentWallet: String
    transactionHash: String
    payedAmountFromUser: String
    payedCommissionAmount: String
    productId: Product
    userId: User
    status: String
    expireDate: String
    updatedAt: String
    createdAt: String
}

type Orders {
    hits: [Order]
    pagination: PaginationOutput
}

input OrderProductInput {
    id: ID
    pid: String
    quantity: Float
}

input OrderInput {
    productId: ID!
}

input OrderFindInput {
    ids: [ID]
    order_status: String
    pagination: Pagination
}`;

const root = {
    query: `
        orderFind(id: ID!): Order!
        orderFindAll (query: OrderFindInput): Orders
        orderFindUserOrders (query: OrderFindInput): Orders
        orderFindShopOrders (query: OrderFindInput): Orders

        orderShopPayWaitings (query: OrderFindInput): Orders
        `,
    mutation: `
        orderCreate (input: OrderInput): Order!
        orderCreateFromCart (input: OrderInput): Order
        orderUpdate (input: OrderInput): Order!
        `,
};

module.exports = {
    types: types,
    root: root,
};
