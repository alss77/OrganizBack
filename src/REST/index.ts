// import * as i18n from 'i18n';
// import * as helmet from 'koa-helmet';
// import { ApiException, ApiExceptionTranslate } from '../utils/ApiExceptions';
import * as Koa from 'koa';
import {loginRoute, registerRoute} from './Routes/Auth';
import {userRoute} from './Routes/UserRoutes';
export const app = new Koa();

import * as cors from '@koa/cors';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
// i18n.configure({
//     directory: __dirname + '/../../locales',
// });

// app.use(helmet());
app.use(cors());
app.use(bodyParser());
app.use(logger());

import * as session from 'koa-session';
app.keys = ['secret'];
app.use(session({}, app));

import * as passport from 'koa-passport';
app.use(passport.initialize());
app.use(passport.session());

app.use(loginRoute.routes());
app.use(loginRoute.allowedMethods());
app.use(registerRoute.routes());
app.use(registerRoute.allowedMethods());
app.use(userRoute.routes());
app.use(userRoute.allowedMethods());

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
