import {getRepository} from 'typeorm';
import {Team} from '../../Models/entity/Team';

export async function createTeam(ctx: any) {
    ctx.body = ctx.request.body;
    // if (await getRepository(Team).findOne({
    //     where: {
    //         id: ctx.body.id
    //     }
    // })) {
    //     next(ctx.throw(403,'ou cest chaud'));
    // }
    const team = new Team();
    ctx.body.users.length > 1 ? ctx.body.users.forEach((el) => {
        team.users.push(el);
    }) : team.users.push(ctx.body.users);
    team.task = ctx.body.task;
    team.name = ctx.body.name;
    return getRepository(Team).save(team);
}

export async function addUserToTeam(ctx) {
    const team = await getRepository(Team).findOne(ctx.request.body.teamId);
    team.users.push(ctx.request.body.user);
    await getRepository(Team).save(team);
}

export async function addTaskToTeam(ctx) {
    const team = await getRepository(Team).findOne(ctx.request.body.teamId);
    team.users.push(ctx.request.body.task);
    await getRepository(Team).save(team);
}
