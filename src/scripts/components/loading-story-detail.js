class LoadingStoryDetail extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    return (this.innerHTML += `
            <div class="grid w-full">
                <div class="mt-3 skeleton h-50 md:h-[20rem] lg:h-[29rem] w-full"></div>
                <div class="flex justify-between">
                    <div class="mt-3 skeleton h-5 w-40"></div>
                    <div class="mt-3 skeleton h-5 w-60"></div>
                </div>
                <div class="mt-3 skeleton h-30 w-full"></div>
            </div>

            `);
  }
}

customElements.define("loading-story-detail", LoadingStoryDetail);
