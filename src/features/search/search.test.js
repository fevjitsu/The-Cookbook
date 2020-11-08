import React from "react";
import { shallow } from "enzyme";
import {
  resetValue,
  setSearchedItem,
  setResults,
  setCollection,
  setSelected,
  setCollectionAsync,
  selectCollection,
  selectResults,
  selectSelectedResult,
} from "./searchSlice";
import { Search } from "./Search";

const collection = [
  {
    title: "title 1",
  },
  {
    title: "title 2",
  },
  {
    title: "title 3",
  },
];

test("Sets the collection items for search", () => {
  const data = setCollection(collection);
  expect(data.payload).toEqual(collection);
});
test("Sets the selected item from collection", () => {
  const data = setSelected(collection[2]);
  expect(data.payload).toEqual(collection[2]);
});
test("Sets the selected result items from collection", () => {
  const data = setResults([
    { title: "test result title" },
    { title: "test result title 2" },
  ]);
  expect(data.payload).toEqual([
    { title: "test result title" },
    { title: "test result title 2" },
  ]);
});
test("Sets the searched paramter for an item from collection", () => {
  const data = setSearchedItem("searched text");
  expect(data.payload).toEqual("searched text");
});
test("Resets the searched paramters and result items from collection search", () => {
  expect(resetValue().payload).toEqual(undefined);
});
