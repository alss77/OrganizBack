import { Server, Socket } from 'socket.io';
import { addUserToTask, createTask, deleteTask } from '../REST/Controlers/TaskControler';
import { addTaskToTeam, addUserToTeam, createTeam, deleteTeam } from '../REST/Controlers/TeamControler';
import { loginValidator } from '../REST/Routes/Auth/LoginRouter';

let taskSocket: { [task_id in number]: Socket } = {};

function onNewConnection(socket: Socket) {
    console.log('new Connection');
    // if (socket.request.userId == null) {
    //     console.log('socket disconnect');
    //     socket.disconnect();
    // }

    socket.on('joinRoom', (teamId) => {
        socket.join(teamId);
        console.log('join room' + teamId);
    });

    socket.on('createTask', async (task) => {
        const task_ = await createTask(task);
    });
    socket.on('createTeam', async (team) => {
        console.log(team);
        const team_ = await createTeam(team);
        // taskSocket[team_.id] = socket;
    });
    socket.on('addUserToTeam', async (team) => {
        await addUserToTeam(team);
    });
    socket.on('addTaskToTeam', async (team) => {
        await addTaskToTeam(team);
    });
    socket.on('addUserToTask', async (team) => {
        await addUserToTask(team);
    });
    socket.on('deleteTask', async (team) => {
        await deleteTask(team);
    });
    socket.on('deleteTeam', async (team) => {
        await deleteTeam(team);
    });
}

export function listen(io: Server): void {
    // Language
    // io.use(initI18n);

    // Auth
    // io.use(authSocket);

    io.on('connection', onNewConnection);
}
