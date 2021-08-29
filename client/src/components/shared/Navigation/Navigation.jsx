import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { logout } from "../../../http/index";
import { setAuth } from "../../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
const Navigation = () => {
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  const logoText = {
    marginLeft: "10px",
  };
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img src="/images/logo.png" alt="logo" />
        <span style={logoText}>Codershouse</span>
      </Link>
      <div className={styles.rightNav}>
        <h3>{user?.name}</h3>
        <Link to="/">
          {isAuth && (
            <img
              className={styles.avatar}
              src={user?.avatar}
              width="40"
              height="40"
              alt="avatar"
            />
          )}
        </Link>
        {isAuth && (
          <button className={styles.logoutButton} onClick={logoutUser}>
            <img src="/images/logout.png" alt="logout" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
