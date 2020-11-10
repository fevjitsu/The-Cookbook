import React, { useState, useEffect } from "react";
import { firebase } from "../../db/firebase";
import database from "../../db/firebase";
import styles from "./Search.module.css";

export default function Add({ collection, handleClose, handleRedirect }) {
  let [title, setTitle] = useState("");
  let [author, setAuthor] = useState("");
  let [mealType, setMealType] = useState("");
  let [img, setImg] = useState(undefined);
  let [imageURL, setImageURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/portfolio-231ae.appspot.com/o/images%2Fno-image.jpg?alt=media&token=c0c48b13-bbc5-4d7d-a563-26818e564ee8"
  );
  const handleUpload = (image) => {
    const uploadTask = firebase
      .storage()
      .ref(`images/${image.name}`)
      .put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        firebase
          .storage()
          .ref(`images`)
          .child(`${image.name}`)
          .getDownloadURL()
          .then((url) => {
            setImageURL(url);
          });
      }
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const recipeCollection = database.ref(`portfolioApp/recipes`);
    const title = e.target.elements.title.value.trim();
    const mealType = e.target.elements.mealType.value.trim();
    const author = e.target.elements.author.value.trim();
    const ingredients = e.target.elements.ingredients.value.trim();
    const cookingInstructions = e.target.elements.cookingInstructions.value.trim();
    const preperation = e.target.elements.preperation.value.trim();
    const nutrition = e.target.elements.nutrition.value.trim();
    const notes = e.target.elements.notes.value.trim();
    recipeCollection
      .push({
        title,
        author,
        ingredients,
        cookingInstructions,
        preperation,
        nutrition,
        notes,
        mealType,
        image: imageURL,
        created: Date(),
      })
      .then(() => {
        handleClose();
      })
      .catch((e) => {
        console.log("failed", e);
      });
  };
  useEffect(() => {
    if (img) {
      handleUpload(img);
    }
  }, [img]);

  return (
    <React.Fragment>
      <h1>Add a recipe.</h1>
      <form className={styles.add__collection__form} onSubmit={handleSubmit}>
        <div style={{ justifySelf: "flex-end" }}>
          <button
            className={styles.get__collection__item__close__button}
            onClick={handleClose}
          >
            Close
          </button>
        </div>
        <div className={styles.add__collection__inputs__container}>
          <div>
            <input
              type="text"
              id={"title"}
              value={title}
              required
              onChange={(e) => {
                let nTitle = e.target.value;
                setTitle(nTitle);
              }}
              className={styles.search__component__input}
              placeholder="Recipe name"
            />
          </div>
          <div>
            <select
              id="mealType"
              value={mealType}
              onChange={(e) => {
                setMealType(e.target.value);
              }}
              className={styles.search__component__input}
              required
            >
              <option value="">Select ...</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Entree">Entrée</option>
              <option value="Dessert">Dessert</option>
              <option value="Drink">Drink</option>
            </select>
          </div>
          <div>
            <input
              className={styles.add__collection__image__upload}
              type="file"
              name="file"
              onChange={(e) => {
                setImg(e.target.files[0]);
              }}
            />
            {img ? (
              <div className={styles.get__collection__item__title}>
                Image uploaded!
              </div>
            ) : null}
          </div>
          <div>
            <input
              type="text"
              id="author"
              name="author"
              value={author}
              placeholder="Author"
              className={styles.search__component__input}
              required
              onChange={(e) => {
                let nAuthor = e.target.value;
                setAuthor(nAuthor);
              }}
            />
            {img ? <div className={styles.title}>File uploaded!</div> : null}
          </div>
          <div className={styles.input__items__container}>
            <div>
              <textarea
                id={"ingredients"}
                placeholder="Ingredients"
                className={styles.search__component__input}
                rows={5}
              ></textarea>
            </div>
            <div>
              <textarea
                id={"preperation"}
                placeholder="Preperation"
                className={styles.search__component__input}
                rows={5}
              ></textarea>
            </div>
          </div>

          <div className={styles.input__items__container}>
            <textarea
              id={"cookingInstructions"}
              placeholder="Cooking Instructions"
              className={styles.search__component__input}
              rows={5}
            ></textarea>
          </div>

          <div className={styles.input__items__container}>
            <div>
              <textarea
                id={"nutrition"}
                placeholder="nutrition"
                className={styles.search__component__input}
                rows={5}
              ></textarea>
            </div>
            <div>
              <textarea
                id={"notes"}
                placeholder="notes"
                className={styles.search__component__input}
                rows={5}
              ></textarea>
            </div>
          </div>
        </div>
        <div>
          <button
            className={styles.get__collection__item__button}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}
