const validateUserAuth = (req , res, next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            data : {},
            succes : false,
            message : 'Bad request',
            err : 'Email or password missing in the request'
        });
    }
    next();
}

module.exports = {
    validateUserAuth
}