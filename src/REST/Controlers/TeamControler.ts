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
    console.log(ctx);
    const team = await getRepository(Team).findOne({id: ctx.teamId});
    const user = await getRepository(User).findOne({id: ctx.userId}, {relations: ["tasks", 'teams']});
    console.log("user obj", user);
    console.log("team obj", team);
    // if (team && user) {
    user.teams.push(team);
    await getRepository(User).save(user);
    // }
}

export async function addTaskToTeam(ctx) {
    try {
        const team = await getRepository(Team).findOne({id: ctx.teamId});
        const task = await getRepository(Task).findOne({id: ctx.taskId});
        if (team && task) {
            team.task.push(task);
            await getRepository(Team).save(team);
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function deleteTeam(ctx) {
    const team = await getRepository(Team).findOne({id: ctx.id}, {relations: ["task"]});
    team.task.forEach(async (el) => {
        await getRepository(Task).remove(await getRepository(Task).findOne(el.id))
    });
    await getRepository(Team).remove(team);
}
