import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const PrivateProfile = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getUserData();
    console.log(store, "hola hola");
  }, [store.isActive]);

  return (
    <div className="d-flex justify-content-center">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="https://picsum.photos/id/237/600/500"
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Data</h5>
              <p className="card-text">
                Your Email is: {store.currentEmail} <br />
                Your Password is: {store.currentPassword} <br />
                Active: {store.isActive.toString()}
              </p>

              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
