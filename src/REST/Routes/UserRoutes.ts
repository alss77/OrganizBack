import * as Router from 'koa-router';
import { getAllUser, getUserByEmail } from '../Controlers/UserControler';
import { retrieveUser } from '../../Utils/retrieveUser';

export const userRoute = Router({
    prefix: '/user'
});

userRoute.get('/all', getAllUser);

userRoute.get('/me', async (ctx) => {
    console.log(ctx.request);
    ctx.body = await retrieveUser(ctx.request.header['authorization']);
});
