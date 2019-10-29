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
    return getRepository(Task).save(task);
}
