const types = `
type Category {
    _id: ID
    id: ID
    name: String!
    fa_name: String!
    en_name: String!
    icon_url: String
    icon_url_fa: String
    full_fa_name: String
    productIds: [Product]
    parent_id: String
    pagination: PaginationOutput
}

input CategoryInput {
    id: ID
    name: String
    fa_name: String
    en_name: String
    icon_url: String
    icon_url_fa: String
    full_fa_name: String
    parent_id: String
    categoryId: ID
}

input FindByCategoryInput {
    categoryId: ID!
    language: String
    pagination: Pagination
}

`;

const root = {
    query: `
        categoryFind(query: CategoryInput): [Category]
        categoryFindByCategory(query: FindByCategoryInput): Category
        categoryFindAll: [Category]
        `,
    mutation: `
        categoryCreate(input: CategoryInput): Category!
        categoryUpdate(input: CategoryInput): Category!
        categoryDelete(input: FindByCategoryInput): Category!
        `,
};

module.exports = {
    types: types,
    root: root,
};
