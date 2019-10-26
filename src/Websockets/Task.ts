import * as i18n from 'i18n';
import { Server, Socket } from 'socket.io';
// import { embededResearch, LaunchResearch } from '../REST/controllers/Research';
// import { retrieveUser } from '../utils/retrieveUser';
// import { TranslateMessage } from '../utils/Translation/Sentences';

const taskSocket: { [task_id in number]: Socket } = {};

// function initI18n(socket: Socket, next: any) {
//     i18n.init(socket.request, undefined);
//     next();
// }

async function authSocket(socket: Socket, next: any) {
    const token = socket.handshake.query.Authorization;

    if (token == null) {
        console.log('No token');
        socket.emit('exception', socket.request.__('WrongJWT'));
        // socket.emit('exception', socket.request.__(TranslateMessage.WrongJWT));
        next();
    }
    const user = await retrieveUser(token, false);
    // const user = await retrieveUser(token, false);
    if (user == null) {
        console.log(user);
        socket.emit('exception', socket.request.__('WrongJWT'));
        console.log('The token is not valid');
        next();
    } else {
        socket.request.user = user;
        console.log('Socket auth success');
        next();
    }
}

function onNewConnection(socket: Socket) {
    console.log('new Connection');
    if (socket.request.user == null) {
        console.log('socket disconnect');
        socket.disconnect();
    }

    socket.on('taskCard', async (research_query: string) => {
        const local = socket.request.getLocale();
        console.log(
            `new Research by ${socket.request.user.email}: ${research_query}`
        );
        const research = await LaunchResearch(socket.request.user, research_query, {
            'Accept-Language': local,
        });
        taskSocket[research.id] = socket;

        socket.on('disconect_research', () => {
            delete researchSocket[research.id];
        });

        socket.on('embedded_search', (emb_research_query: string) => {
            embededResearch(research, emb_research_query, {
                'Accept-Language': local,
            });
        });

        socket.on('disconect', () => {
            delete researchSocket[research.id];
        });
    });
}

export function listen(io: Server): void {
    // Language
    // io.use(initI18n);

    // Auth
    io.use(authSocket);

    io.on('connection', onNewConnection);
}

export function sendErrorToUser(research_id: number, error: string): void {
    console.log(`send to User: ${research_id}:  ${error}`);
    const socket = researchSocket[research_id];
    if (socket != null) {
        const message = socket.request.__(error);
        socket.emit('error_ras', message);
        delete researchSocket[research_id];
    }
}

export function sendResearchLaunch(research_id: number): void {
    console.log('research sent');
    const socket = researchSocket[research_id];
    if (socket != null) {
        socket.emit('research_sent');
    }
}

export function sendDataToUser(research_id: number, data: any): void {
    console.log('Send research');
    const socket = researchSocket[research_id];
    if (socket != null) {
        socket.emit('research_received', { data });
    }
}
