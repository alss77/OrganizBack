import { Server, Socket } from 'socket.io';
import { addUserToTask, createTask, deleteTask } from '../REST/Controlers/TaskControler';
import { addTaskToTeam, addUserToTeam, createTeam, deleteTeam } from '../REST/Controlers/TeamControler';

function onNewConnection(socket: Socket) {
    console.log('new Connection');

    socket.on('joinRoom', (teamId) => {
        socket.join(teamId);
        console.log('join room' + teamId);
    });

    socket.on('createTask', async (task) => {
        await createTask(task);
        // socket.in(task.team.id).emit('task', task_);
    });
    socket.on('createTeam', async (team) => {
        console.log(team);
        await createTeam(team);
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
