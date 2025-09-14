export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showStoriesListMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error("showStoriesError", error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async initialStoriesAndMap() {
    this.#view.showLoading();
    try {
      await this.showStoriesListMap();
      const response = await this.#model.getAllStory();
      const responseMap = await this.#model.getAllMapStory();
      if (!response.ok) {
        console.error("initialStoriesandMap:", response);
        this.#view.populateStoriesError(response.message);
        return;
      }
      this.#view.populateStories(response.listStory);
      this.#view.populateStoriesMap(responseMap.listStory);
    } catch (error) {
      console.error("initialStoriesError:", error);
      this.#view.populateStoriesError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }
}
