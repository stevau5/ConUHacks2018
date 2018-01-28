// NPM DEPENDENCIES
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

// CUSTOM FILES
import apiRoutes from './routes/api';
import webRoutes from './routes/web';

// REQUIRE .env FILE
dotenv.config();

// NEW EXPRESS APP INSTANTIATION
const app = express();

// USE EJS
app.set('view engine', 'ejs');

// SET UP APP USE
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Use API routes
app.use('/api',apiRoutes);

// Use Web routes
app.use('/',webRoutes);

// Configure the Watson services
require('./routes/conversation')(app);
require('./routes/speech-to-text')(app);
require('./routes/text-to-speech')(app);

// require()

export default app;