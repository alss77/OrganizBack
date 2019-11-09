import {getRepository} from 'typeorm';
import {Team} from '../../Models/entity/Team';
import { User } from '../../Models';
import { Task } from '../../Models/entity/Card';

export async function createTeam(ctx: any) {
    // if (await getRepository(Team).findOne({
    //     where: {
    //         id: ctx.body.id
    //     }
    // })) {
    //     next(ctx.throw(403,'ou cest chaud'));
    // }
    const team = new Team();
    console.log(ctx.users);
    ctx.users.length > 1 ? ctx.users.forEach(async (el) => {
        const user = await getRepository(User).findOne({id: el.id});
        if (user) {
            team.users.push(user);
        }
    }) : team.users = [await getRepository(User).findOne({id: ctx.users[0].id}, {relations: ['teams']})];
    // team.task = ctx.task;
    team.name = ctx.name;
    return getRepository(Team).save(team);
}

export async function addUserToTeam(ctx) {
    const team = await getRepository(Team).findOne(ctx.teamId);
    const user = await getRepository(User).findOne({id: ctx.userId});
    if (team && user) {
        team.users.push(user);
        await getRepository(Team).save(team);
    }
}

export async function addTaskToTeam(ctx) {
    const team = await getRepository(Team).findOne(ctx.teamId);
    const task = await getRepository(Task).findOne({id: ctx.taskId});
    if (team && task) {
        team.task.push(task);
        await getRepository(Team).save(team);
    }
}
