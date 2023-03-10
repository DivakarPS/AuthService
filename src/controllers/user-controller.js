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

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data : response,
            message : 'User is authenticated and token is valid',
            success : true,
            err : {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data : {},
            message : "something went wrong",
            success : false,
            err : error 
        });
    }
}

const isAdmin = async (req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data : response,
            message : 'Successfully fetched whether user is admin or not',
            success : true,
            err : {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data : {},
            message : "something went wrong",
            success : false,
            err : error 
        });
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin  
}