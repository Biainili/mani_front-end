import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
const tg = window.Telegram.WebApp;

function App() {
  const {tg, onToggleButton, user} = useTelegram();

  useEffect(() => {

    tg.ready();
  }, [])



  return (
    <div className="App">
     <button onClike={() => console.log(user)}>Open main Button</button>
    </div>
  );
}

export default App;
