/* eslint-disable react/button-has-type */
import { useEffect, useRef, useState } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
// import { ipcRenderer } from 'electron';
import './App.css';
const myWindow: any = window;

const Hello = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    console.log('window: ', window);
    myWindow.electron.ipcRenderer.on('sql', (args) => {
      console.log('ipcRenderer args: ', args);
    });
  }, []);

  const addUser = async (user: any) => {
    console.log('myWindow: ', myWindow);
    myWindow.electron.ipcRenderer.send('addUser', {
      username: 'hexz',
      birthday: new Date(1998, 6, 20),
    });
  };

  const deleteUser = async (name: any) => {
    myWindow.electron.ipcRenderer.send('deleteUser', { name: 'hexz' });
  };

  const updateUser = async () => {
    const test = { originName: 'hexz', newName: 'hexz11' };
    myWindow.electron.ipcRenderer.send('updateUser', test);
  };

  const findUser = async (username: any) => {
    myWindow.electron.ipcRenderer.send('findUser', { username: 'hexz' });
  };

  return (
    <div>
      <div id="timer-container"> </div>

      <button id="switch-button" onClick={addUser}>
        增加用户
      </button>
      <button id="switch-button" onClick={deleteUser}>
        删除用户
      </button>
      <button id="switch-button" onClick={findUser}>
        查找用户
      </button>
      <button id="switch-button" onClick={updateUser}>
        更新用户
      </button>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
