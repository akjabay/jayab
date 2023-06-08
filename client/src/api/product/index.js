import request from "../request";

export default {
  productFind: function (args = []) {
    const { id } = args;
    return request.post("/graphql", {
      query: `query {
                productFind (id: "${id}") {
                  pid
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
  productFindComplete: function (args = []) {
    const { id, pid } = args;
    return request.post("/graphql", {
      query: `query {
                productFind (
                  ${id ? `id: "${id}"` : ''}
                  ${pid ? `pid: "${pid}"` : ''}
                ) {
                  pid
                  id
                  name
                  latlng
                  address
                  area
                  ownerInfo
                  isPublic
                  price
                  pricePerMeter
                  areaOfBuilding
                  rooms
                  details
                  images {
                    url
                  }
                  userId {
                    id
                    email
                    phone
                    name
                    username
                    avatar_url
                  }
                  createdAt
                  categoryId {
                    id
                    name
                    fa_name
                    en_name
                    icon_url
                    icon_url_fa
                    parent_id
                  }
                  likes {
                    users {
                      userId
                      likeTime
                    }
                    like
                  }
                }
              }`,
    });
  },
  productFindAll: function (args = []) {
    const {
      limit = '',
      offset = '',
      sorting = '',
      categoryId = '',
      latlng = '',
      maxDistance = '',
      isMap = false,
      area = '',
      pricePerMeter = '',
      areaOfBuilding = '',
      rooms = '',
      price = '',
    } = args;
    return request.post("/graphql", {
      query: `query {
          productFindAll (query: {
                sorting: "${sorting}"
                ${categoryId ? `categoryId: "${categoryId}"` : ''}
                latlng: "${latlng}"
                isMap: ${isMap}
                ${maxDistance ? `maxDistance: ${maxDistance}` : ''}
                ${area ? `area: "${area}"` : ''}
                ${pricePerMeter ? `pricePerMeter: "${pricePerMeter}"` : ''}
                ${areaOfBuilding ? `areaOfBuilding: "${areaOfBuilding}"` : ''}
                ${rooms ? `rooms: "${rooms}"` : ''}
                ${price ? `price: "${price}"` : ''}
                ${limit && offset ? `pagination: {
                  limit: ${limit}
                  offset: ${offset}
              }` : ''}
            }) {
                hits {
                    pid
                    id
                    name
                    latlng
                    address
                    area
                    ownerInfo
                    price
                    isPublic
                    pricePerMeter
                    areaOfBuilding
                    rooms
                    details
                    status
                    createdAt
                    images {
                      url
                    }
                    userId {
                        id
                        _id
                        username
                        name
                        email
                        phone
                        avatar_url
                    }
                    createdAt
                    categoryId {
                      id
                      _id
                      name
                      fa_name
                      en_name
                      icon_url
                      icon_url_fa
                      parent_id
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
  productFindMyProducts: function (args = []) {
    const {
      limit = '',
      offset = '',
      sorting = '',
      categoryId = '',
      latlng = '',
      maxDistance = '',
      isMap = false,
      area = '',
      pricePerMeter = '',
      areaOfBuilding = '',
      rooms = '',
      price = '',
    } = args;
    return request.post("/graphql", {
      query: `query {
          productFindMyProducts (query: {
                sorting: "${sorting}"
                ${categoryId ? `categoryId: "${categoryId}"` : ''}
                ${latlng ? `latlng: "${latlng}"` : ''}
                ${isMap ? `isMap: ${isMap}` : ''}
                ${maxDistance ? `maxDistance: "${maxDistance}"` : ''}
                ${area ? `area: "${area}"` : ''}
                ${pricePerMeter ? `pricePerMeter: "${pricePerMeter}"` : ''}
                ${areaOfBuilding ? `areaOfBuilding: "${areaOfBuilding}"` : ''}
                ${rooms ? `rooms: "${rooms}"` : ''}
                ${price ? `price: "${price}"` : ''}
                ${limit && offset ? `pagination: {
                  limit: ${limit}
                  offset: ${offset}
                }` : ''} 
            }) {
                hits {
                    pid
                    name
                    latlng
                    address
                    area
                    ownerInfo
                    price
                    isPublic
                    pricePerMeter
                    areaOfBuilding
                    rooms
                    details
                    status
                    createdAt
                    images {
                      url
                    }
                    userId {
                      id
                      username
                      name
                      email
                      phone
                      avatar_url
                    }
                    createdAt
                    categoryId {
                      id
                      name
                      fa_name
                      en_name
                      icon_url
                      icon_url_fa
                      parent_id
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
  productFindUserProducts: function (args = []) {
    const {
      limit = '',
      offset = '',
      sorting = '',
      userId = '',
      username = ''
    } = args;
    return request.post("/graphql", {
      query: `query {
          productFindUserProducts (query: {
                userId: "${userId}"
                username: "${username}"
                sorting: "${sorting}"
                ${limit && offset ? `pagination: {
                  limit: ${limit}
                  offset: ${offset}
                }` : ''} 
            }) {
                hits {
                    pid
                    name
                    latlng
                    address
                    area
                    ownerInfo
                    price
                    isPublic
                    pricePerMeter
                    areaOfBuilding
                    rooms
                    details
                    status
                    createdAt
                    images {
                      url
                    }
                    userId {
                      id
                      username
                      name
                      email
                      phone
                      avatar_url
                    }
                    createdAt
                    categoryId {
                      id
                      name
                      fa_name
                      en_name
                      icon_url
                      icon_url_fa
                      parent_id
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
  productCreate: function (args = []) {
    const {
      latlng,
      name,
      address,
      area,
      pricePerMeter,
      areaOfBuilding,
      rooms,
      details,
      ownerInfo,
      price,
      imageUrls,
      categoryId,
    } = args;

    const modifiedDetails = details.split('\n').join('- ');
    return request.post("/graphql", {
      query: `mutation {
          productCreate (input: {
            ${latlng ? `latlng: "${latlng}"` : ''}
            ${name ? `name: "${name}"` : ''}
            ${address ? `address: "${address}"` : ''}
            ${area ? `area: "${area}"` : ''}
            ${ownerInfo ? `ownerInfo: "${ownerInfo}"` : ''}
            ${price ? `price: "${price}"` : ''}
            ${imageUrls ? `imageUrls: "${imageUrls}"` : ''}
            ${pricePerMeter ? `pricePerMeter: "${pricePerMeter}"` : ''}
            ${areaOfBuilding ? `areaOfBuilding: "${areaOfBuilding}"` : ''}
            ${rooms ? `rooms: ${rooms}` : ''}
            ${details ? `details: "${modifiedDetails}"` : ''}
            ${categoryId ? `categoryId: "${categoryId}"` : ''}
          }) {
            id
          }
        }`,
    });
  },
  productDelete: function (args = []) {
    const {
      id
    } = args;
    return request.post("/graphql", {
      query: `mutation {
        productDelete (input: {
                  id: "${id}"
                }) {
                  id
                }
              }`,
    });
  },
  productUpdate: function (args = []) {
    const {
      id,
      pid,
      latlng,
      name,
      address,
      area,
      pricePerMeter,
      areaOfBuilding,
      rooms,
      details,
      ownerInfo,
      price,
      imageUrls,
      categoryId,
      isPublic = undefined
    } = args;
    return request.post("/graphql", {
      query: `mutation {
                productUpdate (input: {
                  ${id ? `id: "${id}"` : ''}
                  ${pid ? `pid: "${pid}"` : ''}
                  ${latlng ? `latlng: "${latlng}"` : ''}
                  ${name ? `name: "${name}"` : ''}
                  ${address ? `address: "${address}"` : ''}
                  ${area ? `area: "${area}"` : ''}
                  ${ownerInfo ? `ownerInfo: "${ownerInfo}"` : ''}
                  ${price ? `price: "${price}"` : ''}
                  ${imageUrls ? `imageUrls: "${imageUrls}"` : ''}
                  ${pricePerMeter ? `pricePerMeter: "${pricePerMeter}"` : ''}
                  ${areaOfBuilding ? `areaOfBuilding: "${areaOfBuilding}"` : ''}
                  ${rooms ? `rooms: ${rooms}` : ''}
                  ${details ? `details: "${details}"` : ''}
                  ${categoryId ? `categoryId: "${categoryId}"` : ''}
                  ${isPublic !== undefined ? `isPublic: ${isPublic}` : ''}
                }) {
                  id
                }
              }`,
    });
  },

}