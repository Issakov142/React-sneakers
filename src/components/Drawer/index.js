import React from "react";
import axios from "axios";

import Info from "../Info";
import { useCart } from "../hooks/useCart";

import styles from "./Drawer.module.scss";

const delay = () => new Promise((resolve) => setTimeout(resolve, 1500));

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { catItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://660c56b23a0766e85dbdf494.mockapi.io/orders",
        { items: catItems }
      );

      setOrderId(data.id);
      setIsOrderComplete(true);

      for (let i = 0; i < catItems.length; i++) {
        debugger;
        const item = catItems[i];
        await axios.delete(
          "https://65fee4edb2a18489b386b7f4.mockapi.io/cart/" + Number(item.id) ///////////=============================
        );
        await delay();
      }
      setCartItems([]);
    } catch (error) {
      alert("Ошибка при создании заказа :(");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between ">
          Корзина
          <img
            onClick={onClose}
            className="cu-p"
            src="img/btn-remove.svg"
            alt="Close"
          />
        </h2>

        {items.length > 0 ? (
          <>
            <div className="items">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{((totalPrice / 100) * 5).toFixed(2)} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок чтобы сделать заказ"
            }
            image={
              isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}
export default Drawer;
