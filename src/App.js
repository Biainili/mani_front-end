import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';

function App() {
  const { tg, onToggleButton, user } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className="App">
      <Header />
      <button onClick={onToggleButton}>Open main Button</button>
    </div>
  );
}

export default App;
