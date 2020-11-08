import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Search.module.css";
import { setSelected } from "./searchSlice";
import _ from "lodash";
import { Counter } from "../counter/Counter";
export default function GetCollectionItem({
  id,
  title,
  image,
  author,
  cookingInstructions,
  ingredients,
  mealType,
  notes,
  nutrition,
  preperation,
}) {
  const dispatch = useDispatch();
  let [showIngredients, setShowIngredients] = useState(false);
  let [showPreperation, setShowPreperation] = useState(false);
  let [showCookingInstructions, setShowCookingInstructions] = useState(false);
  let [showNotes, setShowNotes] = useState(false);
  let [showNutrition, setShowNutrition] = useState(false);
  const splitArray = (item) => {
    if (item) {
      return item.split("\n");
    }
    return null;
  };
  return (
    <div className={styles.get__collection__item__container}>
      <button
        className={styles.get__collection__item__close__button}
        onClick={() => {
          dispatch(setSelected({}));
        }}
      >
        Close Recipe
      </button>
      <div className={styles.get__collection__item__title}>
        {title} - {author}
      </div>
      <img
        className={styles.get__collection__item__image}
        src={image}
        alt={title}
      />

      <div>
        <div className={styles.get__collection__item__buttons}>
          {ingredients ? (
            <button
              onClick={() => {
                setShowIngredients(true);
                setShowPreperation(false);
                setShowCookingInstructions(false);
                setShowNotes(false);
                setShowNutrition(false);
              }}
              className={styles.get__collection__item__button}
            >
              Ingredients
            </button>
          ) : null}
          {preperation ? (
            <button
              onClick={() => {
                setShowPreperation(true);
                setShowIngredients(false);
                setShowCookingInstructions(false);
                setShowNotes(false);
                setShowNutrition(false);
              }}
              className={styles.get__collection__item__button}
            >
              Preperation
            </button>
          ) : null}
          {cookingInstructions ? (
            <button
              onClick={() => {
                setShowCookingInstructions(true);
                setShowIngredients(false);
                setShowPreperation(false);
                setShowNotes(false);
                setShowNutrition(false);
              }}
              className={styles.get__collection__item__button}
            >
              Instructions
            </button>
          ) : null}
          {notes ? (
            <button
              onClick={() => {
                setShowNotes(true);
                setShowCookingInstructions(false);
                setShowIngredients(false);
                setShowPreperation(false);
                setShowNutrition(false);
              }}
              className={styles.get__collection__item__button}
            >
              Notes
            </button>
          ) : null}
          {nutrition ? (
            <button
              onClick={() => {
                setShowNutrition(true);
                setShowNotes(false);
                setShowCookingInstructions(false);
                setShowIngredients(false);
                setShowPreperation(false);
              }}
              className={styles.get__collection__item__button}
            >
              Nutrition
            </button>
          ) : null}
        </div>
        {showIngredients ? (
          <div>
            <div className={styles.get__collection__item__title}>
              Ingredients
            </div>
            <ul>
              {_.map(splitArray(ingredients), (item, key) => {
                return <li key={key}>{item}</li>;
              })}
            </ul>
          </div>
        ) : null}

        {showPreperation ? (
          <div>
            <div className={styles.get__collection__item__title}>
              Preperation
            </div>
            <ul>
              {_.map(splitArray(preperation), (item, key) => {
                return <li key={key}>{item}</li>;
              })}
            </ul>
          </div>
        ) : null}
      </div>
      {showCookingInstructions ? (
        <div>
          <div className={styles.get__collection__item__title}>
            Instructions
          </div>
          <ul>
            {_.map(splitArray(cookingInstructions), (item, key) => {
              return <li key={key}>{item}</li>;
            })}
          </ul>
        </div>
      ) : null}

      <div>
        {showNotes ? (
          <div>
            <div className={styles.get__collection__item__title}>Notes</div>
            <ul>
              {_.map(splitArray(notes), (item, key) => {
                return <li key={key}>{item}</li>;
              })}
            </ul>
          </div>
        ) : null}
        {showNutrition ? (
          <div>
            <div className={styles.get__collection__item__title}>Nutrition</div>
            <ul>
              {_.map(splitArray(nutrition), (item, key) => {
                return <li key={key}>{item}</li>;
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
