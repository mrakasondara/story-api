// CSS imports
import "../styles/styles.css";
import "material-icons/iconfont/material-icons.css";
import "leaflet/dist/leaflet.css";
import "./components/confirm-alert";

import App from "./pages/app";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#drawer-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
    skipToContentButton: document.getElementById("skip-content-button"),
  });
  await app.renderPage();

  window.addEventListener("hashchange", async () => {
    await app.renderPage();
  });
});
