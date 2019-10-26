import * as SocketIO from 'socket.io';
import * as Task from './Task';

export function initSocketIO(server: any) {
    const io = SocketIO(server);
    Task.listen(io);
}
