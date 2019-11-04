import {getRepository} from 'typeorm';
import {Task} from '../../Models/entity/Card';

export async function createTask(taskReq: Task) {
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
    task.users = taskReq.users;
    task.team = taskReq.team;
    task.cardName = taskReq.cardName;
    task.content = taskReq.content;
    await getRepository(Task).save(task);
}

export async function addUserToTask(ctx) {
    const task = await getRepository(Task).findOne(ctx.request.body.taskId);
    task.users.push(ctx.request.body.user);
    await getRepository(Task).save(task);
}
