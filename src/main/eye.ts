import path from 'path';
import { app, BrowserWindow, shell, screen } from 'electron';

import { resolveHtmlPath } from './util';

let mainWindow: BrowserWindow | null = null;

const createEyeWindow = async () => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };
  const centerX = screen.getPrimaryDisplay().size.width / 2;
  console.log('centerX: ', centerX);
  mainWindow = new BrowserWindow({
    show: false,
    width: 100,
    height: 100,
    y: 0,
    x: 0,
    // x: 200,
    alwaysOnTop: true,
    // frame: true,
    center: false,
    icon: getAssetPath('icon.png'),
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js'),
    // },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  // mainWindow.on('ready-to-show', () => {
  //   if (!mainWindow) {
  //     throw new Error('"mainWindow" is not defined');
  //   }
  //   if (process.env.START_MINIMIZED) {
  //     mainWindow.minimize();
  //   } else {
  //     mainWindow.show();
  //   }
  // });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // // Open urls in the user's browser
  // mainWindow.webContents.on('new-window', (event, url) => {
  //   event.preventDefault();
  //   shell.openExternal(url);
  // });
};

export const hideWindow = () => {
  mainWindow?.hide();
};

export const showWindow = () => {
  // mainWindow?.setAlwaysOnTop(true, 'screen-saver', 10); // 貌似不用
  mainWindow?.show();
  mainWindow?.moveTop();
};

export default {
  createEyeWindow,
  showWindow,
  hideWindow,
};
