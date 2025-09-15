export function showFormattedDate(date, locale = "en-US", options = {}) {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}

export function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function showAlert(message, status) {
  if (status == "success") {
    return (document.querySelector("section").innerHTML += `
    <div role="alert" class="alert alert-absolute alert-success font-firasans text-md text-white font-semibold">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>${message}</span>
    </div>
    `);
  } else {
    return (document.querySelector("section").innerHTML += `
    <div role="alert" class="alert alert-absolute alert-error font-firasans text-md text-white font-semibold">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>${message}</span>
    </div>
    `);
  }
}

export function removeAlert() {
  return document.querySelector(".alert").remove();
}

export function handleFileChange(elements) {
  const uploadField = elements.uploadField;
  const validatorFile = elements.validatorFile;
  const addStoryButton = elements.addStoryButton;
  const photoPreview = elements.photoPreview;

  uploadField.onchange = function () {
    if (!this.files.length) {
      photoPreview.src = "/images/placeholder.png";
      return;
    }
    if (this.files[0].size > 1048576) {
      validatorFile.classList.remove("hidden");
      validatorFile.textContent = "File is too big!";
      addStoryButton.setAttribute("disabled", "");
      addStoryButton.classList.replace("bg-main", "bg-red-500");
      photoPreview.src = "/images/placeholder.png";
    } else {
      const [file] = uploadField.files;
      photoPreview.src = URL.createObjectURL(file);

      validatorFile.classList.add("hidden");
      addStoryButton.removeAttribute("disabled");
      addStoryButton.classList.replace("bg-red-500", "bg-main");
    }
  };
}

export function transitionHelper({ skipTransition = false, updateDOM }) {
  if (skipTransition || !document.startViewTransition) {
    const updateCallbackDone = Promise.resolve(updateDOM()).then(() => {});

    return {
      ready: Promise.reject(Error("View transition unsupported")),
      updateCallbackDone,
      finished: updateCallbackDone,
    };
  }

  return document.startViewTransition(updateDOM);
}
