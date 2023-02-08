const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req , res) =>{
    try {
        const response = await userService.create({
            email : req.body.email,
            password : req.body.password
        })
        return res.status(500).json({
            data : response,
            success : true,
            message : 'Successfully created the user',
            err : {}
        });
    } catch (error) {
        console.log('Something went wrong in controller of User');
        res.status(201).json({
            data : {},
            success : false,
            message : "Not able to create user",
            err : error
        });
    }
}

const signIn = async (req , res) => {
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            data : response,
            success : true,
            message : "successfully signed in",
            err : {}
        });
    } catch (error) {
        console.log('Something went wrong in controller of User');
        res.status(201).json({
            data : {},
            success : false,
            message : "Not able to signIn with this user",
            err : error
        });
    }
}

module.exports = {
    create,
    signIn
}