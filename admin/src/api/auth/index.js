import request from "../request";

export default {
    authLogin: function(args = []) {
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
              phone
              email
              status_auth
              avatar_url
            }
            token
          }
        }`,
        });
    },

    authSignup: function(args = []) {
      const { signup_type, user, username, name, password} = args;
      return request.post("/graphql", {
        query: `mutation {
          authSignup (input: {
              ${signup_type}: "${user}"
              username: "${username}"
              name: "${name}"
              password: "${password}"
            }) {
              id
              username
              updatedAt
            }
          }`,
      });
    },

    authVerify: function(args = []) {
      const { username, password, code } = args;
      return request.post("/graphql", {
        query: `mutation {
          authVerify (input: {
              username: "${username}"
              password: "${password}"
              code: "${code}"
            }) {
              id
              username
            }
          }`,
      });
    },

    authCheckUsername: function(args = []) {
      const { username } = args;
      return request.post("/graphql", {
          query: `query {
          authCheckUsername (username: "${username}")
        }`,
      });
    },

    authFindMe: function() {
      return request.post(
        "/graphql",
        {
          query: `query {
            authFindMe {
              id
              name
              username
              phone
              email
              status_auth
              avatar_url
            }
          }`,
        },
        
      );
    },
};
