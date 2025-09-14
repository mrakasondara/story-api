export default class RegisterPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async getRegistered({ name, email, password }) {
    this.#view.showRegisterLoadingButton();
    try {
      const response = await this.#model.getRegistered({
        name,
        email,
        password,
      });

      if (!response.ok) {
        this.#view.registeredFailed(response.message);
        return;
      }
      this.#view.registeredSuccessfully(response.message, response.data);
    } catch (error) {
      console.error("register: error", error);
      this.#view.registeredFailed(error.message);
    } finally {
      this.#view.hideRegisterLoadingButton();
    }
  }
}

// raka mraka@gmail.com raka12345
