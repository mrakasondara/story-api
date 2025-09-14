class StoryItem extends HTMLElement {
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
      lat: value.lat,
      lon: value.lon,
    };
    return this.render(story);
  }

  render(story) {
    const date = new Date(story.createdAt);
    return (this.innerHTML = `
        <div class="card bg-base-100 max-h-[500px] md:max-h-96 shadow-sm font-firasans">
            <figure>
              <img
                src="${story.photoUrl}"
                alt="story image" 
                class="object-scale-down"
                />
            </figure>
            <div class="card-body">
              <div class="grid">
                <p class="flex items-center gap-2 text-[11px]">
                  <span class="material-icons-outlined" id="icon-story-item">account_circle</span>
                  ${story.name}
                </p>
                <p class="flex items-center gap-2 text-[11px]">
                  <span class="material-icons-outlined" id="icon-story-item">date_range</span>
                  ${date.toLocaleString()}
                </p>
                <p class="flex items-center gap-2 text-[11px] ${
                  story.lat ? "" : "hidden"
                }">
                  <span class="material-icons-outlined" id="icon-story-item">location_on</span>
                  ${story.lat},${story.lon}
                </p>
              </div>
              <p class="text-md">${story.description}</p>
            <div class="card-actions justify-end">
                <a href="#/story/${
                  story.id
                }" class="btn bg-main text-secondary">Detail</a>
              </div>
            </div>
        </div>
        `);
  }
}

customElements.define("story-item", StoryItem);
