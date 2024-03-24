import React from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const arr = [];

function App() {
  const [items, setItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch("https://65fee4edb2a18489b386b7f4.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((x) => {
        setItems(x);
      });
  }, []);

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer onClose={() => setCartOpened(false)} />}

      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((obj) => (
            <Card
              title={obj.title}
              price={obj.price}
              imgUrl={obj.imageUrl}
              onFavorite={() => console.log("Добавили в зпкладки")}
              onPlus={() => console.log("Нажали плюс")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
