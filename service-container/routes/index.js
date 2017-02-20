require('babel-polyfill');
import MetaHandler from '../http-request-handlers/meta.handler';
import {Router} from 'express';
import bot from '../../facebook-correspondance-service';

const routes = new Router();

// Use fb bot framework middleware
routes.use('/inbox', bot.router());
routes.get('/meta', MetaHandler.index);

export default routes;
