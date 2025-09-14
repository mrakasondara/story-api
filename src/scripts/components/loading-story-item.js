class LoadingStoryItem extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    return (this.innerHTML += `
          <div class="card gap-3 w-96">
            <div class="skeleton w-96 h-60">
            </div>
            <div class="grid gap-3">
              <div class="card-title skeleton w-40 h-5"></div>
              <div class="skeleton w-96 h-10"></div>
              <div class="card-actions justify-end">
                <div class="skeleton w-30 h-10"></div>
              </div>
            </div>
        </div>
          `);
  }
}

customElements.define("loading-story-item", LoadingStoryItem);
