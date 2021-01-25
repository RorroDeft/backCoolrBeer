const { gql } = require('apollo-server');

const typeDefs = gql`

type Query {
    getProducts(category:String) : [Product]
    searchProduct(search:String) : [Product]
}


type Product {
    id:ID
    name: String
    category: String
    price: String
    offPrice: String
    descrip: String
    image: String
    code: String
    seller: String
    stock: String
}


type Profile {
    id: ID
    patent: String
    model: String
    year: String
    developer: String
    initKMS: String
    actualKMS: String
    primary: String
    email: String
    nickName: String
}
type User{
    name:String
    email:String
    password:String
}
type Token {
    token: String
}
input InputUser{
    name:String!
    email:String!
    password:String!
}
input InputProfile {
    patent: String!
    model: String!
    year: String!
    developer: String!
    initKMS: String
    actualKMS: String
    primary: Boolean
    email: String!
    nickName: String
}

input AuthInput {
    email: String!
    password: String!
}
type Mutation {
    #User
    createUser(input: InputUser) : String
    authUser(input: AuthInput ) : Token
    #Profile
    newCarProfile(input: InputProfile) : String
}
`
module.exports = typeDefs;