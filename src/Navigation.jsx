import React, { useState } from "react";

export default function Navigation({ isMobile, handleAdd }) {
  let [showCategoriesList, setShowCategoriesList] = useState(false);

  return (
    <header>
      <h2 onClick={() => {}}>The CookBook</h2>
      <nav>
        <ul>
          <li>
            <span
              onClick={() => {
                setShowCategoriesList(true);
              }}
              title="Categories"
            >
              Categories
            </span>
          </li>

          <li>
            <span onClick={handleAdd} title="Add yours">
              Add yours
            </span>
          </li>

          {/* <li>
            <span
              onClick={() => {}}
              className="btn"
              href="#"
              title="Register / Log In"
            >
              <strike>Register/Log In</strike>
            </span>
          </li> */}
        </ul>
        {showCategoriesList ? (
          <div className={"categories-list"}>
            <button onClick={() => {}} className={" category-list__button"}>
              Appetizers
            </button>
            <button onClick={() => {}} className={"category-list__button"}>
              Entrées
            </button>
            <button onClick={() => {}} className={"category-list__button"}>
              Desserts
            </button>
            <button onClick={() => {}} className={"category-list__button"}>
              Drinks
            </button>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
