const CarProfile = require("../models/profile")
const User = require("../models/user")
const Product = require("../models/product")
require("dotenv").config({ path: "variables.env" })
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Crea y firma un JWT
const crearToken = (user, secreta, expiresIn) => {
    // console.log(usuario);
    const { id, email, name } = user;
    console.log(name)
    return jwt.sign({ id, email, name }, secreta, { expiresIn });
}

const resolvers = {
    Query: {
        getProducts: async (obj, args, context, info) => {
            const { category, avaible } = args
                
            const products = await Product.find({ category: category })
            return products
        },
        searchProduct: async (obj, args, context, info) => {
            try {
                const { search} = args
                const products= await Product.find({$or:[{name: { "$regex": search, "$options": "i" }},{descrip: { "$regex": search, "$options": "i" }},{category: { "$regex": search, "$options": "i" }}] });
                
             return products
            } catch (error) {
                console.log(error)
            }

        }
    },
    Mutation: {
        newCarProfile: async (_, { input }) => {

            try {
                const newCarProfile = new CarProfile(input);
                newCarProfile.save()

                return "Ok"
            } catch (error) {
                console.log(error)
            }
        }, createUser: async (_, { input }) => {
            const { email, password } = input;

            const existUser = await User.findOne({ email });

            // si el usuario existe
            if (existUser) {
                throw new Error('Este email ya fue registrado');
            }

            try {

                // Hashear password
                const salt = await bcryptjs.genSalt(10);
                input.password = await bcryptjs.hash(password, salt);

                // Registrar nuevo usuario
                const newUser = new User(input);
                // console.log(nuevoUsuario);

                newUser.save();
                return "Usuario Registrado Correctamente";
            } catch (error) {
                console.log(error);
            }
        }, authUser: async (_, { input }) => {
            const { email, password } = input;

            // Si el usuario existe
            const existUser = await User.findOne({ email });

            // si el usuario existe
            if (!existUser) {
                throw new Error('User not found');
            }

            // Si el password es correcto
            const passwordOk = await bcryptjs.compare(password, existUser.password);
            if (!passwordOk) {
                throw new Error('Password incorrect');
            }

            // Dar acceso a la app
            return {
                token: crearToken(existUser, process.env.SECRETA, '4hr')
            }
        }

    }

}
module.exports = resolvers;