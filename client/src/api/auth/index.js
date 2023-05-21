import request from "../request";

export default {
  authLogin: function (args = []) {
    const { login_type, user, password } = args;
    return request.post("/graphql", {
      query: `query {
          authLogin (query: {
            ${login_type}: "${user}"
            password: "${password}"
          }) {
            user {
              id
              name
              username
              address
              phone
              email
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
              is_superuser
            }
            token
          }
        }`,
    });
  },

  authSignup: function (args = []) {
    const { email, phone = '', address = '', cityId = '', name, password } = args;
    return request.post("/graphql", {
      query: `mutation {
          authSignup (input: {
              email: "${email}"
              phone: "${phone}"
              address: "${address}"
              name: "${name}"
              password: "${password}"
              ${cityId ? `cityId: ${cityId}`: '' }
            }) {
              id
              name
              username
              phone
              address
              city {
                id
                province_id
                name
                lat_long
              }
              email
              status_auth
              avatar_url
              updatedAt
            }
          }`,
    });
  },

  authVerify: function (args = []) {
    const { email, password, code } = args;
    return request.post("/graphql", {
      query: `mutation {
          authVerify (input: {
              email: "${email}"
              password: "${password}"
              code: "${code}"
            }) {
              user {
                id
                name
                username
                address
                phone
                email
                city {
                  id
                  province_id
                  name
                  lat_long
                }
                status_auth
                avatar_url
              }
              token
            }
          }`,
    });
  },

  authResetPassword: function (args = []) {
    const { email } = args;
    return request.post("/graphql", {
      query: `mutation {
        authResetPassword (input: {
              email: "${email}"
            }) {
              id
              email
            }
          }`,
    });
  },

  authUpdate: function (args = []) {
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
              authUpdate (input: {
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

  authResetPasswordVerify: function (args = []) {
    const { email, password, code } = args;
    return request.post("/graphql", {
      query: `mutation {
        authResetPasswordVerify (input: {
              email: "${email}"
              code: "${code}"
              password: "${password}"
            }) {
              id
              email
            }
          }`,
    });
  },

  authCheckUsername: function (args = []) {
    const { username } = args;
    return request.post("/graphql", {
      query: `query {
          authCheckUsername (username: "${username}")
        }`,
    });
  },

  authFindMe: function () {
    return request.post(
      "/graphql",
      {
        query: `query {
            authFindMe {
              id
              name
              username
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
              phone
              email
              status_auth
              avatar_url
              is_superuser
            }
          }`,
      },

    );
  },


  authEditProfile: function (args = []) {
    const { username = '', name, address, password } = args;
    return request.post("/graphql", {
      query: `mutation {
        authEditProfile (input: {
              ${name ? `name: "${name}"` : ''}
              ${username ? `username: "${username}"` : ''}
              ${address ? `address: "${address}"` : ''}
              ${password ? `password: "${password}"` : ''}
            }) {
              id
              name
              username
              phone
              email
              address
              status_auth
              avatar_url
              updatedAt
            }
          }`,
    });
  },

};
