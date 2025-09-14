import { routes } from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";
import { getAccessToken, getLogout, getUsername } from "../utils/auth";
import {
  generateUnauthenticatedNavigationListTemplate,
  generateAuthenticatedNavigationListTemplate,
} from "../utils/template";

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this._setupDrawer();
  }

  _setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#navigationDrawer.classList.toggle("open");
    });

    document.body.addEventListener("click", (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove("open");
      }

      this.#navigationDrawer.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove("open");
        }
      });
    });
  }

  #setUpNavigationList() {
    const navListMenu = document.getElementById("nav-list-menu");
    const isLogin = !!getAccessToken();
    if (!isLogin) {
      navListMenu.innerHTML = "";
      navListMenu.innerHTML = generateUnauthenticatedNavigationListTemplate();
      return;
    }
    navListMenu.innerHTML = "";
    navListMenu.innerHTML = generateAuthenticatedNavigationListTemplate();

    const userContainer = document.getElementById("user-container");

    const logoutButton = document.getElementById("logout-button");
    userContainer.append(logoutButton);
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Are you sure?")) {
        getLogout();
        location.hash = "/login";
      }
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const route = routes[url];

    if (!route) {
      location.reload();
    }
    const page = route();

    this.#content.innerHTML = await page.render();
    this.#setUpNavigationList();
    await page.afterRender();
  }
}

export default App;
