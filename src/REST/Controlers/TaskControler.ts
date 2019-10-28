import {getRepository} from "typeorm";
import {Task} from "../../Models/entity/Card";

export async function createTask(ctx) {
    ctx.body = ctx.request.body;
    if (await getRepository(Task).findOne({
        where: {
            id: ctx.body.id
        }
    })) {
        throw 'errrrrror';
    }

    const task = new Task();
    task.users = ctx.body.users;
    task.cardName = ctx.body.cardName;
    task.content = ctx.body.content;
    return getRepository(Task).save(task);
}
