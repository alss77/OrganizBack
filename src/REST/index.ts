import * as helmet from 'koa-helmet';
// import { ApiException, ApiExceptionTranslate } from '../utils/ApiExceptions';
import * as Koa from 'koa';
import {loginRoute, registerRoute} from './Routes/Auth';
import {userRoute} from './Routes/UserRoutes';
export const app = new Koa();

import * as cors from '@koa/cors';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
// import * as locale from 'koa-locale';
// import * as i18n from 'koa-i18n';

app.use(cors());
app.use(bodyParser());

// locale(app);
// app.use(i18n(app, {
//   directory: __dirname + '/../../locales',
//   locales: ['fr', 'en'],
//   modes: ['header']
// }));

app.use(logger());
app.use(helmet());

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
