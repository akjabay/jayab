const types = `
type Product {
    _id: ID
    id: ID
    userId: User
    pid: String!
    name: String
    latlng: String!
    coordinates: [Float]
    address: String
    area: String
    ownerInfo: String
    price: String
    pricePerMeter: String
    areaOfBuilding: String
    rooms: Int
    details: String
    images: [Image]
    thumbnail: String
    likes: Likes
    estate: String
    status: String
    isPublic: Boolean
    categoryId: Category
    expireDate: String
    createdAt: String
    updatedAt: String
}

type Products {
    hits: [Product]
    pagination: PaginationOutput
}

input ProductInput {
    id: ID
    pid: String
    name: String
    latlng: String
    coordinates: [Float]
    maxDistance: Float
    address: String
    area: String
    ownerInfo: String
    price: String
    pricePerMeter: String
    areaOfBuilding: String
    rooms: Int
    details: String
    imageUrls: String
    estate: String
    status: String
    isPublic: Boolean
    categoryId: ID
    expireDate: String
    createdAt: String
    updatedAt: String
}

input ProductFindInput {
    ids: [ID]
    userId: ID
    username: String
    pagination: Pagination
    sorting: String
    latlng: String
    categoryId: ID
    isMap: Boolean
    area: String
    pricePerMeter: String
    areaOfBuilding: String
    rooms: String
    price: String
    maxDistance: Float
}`;

const root = {
    query: `
        productFind(id: ID pid: String): Product!
        productFindAll(query: ProductFindInput): Products
        productFindUserProducts(query: ProductFindInput): Products
        productFindMyProducts(query: ProductFindInput): Products
        productFindMyLikedProducts(query: ProductFindInput): Products
        `,
    mutation: `
        productCreate(input: ProductInput): Product!
        productUpdate(input: ProductInput): Product!
        productDelete(input: ProductInput): Product!
        `,
};

module.exports = {
    types: types,
    root: root,
};
