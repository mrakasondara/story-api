import { parseActivePathname } from "../../routes/url-parser";
import DetailPresenter from "./detail-presenter";
import * as StoryAPI from "../../data/api";
import StoryDetail from "../../components/story-detail";
import LoadingStoryDetail from "../../components/loading-story-detail";
import Map from "../../utils/map";

export default class DetailPage {
  #presenter = null;
  #map = null;

  async render() {
    return `
        <section class="flex flex-col font-firasans" id="detail-page">
            <h1 class="text-2xl font-bold text-main mt-5 text-center">Detail Story</h1>
        </section>
        `;
  }
  async afterRender() {
    this.#presenter = new DetailPresenter(parseActivePathname().id, {
      view: this,
      apiModel: StoryAPI,
    });

    this.#presenter.showStoryDetail();
  }

  async populateStoryDetailAndInitialMap(story) {
    const detailPage = document.getElementById("detail-page");
    const item = document.createElement("story-detail");
    item.story = story;
    detailPage.appendChild(item);

    if (!story.lat) {
      document.getElementById("map-container").classList.add("hidden");
      return;
    }
    await this.#presenter.showStoryDetailMap();
    if (this.#map) {
      const storyCoordinate = [story.lat, story.lon];
      const markerOptions = { alt: story.name };
      const popupOptions = { content: story.desc };

      this.#map.changeCamera(storyCoordinate);
      this.#map.addMarker(storyCoordinate, markerOptions, popupOptions);
    }
  }

  async initialMap() {
    this.#map = await Map.build("#map", {
      zoom: 10,
      locate: true,
    });
  }

  showMapLoading() {
    document.getElementById("skeleton-map-detail").classList.remove("hidden");
    document.getElementById("map").classList.add("hidden");
  }
  hideMapLoading() {
    document.getElementById("skeleton-map-detail").classList.add("hidden");
    document.getElementById("map").classList.remove("hidden");
  }

  showStoryDetailLoading() {
    document.querySelector("loading-story-detail")?.classList.remove("hidden");
  }
  hideStoryDetailLoading() {
    document.querySelector("loading-story-detail")?.classList.add("hidden");
  }

  populateStoryDetailError() {
    console.log("error detail");
  }
}
