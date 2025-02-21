const rootSelector = "[data-js-tabs]";

class Tabs {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.buttons = Array.from(
      this.rootElement.querySelectorAll("[data-js-tabs-button]")
    );
    this.contents = Array.from(
      this.rootElement.querySelectorAll("[data-js-tabs-content]")
    );

    this.activeClass = "is-active";

    // Определяем активный таб
    this.activeIndex = this.buttons.findIndex((btn) =>
      btn.classList.contains(this.activeClass)
    );

    // Если активного таба нет, ставим первый
    if (this.activeIndex === -1) {
      this.activeIndex = 0;
      this.buttons[0]?.classList.add(this.activeClass);
      this.contents[0]?.classList.add(this.activeClass);
    }

    this.bindEvents();
  }

  updateUI() {
    this.buttons.forEach((btn, index) => {
      btn.classList.toggle(this.activeClass, index === this.activeIndex);
      btn.setAttribute("tabindex", index === this.activeIndex ? "0" : "-1");
    });

    this.contents.forEach((content, index) => {
      content.classList.toggle(this.activeClass, index === this.activeIndex);
    });
  }

  onTabClick(index) {
    this.activeIndex = index;
    this.updateUI();
    this.buttons[this.activeIndex].focus();
  }

  onKeyDown(event) {
    if (event.key === "ArrowRight") {
      this.activeIndex = (this.activeIndex + 1) % this.buttons.length;
    } else if (event.key === "ArrowLeft") {
      this.activeIndex =
        (this.activeIndex - 1 + this.buttons.length) % this.buttons.length;
    } else {
      return;
    }

    this.updateUI();
    this.buttons[this.activeIndex].focus();
  }

  bindEvents() {
    this.buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => this.onTabClick(index));
      btn.addEventListener("keydown", (event) => this.onKeyDown(event));
    });
  }
}

class TabsCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Tabs(element);
    });
  }
}

// Запускаем TabsCollection
export default TabsCollection;
