import request from "../request";

export default {
  upload: function (args = []) {
    const { fd } = args;
    return request.post("/main/upload", fd);
  },
  uploadDeleteFile: function (args = []) {
    const { filename } = args;
    return request.post("/main/upload/delete-file", { filename });
  },
  requestCallBack: function (args = []) {
    const { callbackLink } = args;
    return request.get(callbackLink);
  },
  paymentFindUserPaysCounts: function () {
    return request.post("/graphql", {
      query: `query {
                paymentFindUserPaysCounts {
                  successPay
                  unsuccessPay
                  total
                }
              }`,
    });
  },
  categoryCreate: function (args = []) {
    const {
      name,
      fa_name,
      en_name,
      parent_category,
    } = args;
    return request.post("/graphql", {
      query: `mutation {
            categoryCreate (input: {
              name: "${name}"
              fa_name: "${fa_name}"
              en_name: "${en_name}"
              parent_category: "${parent_category}"
              }) {
                id
              }
            }`,
    });
  },
  categoryDelete: function (args = []) {
    const {
      categoryId,
    } = args;
    return request.post("/graphql", {
      query: `mutation {
        categoryDelete (input: {
            categoryId: "${categoryId}"
          }) {
            id
          }
        }`,
    });
  },
  categoryFindAll: function () {
    return request.post("/graphql", {
      query: `query {
                    categoryFindAll {
                      id
                      name
                      fa_name
                      en_name
                      icon_url
                      icon_url_fa
                      parent_category
                      full_fa_name
                    }
                }`,
    });
  },
  slideCreate: function (args = []) {
    const {
      title,
      description,
      language,
      imageUrl,
    } = args;
    return request.post("/graphql", {
      query: `mutation {
            slideCreate (input: {
              ${title ? `title: "${title}"` : ''}
              ${description ? `description: "${description}"` : ''}
              ${language ? `language: "${language}"` : ''}
              ${imageUrl ? `imageUrl: "${imageUrl}"` : ''}
              }) {
                id
              }
            }`,
    });
  },
  slideDelete: function (args = []) {
    const {
      slideId,
    } = args;
    return request.post("/graphql", {
      query: `mutation {
        slideDelete (input: {
            slideId: "${slideId}"
          }) {
            id
          }
        }`,
    });
  },
  slideFindAll: function () {
    return request.post("/graphql", {
      query: `query {
            slideFindAll {
              id
              title
              description
              language
              imageUrl
            }
        }`,
    });
  },
  shopRecommendedProducts: function (args = []) {
    const { offset, limit } = args;
    return request.post("/graphql", {
      query: `query {
              shopRecommendedProducts (query: {
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
                  price
                  realprice
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
  payPayment: function (args = []) {
    const { order } = args;
    return request.post("/pay/payment", {
      order: order,
    });
  },
  paymentFindUserPays: function (args = []) {
    const { status, offset, limit } = args;
    return request.post("/graphql", {
      query: `query {
                paymentFindUserPays (query: {
                  payment_status: "${status}"
                  pagination: {
                    limit: ${limit}
                    offset: ${offset}
                  }
                }) {
                  hits {
                    id
                    order_id
                    bank_res_code
                    payment_gateway
                    bank_reference_id
                    bank_order_id
                    paid_amount
                    payment_status
                    transaction_date
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
  permissionFindAll: function () {
    return request.post("/graphql", {
      query: `query {
            permissionFindAll {
              id
              codename
              persian_codename
            }
          }`,
    });
  },
};
