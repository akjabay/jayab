import request from "../request";

export default {
    productFind: function(args = []) {
        const { id } = args;
        return request.post("/graphql", {
            query: `query {
                productFind (id: "${id}") {
                  id
                  pid
                  title
                  deadline_date
                  description
                  images {
                    url
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
                }
              }`,
        });
    },
    productFindComplete: function(args = []) {
        const { id, pid } = args;
        let params = '';
        id ? (params = `id: "${id}"`): (params = `pid: "${pid}"`);
        return request.post("/graphql", {
            query: `query {
                productFind (${params}) {
                  id
                  pid
                  title
                  thumbnail
                  description
                  images {
                    url
                  }
                  userId {
                    id
                    username
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
                }
              }`,
        });
    },
    productFindAll: function(args = []) {
        const { limit, offset, visibility } = args;
        return request.post("/graphql", {
          query: `query {
            productFindAll (query: {
                pagination: {
                    limit: ${limit}
                    offset: ${offset}
                }
                ${visibility == undefined ? '': 'visibility: ' + visibility}
            }) {
                hits {
                    id
                    pid
                    title
                    thumbnail
                    description
                    deadline_date
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
    productCreate: function(args = []) {
        const {
            title,
            deadline_date,
            thumbnail,
            description,
            language,
            categoryId,
            images,
        } = args;
        return request.post("/graphql", {
            query: `mutation {
                productCreate (input: {
                  title: "${title}"
                  deadline_date: "${deadline_date}"
                  thumbnail: "${thumbnail}"
                  description: "${description}"
                  language: "${language}"
                  categoryId: "${categoryId}"
                  images: "${images}"
                }) {
                  id
                }
              }`,
        });
    },
    productUpdate: function(args = []) {
        const {
            id,
            title,
            deadline_date,
            thumbnail,
            description,
            categoryId,
            images,
        } = args;
        return request.post("/graphql", {
            query: `mutation {
                productUpdate (input: {
                  id: "${id}"
                  title: "${title}"
                  deadline_date: "${deadline_date}"
                  thumbnail: "${thumbnail}"
                  description: "${description}"
                  categoryId: "${categoryId}"
                  images: "${images}"
                }) {
                  id
                }
              }`,
        });
    },
    productUpdateDeadLine: function(args = []) {
        const {
            id,
            deadline_date
        } = args;
        return request.post("/graphql", {
            query: `mutation {
                productUpdate (input: {
                  id: "${id}"
                  deadline_date: "${deadline_date}"
                }) {
                  id
                }
              }`,
        });
    },

    productFindUserProducts: function(args = []) {
        const { username, offset, limit } = args;
        return request.post("/graphql", {
            query: `query {
              productFindUserProducts (query: {
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
    productFindMyProducts: function(args = []) {
        const { offset, limit } = args;
        return request.post("/graphql", {
            query: `query {
              productFindMyProducts (query: {
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
                  deadline_date
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
    productFindMyLikedProducts: function(args = []) {
        const { offset, limit } = args;
        return request.post("/graphql", {
            query: `query {
              productFindMyLikedProducts (query: {
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
    reportProduct: function(args = []) {
        const { queryOptions } = args;
        return request.post("/graphql", {
            query: `query {
              reportProduct(query: {
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