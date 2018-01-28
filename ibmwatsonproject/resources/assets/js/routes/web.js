import express from 'express';
import fs from 'fs';

const webRoutes = express();

webRoutes.get('/',function(req,res){

	res.render('index');

});

export default webRoutes;