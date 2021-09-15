import React, { useRef, useEffect, BaseSyntheticEvent } from "react";
import { useRouter } from "next/router";

import { Dropdown } from "react-bootstrap";
import { useAuth } from "../context";
import css from "../styles/main.module.css";

const Navigation = ({ children }) => {
  const navEl = useRef(null);
  const router = useRouter();
  const { state, logout } = useAuth();

  useEffect(() => {
    if (!state.token) router.push("/login");
  }, [state.token]);

  const clickHandler = (e: BaseSyntheticEvent) => {
    for (const el of navEl.current.children) {
      el.classList.remove(`${css.active}`);
    }
    e.currentTarget.classList.add(`${css.active}`);
  };

  return (
    <React.Fragment>
      <div className={`d-flex justify-content-center justify-content-md-between ${css.nav}`}>
        <div className="d-none d-md-flex align-items-center justify-content-center ps-3">
          <i className="fas fa-grin-stars fs-1" style={{ color: "rgb(31, 31, 31)" }}></i>
        </div>
        <div className={`p-2`}>
          <ul ref={navEl} className="nav justify-content-center">
            <li
              className={`nav-item ${css.navBtn} ${css.active}`}
              onClick={(e) => {
                clickHandler(e);
                router.push("/");
              }}
            >
              <span className="nav-link">Beranda</span>
            </li>
            <li
              className={`nav-item ${css.navBtn}`}
              onClick={(e) => {
                clickHandler(e);
                router.push("/keranjang");
              }}
            >
              <span className="nav-link">Keranjang</span>
            </li>
            <li
              className={`nav-item ${css.navBtn}`}
              onClick={(e) => {
                clickHandler(e);
                router.push("/riwayat");
              }}
            >
              <span className="nav-link">Riwayat</span>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center justify-content-center pe-3">
          <Dropdown>
            <Dropdown.Toggle className={`${css.ddBtn}`} variant="link">
              <i className="fas fa-ellipsis-h" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <i className="fas fa-user-circle" /> Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={logout}>
                <i className="fas fa-sign-out-alt" /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {children}
    </React.Fragment>
  );
};

export default Navigation;
