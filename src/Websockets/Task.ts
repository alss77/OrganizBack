import { Server, Socket } from 'socket.io';
import {createTask} from "../REST/Controlers/TaskControler";

let taskSocket: { [task_id in number]: Socket } = {};

function onNewConnection(socket: Socket) {
    console.log('new Connection');
    if (socket.request.userId == null) {
        console.log('socket disconnect');
        socket.disconnect();
    }

    socket.on('createTask', async (task) => {
        const task_ = await createTask(task);
        taskSocket[task_.id] = socket;
    });
}

export function listen(io: Server): void {
    // Language
    // io.use(initI18n);

    // Auth
    // io.use(authSocket);

    io.on('connection', onNewConnection);
}
