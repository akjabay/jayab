import request from "../request";

export default {
    ticketFind: function(args = []) {
        const { id } = args;
        return request.post("/graphql", {
            query: `query {
                ticketFind (id: "${id}") {
                  id
                  pid
                  title
                  categoryId {
                    id
                    name
                    fa_name
                  }
                }
              }`,
        });
    },
    ticketFindComplete: function(args = []) {
      const { id, pid } = args;
      let params = '';
      id ? (params = `id: "${id}"`) : (params = `pid: "${pid}"`);
      return request.post("/graphql", {
        query: `query {
                  ticketFind (${params}) {
                    id
                    pid
                    title
                    thumbnail
                    description
                    images {
                      url
                    }
                    files {
                      url
                    }
                    userId {
                      id
                      name
                      avatar_url
                    }
                    categoryId {
                      id
                      name
                      fa_name
                      en_name
                      icon_url
                      icon_url_fa
                      parent_category
                    }
                    answereIds {
                      id
                      pid
                      title
                      thumbnail
                      description
                      images {
                        url
                      }
                      files {
                        url
                      }
                      userId {
                        id
                        name
                        avatar_url
                      }
                      categoryId {
                        id
                        name
                        fa_name
                        en_name
                        icon_url
                        icon_url_fa
                        parent_category
                      }
                      createdAt
                    }
                    createdAt
                  }
                }`,
      });
    },
    ticketFindAll: function(args = []) {
        const { limit, offset, isMain } = args;
        return request.post("/graphql", {
          query: `query {
            ticketFindAll (query: {
                ${isMain ? 'isMain: true': ''}
                pagination: {
                    limit: ${limit}
                    offset: ${offset}
                }
            }) {
                hits {
                    id
                    pid
                    title
                    thumbnail
                    description
                    visibility
                    disabled
                    isPublic
                    createdAt
                    userId {
                        id
                        username
                        name
                        email
                        phone
                        avatar_url
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
    ticketCreate: function (args = []) {
      const {
        answeringToId,
        title,
        thumbnail,
        description,
        categoryId,
        images,
        files,
      } = args;
      return request.post("/graphql", {
        query: `mutation {
                  ticketCreate (input: {
                    title: "${title}"
                    ${answeringToId ? `answeringToId: "${answeringToId}"` : ''}
                    thumbnail: "${thumbnail}"
                    description: "${description}"
                    categoryId: "${categoryId}"
                    images: "${images}"
                    files: "${files}"
                  }) {
                    id
                  }
                }`,
      });
    },
    ticketUpdate: function(args = []) {
        const {
            id,
            title,
            thumbnail,
            description,
            categoryId,
            images,
            visibility,
            disabled,
            isPublic,
        } = args;
        return request.post("/graphql", {
            query: `mutation {
                ticketUpdate (input: {
                  id: "${id}"
                  ${title ? `title: "${title}"`: ''}
                  ${thumbnail ? `thumbnail: "${thumbnail}"`: ''}
                  ${description ? `description: "${description}"`: ''}
                  ${categoryId ? `categoryId: "${categoryId}"`: ''}
                  ${images ? `images: "${images}"`: ''}
                  ${visibility != undefined ? `visibility: ${visibility}`: ''}
                  ${disabled != undefined ? `disabled: ${disabled}`: ''}
                  ${isPublic != undefined ? `isPublic: ${isPublic}`: ''}
                }) {
                  id
                  visibility
                  disabled
                  isPublic
                }
              }`,
        });
    },
    ticketUpdateDeadLine: function(args = []) {
        const {
            id,
            deadline_date
        } = args;
        return request.post("/graphql", {
            query: `mutation {
                ticketUpdate (input: {
                  id: "${id}"
                  deadline_date: "${deadline_date}"
                }) {
                  id
                }
              }`,
        });
    },

    ticketFindUserTickets: function(args = []) {
        const { username, offset, limit } = args;
        return request.post("/graphql", {
            query: `query {
              ticketFindUserTickets (query: {
                username: "${username}"
                pagination: {
                  limit: ${limit}
                  offset: ${offset}
                }
              }) {
                hits {
                  id
                  pid
                  title
                  thumbnail
                  description
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
    ticketFindMyTickets: function(args = []) {
        const { offset, limit } = args;
        return request.post("/graphql", {
            query: `query {
              ticketFindMyTickets (query: {
                pagination: {
                  limit: ${limit}
                  offset: ${offset}
                }
              }) {
                hits {
                  id
                  pid
                  title
                  thumbnail
                  description
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
    ticketFindMyLikedTickets: function(args = []) {
        const { offset, limit } = args;
        return request.post("/graphql", {
            query: `query {
              ticketFindMyLikedTickets (query: {
                pagination: {
                  limit: ${limit}
                  offset: ${offset}
                }
              }) {
                hits {
                  id
                  pid
                  title
                  thumbnail
                  description
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