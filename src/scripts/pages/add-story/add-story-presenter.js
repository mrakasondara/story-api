import { getAccessToken } from "../../utils/auth";

export default class AddStoryPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showNewFormMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error("showNewFormMap: error:", error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async postNewStory({ description, photo, lat, lon }) {
    this.#view.showAddStoryLoadingButton();
    try {
      const data = {
        description,
        photo,
        lat,
        lon,
      };
      const isLogin = getAccessToken();
      const response = isLogin
        ? await this.#model.storeNewStory(data)
        : await this.#model.storeNewStoryGuest(data);
      if (!response.ok) {
        console.error("postNewStory: response:", response);
        this.#view.storeFailed(response.message);
        return;
      }
      this.#view.storeSuccessFully(response.message);
    } catch (error) {
      console.error("postNewStory: error:", error);
      this.#view.storeFailed(error.message);
    } finally {
      this.#view.hideAddStoryLoadingButton();
    }
  }
}
