import request from "../request";

export default {
  upload: function (args = []) {
    const { fd } = args;
    return request.post("/main/upload", fd);
  },
  download: function (args = []) {
    const { filename } = args;
    return request.post("/main/upload/downlaod-file", { filename, responseType: 'blob' });
  },
  uploadDeleteFile: function (args = []) {
    const { filename } = args;
    return request.post("/main/upload/delete-file", { filename });
  },
  requestCallBack: function (args = []) {
    const { callbackLink } = args;
    return request.get(callbackLink);
  },
  getProvinces: function (args = []) {
    return request.get("/main/provinces");
  },
  getCities: function (args = []) {
    const { province_id } = args;

    return request.get("/main/cities", {
      params: {
        province_id
      }
    });
  },
  getPlans: function (args = []) {

    return request.get("/main/plans");
  },
  getService: function (args = []) {

    const { id = '' } = args;
    return request.post("/graphql", {
      query: `query {
                    serviceFind (query: {
                      id: "${id}"
                    }) {
                        id
                        codename
                        persian_codename
                        persian_accesses
                        accesses
                    }
                }`,
    });
  },
  getServices: function (args = []) {

    return request.post("/graphql", {
      query: `query {
                    serviceFindAll {
                        id
                        codename
                        persian_codename
                        persian_accesses
                        accesses
                    }
                }`,
    });
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
                        parent_id
                        full_fa_name
                    }
                }`,
    });
  },
  categoryFindByCategory: function (args = []) {
    const { categoryId, offset, limit, language } = args;
    return request.post("/graphql", {
      query: `query {
                categoryFindByCategory(query: {
                  categoryId: "${categoryId}"
                  ${language ? `language: "${language}"` : ''}
                  pagination: {
                    limit: ${limit}
                    offset: ${offset}
                  }
                }) {
                  id
                  name
                  fa_name
                  en_name
                  icon_url
                  parent_id
                  productIds {
                    pid
                    id
                    name
                    latlng
                    address
                    area
                    ownerInfo
                    price
                    pricePerMeter
                    areaOfBuilding
                    rooms
                    details
                    images {
                      url
                    }
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
              title: "${title}"
              language: "${language}"
              description: "${description}"
              imageUrl: "${imageUrl}"
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
  slideFindAll: function (args = []) {
    const {
      language,
    } = args;
    return request.post("/graphql", {
      query: `query {
            slideFindAll (query: {
              ${language ? `language: "${language}"` : ''}
            }) {
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
