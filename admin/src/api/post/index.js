import request from "../request";

export default {
    postFind: function(args = []) {
        const { id } = args;
        return request.post("/graphql", {
            query: `query {
                postFind (id: "${id}") {
                  id
                  pid
                  title
                  categoryId {
                    id
                    name
                    fa_name
                    en_name
                    icon_url
                    icon_url_fa
                    parent_category
                  }
                  images {
                    url
                    idx
                  }
                  contents {
                    value
                    idx
                  }
                }
              }`,
        });
    },
    postFindComplete: function(args = []) {
        const { id, pid } = args;
        let params = '';
        id ? (params = `id: "${id}"`): (params = `pid: "${pid}"`);
        return request.post("/graphql", {
            query: `query {
                postFind (${params}) {
                  id
                  pid
                  title
                  thumbnail
                  contents {
                    value
                    idx
                  }
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
    postFindAll: function(args = []) {
        const { limit, offset, visibility } = args;
        return request.post("/graphql", {
          query: `query {
            postFindAll (query: {
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
    postCreate: function(args = []) {
        const {
            title,
            language,
            thumbnail,
            contents,
            categoryId,
            images,
        } = args;
        return request.post("/graphql", {
            query: `mutation {
                postCreate (input: {
                  title: "${title}"
                  language: "${language}"
                  thumbnail: "${thumbnail}"
                  contents: "${contents}"
                  categoryId: "${categoryId}"
                  images: "${images}"
                }) {
                  id
                }
              }`,
        });
    },
    postUpdate: function(args = []) {
        const {
            id,
            title,
            thumbnail,
            contents,
            categoryId,
            images,
        } = args;
        return request.post("/graphql", {
            query: `mutation {
                postUpdate (input: {
                  id: "${id}"
                  title: "${title}"
                  thumbnail: "${thumbnail}"
                  contents: "${contents}"
                  categoryId: "${categoryId}"
                  images: "${images}"
                }) {
                  id
                }
              }`,
        });
    },
    postUpdateVisibility: function(args = []) {
        const {
            id,
            visibility
        } = args;
        return request.post("/graphql", {
            query: `mutation {
              postUpdateVisibility (input: {
                  id: "${id}"
                  visibility: ${visibility}
                }) {
                  id
                  visibility
                }
              }`,
        });
    },
    postUpdateDeadLine: function(args = []) {
        const {
            id,
            deadline_date
        } = args;
        return request.post("/graphql", {
            query: `mutation {
                postUpdate (input: {
                  id: "${id}"
                  deadline_date: "${deadline_date}"
                }) {
                  id
                }
              }`,
        });
    },

    postFindUserPosts: function(args = []) {
        const { username, offset, limit } = args;
        return request.post("/graphql", {
            query: `query {
              postFindUserPosts (query: {
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
                  contents {
                    value
                    idx
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
    postFindMyPosts: function(args = []) {
        const { offset, limit } = args;
        return request.post("/graphql", {
            query: `query {
              postFindMyPosts (query: {
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
                  contents {
                    value
                    idx
                  }
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
    postFindMyLikedPosts: function(args = []) {
        const { offset, limit } = args;
        return request.post("/graphql", {
            query: `query {
              postFindMyLikedPosts (query: {
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
                  contents {
                    value
                    idx
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
    reportPost: function(args = []) {
        const { queryOptions } = args;
        return request.post("/graphql", {
            query: `query {
              reportPost(query: {
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