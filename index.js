const { ApolloServer } = require("apollo-server")
require('dotenv').config('variables.env')
const typeDefs = require('./db/squema');
const resolvers = require('./db/resolvers');

const conectarDB = require('./config/db');
conectarDB();

const server = new  ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({req}) => {
        // console.log( req.headers['authorization'] );

        // const token = req.headers['authorization'] || '';
        // if(token) {
        //     try {
        //         const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA);
        //         console.log(usuario);
        //         return {
        //             usuario
        //         }
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    }
});

server.listen({ port: process.env.PORT || 4000 }).then( ({url}) => {
    console.log(`Servidor listo en la URL ${url}`);
} )