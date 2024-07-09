import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Product from './components/ProductItem/ProductItem';
import Order from './components/Order/Order';
import Products from './components/Products/Products';

function App() {
  const { tg, onToggleButton, user } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className="App">
      <Header />
      <Routes> 
            <Route index element={< Order/>}/>
            <Route path={'products'} element={<Products/>}/>
      </Routes>
    </div>
  );
}

export default App;
