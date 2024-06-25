import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
const tg = window.Telegram.WebApp;

function App() {
  const {tg, onToggleButton} = useTelegram();

  useEffect(() => {

    tg.ready();
  }, [])



  return (
    <div className="App">
     <button onClike={onToggleButton}>Open main Button</button>
    </div>
  );
}

export default App;
