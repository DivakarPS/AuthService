const validateUserAuth = (req , res, next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            data : {},
            success : false,
            message : 'Bad request',
            err : 'Email or password missing in the request'
        });
    }
    next();
}

const validateIsAdminRequest = async (req, res, next) =>{
    if(!req.body.id){
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Bad request',
            err: 'User id is missing in the request'
        });
    }
    next();
}

module.exports = {
    validateUserAuth,
    validateIsAdminRequest
}