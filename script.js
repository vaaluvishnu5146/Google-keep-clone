(() => {
  const keep = [];
  const titleInput = document.getElementById("title");
  const taskInput = document.getElementById("task");
  const colorInput = document.getElementById("color");
  const pinnedInput = document.getElementById("pinned");
  const keepFormContainer = document.getElementById("keep-form");
  const othersContainer = document.getElementById("others-container");
  const pinnedContainer = document.getElementById("pinned-container");
  const optionsPanel = document.getElementById("options-container");

  document.addEventListener("click", () => {
    titleInput.setAttribute("style", "display:none;");
    optionsPanel.setAttribute("style", "display:none;");
  });

  keepFormContainer.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  taskInput.addEventListener("focus", (e) => {
    e.stopPropagation();
  });

  taskInput.addEventListener("focus", (e) => {
    e.stopPropagation();
    titleInput.setAttribute("style", "display: block; visibility: visible;");
    optionsPanel.setAttribute("style", "display: flex; visibility: visible;");
  });

  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const data = {
        title: titleInput.value,
        description: taskInput.value,
        bgColor: colorInput.value,
        pinned: pinnedInput.checked,
      };
      console.log(data);
      keep.push(data);
      insertNewkeep(data);
      resetInput();
    }
  });

  function resetInput() {
    titleInput.value = "";
    taskInput.value = "";
  }

  function createKeepCard(data = {}) {
    const divCard = document.createElement("div");
    divCard.setAttribute("class", "card");
    divCard.setAttribute("style", `background-color: ${data.bgColor}`);
    divCard.innerHTML = `<h2>${data.title}</h2>
        <p>${data.description}</p>`;
    return divCard;
  }

  function insertNewkeep(data = {}) {
    if (data.pinned) {
      pinnedContainer.append(createKeepCard(data));
    } else {
      othersContainer.append(createKeepCard(data));
    }
  }
})();
