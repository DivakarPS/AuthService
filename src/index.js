const express = require('express');
const app = express();
const {PORT} = require('./config/serverConfig');
const bodyPareser = require('body-parser');
const apiRoutes = require('./routes/index');
const {User} = require('./models/index')
const db = require('./models/index');

const prepareAndStartServer = async () => {

    app.use(bodyPareser.json());
    app.use(bodyPareser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);
   
    app.listen(PORT , () => {
        console.log('Server Started at PORT',PORT);

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter :true});
        }

    })
}

prepareAndStartServer();