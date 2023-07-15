import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const broadcastMessage = (
  message: string,
  client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) => {
  server.sockets.sockets.forEach((socket) => {
    if (socket.connected && socket !== client) {
      socket.send(message);
    }
  });
};
