import StoryItem from "../../components/story-item";
import LoadingStoryItem from "../../components/loading-story-item";
import ErrorMessage from "../../components/error-message";
import EmptyMessage from "../../components/empty-message";
import HomePresenter from "./home-presenter";
import * as StoryAPI from "../../data/api";
import Map from "../../utils/map";

export default class HomePage {
  #presenter = null;
  #map = null;

  async render() {
    return `
      <section class="flex flex-col">
        <div class="min-h-[400px] h-[400px] relative bg-slate-100 rounded-lg mt-[5rem]">
          <div id="map" class="min-h-[400px] h-[400px] relative rounded-lg"></div>
          <div id="skeleton-map" class="skeleton h-50 md:h-[20rem] lg:h-[400px] w-full hidden"></div>
        </div>
      </section>
      <section class="my-[3rem]">
        <h1 class="text-xl font-firasans-bold text-main">New Stories</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 overflow-hidden gap-3 lg:gap-4 mt-5 p-5" id="story-list">
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: StoryAPI,
    });

    await this.#presenter.initialStoriesAndMap();
  }

  populateStoriesEmpty() {
    document.getElementById(
      "story-list"
    ).innerHTML = `<empty-message></empty-message>`;
  }
  populateStoriesError(message) {
    document.getElementById(
      "story-list"
    ).innerHTML = `<error-message message="${message}"></error-message>`;
  }

  populateStories(stories) {
    if (stories.length <= 0) {
      this.populateStoriesEmpty();
      return;
    }
    const storyList = document.getElementById("story-list");
    const item = stories.map((story) => {
      const storyItem = document.createElement("story-item");
      storyItem.story = story;
      return storyItem;
    });

    storyList.append(...item);
  }

  populateStoriesMap(storiesMapOnly) {
    storiesMapOnly.map((story) => {
      const coordinate = [story.lat, story.lon];
      const markerOptions = { alt: story.name };
      const popupOptions = { content: story.name };

      this.#map.addMarker(coordinate, markerOptions, popupOptions);
    });
  }

  async initialMap() {
    this.#map = await Map.build("#map", {
      zoom: 10,
      locate: true,
    });
  }

  showMapLoading() {
    document.getElementById("skeleton-map").classList.remove("hidden");
    document.getElementById("map").classList.add("hidden");
  }

  hideMapLoading() {
    document.getElementById("skeleton-map").classList.add("hidden");
    document.getElementById("map").classList.remove("hidden");
  }

  showLoading() {
    document.getElementById("story-list").innerHTML = `
    <loading-story-item></loading-story-item>
    <loading-story-item></loading-story-item>
    <loading-story-item></loading-story-item>
    <loading-story-item></loading-story-item>
    `;
    document.querySelectorAll("story-item").forEach((item) => {
      item.classList.add("hidden");
    });
  }

  hideLoading() {
    document.querySelectorAll("loading-story-item").forEach((item) => {
      item.remove();
    });
    document.querySelectorAll("story-item").forEach((item) => {
      item.classList.remove("hidden");
    });
  }
}
