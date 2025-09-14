import RegisterPresenter from "./register-presenter";
import * as StoryAPI from "../../../data/api";

export default class RegisterPage {
  #presenter = null;
  async render() {
    return `
        <section class="flex w-full lg:w-[80%] p-3 my-[5rem] mx-auto rounded-lg bg-white shadow">
            <image class="w-0 rounded-lg lg:w-1/2" src="images/story-image.jpg"></image>
            <div class="flex flex-col w-full lg:w-1/2 bg-secondary rounded-lg py-3 px-5 font-firasans">
                <h2 class="text-xl  text-center font-bold mt-[5rem] font-asimovian">Start Dive Into the World of Stories</h2>
                <p class=" text-sm text-center"> Discover various, fun, interactive stories from every person</p>
                <form class="mx-2 my-[3rem]" id="register-form">
                    <div class="grid gap-3 my-5">
                        <label for="name" class="font-bold">Name</label>
                        <label class="input w-full rounded-lg">
                          <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                              stroke-linejoin="round"
                              stroke-linecap="round"
                              stroke-width="2.5"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </g>
                          </svg>
                          <input type="text" class="outline-none" placeholder="Jane Doe" name="name" id="name" required />
                        </label>
                    </div>
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
                    <button class="btn bg-main  text-secondary cursor-pointer px-3 py-2 rounded-lg w-full transition ease-in" type="submit" id="register-button">Register</button>
                    
                    <button class="flex hidden items-center justify-center gap-5 bg-main  text-secondary cursor-pointer px-3 py-2 rounded-lg w-full transition ease-in" type="submit" id="register-loading-button">                        
                    <span class="loading loading-spinner loading-md"></span>
                    </button>

                    <p class="mt-2 text-sm">Already have an account ?<a href="#/login" class="ml-2 font-semibold text-main">Login</a></p>
                    </form>
            </div>
        </section>
      `;
  }

  async afterRender() {
    this.#presenter = new RegisterPresenter({
      view: this,
      model: StoryAPI,
    });

    this.#setupForm();
  }

  #setupForm() {
    document
      .getElementById("register-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        };
        await this.#presenter.getRegistered(data);
      });
  }

  registeredSuccessfully(message) {
    alert(message);
    location.hash = "/login";
  }

  registeredFailed(message) {
    alert(message);
  }

  showRegisterLoadingButton() {
    document.getElementById("register-button").classList.add("hidden");
    document
      .getElementById("register-loading-button")
      .classList.remove("hidden");
  }
  hideRegisterLoadingButton() {
    document.getElementById("register-button").classList.remove("hidden");
    document.getElementById("register-loading-button").classList.add("hidden");
  }
}
