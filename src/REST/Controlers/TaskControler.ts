import {getRepository} from 'typeorm';
import {Task} from '../../Models/entity/Card';
import { User } from '../../Models';

export async function createTask(taskReq) {
    // ctx.body = ctx.request.body;
    if (await getRepository(Task).findOne({
        where: {
            id: taskReq.id
        }
    })) {
        throw 'errrrrror';
    }

    console.log('REQ TASK WEBSOCKET', taskReq);
    const task = new Task();
    taskReq.users.length > 1 ? taskReq.users.forEach(async (el) => {
        const user = await getRepository(User).findOne({id: el.id});
        if (user) {
            task.users.push(user);
        }
    }) : task.users = [await getRepository(User).findOne({id: taskReq.users.id}, {relations: ['teams']})];

    task.team = taskReq.team;
    task.cardName = taskReq.cardName;
    task.content = taskReq.content;
    await getRepository(Task).save(task);
}

export async function addUserToTask(ctx) {
    const task = await getRepository(Task).findOne(ctx.taskId);
    const user = await getRepository(User).findOne({id: ctx.userId});
    if (task && user) {
      task.users.push(ctx.user);
      await getRepository(Task).save(task);
    }
}

export async function deleteTask(ctx) {
    const task = await getRepository(Task).findOne(ctx.request.body.taskId);
    await getRepository(Task).remove(task);
}
