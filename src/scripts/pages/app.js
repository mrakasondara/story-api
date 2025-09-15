import { routes } from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";
import { getAccessToken, getLogout, getUsername } from "../utils/auth";
import {
  generateUnauthenticatedNavigationListTemplate,
  generateAuthenticatedNavigationListTemplate,
} from "../utils/template";
import { transitionHelper } from "../utils";
import "../components/confirm-alert";

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;
  #skipToContentButton = null;

  constructor({
    navigationDrawer,
    drawerButton,
    content,
    skipToContentButton,
  }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;
    this.#skipToContentButton = skipToContentButton;

    this.#init();
  }

  #init() {
    this._setupDrawer();
    this.#skipToContent();
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

  #skipToContent() {
    this.#skipToContentButton.addEventListener("click", () => {
      this.#content.focus();
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

    const confirmAlert = document.querySelector("confirm-alert");

    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      confirmAlert.showAlert();
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const route = routes[url];

    if (!route) {
      location.reload();
    }
    const page = route();

    const transition = transitionHelper({
      updateDOM: async () => {
        this.#content.innerHTML = await page.render();
        await page.afterRender();
      },
    });

    transition.ready.catch(console.error);
    transition.updateCallbackDone.then(() => {
      scrollTo({ top: 0, behavior: "instant" });
      this.#setUpNavigationList();
    });
  }
}

export default App;
