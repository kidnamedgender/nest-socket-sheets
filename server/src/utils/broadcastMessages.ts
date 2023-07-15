import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const broadcastMessages = (
  messages: string[],
  client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) => {
  messages.forEach((message) => {
    if (client.connected) {
      client.send(message);
    }
  });
};
