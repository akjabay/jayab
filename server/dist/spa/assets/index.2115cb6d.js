import{h as m,c as l}from"./index.9f5cea10.js";import"./request.cab34313.js";import{api as i}from"./axios.37489ddf.js";const c=m("div",{class:"q-space"});var k=l({name:"QSpace",setup(){return()=>c}}),y={authLogin:function(e=[]){const{login_type:t,user:r,password:a}=e;return i.post("/graphql",{query:`query {
          authLogin (query: {
            ${t}: "${r}"
            password: "${a}"
          }) {
            user {
              id
              name
              username
              address
              phone
              email
              status_auth
              avatar_url
              is_superuser
            }
            token
          }
        }`})},authSignup:function(e=[]){const{email:t,phone:r="",address:a="",name:n,password:o}=e;return i.post("/graphql",{query:`mutation {
          authSignup (input: {
              email: "${t}"
              phone: "${r}"
              address: "${a}"
              name: "${n}"
              password: "${o}"
            }) {
              id
              name
              username
              phone
              address
              email
              status_auth
              avatar_url
              updatedAt
            }
          }`})},authVerify:function(e=[]){const{email:t,password:r,code:a}=e;return i.post("/graphql",{query:`mutation {
          authVerify (input: {
              email: "${t}"
              password: "${r}"
              code: "${a}"
            }) {
              user {
                id
                name
                username
                address
                phone
                email
                status_auth
                avatar_url
              }
              token
            }
          }`})},authResetPassword:function(e=[]){const{email:t}=e;return i.post("/graphql",{query:`mutation {
        authResetPassword (input: {
              email: "${t}"
            }) {
              id
              email
            }
          }`})},authResetPasswordVerify:function(e=[]){const{email:t,password:r,code:a}=e;return i.post("/graphql",{query:`mutation {
        authResetPasswordVerify (input: {
              email: "${t}"
              code: "${a}"
              password: "${r}"
            }) {
              id
              email
            }
          }`})},authCheckUsername:function(e=[]){const{username:t}=e;return i.post("/graphql",{query:`query {
          authCheckUsername (username: "${t}")
        }`})},authFindMe:function(){return i.post("/graphql",{query:`query {
            authFindMe {
              id
              name
              username
              address
              phone
              email
              status_auth
              avatar_url
              is_superuser
            }
          }`})},authEditProfile:function(e=[]){const{username:t="",name:r,address:a,password:n}=e;return i.post("/graphql",{query:`mutation {
        authEditProfile (input: {
              ${r?`name: "${r}"`:""}
              ${t?`username: "${t}"`:""}
              ${a?`address: "${a}"`:""}
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
          }`})}},f={userUpdate:function(e=[]){const{username:t,name:r,bio:a,avatar_url:n,password:o,new_password:s,commissionExpire:u,commissionLimit:d,commissionPercentage:p}=e;return i.post("/graphql",{query:`mutation {
              userUpdate (input: {
                  ${t?`username: "${t}"`:""}
                  ${r?`name: "${r}"`:""}
                  ${a?`bio: "${a}"`:""}
                  ${n?`avatar_url: "${n}"`:""}
                  ${o?`password: "${o}"`:""}
                  ${s?`new_password: "${s}"`:""}
                  ${u?`commissionExpire: "${u}"`:""}
                  ${d?`commissionLimit: ${d}`:""}
                  ${p?`commissionPercentage: ${p}`:""}
                }) {
                  id
                  name
                  username
                  phone
                  email
                  status_auth
                  avatar_url
                  commissionExpire
                  commissionLimit
                  commissionPercentage
                }
              }`})},userUpdateAdmin:function(e=[]){const{id:t,phone:r,email:a,name:n,password:o,new_password:s,permissions:u}=e;return i.post("/graphql",{query:`mutation {
            userUpdate (input: {
                id: "${t}"
                phone: "${r}"
                email: "${a}"
                name: "${n}"
                password: "${o}"
                new_password: "${s}"
                permissions: "${u}"
              }) {
                id
                username
              }
          }`})},userUpdateStatus:function(e=[]){const{id:t,status_auth:r}=e;return i.post("/graphql",{query:`mutation {
              userUpdate (input: {
                  id: "${t}"
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
          }`})},userAddCartToCart:function(e=[]){const{items:t}=e;return i.post("/graphql",{query:`mutation {
                userAddCartToCart (
                    input: ${JSON.stringify(t).replace(/"([^"]+)":/g,"$1:")}) {
                    id
                    cart {
                    items {
                        productId
                        quantity
                    }
                    }
                }
            }`})},userAddToCart:function(e=[]){const{id:t,pid:r}=e;let a="";return t?a=`id: "${t}"`:a=`pid: "${r}"`,i.post("/graphql",{query:`mutation {
              userAddToCart (${a}) {
                id
                cart {
                    items {
                      productId
                      quantity
                    }
                }
              }
            }`})},userMinusFromCart:function(e=[]){const{id:t,pid:r}=e;let a="";return t?a=`id: "${t}"`:a=`pid: "${r}"`,i.post("/graphql",{query:`mutation {
                  userMinusFromCart (${a}) {
                    id
                    cart {
                      items {
                        productId
                        quantity
                      }
                    }
                  }
                }`})},userAddToLikes:function(e=[]){const{id:t}=e;return i.post("/graphql",{query:`mutation {
              userAddToLikes (id: "${t}") {
                id
                likes {
                  items {
                    postId {
                      id
                    }
                    productId {
                      id
                    }
                    ticketId {
                      id
                    }
                    likeTime
                  }
                }
              }
            }`})},userRemoveFromLikes:function(e=[]){const{id:t}=e;return i.post("/graphql",{query:`mutation {
              userRemoveFromLikes (id: "${t}") {
                id
                likes {
                  items {
                    postId {
                      id
                    }
                    productId {
                      id
                    }
                    ticketId {
                      id
                    }
                    likeTime
                  }
                }
              }
            }`})},userFind:function(e=[]){const{id:t,email:r}=e;return i.post("/graphql",{query:`query {
            userFind (query: {
              ${t?`id: "${t}"`:""}
              ${r?`email: "${r}"`:""}
            }) {
              id
              name
              phone
              username
              createdAt
              status_auth
              email
              commissionExpire
              commissionLimit
              commissionPercentage
              permissions {
                  id
                  codename
                  persian_codename
              }
            }
          }`})},userSearch:function(e=[]){const{searchText:t,offset:r,limit:a}=e;return i.post("/graphql",{query:`query {
                    userSearch (query: {
                        searchText: "${t}"
                        pagination: {
                            limit: ${a}
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
                }`})},userFindMyLikes:function(e=[]){const{offset:t,limit:r}=e;return i.post("/graphql",{query:`query {
          userFindMyLikes (query: {
                pagination: {
                    limit: ${r}
                    offset: ${t}
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
        }`})},userSearchAdmin:function(e=[]){const{searchText:t,offset:r,limit:a}=e;return i.post("/graphql",{query:`query {
                userSearch (query: {
                  searchText: "${t}"
                  pagination: {
                    offset: ${r}
                    limit: ${a}
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
              }`})},userFindAll:function(e=[]){const{offset:t,limit:r}=e;return i.post("/graphql",{query:`query {
                userFindAll (query: {
                  pagination: {
                    offset: ${t}
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
              }`})},userFindByUsername:function(e=[]){const{username:t}=e;return i.post("/graphql",{query:`query {
                userFindByUsername (username: "${t}") {
                  id
                  username
                  avatar_url
                }
              }`})},userDelete:function(e=[]){const{id:t}=e;return i.post("/graphql",{query:`mutation {
                  userDelete (input: {
                      id: "${t}"
                  }) {
                  id
                  username
                }
              }`})},userCreate:function(e=[]){const{signup_type:t,user:r,username:a,name:n,password:o}=e;return i.post("/graphql",{query:`mutation {
                userCreate (input: {
                    ${t}: "${r}"
                    name: "${a}"
                    username: "${n}"
                    password: "${o}"
                  }) {
                    id
                    username
                  }
                }`})}},q={orderFind:function(e=[]){const{id:t}=e;return i.post("/graphql",{query:`query {
            orderFind (id: "${t}") {
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
          }`})},orderFindComplete:function(e=[]){const{id:t}=e;return i.post("/graphql",{query:`query {
            orderFind (id: "${t}") {
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
          }`})},orderFindUserOrders:function(e=[]){const{status:t,offset:r,limit:a}=e;return i.post("/graphql",{query:`query {
            orderFindUserOrders (query: {
              order_status: "${t}"
              pagination: {
                limit: ${a}
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
          }`})},orderShopSellData:function(e=[]){const{duration:t}=e;return i.post("/graphql",{query:`query {
                orderShopSellData (query: {
                    duration: "${t}"
                }) {
                    data {
                        data
                        status
                    }
                    dataSet
                }
            }`})},orderShopPayWaitings:function(e=[]){const{offset:t,limit:r}=e;return i.post("/graphql",{query:`query {
            orderShopPayWaitings (query: {
                pagination: {
                    limit: ${r}
                    offset: ${t}
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
        }`})},orderFindShopOrders:function(e=[]){const{offset:t,limit:r,shop_order_status:a}=e;return i.post("/graphql",{query:`query {
            orderFindShopOrders (query: {
                shop_order_status: "${a}"
                pagination: {
                    limit: ${r}
                    offset: ${t}
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
        }`})},orderFindShopSellsCount:function(){return i.post("/graphql",{query:`query {
            orderFindShopSellsCount {
              totalSells
              totalProducts
            }
          }`})},orderFindShopOrdersCount:function(){return i.post("/graphql",{query:`query {
            orderFindShopOrdersCount {
              waitingToSend
              todayWaitingToSend
              sent
              finished
              rejected
              payedBack
              total
            }
          }`})},orderFindShopPaysCount:function(){return i.post("/graphql",{query:`query {
            orderFindShopPaysCount {
              totalSell
              totalPay
            }
          }`})},orderFindUserOrdersCounts:function(){return i.post("/graphql",{query:`query {
            orderFindUserOrdersCounts {
              waitingToPay
              payed
              sent
              finished
              rejected
              payedBack
              total
            }
          }`})},orderCreateFromCart:function(e=[]){const{product_items:t}=e;return i.post("/graphql",{query:`mutation {
            orderCreateFromCart (input: {
              product_items: ${JSON.stringify(t).replace(/"([^"]+)":/g,"$1:")}
            }) {
              id
              products {
                product {
                  id
                }
                quantity
              }
            }
          }`})},orderFindAll:function(e=[]){const{limit:t,offset:r}=e;return i.post("/graphql",{query:`query {
        orderFindAll (query: {
            pagination: {
              limit: ${t}
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
      }`})},reportOrder:function(e=[]){const{queryOptions:t}=e;return i.post("/graphql",{query:`query {
        reportOrder(query: {
          ${t}
        }) {
          id
          date
          amount
          label
        }
      }`})}},g={productFind:function(e=[]){const{id:t}=e;return i.post("/graphql",{query:`query {
                productFind (id: "${t}") {
                  id
                  categoryId {
                    id
                    name
                    fa_name
                  }
                }
              }`})},productFindComplete:function(e=[]){let t="";return i.post("/graphql",{query:`query {
                productFind (${t}) {
                  id
                  name
                  email
                  uid
                  token
                  configUrl
                  userId {
                    id
                    email
                    name
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
                    parent_id
                  }
                }
              }`})},productFindAll:function(e=[]){const{limit:t,offset:r}=e;return i.post("/graphql",{query:`query {
            productFindAll (query: {
                pagination: {
                    limit: ${t}
                    offset: ${r}
                }
            }) {
                hits {
                    id
                    name
                    email
                    uid
                    token
                    configUrl
                    status
                    createdAt
                    userId {
                        id
                        username
                        name
                        email
                        phone
                        avatar_url
                    }
                    createdAt
                }
                pagination {
                    limit
                    offset
                    total
                }
                }
            }`})},productCreate:function(e=[]){const{name:t,email:r,uid:a,token:n,configUrl:o,price:s}=e;return i.post("/graphql",{query:`mutation {
          productCreate (input: {
            ${t?`name: "${t}"`:""}
            ${r?`email: "${r}"`:""}
            ${a?`uid: "${a}"`:""}
            ${n?`token: "${n}"`:""}
            ${o?`configUrl: "${o}"`:""}
            ${s?`price: "${s}"`:""}
          }) {
            id
          }
        }`})},productDelete:function(e=[]){const{id:t}=e;return i.post("/graphql",{query:`mutation {
        productDelete (input: {
                  id: "${t}"
                }) {
                  id
                }
              }`})},productUpdate:function(e=[]){const{id:t,body:r,categoryId:a,images:n}=e;return i.post("/graphql",{query:`mutation {
                productUpdate (input: {
                  id: "${t}"
                  body: "${r}"
                  categoryId: "${a}"
                  images: "${n}"
                }) {
                  id
                }
              }`})},productUpdateDeadLine:function(e=[]){const{id:t,deadline_date:r}=e;return i.post("/graphql",{query:`mutation {
                productUpdate (input: {
                  id: "${t}"
                  deadline_date: "${r}"
                }) {
                  id
                }
              }`})},productFindUserTickets:function(e=[]){const{username:t,offset:r,limit:a}=e;return i.post("/graphql",{query:`query {
              productFindUserTickets (query: {
                username: "${t}"
                pagination: {
                  limit: ${a}
                  offset: ${r}
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
            }`})},productFindMyTickets:function(e=[]){const{offset:t,limit:r}=e;return i.post("/graphql",{query:`query {
              productFindMyTickets (query: {
                pagination: {
                  limit: ${r}
                  offset: ${t}
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
            }`})},productFindMyLikedTickets:function(e=[]){const{offset:t,limit:r}=e;return i.post("/graphql",{query:`query {
              productFindMyLikedTickets (query: {
                pagination: {
                  limit: ${r}
                  offset: ${t}
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
            }`})},reportTicket:function(e=[]){const{queryOptions:t}=e;return i.post("/graphql",{query:`query {
              reportTicket(query: {
                ${t}
              }) {
                date
                amount
                label
              }
            }`})}},h={mapFind:function(e=[]){const{type:t}=e;return i.post("/graphql",{query:`query {
            mapFind (query: {
              type: "${t}"
            }) {
              position
              lat
              lon
              speed
              direction
            }
          }`})}},$={upload:function(e=[]){const{fd:t}=e;return i.post("/main/upload",t)},download:function(e=[]){const{filename:t}=e;return i.post("/main/upload/downlaod-file",{filename:t,responseType:"blob"})},uploadDeleteFile:function(e=[]){const{filename:t}=e;return i.post("/main/upload/delete-file",{filename:t})},requestCallBack:function(e=[]){const{callbackLink:t}=e;return i.get(t)},paymentFindUserPaysCounts:function(){return i.post("/graphql",{query:`query {
                paymentFindUserPaysCounts {
                  successPay
                  unsuccessPay
                  total
                }
              }`})},categoryFindAll:function(){return i.post("/graphql",{query:`query {
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
                }`})},categoryFindByCategory:function(e=[]){const{categoryId:t,offset:r,limit:a,language:n}=e;return i.post("/graphql",{query:`query {
                categoryFindByCategory(query: {
                  categoryId: "${t}"
                  ${n?`language: "${n}"`:""}
                  pagination: {
                    limit: ${a}
                    offset: ${r}
                  }
                }) {
                  id
                  name
                  fa_name
                  en_name
                  icon_url
                  icon_url_fa
                  parent_id
                  postIds {
                    id pid title thumbnail visibility disabled createdAt
                  }
                  productIds {
                    id pid title thumbnail visibility disabled createdAt
                  }
                  pagination {
                    limit
                    offset
                    total
                  }
                }
            }`})},slideCreate:function(e=[]){const{title:t,description:r,language:a,imageUrl:n}=e;return i.post("/graphql",{query:`mutation {
            slideCreate (input: {
              title: "${t}"
              language: "${a}"
              description: "${r}"
              imageUrl: "${n}"
              }) {
                id
              }
            }`})},slideDelete:function(e=[]){const{slideId:t}=e;return i.post("/graphql",{query:`mutation {
        slideDelete (input: {
            slideId: "${t}"
          }) {
            id
          }
        }`})},slideFindAll:function(e=[]){const{language:t}=e;return i.post("/graphql",{query:`query {
            slideFindAll (query: {
              ${t?`language: "${t}"`:""}
            }) {
              id
              title
              description
              language
              imageUrl
            }
        }`})},shopRecommendedProducts:function(e=[]){const{offset:t,limit:r}=e;return i.post("/graphql",{query:`query {
              shopRecommendedProducts (query: {
                pagination: {
                  limit: ${r}
                  offset: ${t}
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
            }`})},payPayment:function(e=[]){const{order:t}=e;return i.post("/pay/payment",{order:t})},paymentFindUserPays:function(e=[]){const{status:t,offset:r,limit:a}=e;return i.post("/graphql",{query:`query {
                paymentFindUserPays (query: {
                  payment_status: "${t}"
                  pagination: {
                    limit: ${a}
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
              }`})},permissionFindAll:function(){return i.post("/graphql",{query:`query {
            permissionFindAll {
              id
              codename
              persian_codename
            }
          }`})}},C={auth:y,user:f,order:q,map:h,product:g,main:$};export{k as Q,C as a};
