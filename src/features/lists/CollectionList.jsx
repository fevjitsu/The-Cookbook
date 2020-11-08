import React from "react";
import styles from "./List.module.css";
import _ from "lodash";

export default function CollectionList({
  collection,
  handleDeleteClick,
  handleClick,
}) {
  const DisplayCollection = (collection) => {
    if (collection) {
      return _.map(collection, (item, key) => {
        return (
          <div key={key} className={styles.collection__list__container}>
            <img
              className={styles.collection__list__item__image}
              src={item.image}
              alt={item.title}
            />

            <div>
              <div
                id={item.id}
                onClick={handleClick}
                className={styles.collection__list__item__title}
              >
                {item.title}
              </div>
            </div>
            <div>
              {handleDeleteClick ? (
                <button
                  className={styles.collection__list__item__button}
                  id={item.id}
                  onClick={handleDeleteClick}
                >
                  Del
                </button>
              ) : null}
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className={styles.collection__list__item__title}>
          No results found.
        </div>
      );
    }
  };
  return (
    <div className={styles.collection__list__box}>
      {DisplayCollection(collection)}
    </div>
  );
}
