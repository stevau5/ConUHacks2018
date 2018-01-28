// NPM DEPENDENCIES
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

// CUSTOM FILES
import apiRoutes from './routes/api';
import webRoutes from './routes/web';

//.env file
require('dotenv').config();

// REQUIRE .env FILE
dotenv.config();

// NEW EXPRESS APP INSTANTIATION
const app = express();

// SET UP APP USE
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// SET VIEW ENGINE
app.set('view engine', 'ejs');

// Use API routes
app.use('/api',apiRoutes);

// Use Web routes
app.use('/',webRoutes);

export default app;