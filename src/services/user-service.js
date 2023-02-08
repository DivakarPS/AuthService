const UserRepository = require('../repository/user-repository');
const jws = require('jsonwebtoken');
const {JWT_KEY} = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }
    async create(data){
        try {
            const user = await this.userRepository.create(data);
             console.log(user);
            return user;
        } catch (error) {
            console.log('Something went wrong in service layer of user');
            throw error;
        }
    }

    async destroy(){}

    createtToken(user){
        try {
            const token = jws.sign(user,JWT_KEY,{expiresIn: '1d'});
            return token;
        } catch (error) {
            console.log('Something went wrong in token creation');
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verfiy(token,JWT_KEY);
            return response;  //otherwise true will be returned
        } catch (error) { //error will be thrown if there is somwthing wrong in verification
            console.log('Something went wrong in token verication :',error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword , encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log('Something went wrong in Password verification');
            throw error;
        }
    }

    async signIn (email, plainPassword){
        try {
            const user = await this.userRepository.getByEmail(email);

            const passwordMatch = this.checkPassword(plainPassword , user.password);

            if(!passwordMatch){
                console.log(`Password doesn't match`);
                throw {error : 'incorrect Password'};
            }
            const newJWT = this.createtToken({email :user.email ,id: user.id});
            return newJWT;
        } catch (error) {
            console.log('Something went wrong in sign in process');
            throw error;
        }
    }
}

module.exports = UserService;