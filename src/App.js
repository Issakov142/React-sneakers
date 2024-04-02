import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

const TestComponent = () => {
  return (
    <div>
      <p>This is TTTTTTTTTTTTTte component.</p>
    </div>
  );
};

function App() {
  const [items, setItems] = React.useState([]);
  const [catItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios
      .get('https://65fee4edb2a18489b386b7f4.mockapi.io/items')
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get('https://65fee4edb2a18489b386b7f4.mockapi.io/cart')
      .then((res) => {
        setCartItems(res.data);
      });
    axios
      .get('https://660c56b23a0766e85dbdf494.mockapi.io/favorites')
      .then((res) => {
        setFavorites(res.data);
      });
  }, []);

  const onAddToCart = (y) => {
    axios.post('https://65fee4edb2a18489b386b7f4.mockapi.io/cart', y);
    setCartItems((prev) => [...prev, y]);
  };
  console.log(catItems);

  const onRemoveItem = (id) => {
    axios.delete(`https://65fee4edb2a18489b386b7f4.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = (obj) => {
    axios.post('https://660c56b23a0766e85dbdf494.mockapi.io/favorites', obj);
    setFavorites((prev) => [...prev, obj]);
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={catItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route
          path="/favorites"
          exact
          element={
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
          }
        />
        <Route
          path="/"
          exact
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onAddToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
              onChangeSearchInput={onChangeSearchInput}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
