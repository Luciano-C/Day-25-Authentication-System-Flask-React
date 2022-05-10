import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useParams } from "react-router-dom";
import { PrivateProfile } from "./privateProfile";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  if (!store.token) {
    return (
      <div className="text-center mt-5 d-flex justify-content-center">
        <div className="row">
          <div className="col-12">
            <form>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-evenly">
                <Link to="/">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => {
                      actions.registerHandler(emailInput, passwordInput);
                    }}
                  >
                    Sign In
                  </button>
                </Link>

                <Link to="/">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => {
                      actions.loginHandler(emailInput, passwordInput);
                    }}
                  >
                    Log In
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <PrivateProfile />;
  }
};
