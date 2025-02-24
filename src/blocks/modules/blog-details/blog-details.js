const rootSelector = "[data-js-expandable-content]";

class ExpandableContent {
  selectors = {
    root: rootSelector,
    button: "[data-js-expandable-content-button]",
  };

  stateClasses = {
    isExpanded: "is-expanded",
  };

  animationsParams = {
    duration: 500,
    easing: "ease",
  };

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.buttonElement = this.rootElement.querySelector(this.selectors.button);

    if (!this.buttonElement) {
      console.warn("Кнопка не найдена для элемента:", this.rootElement);
      return;
    }

    this.bindEvents();
  }

  expand() {
    const { offsetHeight, scrollHeight } = this.rootElement;

    this.rootElement.classList.add(this.stateClasses.isExpanded);
    this.rootElement.style.overflow = "hidden";

    const animation = this.rootElement.animate(
      [{ maxHeight: `${offsetHeight}px` }, { maxHeight: `${scrollHeight}px` }],
      this.animationsParams
    );

    animation.onfinish = () => {
      this.rootElement.style.maxHeight = "none";
      this.rootElement.style.overflow = "";
    };
  }

  collapse() {
    const { scrollHeight } = this.rootElement;

    this.rootElement.style.maxHeight = `${scrollHeight}px`;
    this.rootElement.style.overflow = "hidden";

    requestAnimationFrame(() => {
      this.rootElement.animate(
        [{ maxHeight: `${scrollHeight}px` }, { maxHeight: "0px" }],
        this.animationsParams
      ).onfinish = () => {
        this.rootElement.classList.remove(this.stateClasses.isExpanded);
        this.rootElement.style.maxHeight = "";
        this.rootElement.style.overflow = "";
      };
    });
  }

  toggle() {
    if (this.rootElement.classList.contains(this.stateClasses.isExpanded)) {
      this.collapse();
    } else {
      this.expand();
    }
  }

  onButtonClick = () => {
    this.toggle();
  };

  bindEvents() {
    this.buttonElement.addEventListener("click", this.onButtonClick);
  }
}

class ExpandableContentCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new ExpandableContent(element);
    });
  }
}

export default ExpandableContentCollection;
