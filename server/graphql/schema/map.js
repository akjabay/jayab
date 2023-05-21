const types = `
type Point {
    position: String!
    lat: Float!
    lon: Float!
    speed: Float!
    direction: Float!
}

input MapInput {
    type: String
}

`;

const root = {
    query: `
        mapFind(query: MapInput): [Point]
        `,
    mutation: `
        `,
};

module.exports = {
    types: types,
    root: root,
};
