import request from "../request";

export default {
  userUpdate: function (args = []) {
    const {
      username,
      name,
      bio,
      avatar_url,
      password,
      new_password,
      address,
      cityId,
      commissionExpire,
      commissionLimit,
      commissionPercentage,
    } = args;
    return request.post("/graphql", {
      query: `mutation {
              userUpdate (input: {
                  ${username ? `username: "${username}"` : '' }
                  ${name ? `name: "${name}"` : '' }
                  ${bio ? `bio: "${bio}"` : '' }
                  ${avatar_url ? `avatar_url: "${avatar_url}"` : '' }
                  ${password ? `password: "${password}"` : '' }
                  ${new_password ? `new_password: "${new_password}"` : '' }
                  ${address ? `address: "${address}"` : '' }
                  ${cityId ? `cityId: ${cityId}` : '' }
                  ${commissionExpire ? `commissionExpire: "${commissionExpire}"` : ''}
                  ${commissionLimit ? `commissionLimit: ${commissionLimit}` : ''}
                  ${commissionPercentage ? `commissionPercentage: ${commissionPercentage}` : ''}
                }) {
                  id
                  name
                  username
                  phone
                  email
                  address
                  city {
                    id
                    province_id
                    name
                    lat_long
                  }
                  permissions {
                    id
                    codename
                    persian_codename
                  }
                  status_auth
                  avatar_url
                  commissionExpire
                  commissionLimit
                  commissionPercentage
                }
              }`,
    });
  },
  userUpdateAdmin: function (args = []) {
    const {
      id,
      phone,
      email,
      name,
      password,
      new_password,
      permissions
    } = args;
    return request.post("/graphql", {
      query: `mutation {
            userUpdate (input: {
                id: "${id}"
                phone: "${phone}"
                email: "${email}"
                name: "${name}"
                password: "${password}"
                new_password: "${new_password}"
                permissions: "${permissions}"
              }) {
                id
                username
              }
          }`
    });
  },
  userActivateService: function (args = []) {
    const { serviceId = '', planId = '', duration = '' } = args;
    return request.post("/graphql", {
      query: `mutation {
        userActivateService (input: {
                  serviceId: "${serviceId}"
                  planId: "${planId}"
                  duration: "${duration}"
            }) {
              id
              username
              createdAt
              status_auth
              subscriptions {
                planId {
                  id
                }
                serviceId {
                  id
                }
                duration
                payedDate
                expiresAt
                status
              }
            }
          }`,
    });
  },
  userUpdateStatus: function (args = []) {
    const { id, status_auth } = args;
    return request.post("/graphql", {
      query: `mutation {
              userUpdate (input: {
                  id: "${id}"
                  status_auth: ${status_auth}
              }) {
              id
              username
              createdAt
              status_auth
              permissions{
                  id
                  codename
                  persian_codename
              }
            }
          }`,
    });
  },
  userAddCartToCart: function (args = []) {
    const { items } = args;
    return request.post("/graphql", {
      query: `mutation {
                userAddCartToCart (
                    input: ${JSON.stringify(items).replace(
        /"([^"]+)":/g,
        "$1:"
      )}) {
              id
              cart {
              items {
                  productId
                  quantity
              }
              }
          }
      }`,
    });
  },
  userAddToCart: function (args = []) {
    const { id, pid } = args;
    let params = '';
    id ? (params = `id: "${id}"`) : (params = `pid: "${pid}"`);
    return request.post("/graphql", {
      query: `mutation {
              userAddToCart (${params}) {
                id
                cart {
                    items {
                      productId
                      quantity
                    }
                }
              }
            }`,
    });
  },
  userMinusFromCart: function (args = []) {
    const { id, pid } = args;
    let params = '';
    id ? (params = `id: "${id}"`) : (params = `pid: "${pid}"`);
    return request.post(
      "/graphql",
      {
        query: `mutation {
                  userMinusFromCart (${params}) {
                    id
                    cart {
                      items {
                        productId
                        quantity
                      }
                    }
                  }
                }`,
      },

    );
  },
  userAddToLikes: function (args = []) {
    const { id } = args;
    return request.post("/graphql", {
      query: `mutation {
              userAddToLikes (id: "${id}") {
                id
                likes {
                  items {
                    productId {
                      _id
                    }
                    likeTime
                  }
                }
              }
            }`,
    });
  },
  userRemoveFromLikes: function (args = []) {
    const { id } = args;
    return request.post("/graphql", {
      query: `mutation {
              userRemoveFromLikes (id: "${id}") {
                id
                likes {
                  items {
                    productId {
                      _id
                    }
                    likeTime
                  }
                }
              }
            }`,
    });
  },

  userFind: function (args = []) {
    const { id, email, username } = args;
    return request.post("/graphql", {
      query: `query {
            userFind (query: {
              ${id ? `id: "${id}"` : ''}
              ${email ? `email: "${email}"` : ''}
              ${username ? `username: "${username}"` : ''}
            }) {
              id
              avatar_url
              name
              phone
              username
              createdAt
              status_auth
              email
              address
              city {
                id
                province_id
                name
                lat_long
              }
              commissionExpire
              commissionLimit
              commissionPercentage
              permissions {
                  id
                  codename
                  persian_codename
              }
            }
          }`
    });
  },
  userSearch: function (args = []) {
    const { searchText, offset, limit } = args;
    return request.post(
      "/graphql",
      {
        query: `query {
                    userSearch (query: {
                        searchText: "${searchText}"
                        pagination: {
                            limit: ${limit}
                            offset: ${offset}
                        }
                    }) {
                        hits {
                            id
                            avatar_url
                            username
                            name
                        }
                        pagination {
                            limit
                            offset
                            total
                        }
                    }
                }`
      },

    );
  },
  userFindMyLikes: function (args = []) {
    const { offset, limit } = args;
    return request.post(
      "/graphql",
      {
        query: `query {
          userFindMyLikes (query: {
                pagination: {
                    limit: ${limit}
                    offset: ${offset}
                }
            }) {
                hits {
                  postId {
                    pid
                    title
                  }
                  productId {
                    pid
                    title
                  }
                  ticketId {
                    pid
                    title
                  }
                  likeTime
                }
                pagination {
                    limit
                    offset
                    total
                }
            }
        }`
      },

    );
  },
  userSearchAdmin: function (args = []) {
    const { searchText, offset, limit } = args;
    return request.post(
      "/graphql",
      {
        query: `query {
                userSearch (query: {
                  searchText: "${searchText}"
                  pagination: {
                    offset: ${offset}
                    limit: ${limit}
                  }
                }) {
                  hits {
                    id
                    username
                    createdAt
                    status_auth
                    phone
                    email
                    permissions{
                        id
                        codename
                        persian_codename
                    }
                  }
                  pagination {
                    limit
                    offset
                    total
                  }
                }
              }`,
      },

    );
  },
  userFindAll: function (args = []) {
    const { offset, limit } = args;
    return request.post(
      "/graphql",
      {
        query: `query {
                userFindAll (query: {
                  pagination: {
                    offset: ${offset}
                    limit: ${limit}
                  }
                }) {
                  hits {
                    id
                    username
                    telegramId
                    createdAt
                    status_auth
                    email
                    phone
                    permissions {
                        id
                        codename
                        persian_codename
                    }
                  }
                  pagination {
                    limit
                    offset
                    total
                  }
                }
              }`,
      },

    );
  },
  userFindByUsername: function (args = []) {
    const { username } = args;
    return request.post(
      "/graphql",
      {
        query: `query {
                userFindByUsername (username: "${username}") {
                  id
                  username
                  avatar_url
                }
              }`,
      },

    );
  },
  userDelete: function (args = []) {
    const { id } = args;
    return request.post(
      "/graphql",
      {
        query: `mutation {
                  userDelete (input: {
                      id: "${id}"
                  }) {
                  id
                  username
                }
              }`,
      },
    );
  },
  userCreate: function (args = []) {
    const { signup_type, user, username, name, password } = args;
    return request.post(
      "/graphql",
      {
        query: `mutation {
                userCreate (input: {
                    ${signup_type}: "${user}"
                    name: "${username}"
                    username: "${name}"
                    password: "${password}"
                  }) {
                    id
                    username
                  }
                }`,
      },
    );
  },
};
