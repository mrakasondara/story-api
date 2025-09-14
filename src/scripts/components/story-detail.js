class StoryDetail extends HTMLElement {
  constructor() {
    super();
  }
  set story(value) {
    this._saveData(value);
  }
  _saveData(value) {
    const story = {
      id: value.id,
      name: value.name,
      description: value.description,
      photoUrl: value.photoUrl,
      createdAt: value.createdAt,
      location: value.location,
      lat: value.lat,
      lon: value.lon,
    };
    // console.log(value);
    return this.render(story);
  }

  render(story) {
    const date = new Date(story.createdAt);
    return (this.innerHTML = `
        <div class="mt-5 w-full flex flex-col" id="detail-container">
            <figure>
                <image alt="story image" src="${
                  story.photoUrl
                }" class="w-full mx-auto lg:w-1/2 max-h-[30rem] object-cover rounded-lg">
            </figure>
            <div class="grid my-3 gap-4">
                <div class="flex justify-between text-main">
                    <p class="flex items-center font-bold gap-2">
                        <span class="material-icons-outlined">account_circle</span>
                        ${story.name}
                    </p>

                    <p class="flex items-center gap-2">
                        ${date.toLocaleString()}
                        <span class="material-icons-outlined">date_range</span>
                    </p>
                </div>
                
            <p class="text-justify opacity-75">${story.description}</p>
            </div>

            <h2 class="text-xl font-bold text-main mt-5">Location</h2>
            <div class="flex justify-between text-main mt-2">
                  <p class="flex items-center">
                    <span class="material-icons-outlined" data-value=${
                      story.lat
                    }>location_on</span>
                    ${story.lat ? `${story.lat},` : "Doesnt have location"}

                    <span data-value=${story.lon}>${
      story.lon ? story.lat : ""
    }</span>
                    <span data-value=${
                      story.location.pathName
                    } class="ml-[5px]">(${
      story.lat ? story.location.placeName : "-"
    })</span>
                  </p>
            </div>
            <div class="min-h-[400px] h-[400px] relative rounded-lg bg-slate-100 mt-3" id="map-container">
              <div id="map" class="min-h-[400px] h-[400px] relative rounded-lg"></div>
              <div id="skeleton-map-detail" class="mt-3 skeleton h-50 md:h-[20rem] lg:h-[400px] w-full hidden"></div>
            </div>
        </div>
        
    `);
  }
}

customElements.define("story-detail", StoryDetail);
