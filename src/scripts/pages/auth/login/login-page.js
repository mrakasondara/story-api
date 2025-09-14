import * as StoryAPI from "../../../data/api";
import * as AuthModel from "../../../utils/auth";
import { removeAlert, showAlert } from "../../../utils";
import LoginPresenter from "./login-presenter";

export default class LoginPage {
  #presenter = null;
  async render() {
    return `
    <section class="flex w-full lg:w-[80%] p-3 my-[5rem] mx-auto rounded-lg bg-white shadow" id="login">
            <image class="w-0 rounded-lg lg:w-1/2" src="images/story-image.jpg"></image>
            <div class="flex flex-col w-full lg:w-1/2 bg-secondary rounded-lg p-3 font-firasans">
                <h2 class="text-xl font-asimovian text-center font-bold mt-[5rem]">Welcome Back</h2>
                <form class="mx-2 my-[3rem]" id="login-form">
                    <div class="grid gap-3 my-5">
                        <label for="email" class="font-bold ">Email adress</label>
                        <label class="input validator w-full rounded-lg">
                          <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                              stroke-linejoin="round"
                              stroke-linecap="round"
                              stroke-width="2.5"
                              fill="none"
                              stroke="currentColor"
                            >
                              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                          </svg>
                          <input type="email" class="outline-none" placeholder="mail@site.com" name="email" id="email" required />
                        </label>
                        <div class="validator-hint hidden">Enter valid email address</div>
                    </div>
                    <div class="grid gap-3 my-5">
                        <label for="password" class="font-bold">Password</label>
                        <label class="input validator w-full rounded-lg">
                          <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                              stroke-linejoin="round"
                              stroke-linecap="round"
                              stroke-width="2.5"
                              fill="none"
                              stroke="currentColor"
                            >
                              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                          </svg>
                          <input type="password" class="outline-none" placeholder="******" name="password" id="password" required minlength="8" />
                        </label>
                        <p class="validator-hint hidden">Must be more than 8 characters</p>
                    </div>
                    <button class="bg-main text-secondary cursor-pointer px-3 py-2 rounded-lg w-full transition ease-in" type="submit" id="login-button">Login</button>
                   
                    <button class="flex hidden items-center justify-center gap-5 bg-main  text-secondary cursor-pointer px-3 py-2 rounded-lg w-full transition ease-in" type="submit" id="login-loading-button">
                        <span class="loading loading-spinner loading-md"></span>
                    </button>
                    
                    <p class="mt-2 text-sm">Does'nt have an account ?<a href="#/register" class="ml-2 font-semibold text-main">Register</a></p>
                </form>
            </div>
        </section>
      `;
  }

  async afterRender() {
    this.#presenter = new LoginPresenter({
      view: this,
      model: StoryAPI,
      authModel: AuthModel,
    });
    this.#setupForm();
  }

  #setupForm() {
    document
      .getElementById("login-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = {
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        };
        await this.#presenter.getLogin(data);
      });
  }

  loginSuccessFully() {
    showAlert("Login Success", "success");
    location.hash = "/home";
  }

  loginFailed(message) {}

  showLoginLoadingButton() {
    document.getElementById("login-button").classList.add("hidden");
    document.getElementById("login-loading-button").classList.remove("hidden");
  }
  hideLoginLoadingButton() {
    document.getElementById("login-button").classList.remove("hidden");
    document.getElementById("login-loading-button").classList.add("hidden");
  }
}
