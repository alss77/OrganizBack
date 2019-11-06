import {getRepository} from 'typeorm';
import {Team} from '../../Models/entity/Team';
import { User } from '../../Models';

export async function createTeam(ctx: any) {
    // if (await getRepository(Team).findOne({
    //     where: {
    //         id: ctx.body.id
    //     }
    // })) {
    //     next(ctx.throw(403,'ou cest chaud'));
    // }
    const team = new Team();
    ctx.users.length > 1 ? ctx.users.forEach(async (el) => {
        const user = await getRepository(User).findOne({id: el.id});
        team.users.push(user);
    }) : team.users.push(await getRepository(User).findOne({id: ctx.users.id}));
    team.task = ctx.task;
    team.name = ctx.name;
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
