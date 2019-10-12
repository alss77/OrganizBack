import * as koa from 'koa';
// import * as AsyncHandler from 'express-async-handler';
import * as i18n from 'i18n';
import * as helmet from 'koa-helmet';
import * as passport from 'passport';
// import { ApiException, ApiExceptionTranslate } from '../utils/ApiExceptions';
import * as auth from './Routes/Auth';
import * as router from 'koa-router';
import {loginRoute} from "./Routes/Auth/LoginRouter";
i18n.configure({
    directory: __dirname + '/../../locales',
});

export const app = new koa();
const route = new router();
const cors = require('@koa/cors');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');

// app.use(helmet);
app.use(cors);
app.keys = ['ORGANIZSECRETkey'];
app.use(session(app));

// body parser
app.use(bodyParser());

// app.use(ExpressValidator());
app.use(passport.initialize());
app.use(passport.session());

app.use(i18n.init);

route.use('/', async ctx => {
    ctx.state.response = await Promise.resolve({
        message: "hello world!"
    })
});
const mount = require('koa-mount');
app.use(mount(route.routes()))
    .use(route.allowedMethods());

app.use(loginRoute.routes());
app.use(loginRoute.allowedMethods());
app.use(logger());

// app.use((_req: Express.Request, res: Express.Response, _next: any) => {
//     res.status(404).json({
//         message: 'Route or Resource not found',
//     });
// });
//
app.on('error', (err, ctx) => {
    console.log('server error', err, ctx)
});
// // Handle errors
// app.use(
//     (error: Error, req: Express.Request, res: Express.Response, _next: any) => {
//         let code: number = 500;
//         let message: string = error.message;
//
//         if (error instanceof ApiExceptionTranslate) {
//             code = error.errorCode;
//             message = error.getMessage(req);
//         } else if (error instanceof ApiException) {
//             code = error.errorCode;
//         }
//
//         res.status(code).json({
//             message,
//         });
//     }
// );
