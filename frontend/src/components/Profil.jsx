import React from "react";
import { Link } from "react-router-dom";
import "./style/Profil.scss";
import Logout from "./Logout";
import { useSelector } from "react-redux";

export default function Profil() {
  const ProfilIsOpen = useSelector(state => state.ProfilIsOpen);

  return (
    <div id="profil">
      <ul className={ProfilIsOpen ? "open" : "close"}>
        <li>
          <Link to="/ChangePassword">Changer mon mot de passe</Link>
        </li>
        <li>
          <Link to="/Contact">Contacter le SAV</Link>
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </div>
  );
}