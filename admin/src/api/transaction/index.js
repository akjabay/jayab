import request from "../request";

export default {
  transactionShopFind: function (args = []) {
    const { limit, offset } = args;
    return request.post("/graphql", {
      query: `query {
                transactionShopFind (query: {
                    pagination: {
                        limit: ${limit}
                        offset: ${offset}
                    }
                }) {
                    hits {
                        id
                        transaction_type
                        amount
                        order_id
                        orderId {
                            id
                            order_status
                            order_amount_payment {
                                userId
                                amount
                            }
                        }
                        paymentId {
                            id
                        }
                        userId {
                            id
                            username
                            avatar_url
                        }
                        authority
                        createdAt
                    }
                    pagination {
                        offset
                        limit
                        total
                    }
                }
            }`,
    });
  },
  transactionShopAccountingData: function () {
    return request.post(
      "/graphql",
      {
        query: `query {
            transactionShopAccountingData {
                lastTransactions {
                    id
                    transaction_type
                    amount
                    order_id
                    orderId {
                        id
                        order_status
                        order_amount_payment {
                            userId
                            amount
                        }
                    }
                    paymentId {
                        id
                    }
                    userId {
                        id
                        username
                        avatar_url
                    }
                    authority
                    createdAt
                }
                totalSell
                totalPay
            }
        }`,
      },
    );
  },
  transactionShopPaymentRequests: function (args = []) {
    const { limit, offset } = args;
    return request.post("/graphql", {
      query: `query {
            transactionShopPaymentRequests (query: {
                pagination: {
                    limit: ${limit}
                    offset: ${offset}
                }
            }) {
                hits {
                     id
                    transaction_type
                    amount
                    order_id
                    orderId {
                        id
                        order_status
                        order_amount_payment {
                            userId
                            amount
                        }
                    }
                    paymentId {
                        id
                    }
                    userId {
                        id
                        username
                        avatar_url
                    }
                    authority
                    createdAt
                }
                pagination {
                    offset
                    limit
                    total
                }
            }
        }`,
    });
  },
  transactionCreateRequest: function (args = []) {
    const { orderId } = args;
    return request.post("/graphql", {
      query: `mutation {
            transactionCreateRequest (input: {
                orderId: "${orderId}"
            }) {
                id
            }
        }`,
    });
  },
  transactionFindUserTransactionCounts: function () {
    return request.post("/graphql", {
      query: `query {
            transactionFindUserTransactionCounts {
              waitingToPay
              payed
              sent
              finished
              rejected
              payedBack
              total
            }
          }`,
    });
  },
}