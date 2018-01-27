// NPM DEPENDENCIES
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';

// CUSTOM FILES
import apiRoutes from './routes/api';
import webRoutes from './routes/web';

// REQUIRE .env FILE
dotenv.config();

// NEW EXPRESS APP INSTANTIATION
const app = express();

// SET UP APP USE
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Use API routes
app.use('/api',apiRoutes);

// Use Web routes
app.use('/',webRoutes);

// database connection
// mongoose.connect('mongodb://'+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+'@ds249757.mlab.com:49757/golfbot',{useMongoClient: true});
// mongoose.Promise = global.Promise;

export default app;