import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  selectCollection,
  selectResults,
  selectSelectedResult,
  setCollectionAsync,
  setSelected,
} from "./features/search/searchSlice";
import Search from "./features/search/Search";
import Results from "./features/search/Results";
import AddCollectionItem from "./features/search/AddCollectionItem";
import GetCollectionItem from "./features/search/GetCollectionItem";
import Navigation from "./Navigation";
import _ from "lodash";
function App() {
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const collection = useSelector(selectCollection);
  const selected = useSelector(selectSelectedResult);
  let results = useSelector(selectResults);
  let [showHome, setShowHome] = useState(true);
  let [showAdd, setShowAdd] = useState(false);
  let [showResults, setShowResults] = useState(false);
  let [showSelected, setShowSelected] = useState(false);
  let [showAppetizers, setShowAppetizers] = useState(false);
  let [showEntrees, setShowEntrees] = useState(false);
  let [showDrinks, setShowDrinks] = useState(false);
  let [showDesserts, setShowDesserts] = useState(false);

  useEffect(() => {
    stableDispatch(setCollectionAsync("portfolioApp/recipes"));
  }, [stableDispatch]);
  useEffect(() => {
    if (results)
      if (results.length > 0) {
        setShowResults(true);
      } else {
        setShowResults(false);
      }
  }, [results]);
  useEffect(() => {
    if (showHome) {
      setShowHome(true);
      setShowResults(false);
      setShowAppetizers(false);
      setShowEntrees(false);
      setShowDesserts(false);
      setShowDrinks(false);
      setShowAdd(false);
    }
    if (showAppetizers) {
      setShowHome(false);
      setShowResults(false);
      setShowAppetizers(true);
      setShowEntrees(false);
      setShowDesserts(false);
      setShowDrinks(false);
      setShowAdd(false);
    }
    if (showEntrees) {
      setShowHome(false);
      setShowResults(false);
      setShowAppetizers(false);
      setShowEntrees(true);
      setShowDesserts(false);
      setShowDrinks(false);
      setShowAdd(false);
    }
    if (showDrinks) {
      setShowHome(false);
      setShowResults(false);
      setShowAppetizers(false);
      setShowEntrees(false);
      setShowDesserts(false);
      setShowDrinks(true);
      setShowAdd(false);
    }
    if (showDesserts) {
      setShowHome(false);
      setShowResults(false);
      setShowAppetizers(false);
      setShowEntrees(false);
      setShowDesserts(true);
      setShowDrinks(false);
      setShowAdd(false);
    }
    if (showAdd) {
      setShowHome(false);
      setShowResults(false);
      setShowAppetizers(false);
      setShowEntrees(false);
      setShowDesserts(true);
      setShowDrinks(false);
      setShowAdd(true);
    }
  }, [
    showHome,
    showAppetizers,
    showEntrees,
    showDrinks,
    showDesserts,
    showAdd,
  ]);
  useEffect(() => {
    if (selected) {
      if (selected.id) {
        setShowSelected(true);
      }
    } else {
      setShowSelected(false);
    }
  }, [selected]);
  const handleClickSelectedItem = (e) => {
    const recipeName = e.target.textContent;
    const foundItem = _.find(collection, (item) => {
      return item.title === recipeName;
    });
    dispatch(setSelected(foundItem));
    setShowHome(false);
    setShowResults(false);
    setShowAppetizers(false);
    setShowEntrees(false);
    setShowDesserts(false);
    setShowDrinks(false);
    setShowAdd(false);
    setShowSelected(true);
  };
  return (
    <div className="App">
      <div className="container">
        <Navigation
          handleAdd={() => {
            setShowAdd(true);
            setShowResults(false);
            setShowAppetizers(false);
            setShowEntrees(false);
            setShowDesserts(false);
            setShowDrinks(false);
            setShowHome(false);
            setShowSelected(false);
          }}
          handleHome={() => {
            setShowHome(true);
            setShowAppetizers(false);
            setShowAdd(false);
            setShowEntrees(false);
            setShowDesserts(false);
            setShowDrinks(false);
            setShowResults(false);
            setShowSelected(false);
          }}
          handleAppetizers={() => {
            setShowAppetizers(true);
            setShowAdd(false);
            setShowEntrees(false);
            setShowDesserts(false);
            setShowDrinks(false);
            setShowHome(false);
            setShowResults(false);
            setShowSelected(false);
          }}
          handleEntrees={() => {
            setShowEntrees(true);
            setShowAdd(false);
            setShowAppetizers(false);
            setShowDesserts(false);
            setShowDrinks(false);
            setShowHome(false);
            setShowResults(false);
            setShowSelected(false);
          }}
          handleDesserts={() => {
            setShowDesserts(true);
            setShowAppetizers(false);
            setShowAdd(false);
            setShowEntrees(false);
            setShowDrinks(false);
            setShowHome(false);
            setShowResults(false);
            setShowSelected(false);
          }}
          handleDrinks={() => {
            setShowDrinks(true);
            setShowAppetizers(false);
            setShowAdd(false);
            setShowEntrees(false);
            setShowDesserts(false);
            setShowHome(false);
            setShowResults(false);
            setShowSelected(false);
          }}
        />
        <div className="cover">
          <div>{showHome && <Search collection={collection} />}</div>
          <div>
            {showAdd && (
              <AddCollectionItem
                handleRedirect={() => {}}
                handleClose={() => {
                  setShowHome(true);
                  setShowResults(false);
                  setShowAppetizers(false);
                  setShowEntrees(false);
                  setShowDesserts(false);
                  setShowDrinks(false);
                  setShowAdd(false);
                  setShowSelected(false);
                }}
              />
            )}
            {showResults && (
              <Results
                unordered={true}
                results={results}
                handleClose={() => {
                  setShowHome(true);
                  setShowResults(false);
                  setShowAppetizers(false);
                  setShowEntrees(false);
                  setShowDesserts(false);
                  setShowDrinks(false);
                  setShowAdd(false);
                  setShowSelected(false);
                }}
                handleClick={handleClickSelectedItem}
              />
            )}
          </div>
          <div>
            {showAppetizers && (
              <Results
                handleClose={() => {
                  setShowHome(true);
                  setShowResults(false);
                  setShowAppetizers(false);
                  setShowEntrees(false);
                  setShowDesserts(false);
                  setShowDrinks(false);
                  setShowAdd(false);
                  setShowSelected(false);
                }}
                results={_.filter(
                  collection,
                  (item) => item.mealType === "Appetizer"
                )}
                handleClick={handleClickSelectedItem}
              />
            )}
            {showEntrees && (
              <Results
                handleClick={handleClickSelectedItem}
                handleClose={() => {
                  setShowHome(true);
                  setShowResults(false);
                  setShowAppetizers(false);
                  setShowEntrees(false);
                  setShowDesserts(false);
                  setShowDrinks(false);
                  setShowAdd(false);
                  setShowSelected(false);
                }}
                results={_.filter(
                  collection,
                  (item) => item.mealType === "Entree"
                )}
              />
            )}
            {showDrinks && (
              <Results
                handleClick={handleClickSelectedItem}
                handleClose={() => {
                  setShowHome(true);
                  setShowResults(false);
                  setShowAppetizers(false);
                  setShowEntrees(false);
                  setShowDesserts(false);
                  setShowDrinks(false);
                  setShowAdd(false);
                  setShowSelected(false);
                }}
                results={_.filter(
                  collection,
                  (item) => item.mealType === "Drink"
                )}
              />
            )}
            {showDesserts && (
              <Results
                handleClick={handleClickSelectedItem}
                handleClose={() => {
                  setShowHome(true);
                  setShowResults(false);
                  setShowAppetizers(false);
                  setShowEntrees(false);
                  setShowDesserts(false);
                  setShowDrinks(false);
                  setShowAdd(false);
                  setShowSelected(false);
                }}
                results={_.filter(
                  collection,
                  (item) => item.mealType === "Dessert"
                )}
              />
            )}

            {showSelected && (
              <GetCollectionItem
                handleClose={() => {
                  setShowHome(true);
                  setShowResults(false);
                  setShowAppetizers(false);
                  setShowEntrees(false);
                  setShowDesserts(false);
                  setShowDrinks(false);
                  setShowAdd(false);
                  setShowSelected(false);
                }}
                {...selected}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
