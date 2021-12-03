import { useEffect, useRef, useState } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

const Hello = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  const tickRef = useRef<any>();
  countRef.current = count;
  useEffect(() => {}, []);

  const beginTick = () => {
    tickRef.current = setInterval(() => {
      setCount(countRef.current + 1);
    }, 1 * 1000);
  };

  const stopTick = () => {
    clearInterval(tickRef.current);
  };
  return (
    <div>
      <div id="timer-container">{count}</div>
      <button id="switch-button" onClick={beginTick}>
        开始工作
      </button>
      <button id="switch-button" onClick={stopTick}>
        结束工作
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
