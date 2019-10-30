import {getRepository} from 'typeorm';
import {Team} from '../../Models/entity/Team';

export async function createTeam(ctx: any, next) {
    ctx.body = ctx.request.body;
    // if (await getRepository(Team).findOne({
    //     where: {
    //         id: ctx.body.id
    //     }
    // })) {
    //     next(ctx.throw(403,'ou cest chaud'));
    // }
    const team = new Team();
    team.users = ctx.body.users;
    team.task = ctx.body.task;
    team.name = ctx.body.name;
    return getRepository(Team).save(team);
}
