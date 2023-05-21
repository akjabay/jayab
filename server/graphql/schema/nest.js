const types = `
type PaginationOutput {
    offset: Int
    limit: Int
    total: Int
}

type Discount {
    discountPercentage: String
    expireLimit: String
    expireDate: String
}

type Plan {
    id: ID
    name: String
    description: String
    featureDescriptions: String
    tags: String
    position: String
    dateCreated: String
    isAvailable: Boolean
    allowMultiple: Boolean
    price: Price
    trialDays: Int
    services: [Service]
}

type Price {
    month: Int,
    quarter: Int,
    year: Int,
    once: Int,
    currency: String
}

type LikesUsers {
    userId: ID!
    likeTime: String!
}

type Likes {
    users: [LikesUsers]
    like: Int
}

type ChartData {
    data: [DataInfo]
    dataSet: [String]
}

type DataInfo {
    data: String
    status: String
}

type Image {
    url: String!
    idx: Int
}

type City {
    id: Int
    province_id: Int
    name: String
    lat_long: String
}

type File {
    url: String!
}

type EnumObject {
    name: String!
    fa_name: String!
    icon_name: String
}

input Pagination {
    offset: Int
    limit: Int    
}

input ChartDataInput {
    duration: String
}

input EnumObjectInput {
    name: String!
    fa_name: String!
    icon_name: String
}
`;

const root = {
    query: ``,
    mutation: ``,
}

module.exports = {
    types: types,
    root: root,
}