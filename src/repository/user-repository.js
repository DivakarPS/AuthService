const {User} = require('../models/index');
const user = require('../models/user');

class UserRepository {
    async create(data){
        try {
            const user = await User.create(data);
            // console.log(user," from repo");
            return user;
        } catch (error) {
            console.log('Something went wrong in repository layer of User');
            throw error;
        }
    }
    async destroy(userId){
        try {
            await User.destroy({
                where : {
                    id: userId
                }
            });
            return true;
        } catch (error) {
            console.log('Something went wrong in repository layer of User');
            throw error;
        }
    }

    async getById (userId){
        try {
            const response = await User.findByPk(userId,{
                attributes : ['email','id']
            });
            return response;
        } catch (error) {
            console.log('Something went wrong in repository layer of User');
            throw error;
        }
    }

    async getByEmail (userEmail){
        try {
            const response = await User.findOne({
                where :{
                    email : userEmail
                }
            });
            return response;
        } catch (error) {
            console.log('Somthing went wrong in repository layer');
            throw error;
        }
    }
}

module.exports = UserRepository;