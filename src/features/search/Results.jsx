import React from "react";
import _ from "lodash";
import styles from "./Results.module.css";
export default function Results({
  unordered,
  results,
  handleClose,
  handleDeleteClick,
  handleClick,
  handleEditClick,
}) {
  if (unordered) {
    return (
      <div
        className={`animate__animated animate__fadeInUp ${styles.results__list__root}`}
      >
        <div className={styles.results__list__item__close__button__container}>
          <button
            className={styles.results__list__item__close__button}
            onClick={handleClose}
          >
            close
          </button>
        </div>

        <ul>
          {_.map(results, (result, key) => (
            <li
              key={key}
              id={result.id}
              onClick={handleClick}
              className={styles.results__list__item}
            >
              <div>
                <div>
                  <img
                    className={styles.results__list__item__image}
                    src={result.image}
                    alt={result.title}
                  />
                </div>
                <div>{result.title}</div>
                <div>
                  {handleEditClick && (
                    <div onClick={handleEditClick} id={result.id}>
                      &nbsp;edit
                    </div>
                  )}
                  {handleDeleteClick && (
                    <div onClick={handleDeleteClick} id={result.id}>
                      &nbsp;delete
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div
        className={`animate__animated animate__fadeInUp ${styles.results__list__root}`}
      >
        <div className={styles.results__list__item__close__button__container}>
          <button
            className={styles.results__list__item__close__button}
            onClick={handleClose}
          >
            close
          </button>
        </div>
        <ol>
          {_.map(results, (result, key) => (
            <li
              key={key}
              id={result.id}
              onClick={handleClick}
              className={styles.results__list__item}
            >
              <div>
                <div>
                  <img
                    className={styles.results__list__item__image}
                    src={result.image}
                    alt={result.title}
                  />
                </div>
                <div>{result.title}</div>
                <div>
                  {handleEditClick && (
                    <div onClick={handleEditClick} id={result.id}>
                      &nbsp;edit
                    </div>
                  )}
                  {handleDeleteClick && (
                    <div onClick={handleDeleteClick} id={result.id}>
                      &nbsp;delete
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}
