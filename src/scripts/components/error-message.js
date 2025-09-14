class ErrorMessage extends HTMLElement {
  static observedAttributes = ["message"];
  constructor() {
    super();
    this._message = this.getAttribute("message");
  }
  connectedCallback() {
    this.render();
  }
  render() {
    return (this.innerHTML += `
        <div role="alert" class="flex flex-col alert alert-error text-secondary font-firasans">
            <div class="flex w-full gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Terjadi kesalahan dalam pengambilan data</span>
            </div>
            <p class="-mt-3 self-start ml-[2rem]">${this._message}</p>
        </div>
    `);
  }
}

customElements.define("error-message", ErrorMessage);
