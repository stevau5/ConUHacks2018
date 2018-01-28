import express from 'express';
import fs from 'fs';

const webRoutes = express();

webRoutes.get('/',function(){

	res.render('views/index');

});

export default webRoutes;