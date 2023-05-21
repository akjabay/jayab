import request from "../request";

export default {
  orderFind: function (args = []) {
    const { id } = args;
    return request.post("/graphql", {
      query: `query {
            orderFind (id: "${id}") {
              id
              paymentWallet
              transactionHash
              payedAmountFromUser
              payedCommissionAmount
              productId {
                id
                name
                email
                uid
                token
                configUrl
                status
              }
              userId {
                  id
                  name
                  email
                  avatar_url
              }
              status
              expireDate
              updatedAt
              createdAt
            }
          }`,
    });
  },
  orderFindComplete: function (args = []) {
    const { id } = args;
    return request.post("/graphql", {
      query: `query {
            orderFind (id: "${id}") {
              id
              paymentWallet
              transactionHash
              payedAmountFromUser
              payedCommissionAmount
              productId {
                id
                name
                email
                uid
                token
                configUrl
                status
              }
              userId {
                  id
                  name
                  email
                  avatar_url
              }
              status
              expireDate
              updatedAt
              createdAt
            }
          }`,
    });
  },
  orderFindUserOrders: function (args = []) {
    const { status, offset, limit } = args;
    return request.post("/graphql", {
      query: `query {
            orderFindUserOrders (query: {
              order_status: "${status}"
              pagination: {
                limit: ${limit}
                offset: ${offset}
              }
            }) {
              hits {
                id
                paymentWallet
                transactionHash
                payedAmountFromUser
                payedCommissionAmount
                productId {
                  id
                  name
                  email
                  uid
                  token
                  configUrl
                  status
                }
                userId {
                    id
                    name
                    email
                    avatar_url
                }
                status
                expireDate
                updatedAt
                createdAt
              }
              pagination {
                limit
                offset
                total
              }
            }
          }`,
    });
  },
  orderShopSellData: function (args = []) {
    const { duration } = args;
    return request.post("/graphql", {
      query: `query {
                orderShopSellData (query: {
                    duration: "${duration}"
                }) {
                    data {
                        data
                        status
                    }
                    dataSet
                }
            }`,
    });
  },
  orderShopPayWaitings: function (args = []) {
    const { offset, limit } = args;
    return request.post("/graphql", {
      query: `query {
            orderShopPayWaitings (query: {
                pagination: {
                    limit: ${limit}
                    offset: ${offset}
                }
            }) {
                hits {
                    id
                    products {
                        product {
                            pid
                            title
                            price
                            realprice
                            deadline_date
                            amount
                            thumbnail
                        }
                        quantity
                    }
                    order_amount
                    userId {
                        id
                        name
                        email
                        avatar_url
                    }
                    order_status
                    order_amount_payment {
                        userId
                        amount
                        payment_status
                    }
                    transactionId {
                        id
                    }
                    shop_amount
                }
                pagination {
                    limit
                    offset
                    total
                }
            }
        }`,
    });
  },
  orderFindShopOrders: function (args = []) {
    const { offset, limit, shop_order_status } = args;
    return request.post("/graphql", {
      query: `query {
            orderFindShopOrders (query: {
                shop_order_status: "${shop_order_status}"
                pagination: {
                    limit: ${limit}
                    offset: ${offset}
                }
            }) {
                hits {
                  id
                  paymentWallet
                  transactionHash
                  payedAmountFromUser
                  payedCommissionAmount
                  productId {
                    id
                    name
                    email
                    uid
                    token
                    configUrl
                    status
                  }
                  userId {
                      id
                      name
                      email
                      avatar_url
                  }
                  status
                  expireDate
                  updatedAt
                  createdAt
                }
                pagination {
                    limit
                    offset
                    total
                }
            }
        }`,
    });
  },
  orderFindShopSellsCount: function () {
    return request.post("/graphql", {
      query: `query {
            orderFindShopSellsCount {
              totalSells
              totalProducts
            }
          }`,
    });
  },
  orderFindShopOrdersCount: function () {
    return request.post("/graphql", {
      query: `query {
            orderFindShopOrdersCount {
              waitingToSend
              todayWaitingToSend
              sent
              finished
              rejected
              payedBack
              total
            }
          }`,
    });
  },
  orderFindShopPaysCount: function () {
    return request.post("/graphql", {
      query: `query {
            orderFindShopPaysCount {
              totalSell
              totalPay
            }
          }`,
    });
  },
  orderFindUserOrdersCounts: function () {
    return request.post("/graphql", {
      query: `query {
            orderFindUserOrdersCounts {
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
  orderCreateFromCart: function (args = []) {
    const { product_items } = args;
    return request.post("/graphql", {
      query: `mutation {
            orderCreateFromCart (input: {
              product_items: ${JSON.stringify(product_items).replace(
        /"([^"]+)":/g,
        "$1:"
      )}
            }) {
              id
              products {
                product {
                  id
                }
                quantity
              }
            }
          }`,
    });
  },
  orderFindAll: function (args = []) {
    const { limit, offset } = args;
    return request.post("/graphql", {
      query: `query {
        orderFindAll (query: {
            pagination: {
              limit: ${limit}
              offset: ${offset}
            }
        }) {
            hits {
                id
                paymentWallet
                transactionHash
                payedAmountFromUser
                payedCommissionAmount
                productId {
                  id
                  name
                  email
                  uid
                  token
                  configUrl
                  status
                }
                userId {
                    id
                    name
                    email
                    avatar_url
                }
                status
                expireDate
                updatedAt
                createdAt
            }
            pagination {
                limit
                offset
                total
            }
        }
      }`
    });
  },
  reportOrder: function (args = []) {
    const { queryOptions } = args;
    return request.post("/graphql", {
      query: `query {
        reportOrder(query: {
          ${queryOptions}
        }) {
          id
          date
          amount
          label
        }
      }`,
    });
  },
}