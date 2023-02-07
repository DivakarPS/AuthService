const UserRepository = require('../repository/user-repository');


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
}

module.exports = UserService;