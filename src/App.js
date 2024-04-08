import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([]);
  const [catItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const itemsResponse = await axios.get(
        "https://65fee4edb2a18489b386b7f4.mockapi.io/items"
      );

      const cartResponse = await axios.get(
        "https://65fee4edb2a18489b386b7f4.mockapi.io/cart"
      );

      const favoritesResponse = await axios.get(
        "https://660c56b23a0766e85dbdf494.mockapi.io/favorites"
      );

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (y) => {
    if (catItems.find((item) => Number(item.id) === Number(y.id))) {
      axios.delete(`https://65fee4edb2a18489b386b7f4.mockapi.io/cart/${y.id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(y.id))
      );
    } else {
      axios.post("https://65fee4edb2a18489b386b7f4.mockapi.io/cart", y);
      setCartItems((prev) => [...prev, y]);
    }
  };
  console.log(catItems);

  const onRemoveItem = (id) => {
    axios.delete(`https://65fee4edb2a18489b386b7f4.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://660c56b23a0766e85dbdf494.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://660c56b23a0766e85dbdf494.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в избранное");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return catItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        catItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
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
          <Route path="/favorites" exact element={<Favorites />} />
          <Route
            path="/"
            exact
            element={
              <Home
                items={items}
                cartItems={catItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                onChangeSearchInput={onChangeSearchInput}
                isLoading={isLoading}
              />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
