import { Server, Socket } from 'socket.io';

const userSocket: { [id in number]: Socket } = {};

let taskSocket: { [research_id in number]: Socket } = {};



function onNewConnection(socket: Socket) {
    console.log('new Connection');
    if (socket.request.userId == null) {
        console.log('socket disconnect');
        socket.disconnect();
    }

    socket.on('createTask', (task) => {

    });
}

export function listen(io: Server): void {
    // Language
    // io.use(initI18n);

    // Auth
    // io.use(authSocket);

    io.on('connection', onNewConnection);
}
