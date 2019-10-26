import * as Http from 'http';
import './Utils/PassportStrategies';
import { app } from './REST';
import { initSocketIO } from './Websockets';

export const server = Http.createServer(app.callback());
initSocketIO(server);
