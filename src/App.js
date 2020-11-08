import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCollection,
  selectResults,
  selectSelectedResult,
  setCollectionAsync,
  setResults,
  setSelected,
} from "./features/search/searchSlice";
import Search from "./features/search/Search";
import "./App.css";
import CollectionList from "./features/lists/CollectionList";
import GetCollectionItem from "./features/search/GetCollectionItem";
import AddCollectionItem from "./features/search/AddCollectionItem";
import _ from "lodash";
import Navigation from "./Navigation";

function App() {
  const ShowResultsCollection = (results, display) => {
    if (display)
      return (
        <React.Fragment>
          <div className="results-list">
            <CollectionList
              collection={results}
              handleClick={(e) => {
                const chose = _.find(results, (item, key) => {
                  return item.id === e.target.id;
                });
                if (chose) {
                  dispatch(setSelected(chose));
                  dispatch(setResults(undefined));
                }
              }}
            />
          </div>
        </React.Fragment>
      );
  };
  const ShowGetCollectionItem = (selected, display) => {
    if (display)
      return (
        <React.Fragment>
          <GetCollectionItem {...selected} />
        </React.Fragment>
      );
  };
  const ShowAddCollection = (display) => {
    if (display)
      return (
        <React.Fragment>
          <div className="add-recipe">
            <AddCollectionItem />
          </div>
        </React.Fragment>
      );
  };
  const ShowSearch = (collection, display) => {
    if (display)
      return (
        <React.Fragment>
          <h1>Discover a meal.</h1>
          <Search
            searchTitle={"Find!"}
            placeHolder={"Search for a recipe"}
            collection={collection}
          />
        </React.Fragment>
      );
  };
  const dispatch = useDispatch();
  const collection = useSelector(selectCollection);
  let selected = useSelector(selectSelectedResult);
  let results = useSelector(selectResults);
  let [showResultsState, setShowResultsState] = useState(false);
  let [showSelected, setShowSelected] = useState(false);
  let [showAdd, setShowAdd] = useState(false);
  let [showAppetizers, setShowAppetizers] = useState(false);
  let [showEntrees, setShowEntrees] = useState(false);
  let [showDrinks, setShowDrinks] = useState(false);
  let [showDesserts, setShowDesserts] = useState(false);
  let [isMobile, setIsMobile] = useState(false);
  let [showSearch, setShowSearch] = useState(true);
  useEffect(() => {
    dispatch(setCollectionAsync("portfolioApp/recipes"));
    if (window.screen.width < 600) setIsMobile(true);
  }, []);

  useEffect(() => {
    if (results) {
      if (results.length > 0) {
        setShowResultsState(true);
      } else {
        setShowResultsState(false);
      }
    } else {
      setShowResultsState(false);
    }

    if (selected.title) {
      setShowSelected(true);
    } else {
      setShowSelected(false);
    }
  }, [results, selected]);

  useEffect(() => {
    if (showAppetizers) {
      setShowAdd(false);
      setShowEntrees(false);
      setShowDesserts(false);
      setShowDrinks(false);

      results = _.filter(collection, (item) => {
        return item.mealType === "Appetizer";
      });
      dispatch(setResults(results));
    } else if (showEntrees) {
      setShowAdd(false);
      setShowAppetizers(false);
      setShowDesserts(false);
      setShowDrinks(false);

      results = _.filter(collection, (item) => {
        return item.mealType === "Entree";
      });
      dispatch(setResults(results));
    } else if (showDesserts) {
      setShowAppetizers(false);
      setShowAdd(false);
      setShowEntrees(false);
      setShowDrinks(false);

      results = _.filter(collection, (item) => {
        return item.mealType === "Dessert";
      });
      dispatch(setResults(results));
    } else if (showDrinks) {
      setShowAppetizers(false);
      setShowAdd(false);
      setShowEntrees(false);
      setShowDesserts(false);

      results = _.filter(collection, (item) => {
        return item.mealType === "Drink";
      });
      dispatch(setResults(results));
    }
  }, [showAppetizers, showEntrees, showDesserts, showDrinks]);

  return (
    <div className="App">
      <div className="container">
        <Navigation
          isMobile={isMobile}
          handleAdd={() => {
            setShowAdd(true);
            setShowAppetizers(false);
            setShowEntrees(false);
            setShowDesserts(false);
            setShowDrinks(false);
          }}
          handleAppetizers={() => {
            setShowAppetizers(true);
            setShowAdd(false);
            setShowEntrees(false);
            setShowDesserts(false);
            setShowDrinks(false);
          }}
          handleEntrees={() => {
            setShowEntrees(true);
            setShowAdd(false);
            setShowAppetizers(false);
            setShowDesserts(false);
            setShowDrinks(false);
          }}
          handleDesserts={() => {
            setShowDesserts(true);
            setShowAppetizers(false);
            setShowAdd(false);
            setShowEntrees(false);
            setShowDrinks(false);
          }}
          handleDrinks={() => {
            setShowDrinks(true);
            setShowAppetizers(false);
            setShowAdd(false);
            setShowEntrees(false);
            setShowDesserts(false);
          }}
        />
        <div className="cover">
          {ShowSearch(collection, showSearch)}
          {ShowAddCollection(showAdd)}
          {ShowGetCollectionItem(selected, showSelected)}
          {ShowResultsCollection(results, showResultsState)}
        </div>
      </div>
    </div>
  );
}

export default App;
