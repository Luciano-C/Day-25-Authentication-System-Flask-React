import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Footer = () => {
  const { store, actions } = useContext(Context);

  return (
    <footer className="footer mt-auto py-3 text-center">
      <p>{store.footerMessage}</p>
    </footer>
  );
};
