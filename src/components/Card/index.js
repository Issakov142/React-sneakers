import React from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

import styles from "./Card.module.scss";

function Card({
  id,
  onFavorite,
  imageUrl,
  title,
  price,
  onPlus,

  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);

  const [isFavorite, setIsFavorite] = React.useState(favorited);

  console.log(title, isItemAdded(id));

  const onClickPlus = () => {
    onPlus({ id, imageUrl, title, price });
  };
  const onClickFavorite = () => {
    onFavorite({ id, imageUrl, title, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={210}
          viewBox="0 0 150 210"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="105" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="128" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="179" rx="5" ry="5" width="80" height="24" />
          <rect x="117" y="171" rx="5" ry="5" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                src={
                  isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"
                }
                alt="Unliked"
              />
            </div>
          )}
          <img width={133} height={112} src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={
                  isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"
                }
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default Card;
