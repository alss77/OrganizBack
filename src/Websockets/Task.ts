import { Server, Socket } from 'socket.io';
import { addUserToTask, createTask } from '../REST/Controlers/TaskControler';
import { addTaskToTeam, addUserToTeam, createTeam } from '../REST/Controlers/TeamControler';

let taskSocket: { [task_id in number]: Socket } = {};

function onNewConnection(socket: Socket) {
    console.log('new Connection');
    // if (socket.request.userId == null) {
    //     console.log('socket disconnect');
    //     socket.disconnect();
    // }

    socket.on('createTask', async (task) => {
        const task_ = await createTask(task);
        // taskSocket[task_.id] = socket;
    });
    socket.on('createTeam', async (team) => {
        const team_ = await createTeam(team);
        taskSocket[team_.id] = socket;
    });
    socket.on('addUserToTeam', async (team) => {
        await addUserToTeam(team);
        // taskSocket[team_.id] = socket;
    });
    socket.on('addTaskToTeam', async (team) => {
        await addTaskToTeam(team);
        // taskSocket[team_.id] = socket;
    });
    socket.on('addUserToTask', async (team) => {
        await addUserToTask(team);
        // taskSocket[team_.id] = socket;
    });
}

export function listen(io: Server): void {
    // Language
    // io.use(initI18n);

    // Auth
    // io.use(authSocket);

    io.on('connection', onNewConnection);
}
