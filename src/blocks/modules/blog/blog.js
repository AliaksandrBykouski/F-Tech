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
    });

    this.contents.forEach((content, index) => {
      content.classList.toggle(this.activeClass, index === this.activeIndex);
    });
  }

  onTabClick(index) {
    this.activeIndex = index;
    this.updateUI();
  }

  bindEvents() {
    this.buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => this.onTabClick(index));
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
