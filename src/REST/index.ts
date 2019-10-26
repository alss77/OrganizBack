import * as i18n from 'i18n';
import * as helmet from 'koa-helmet';
// import { ApiException, ApiExceptionTranslate } from '../utils/ApiExceptions';
const Router = require('koa-router');
const Koa = require('koa');
import {loginRoute, registerRoute} from "./Routes/Auth";
export const app = new Koa();

const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const route = new Router();
const logger = require('koa-logger');
// i18n.configure({
//     directory: __dirname + '/../../locales',
// });

app.use(cors());
// app.use(helmet());

// let bp = bodyParser({
//     onerror: function (err, ctx) {
//         ctx.throw('body parse error', 422);
//     }
// });

// body parser
app.use(bodyParser());

// Sessions
const session = require('koa-session');
app.keys = ['secret'];
app.use(session({}, app));

const passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session());

//
// route.get('/', function(ctx, next) {
//     ctx.body = "Hello"
// });

app.use(loginRoute.routes());
app.use(loginRoute.allowedMethods());
app.use(registerRoute.routes());
app.use(registerRoute.allowedMethods());

// app.use(route.routes()).use(route.allowedMethods());

// app.use(async (ctx, next) => {
//     await next();
//     const rt = ctx.response.get('X-Response-Time');
//     console.log(`${ctx.method} ${ctx.url} - ${rt}`);
// });
// // route.use('/auth', loginRoute);
// const mount = require('koa-mount');
// app.use(route.routes())
//     .use(route.allowedMethods());
//
// app.use((, _next: any) => {
//     res.status(404).json({
//         message: 'Route or Resource not found',
//     });
// });
//

// app.on('error', (err, ctx) => {
//     console.log('server error', err, ctx)
// });
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
