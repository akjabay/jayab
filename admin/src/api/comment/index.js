import request from "../request";

export default {
    commentFind: function(args = []) {
        const { id } = args;
        return request.post("/graphql", {
            query: `query {
                commentFind (id: "${id}") {
                  id
                  categoryId {
                    id
                    name
                    fa_name
                  }
                }
              }`,
        });
    },
    commentFindAll: function(args = []) {
        const { limit, offset } = args;
        return request.post("/graphql", {
          query: `query {
            commentFindAll (query: {
                pagination: {
                    limit: ${limit}
                    offset: ${offset}
                }
            }) {
                hits {
                    id
                    body
                    visibility
                    disabled
                    createdAt
                    userId {
                        id
                        username
                        name
                        email
                        phone
                        avatar_url
                    }
                    postId {
                      id
                      thumbnail
                    }
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
    commentCreate: function(args = []) {
        const {
            body,
            categoryId,
            images,
        } = args;
        return request.post("/graphql", {
            query: `mutation {
                commentCreate (input: {
                  body: "${body}"
                  categoryId: "${categoryId}"
                  images: "${images}"
                }) {
                  id
                }
              }`,
        });
    },
    commentUpdate: function(args = []) {
        const {
            id,
            visibility,
            disabled,
            isPublic,
        } = args;
        return request.post("/graphql", {
            query: `mutation {
                commentUpdate (input: {
                  id: "${id}"
                  ${visibility != undefined ? `visibility: ${visibility}`: ''}
                  ${disabled != undefined ? `disabled: ${disabled}`: ''}
                  ${isPublic != undefined ? `isPublic: ${isPublic}`: ''}
                }) {
                  id
                }
              }`,
        });
    },
    commentUpdateDeadLine: function(args = []) {
        const {
            id,
            deadline_date
        } = args;
        return request.post("/graphql", {
            query: `mutation {
                commentUpdate (input: {
                  id: "${id}"
                  deadline_date: "${deadline_date}"
                }) {
                  id
                }
              }`,
        });
    },

    commentFindUserTickets: function(args = []) {
        const { username, offset, limit } = args;
        return request.post("/graphql", {
            query: `query {
              commentFindUserTickets (query: {
                username: "${username}"
                pagination: {
                  limit: ${limit}
                  offset: ${offset}
                }
              }) {
                hits {
                  id
                  body
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
    commentFindMyTickets: function(args = []) {
        const { offset, limit } = args;
        return request.post("/graphql", {
            query: `query {
              commentFindMyTickets (query: {
                pagination: {
                  limit: ${limit}
                  offset: ${offset}
                }
              }) {
                hits {
                  id
                  body
                  amount
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
    commentFindMyLikedTickets: function(args = []) {
        const { offset, limit } = args;
        return request.post("/graphql", {
            query: `query {
              commentFindMyLikedTickets (query: {
                pagination: {
                  limit: ${limit}
                  offset: ${offset}
                }
              }) {
                hits {
                  id
                  body
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
    reportTicket: function(args = []) {
        const { queryOptions } = args;
        return request.post("/graphql", {
            query: `query {
              reportTicket(query: {
                ${queryOptions}
              }) {
                date
                amount
                label
              }
            }`,
        });
    },
}