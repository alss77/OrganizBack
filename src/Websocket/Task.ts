import { Server, Socket } from 'socket.io';


function onNewConnection(socket: Socket) {
    console.log('new Connection');
    if (socket.request.userId == null) {
        console.log('socket disconnect');
        socket.disconnect();
    }


    export function listen(io: Server): void {
    // Language
    io.use(initI18n);

    // Auth
    io.use(authSocket);

    io.on('connection', onNewConnection);
}
