import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import RegisterPage from "../pages/auth/register/register-page";
import LoginPage from "../pages/auth/login/login-page";
import {
  checkAuthenticatedRoute,
  checkUnauthenticatedRouteOnly,
  getAccessToken,
} from "../utils/auth";
import DetailPage from "../pages/detail/detail-page";
import AddStory from "../pages/add-story/add-story";

export const routes = {
  "/": () => (getAccessToken() ? new HomePage() : new LoginPage()),
  "/home": () => (getAccessToken() ? new HomePage() : new LoginPage()),
  "/about": () => (getAccessToken() ? new AboutPage() : new LoginPage()),
  "/story/:id": () => (getAccessToken() ? new DetailPage() : new LoginPage()),
  "/add-story": () => new AddStory(),

  "/login": () => (getAccessToken() ? new HomePage() : new LoginPage()),
  "/register": () => (getAccessToken() ? new HomePage() : new RegisterPage()),
};
