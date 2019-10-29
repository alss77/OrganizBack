import * as Router from 'koa-router';
import {getAllUser} from '../Controlers/UserControler';

export const userRoute = Router({
    prefix: '/user'
});

userRoute.get('/all', getAllUser);

