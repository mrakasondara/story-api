import { handleFileChange } from "../../utils/index";
import * as StoryAPI from "../../data/api";
import AddStoryPresenter from "./add-story-presenter";
import Map from "../../utils/map";

export default class AddStory {
  #presenter;
  #map = null;
  #form;
  #camera;
  #isCameraOpen = false;
  #takenStory;

  async render() {
    return `
        <section class="flex flex-col font-firasans">
        
        <form class="flex flex-col mx-2 my-[3rem] card shadow-sm p-5 h-[102rem]" id="add-story-form">
        <h1 class="text-2xl font-bold text-main mt-5 text-center">Add Story</h1>
                    <div class="flex justify-center gap-2 mt-3" id="photo-preview-container">
                        <img src="/images/placeholder.png" class="h-80 rounded-lg" alt="photo-preview" id="photo-preview" />
                    </div>

                    <div class="flex justify-center gap-2 mt-2 hidden" id="camera-container">
                    tes
                        <video src="" id="camera-video" class="w-full rounded-lg">
                          Video stream not available.
                        </video>
                        <canvas id="camera-canvas" class="rounded-lg"></canvas>
                    </div>

                    <div class="grid gap-3 mt-3">
                        <label for="photo" class="font-bold">Photo</label>
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Pick a file</legend>
                            <input type="file" name="photo" class="file-input w-full" accept="image/png, image/gif, image/jpeg" id="input-file"/>
                            <label class="label text-warning font-semibold">Max size 1MB</label>
                            <div class="text-red-500 hidden font-bold" id="validator-file"></div>
                        </fieldset>

                        <label for="camera" class="font-bold">Select Camera</label>
                        <select name="camera" id="camera-select" class="select select-neutral"></select>
                        
                        <div class="flex gap-2">
                          <button class="bg-main text-secondary cursor-pointer px-3 py-2 mt-4 rounded-lg w-1/2 transition ease-in" id="open-story-camera-button">Open Camera</button>

                          <button id="camera-take-button" class="bg-main text-secondary cursor-pointer px-3 py-2 mt-4 rounded-lg w-1/2 transition ease-in" type="button">
                            Take Photo
                          </button>
                        </div>

                    </div>

                    <div class="grid gap-3 mt-3">
                        <label for="description" class="font-bold ">Description</label>
                        <textarea class="textarea w-full" placeholder="Story Description" name="description" required></textarea>
                    </div>

                    <div class="min-h-[400px] h-[400px] relative rounded-lg bg-slate-100 mt-3" id="map-container">
                        <div id="map" class="min-h-[400px] h-[400px] relative rounded-lg"></div>
                        <div id="skeleton-map-detail" class="mt-3 skeleton h-50 md:h-[20rem] lg:h-[400px] w-full hidden"></div>
                    </div>
                    
                    <label for="location" class="font-bold mt-4">Location</label>
                    <div class="flex gap-3 mt-1">
                        <input class="input w-1/2 font-bold" type="number" name="latitude" value="-6.175389" disabled>
                        <input class="input w-1/2 font-bold" type="number" name="longitude" value="106.827139" disabled>
                    </div>

                <button class="bg-main text-secondary cursor-pointer px-3 py-2 mt-4 rounded-lg w-full transition ease-in" type="submit" id="add-story-button">Add Story</button>
                
                <button class="flex hidden items-center mt-4 justify-center gap-5 bg-main text-secondary cursor-pointer px-3 py-2 rounded-lg w-full transition ease-in" type="submit" id="add-story-loading-button">
                    <span class="loading loading-spinner loading-md"></span>
                </button>
            </form>
        </section>
        `;
  }
  async afterRender() {
    this.#presenter = new AddStoryPresenter({
      view: this,
      model: StoryAPI,
    });

    this.#takenStory = [];

    this.#presenter.showNewFormMap();
    this.#setupForm();
  }

  async initialMap() {
    this.#map = await Map.build("#map", {
      zoom: 15,
      locate: true,
    });

    const centerCoordinate = this.#map.getCenter();
    this.#updateLatLngInput(
      centerCoordinate.latitude,
      centerCoordinate.longitude
    );

    const draggableMarker = this.#map.addMarker(
      [centerCoordinate.latitude, centerCoordinate.longitude],
      { draggable: true }
    );

    draggableMarker.addEventListener("move", (e) => {
      const coordinate = e.target.getLatLng();
      this.#updateLatLngInput(coordinate.lat, coordinate.lng);
    });

    this.#map.addMapEventListener("click", (e) => {
      draggableMarker.setLatLng(e.latlng);

      e.sourceTarget.flyTo(e.latlng);
    });
  }

  #setupForm() {
    this.#form = document.getElementById("add-story-form");
    const uploadField = document.getElementById("input-file");
    const validatorFile = document.getElementById("validator-file");
    const addStoryButton = document.getElementById("add-story-button");
    const photoPreview = document.getElementById("photo-preview");

    const elements = {
      uploadField,
      validatorFile,
      addStoryButton,
      photoPreview,
    };

    handleFileChange(elements);

    uploadField.addEventListener("change", (e) => {
      if (!e.target.files.length) {
        return;
      }
      this.#takenStory = e.target.files[0];
    });

    this.#form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        description: this.#form.elements.namedItem("description").value,
        latitude: this.#form.elements.namedItem("latitude").value,
        longitude: this.#form.elements.namedItem("longitude").value,
        photo: this.#form.elements.namedItem("photo").files.photo,
      };

      await this.#presenter.postNewStory(data);
    });

    const cameraContainer = document.getElementById("camera-container");
    document
      .getElementById("open-story-camera-button")
      .addEventListener("click", async (e) => {
        cameraContainer.classList.toggle("hidden");
        photoPreview.classList.toggle("hidden");
        this.#isCameraOpen = !cameraContainer.classList.contains("hidden");
        if (this.#isCameraOpen) {
          e.currentTarget.textContent = "Close Camera";
          this.#setupCamera();
          this.#camera.launch();
          return;
        }
        e.currentTarget.textContent = "Open Camera";
      });
  }

  #updateLatLngInput(latitude, longitude) {
    this.#form.elements.namedItem("latitude").value = latitude;
    this.#form.elements.namedItem("longitude").value = longitude;
  }

  #setupCamera() {
    if (!this.#camera) {
      this.#camera = new Camera();
    }
  }

  showMapLoading() {}
  hideMapLoading() {}
}
