import { NavLink } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <div>
      <NavLink to="/">
        <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
      </NavLink>
    </div>
  );
}

export default Logo;
