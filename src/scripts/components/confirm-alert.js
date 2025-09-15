import { getLogout } from "../utils/auth";

class ConfirmAlert extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const html = (this.innerHTML += `
        <div role="alert" class="alert alert-vertical sm:alert-horizontal alert-fixed hidden top-20 z-[50] right-10 font-firasans" id="confirm-alert">
            <span>Are you sure want to logout?</span>
            <div>
                <button class="btn btn-sm" id="btn-close">Deny</button>
                <button class="btn btn-sm btn-error" id="btn-accept">Accept</button>
            </div>
        </div>
    `);
    document.getElementById("btn-close").addEventListener("click", (ev) => {
      this.closeAlert();
    });
    document.getElementById("btn-accept").addEventListener("click", (ev) => {
      getLogout();
      location.href = "/";
    });
    return html;
  }

  closeAlert() {
    document.getElementById("confirm-alert").classList.add("hidden");
  }
  showAlert() {
    console.log("tes");
    document.getElementById("confirm-alert").classList.remove("hidden");
  }
}

customElements.define("confirm-alert", ConfirmAlert);
