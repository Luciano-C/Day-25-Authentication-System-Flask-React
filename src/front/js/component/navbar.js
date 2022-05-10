import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  if (store.token) {
    return (
      <div className="d-flex justify-content-end">
        <nav className="navbar navbar-light bg-light me-3">
          <div className="container">
            <div className="ml-auto">
              <Link to="/">
                <span
                  className="navbar-brand mb-0 h1"
                  onClick={() => {
                    actions.logOut();
                  }}
                >
                  Log Out
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  } else {
    return <></>;
  }
};
