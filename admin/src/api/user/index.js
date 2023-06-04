import request from "../request";

export default {
    userUpdate: function(args = []) {
        const {
            edit_type,
            username,
            name,
            bio,
            avatar_url,
            password,
            new_password,
        } = args;
        return request.post("/graphql", {
            query: `mutation {
              userUpdate (input: {
                  ${edit_type}: "${edit_type}"
                  username: "${username}"
                  name: "${name}"
                  bio: "${bio}"
                  avatar_url: "${avatar_url}"
                  password: "${password}"
                  new_password: "${new_password}"
                }) {
                  id
                  name
                  username
                  phone
                  email
                  status_auth
                  avatar_url
                }
              }`,
        });
    },
    userUpdateAdmin: function(args = []) {
        const {
          id,
          phone,
          email,
          name,
          password,
          new_password,
          is_superuser,
          permissions,
        } = args;
        return request.post("/graphql", {
          query: `mutation {
            userUpdate (input: {
                id: "${id}"
                phone: "${phone}"
                email: "${email}"
                name: "${name}"
                ${password ? `password: "${password}"` : ""}
                ${new_password ? `new_password: "${new_password}"` : ""}
                ${is_superuser ? `is_superuser: ${is_superuser}` : ""}
                permissions: "${permissions}"
              }) {
                id
                username
              }
          }`
        });
    },
    userUpdateStatus: function(args = []) {
        const { id, status_auth } = args;
        return request.post("/graphql", {
          query: `mutation {
              userUpdate (input: {
                  id: "${id}"
                  status_auth: "${status_auth}"
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
    userAddCartToCart: function(args = []) {
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
    userAddToCart: function(args = []) {
        const { id, pid } = args;
        let params = '';
        id ? (params = `id: "${id}"`): (params = `pid: "${pid}"`);
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
    userMinusFromCart: function(args = []) {
        const { id, pid } = args;
        let params = '';
        id ? (params = `id: "${id}"`): (params = `pid: "${pid}"`);
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
    userAddToLikes: function(args = []) {
        const { pid } = args;
        return request.post("/graphql", {
            query: `mutation {
              userAddToLikes (pid: "${pid}") {
                id
                likes {
                  items {
                    productId
                    likeTime
                  }
                }
              }
            }`,
        });
    },
    userRemoveFromLikes: function(args = []) {
        const { pid } = args;
        return request.post("/graphql", {
            query: `mutation {
              userRemoveFromLikes (pid: "${pid}") {
                id
                likes {
                  items {
                    productId
                    likeTime
                  }
                }
              }
            }`,
        });
    },

    userFind: function(args = []) {
      const { userId } = args;
        return request.post("/graphql", {
          query: `query {
            userFind (query: {
              id: "${userId}"
            }) {
              id
              name
              phone
              username
              createdAt
              status_auth
              email
              is_superuser
              permissions {
                  id
                  codename
                  persian_codename
              }
            }
          }`
        });
    },
    userSearch: function(args = []) {
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
    userSearchAdmin: function(args = []) {
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
    userFindAll: function(args = []) {
        const { offset, limit, status_auth } = args;
        return request.post(
            "/graphql",
            {
              query: `query {
                userFindAll (query: {
                  pagination: {
                    offset: ${offset}
                    limit: ${limit}
                  }
                  ${status_auth ? `status_auth: "${status_auth}"` : ''}
                }) {
                  hits {
                    id
                    username
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
    userFindByUsername: function(args = []) {
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
    userDelete: function(args = []) {
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
    userCreate: function(args = []) {
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
