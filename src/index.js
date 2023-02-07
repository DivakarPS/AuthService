const express = require('express');
const app = express();
const {PORT} = require('./config/serverConfig');
const bodyPareser = require('body-parser');
const apiRoutes = require('./routes/index');

const prepareAndStartServer = () => {

    app.use(bodyPareser.json());
    app.use(bodyPareser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);
    
    app.listen(PORT , () => {
        console.log('Server Started at PORT',PORT);
    })
}

prepareAndStartServer();