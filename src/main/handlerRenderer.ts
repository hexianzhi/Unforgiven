/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ipcMain } from 'electron';
import sql from './sql';

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

type Handlers = keyof typeof sql;

ipcMain.on('sql', async (event, method, ...args) => {
  console.log('sql : ', method, args);
  const data = args[0][0];
  console.log('data: ', data, typeof data);
  // @ts-ignore
  const res = await sql[method](data);
  console.log('sql res', res);
  event.reply('sql', res);
});
