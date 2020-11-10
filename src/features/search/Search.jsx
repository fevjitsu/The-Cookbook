import React, { useState } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import styles from "./Search.module.css";
import { setSearchedItem, setResults } from "./searchSlice";
export default function Search({
  placeHolder = "Search",
  searchTitle = "",
  collection,
}) {
  let dispatch = useDispatch();

  let [searched, setSearched] = useState("");
  const handleChange = (e) => {
    setSearched(e.target.value.trim());
    if (searched.length > 0) {
      dispatch(setSearchedItem(searched));
      let results = getResults(searched, collection);
      if (results) {
        if (results.length > 0) {
          dispatch(setResults(results));
        }
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let searched = e.target.elements.search.value.trim();
    if (searched.length > 0) {
      dispatch(setSearchedItem(searched));
      let results = getResults(searched, collection);
      if (results) {
        if (results.length > 0) {
          dispatch(setResults(results));
        }
      }
    }
  };
  const getResults = (searchedTerm, collectionItems) => {
    return _.filter(collectionItems, (item) => {
      return item.title.toLowerCase().includes(searchedTerm.toLowerCase());
    });
  };
  return (
    <div className={styles.search__form__container}>
      <form className={"flex-form"} onSubmit={handleSubmit}>
        <label htmlFor="from">
          <i className="ion-location"></i>
        </label>
        <input
          onChange={handleChange}
          id={"search"}
          name={"search"}
          type={"text"}
          placeholder={placeHolder}
          className={styles.search__component__input}
        />
        <input
          type="submit"
          className={styles.search__component__button}
          placeholder={searchTitle}
        />
      </form>
    </div>
  );
}
