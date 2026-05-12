window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("[data-panel]");
  const panels = {
    toon: document.getElementById("panel-toon"),
    royal: document.getElementById("panel-royal"),
    compare: document.getElementById("panel-compare"),
    data: document.getElementById("panel-data")
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.panel;

      tabs.forEach((item) => {
        item.classList.toggle("is-active", item === tab);
      });

      Object.entries(panels).forEach(([key, panel]) => {
        if (panel) {
          panel.classList.toggle("is-active", key === target);
        }
      });
    });
  });
});
