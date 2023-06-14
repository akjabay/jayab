import{api as a}from"./axios.0e7880b2.js";import{b as h}from"./use-dark.d08f1f81.js";function _(){const t=h(),e=t.authToken,r=t.isUserLoggedIn;return e&&r?{headers:{authorization:e}}:{headers:{authorization:null}}}a.interceptors.request.use(function(t){return t.headers=_().headers,t},function(t){return Promise.reject(t)});a.getImageUrl=(t,e,r,i,n)=>{const s=n?"/public/":i?"/public/wmd/":r?"/public/wsm/":t.gt.sm?"/public/":"/public/wmd/";return a.defaults.baseURL+s+e};a.interceptors.response.use(function(t){return t},function(t){return Promise.reject(t)});var I={authLogin:function(t=[]){const{login_type:e,user:r,password:i}=t;return a.post("/graphql",{query:`query {
          authLogin (query: {
            ${e}: "${r}"
            password: "${i}"
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
        }`})},authSignup:function(t=[]){const{email:e,phone:r="",address:i="",cityId:n="",name:s,password:o}=t;return a.post("/graphql",{query:`mutation {
          authSignup (input: {
              email: "${e}"
              phone: "${r}"
              address: "${i}"
              name: "${s}"
              password: "${o}"
              ${n?`cityId: ${n}`:""}
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
          }`})},authVerify:function(t=[]){const{email:e,password:r,code:i}=t;return a.post("/graphql",{query:`mutation {
          authVerify (input: {
              email: "${e}"
              password: "${r}"
              code: "${i}"
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
              }
              token
            }
          }`})},authResetPassword:function(t=[]){const{email:e}=t;return a.post("/graphql",{query:`mutation {
        authResetPassword (input: {
              email: "${e}"
            }) {
              id
              email
            }
          }`})},authUpdate:function(t=[]){const{username:e,name:r,bio:i,avatar_url:n,password:s,new_password:o,address:u,cityId:d,commissionExpire:p,commissionLimit:m,commissionPercentage:l}=t;return a.post("/graphql",{query:`mutation {
              authUpdate (input: {
                  ${e?`username: "${e}"`:""}
                  ${r?`name: "${r}"`:""}
                  ${i?`bio: "${i}"`:""}
                  ${n?`avatar_url: "${n}"`:""}
                  ${s?`password: "${s}"`:""}
                  ${o?`new_password: "${o}"`:""}
                  ${u?`address: "${u}"`:""}
                  ${d?`cityId: ${d}`:""}
                  ${p?`commissionExpire: "${p}"`:""}
                  ${m?`commissionLimit: ${m}`:""}
                  ${l?`commissionPercentage: ${l}`:""}
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
              }`})},authResetPasswordVerify:function(t=[]){const{email:e,password:r,code:i}=t;return a.post("/graphql",{query:`mutation {
        authResetPasswordVerify (input: {
              email: "${e}"
              code: "${i}"
              password: "${r}"
            }) {
              id
              email
            }
          }`})},authCheckUsername:function(t=[]){const{username:e}=t;return a.post("/graphql",{query:`query {
          authCheckUsername (username: "${e}")
        }`})},authFindMe:function(){return a.post("/graphql",{query:`query {
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
          }`})},authEditProfile:function(t=[]){const{username:e="",name:r,address:i,password:n}=t;return a.post("/graphql",{query:`mutation {
        authEditProfile (input: {
              ${r?`name: "${r}"`:""}
              ${e?`username: "${e}"`:""}
              ${i?`address: "${i}"`:""}
              ${n?`password: "${n}"`:""}
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
          }`})}},F={userUpdate:function(t=[]){const{username:e,name:r,bio:i,avatar_url:n,password:s,new_password:o,address:u,cityId:d,commissionExpire:p,commissionLimit:m,commissionPercentage:l}=t;return a.post("/graphql",{query:`mutation {
              userUpdate (input: {
                  ${e?`username: "${e}"`:""}
                  ${r?`name: "${r}"`:""}
                  ${i?`bio: "${i}"`:""}
                  ${n?`avatar_url: "${n}"`:""}
                  ${s?`password: "${s}"`:""}
                  ${o?`new_password: "${o}"`:""}
                  ${u?`address: "${u}"`:""}
                  ${d?`cityId: ${d}`:""}
                  ${p?`commissionExpire: "${p}"`:""}
                  ${m?`commissionLimit: ${m}`:""}
                  ${l?`commissionPercentage: ${l}`:""}
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
              }`})},userUpdateAdmin:function(t=[]){const{id:e,phone:r,email:i,name:n,password:s,new_password:o,permissions:u}=t;return a.post("/graphql",{query:`mutation {
            userUpdate (input: {
                id: "${e}"
                phone: "${r}"
                email: "${i}"
                name: "${n}"
                password: "${s}"
                new_password: "${o}"
                permissions: "${u}"
              }) {
                id
                username
              }
          }`})},userActivateService:function(t=[]){const{serviceId:e="",planId:r="",duration:i=""}=t;return a.post("/graphql",{query:`mutation {
        userActivateService (input: {
                  serviceId: "${e}"
                  planId: "${r}"
                  duration: "${i}"
            }) {
              id
              username
              createdAt
              status_auth
              subscriptions {
                planId {
                  id
                }
                serviceId {
                  id
                }
                duration
                payedDate
                expiresAt
                status
              }
            }
          }`})},userUpdateStatus:function(t=[]){const{id:e,status_auth:r}=t;return a.post("/graphql",{query:`mutation {
              userUpdate (input: {
                  id: "${e}"
                  status_auth: ${r}
              }) {
              id
              username
              createdAt
              status_auth
              permissions{
                  id
                  codename
                  persian_codename
              }
            }
          }`})},userAddCartToCart:function(t=[]){const{items:e}=t;return a.post("/graphql",{query:`mutation {
                userAddCartToCart (
                    input: ${JSON.stringify(e).replace(/"([^"]+)":/g,"$1:")}) {
              id
              cart {
              items {
                  productId
                  quantity
              }
              }
          }
      }`})},userAddToCart:function(t=[]){const{id:e,pid:r}=t;let i="";return e?i=`id: "${e}"`:i=`pid: "${r}"`,a.post("/graphql",{query:`mutation {
              userAddToCart (${i}) {
                id
                cart {
                    items {
                      productId
                      quantity
                    }
                }
              }
            }`})},userMinusFromCart:function(t=[]){const{id:e,pid:r}=t;let i="";return e?i=`id: "${e}"`:i=`pid: "${r}"`,a.post("/graphql",{query:`mutation {
                  userMinusFromCart (${i}) {
                    id
                    cart {
                      items {
                        productId
                        quantity
                      }
                    }
                  }
                }`})},userAddToLikes:function(t=[]){const{id:e}=t;return a.post("/graphql",{query:`mutation {
              userAddToLikes (id: "${e}") {
                id
                likes {
                  items {
                    productId {
                      _id
                    }
                    likeTime
                  }
                }
              }
            }`})},userRemoveFromLikes:function(t=[]){const{id:e}=t;return a.post("/graphql",{query:`mutation {
              userRemoveFromLikes (id: "${e}") {
                id
                likes {
                  items {
                    productId {
                      _id
                    }
                    likeTime
                  }
                }
              }
            }`})},userFind:function(t=[]){const{id:e,email:r,username:i}=t;return a.post("/graphql",{query:`query {
            userFind (query: {
              ${e?`id: "${e}"`:""}
              ${r?`email: "${r}"`:""}
              ${i?`username: "${i}"`:""}
            }) {
              id
              avatar_url
              name
              phone
              username
              createdAt
              status_auth
              email
              address
              city {
                id
                province_id
                name
                lat_long
              }
              commissionExpire
              commissionLimit
              commissionPercentage
              permissions {
                  id
                  codename
                  persian_codename
              }
            }
          }`})},userSearch:function(t=[]){const{searchText:e,offset:r,limit:i}=t;return a.post("/graphql",{query:`query {
                    userSearch (query: {
                        searchText: "${e}"
                        pagination: {
                            limit: ${i}
                            offset: ${r}
                        }
                    }) {
                        hits {
                            id
                            avatar_url
                            username
                            name
                        }
                        pagination {
                            limit
                            offset
                            total
                        }
                    }
                }`})},userFindMyLikes:function(t=[]){const{offset:e,limit:r}=t;return a.post("/graphql",{query:`query {
          userFindMyLikes (query: {
                pagination: {
                    limit: ${r}
                    offset: ${e}
                }
            }) {
                hits {
                  postId {
                    pid
                    title
                  }
                  productId {
                    pid
                    title
                  }
                  ticketId {
                    pid
                    title
                  }
                  likeTime
                }
                pagination {
                    limit
                    offset
                    total
                }
            }
        }`})},userSearchAdmin:function(t=[]){const{searchText:e,offset:r,limit:i}=t;return a.post("/graphql",{query:`query {
                userSearch (query: {
                  searchText: "${e}"
                  pagination: {
                    offset: ${r}
                    limit: ${i}
                  }
                }) {
                  hits {
                    id
                    username
                    createdAt
                    status_auth
                    phone
                    email
                    permissions{
                        id
                        codename
                        persian_codename
                    }
                  }
                  pagination {
                    limit
                    offset
                    total
                  }
                }
              }`})},userFindAll:function(t=[]){const{offset:e,limit:r}=t;return a.post("/graphql",{query:`query {
                userFindAll (query: {
                  pagination: {
                    offset: ${e}
                    limit: ${r}
                  }
                }) {
                  hits {
                    id
                    username
                    telegramId
                    createdAt
                    status_auth
                    email
                    phone
                    permissions {
                        id
                        codename
                        persian_codename
                    }
                  }
                  pagination {
                    limit
                    offset
                    total
                  }
                }
              }`})},userFindByUsername:function(t=[]){const{username:e}=t;return a.post("/graphql",{query:`query {
                userFindByUsername (username: "${e}") {
                  id
                  username
                  avatar_url
                }
              }`})},userDelete:function(t=[]){const{id:e}=t;return a.post("/graphql",{query:`mutation {
                  userDelete (input: {
                      id: "${e}"
                  }) {
                  id
                  username
                }
              }`})},userCreate:function(t=[]){const{signup_type:e,user:r,username:i,name:n,password:s}=t;return a.post("/graphql",{query:`mutation {
                userCreate (input: {
                    ${e}: "${r}"
                    name: "${i}"
                    username: "${n}"
                    password: "${s}"
                  }) {
                    id
                    username
                  }
                }`})}},A={orderFind:function(t=[]){const{id:e}=t;return a.post("/graphql",{query:`query {
            orderFind (id: "${e}") {
              id
              paymentWallet
              transactionHash
              payedAmountFromUser
              payedCommissionAmount
              productId {
                id
                name
                email
                uid
                token
                configUrl
                status
              }
              userId {
                  id
                  name
                  email
                  avatar_url
              }
              status
              expireDate
              updatedAt
              createdAt
            }
          }`})},orderFindComplete:function(t=[]){const{id:e}=t;return a.post("/graphql",{query:`query {
            orderFind (id: "${e}") {
              id
              paymentWallet
              transactionHash
              payedAmountFromUser
              payedCommissionAmount
              productId {
                id
                name
                email
                uid
                token
                configUrl
                status
              }
              userId {
                  id
                  name
                  email
                  avatar_url
              }
              status
              expireDate
              updatedAt
              createdAt
            }
          }`})},orderFindUserOrders:function(t=[]){const{status:e,offset:r,limit:i}=t;return a.post("/graphql",{query:`query {
            orderFindUserOrders (query: {
              order_status: "${e}"
              pagination: {
                limit: ${i}
                offset: ${r}
              }
            }) {
              hits {
                id
                paymentWallet
                transactionHash
                payedAmountFromUser
                payedCommissionAmount
                productId {
                  id
                  name
                  email
                  uid
                  token
                  configUrl
                  status
                }
                userId {
                    id
                    name
                    email
                    avatar_url
                }
                status
                expireDate
                updatedAt
                createdAt
              }
              pagination {
                limit
                offset
                total
              }
            }
          }`})},orderShopSellData:function(t=[]){const{duration:e}=t;return a.post("/graphql",{query:`query {
                orderShopSellData (query: {
                    duration: "${e}"
                }) {
                    data {
                        data
                        status
                    }
                    dataSet
                }
            }`})},orderShopPayWaitings:function(t=[]){const{offset:e,limit:r}=t;return a.post("/graphql",{query:`query {
            orderShopPayWaitings (query: {
                pagination: {
                    limit: ${r}
                    offset: ${e}
                }
            }) {
                hits {
                    id
                    products {
                        product {
                            pid
                            title
                            price
                            realprice
                            deadline_date
                            amount
                            thumbnail
                        }
                        quantity
                    }
                    order_amount
                    userId {
                        id
                        name
                        email
                        avatar_url
                    }
                    order_status
                    order_amount_payment {
                        userId
                        amount
                        payment_status
                    }
                    transactionId {
                        id
                    }
                    shop_amount
                }
                pagination {
                    limit
                    offset
                    total
                }
            }
        }`})},orderFindShopOrders:function(t=[]){const{offset:e,limit:r,shop_order_status:i}=t;return a.post("/graphql",{query:`query {
            orderFindShopOrders (query: {
                shop_order_status: "${i}"
                pagination: {
                    limit: ${r}
                    offset: ${e}
                }
            }) {
                hits {
                  id
                  paymentWallet
                  transactionHash
                  payedAmountFromUser
                  payedCommissionAmount
                  productId {
                    id
                    name
                    email
                    uid
                    token
                    configUrl
                    status
                  }
                  userId {
                      id
                      name
                      email
                      avatar_url
                  }
                  status
                  expireDate
                  updatedAt
                  createdAt
                }
                pagination {
                    limit
                    offset
                    total
                }
            }
        }`})},orderFindShopSellsCount:function(){return a.post("/graphql",{query:`query {
            orderFindShopSellsCount {
              totalSells
              totalProducts
            }
          }`})},orderFindShopOrdersCount:function(){return a.post("/graphql",{query:`query {
            orderFindShopOrdersCount {
              waitingToSend
              todayWaitingToSend
              sent
              finished
              rejected
              payedBack
              total
            }
          }`})},orderFindShopPaysCount:function(){return a.post("/graphql",{query:`query {
            orderFindShopPaysCount {
              totalSell
              totalPay
            }
          }`})},orderFindUserOrdersCounts:function(){return a.post("/graphql",{query:`query {
            orderFindUserOrdersCounts {
              waitingToPay
              payed
              sent
              finished
              rejected
              payedBack
              total
            }
          }`})},orderCreateFromCart:function(t=[]){const{product_items:e}=t;return a.post("/graphql",{query:`mutation {
            orderCreateFromCart (input: {
              product_items: ${JSON.stringify(e).replace(/"([^"]+)":/g,"$1:")}
            }) {
              id
              products {
                product {
                  id
                }
                quantity
              }
            }
          }`})},orderFindAll:function(t=[]){const{limit:e,offset:r}=t;return a.post("/graphql",{query:`query {
        orderFindAll (query: {
            pagination: {
              limit: ${e}
              offset: ${r}
            }
        }) {
            hits {
                id
                paymentWallet
                transactionHash
                payedAmountFromUser
                payedCommissionAmount
                productId {
                  id
                  name
                  email
                  uid
                  token
                  configUrl
                  status
                }
                userId {
                    id
                    name
                    email
                    avatar_url
                }
                status
                expireDate
                updatedAt
                createdAt
            }
            pagination {
                limit
                offset
                total
            }
        }
      }`})},reportOrder:function(t=[]){const{queryOptions:e}=t;return a.post("/graphql",{query:`query {
        reportOrder(query: {
          ${e}
        }) {
          id
          date
          amount
          label
        }
      }`})}},P={productFind:function(t=[]){const{id:e}=t;return a.post("/graphql",{query:`query {
                productFind (id: "${e}") {
                  pid
                  id
                  categoryId {
                    id
                    name
                    fa_name
                  }
                }
              }`})},productFindComplete:function(t=[]){const{id:e,pid:r}=t;return a.post("/graphql",{query:`query {
                productFind (
                  ${e?`id: "${e}"`:""}
                  ${r?`pid: "${r}"`:""}
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
              }`})},productFindAll:function(t=[]){const{limit:e="",offset:r="",sorting:i="",categoryId:n="",latlng:s="",maxDistance:o="",isMap:u=!1,area:d="",pricePerMeter:p="",areaOfBuilding:m="",rooms:l="",price:c=""}=t;return a.post("/graphql",{query:`query {
          productFindAll (query: {
                sorting: "${i}"
                ${n?`categoryId: "${n}"`:""}
                latlng: "${s}"
                isMap: ${u}
                ${o?`maxDistance: ${o}`:""}
                ${d?`area: "${d}"`:""}
                ${p?`pricePerMeter: "${p}"`:""}
                ${m?`areaOfBuilding: "${m}"`:""}
                ${l?`rooms: "${l}"`:""}
                ${c?`price: "${c}"`:""}
                ${e&&r?`pagination: {
                  limit: ${e}
                  offset: ${r}
              }`:""}
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
            }`})},productFindMyProducts:function(t=[]){const{limit:e="",offset:r="",sorting:i="",categoryId:n="",latlng:s="",maxDistance:o="",isMap:u=!1,area:d="",pricePerMeter:p="",areaOfBuilding:m="",rooms:l="",price:c=""}=t;return a.post("/graphql",{query:`query {
          productFindMyProducts (query: {
                sorting: "${i}"
                ${n?`categoryId: "${n}"`:""}
                ${s?`latlng: "${s}"`:""}
                ${u?`isMap: ${u}`:""}
                ${o?`maxDistance: "${o}"`:""}
                ${d?`area: "${d}"`:""}
                ${p?`pricePerMeter: "${p}"`:""}
                ${m?`areaOfBuilding: "${m}"`:""}
                ${l?`rooms: "${l}"`:""}
                ${c?`price: "${c}"`:""}
                ${e&&r?`pagination: {
                  limit: ${e}
                  offset: ${r}
                }`:""} 
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
                    thumbnail
                    categoryId {
                      id
                      name
                      fa_name
                      en_name
                      icon_url
                      icon_url_fa
                      parent_id
                    }
                    status
                    estate
                }
                pagination {
                    limit
                    offset
                    total
                }
              }
            }`})},productFindUserProducts:function(t=[]){const{limit:e="",offset:r="",sorting:i="",userId:n="",username:s=""}=t;return a.post("/graphql",{query:`query {
          productFindUserProducts (query: {
                userId: "${n}"
                username: "${s}"
                sorting: "${i}"
                ${e&&r?`pagination: {
                  limit: ${e}
                  offset: ${r}
                }`:""} 
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
            }`})},productCreate:function(t=[]){const{latlng:e,name:r,address:i,area:n,pricePerMeter:s,areaOfBuilding:o,rooms:u,details:d,ownerInfo:p,price:m,imageUrls:l,categoryId:c,status:$=""}=t,f=d.split(`
`).join("- ");return a.post("/graphql",{query:`mutation {
          productCreate (input: {
            ${e?`latlng: "${e}"`:""}
            ${r?`name: "${r}"`:""}
            ${i?`address: "${i}"`:""}
            ${n?`area: "${n}"`:""}
            ${p?`ownerInfo: "${p}"`:""}
            ${m?`price: "${m}"`:""}
            ${l?`imageUrls: "${l}"`:""}
            ${s?`pricePerMeter: "${s}"`:""}
            ${o?`areaOfBuilding: "${o}"`:""}
            ${u?`rooms: ${u}`:""}
            ${d?`details: "${f}"`:""}
            ${c?`categoryId: "${c}"`:""}
            ${$?`status: "${$}"`:""}
          }) {
            id
          }
        }`})},productDelete:function(t=[]){const{id:e}=t;return a.post("/graphql",{query:`mutation {
        productDelete (input: {
                  id: "${e}"
                }) {
                  id
                }
              }`})},productUpdate:function(t=[]){const{id:e,pid:r,latlng:i,name:n,address:s,area:o,pricePerMeter:u,areaOfBuilding:d,rooms:p,details:m,ownerInfo:l,price:c,imageUrls:$,categoryId:f,isPublic:g=void 0,status:y="",estate:q=""}=t;return a.post("/graphql",{query:`mutation {
                productUpdate (input: {
                  ${e?`id: "${e}"`:""}
                  ${r?`pid: "${r}"`:""}
                  ${i?`latlng: "${i}"`:""}
                  ${n?`name: "${n}"`:""}
                  ${s?`address: "${s}"`:""}
                  ${o?`area: "${o}"`:""}
                  ${l?`ownerInfo: "${l}"`:""}
                  ${c?`price: "${c}"`:""}
                  ${$?`imageUrls: "${$}"`:""}
                  ${u?`pricePerMeter: "${u}"`:""}
                  ${d?`areaOfBuilding: "${d}"`:""}
                  ${p?`rooms: ${p}`:""}
                  ${m?`details: "${m}"`:""}
                  ${f?`categoryId: "${f}"`:""}
                  ${y?`status: "${y}"`:""}
                  ${q?`estate: "${q}"`:""}
                  ${g!==void 0?`isPublic: ${g}`:""}
                }) {
                  id
                }
              }`})}},v={mapFind:function(t=[]){const{type:e}=t;return a.post("/graphql",{query:`query {
            mapFind (query: {
              type: "${e}"
            }) {
              position
              lat
              lon
              speed
              direction
            }
          }`})}},w={upload:function(t=[]){const{fd:e}=t;return a.post("/main/upload",e)},download:function(t=[]){const{filename:e}=t;return a.post("/main/upload/downlaod-file",{filename:e,responseType:"blob"})},uploadDeleteFile:function(t=[]){const{filename:e}=t;return a.post("/main/upload/delete-file",{filename:e})},requestCallBack:function(t=[]){const{callbackLink:e}=t;return a.get(e)},getProvinces:function(t=[]){return a.get("/main/provinces")},getCities:function(t=[]){const{province_id:e}=t;return a.get("/main/cities",{params:{province_id:e}})},getPlans:function(t=[]){return a.get("/main/plans")},getService:function(t=[]){const{id:e=""}=t;return a.post("/graphql",{query:`query {
                    serviceFind (query: {
                      id: "${e}"
                    }) {
                        id
                        codename
                        persian_codename
                        persian_accesses
                        accesses
                    }
                }`})},getServices:function(t=[]){return a.post("/graphql",{query:`query {
                    serviceFindAll {
                        id
                        codename
                        persian_codename
                        persian_accesses
                        accesses
                    }
                }`})},paymentFindUserPaysCounts:function(){return a.post("/graphql",{query:`query {
                paymentFindUserPaysCounts {
                  successPay
                  unsuccessPay
                  total
                }
              }`})},categoryFindAll:function(){return a.post("/graphql",{query:`query {
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
                }`})},categoryFindByCategory:function(t=[]){const{categoryId:e,offset:r,limit:i,language:n}=t;return a.post("/graphql",{query:`query {
                categoryFindByCategory(query: {
                  categoryId: "${e}"
                  ${n?`language: "${n}"`:""}
                  pagination: {
                    limit: ${i}
                    offset: ${r}
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
            }`})},slideCreate:function(t=[]){const{title:e,description:r,language:i,imageUrl:n}=t;return a.post("/graphql",{query:`mutation {
            slideCreate (input: {
              title: "${e}"
              language: "${i}"
              description: "${r}"
              imageUrl: "${n}"
              }) {
                id
              }
            }`})},slideDelete:function(t=[]){const{slideId:e}=t;return a.post("/graphql",{query:`mutation {
        slideDelete (input: {
            slideId: "${e}"
          }) {
            id
          }
        }`})},slideFindAll:function(t=[]){const{language:e}=t;return a.post("/graphql",{query:`query {
            slideFindAll (query: {
              ${e?`language: "${e}"`:""}
            }) {
              id
              title
              description
              language
              imageUrl
            }
        }`})},shopRecommendedProducts:function(t=[]){const{offset:e,limit:r}=t;return a.post("/graphql",{query:`query {
              shopRecommendedProducts (query: {
                pagination: {
                  limit: ${r}
                  offset: ${e}
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
            }`})},payPayment:function(t=[]){const{order:e}=t;return a.post("/pay/payment",{order:e})},paymentFindUserPays:function(t=[]){const{status:e,offset:r,limit:i}=t;return a.post("/graphql",{query:`query {
                paymentFindUserPays (query: {
                  payment_status: "${e}"
                  pagination: {
                    limit: ${i}
                    offset: ${r}
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
              }`})},permissionFindAll:function(){return a.post("/graphql",{query:`query {
            permissionFindAll {
              id
              codename
              persian_codename
            }
          }`})}},S={auth:I,user:F,order:A,map:v,product:P,main:w};export{S as a};
