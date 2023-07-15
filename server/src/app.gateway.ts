import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { broadcastMessages } from './utils/broadcastMessages';
import { broadcastMessage } from './utils/broadcastMessage';

const messages = [];

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  afterInit() {
    this.server.on('connection', (socket) => {
      console.log('[connection] Connected', socket.id);
      broadcastMessages(messages, socket);

      socket.on('message', (message) => {
        console.log('[message] Received:', message);
        messages.push(message);
        broadcastMessage(message, socket, this.server);
      });

      socket.on('disconnect', () => {
        console.log('[disconnect] Disconnected', socket.id);
      });
    });
  }
}
