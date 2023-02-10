const express = require('express');
const app = express();
const {PORT} = require('./config/serverConfig');
const bodyPareser = require('body-parser');
const apiRoutes = require('./routes/index');
const {User,Role} = require('./models/index')
const db = require('./models/index');

const prepareAndStartServer = async () => {

    app.use(bodyPareser.json());
    app.use(bodyPareser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);
   
    app.listen(PORT , async () => {
        console.log('Server Started at PORT',PORT);

        // const user= await User.findByPk(1);
        // const adminName = await Role.findOne({
        //     where: {
        //         name: 'ADMIN'
        //     }
        // });
        // user.addRole(adminName);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter :true});
        }

    })
}

prepareAndStartServer();