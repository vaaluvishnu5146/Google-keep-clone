(() => {
  let keep = [];
  let data = {};

  const titleInput = document.getElementById("title");
  const taskInput = document.getElementById("task");

  const titleSection = document.getElementById("titleSection");
  const keepFormContainer = document.getElementById("keep-form");
  const othersContainer = document.getElementById("others-container");
  const pinnedContainer = document.getElementById("pinned-container");
  const optionsPanel = document.getElementById("options-container");
  const notesMessageContainer = document.getElementById(
    "notesMessageContainer"
  );

  const colorPalatteBtn = document.getElementById("colorPickerBtn");
  const pinnedBtn = document.getElementById("pinnedBtn");

  const colorPalatteListing = document.getElementById("colorListing");
  const colorPalatte = document.getElementById("colorPalette");

  window.onload = function () {
    // Code to be executed after the entire page and all resources have loaded
    keep = getCacheKeepFromBrowser();
    rerenderApp();
    renderKeeps();
  };

  function rerenderApp() {
    if (keep.length > 0) {
      hideNotesContainerMessage();
      showOthersContainer();
      showPinnedContainer();
    } else {
      showNotesContainerMessage();
      hideOthersContainer();
      hidePinnedContainer();
    }
  }

  function renderKeeps() {
    keep.forEach((k) => insertNewkeep(k));
  }

  document.addEventListener("click", () => {
    data = {};
    handleToggleBtnUI();
    titleSection.setAttribute("style", "display:none;");
    optionsPanel.setAttribute("style", "display:none;");
    colorPalatteListing.classList.add("hidden");
  });

  keepFormContainer.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  taskInput.addEventListener("focus", (e) => {
    e.stopPropagation();
    titleSection.setAttribute("style", "display: flex; visibility: visible;");
    optionsPanel.setAttribute("style", "display: flex; visibility: visible;");
  });

  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      data = {
        ...data,
        title: titleInput.value,
        description: taskInput.value,
      };
      keep.push(data);
      cacheKeepInBrowser(keep);
      insertNewkeep(data);
      resetInput();
    }
  });

  // Color btn click handler
  colorPalatteBtn.addEventListener("click", (e) => {
    const { classList } = colorPalatteListing;
    if (classList.contains("hidden")) {
      colorPalatteListing.classList.remove("hidden");
      renderColorSwatchesIntoListing();
    } else {
      colorPalatteListing.classList.add("hidden");
    }
  });

  titleInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      taskInput.focus();
    }
  });

  pinnedBtn.addEventListener("click", (e) => {
    data = {
      ...data,
      pinned: !data.pinned,
    };
    handleToggleBtnUI();
  });

  function handleToggleBtnUI() {
    if (data.pinned) {
      pinnedBtn.innerHTML = '<i class="fa-solid fa-thumbtack"></i>';
    } else {
      pinnedBtn.innerHTML = '<i class="fa-solid fa-thumbtack-slash"></i>';
    }
  }

  function renderColorSwatchesIntoListing() {
    const swatches = [
      "bg-red-300",
      "bg-green-300",
      "bg-blue-300",
      "bg-yellow-300",
      "bg-orange-300",
      "bg-purple-300",
    ];
    const buttons = swatches.map((swatch) => createSwatchBtn(swatch));
    colorPalatte.innerHTML = "";
    colorPalatte.append(...buttons);
  }

  function createSwatchBtn(bgcolor) {
    const swatchButton = document.createElement("button");
    swatchButton.setAttribute(
      "class",
      `w-[25px] h-[25px] rounded-full ${bgcolor}`
    );
    swatchButton.setAttribute("id", bgcolor);
    swatchButton.addEventListener("click", (e) => {
      data["bgColor"] = bgcolor;
      colorPalatteListing.classList.add("hidden");
    });
    return swatchButton;
  }

  function resetInput() {
    titleInput.value = "";
    taskInput.value = "";
  }

  function createKeepCard(data = {}) {
    const divCard = document.createElement("div");
    divCard.setAttribute("class", `card ${data.bgColor}`);
    divCard.innerHTML = `<h2>${data.title}</h2>
        <p>${data.description}</p>`;
    return divCard;
  }

  function insertNewkeep(info = {}) {
    if (info.pinned) {
      pinnedContainer.children.item(1).append(createKeepCard(info));
    } else {
      othersContainer.children.item(1).append(createKeepCard(info));
    }
    data = {};
    rerenderApp();
  }

  function hideNotesContainerMessage() {
    notesMessageContainer.setAttribute("class", "hidden");
  }

  function showNotesContainerMessage() {
    notesMessageContainer.classList.remove("hidden");
  }

  function hidePinnedContainer() {
    pinnedContainer.setAttribute("class", "hidden");
  }

  function showPinnedContainer() {
    pinnedContainer.classList.remove("hidden");
    pinnedContainer.classList.add("container");
  }

  function hideOthersContainer() {
    othersContainer.setAttribute("class", "hidden");
  }

  function showOthersContainer() {
    othersContainer.classList.remove("hidden");
    othersContainer.classList.add("container");
  }

  function cacheKeepInBrowser(keep = []) {
    try {
      localStorage.setItem("keep", JSON.stringify(keep));
    } catch (error) {
      console.error(error);
    }
  }

  function getCacheKeepFromBrowser() {
    try {
      return JSON.parse(localStorage.getItem("keep")) || [];
    } catch (error) {
      console.error(error);
    }
  }
})();
