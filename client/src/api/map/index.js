import request from "../request";

export default {
  mapFind: function (args = []) {
    const { type } = args;
    return request.post("/graphql", {
      query: `query {
            mapFind (query: {
              type: "${type}"
            }) {
              position
              lat
              lon
              speed
              direction
            }
          }`,
    });
  },
}