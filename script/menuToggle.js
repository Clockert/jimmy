/**
 * Mobile menu toggle with accessibility features
 */

let focusTrapElements = [];
let firstFocusableElement = null;
let lastFocusableElement = null;

document.addEventListener("templates-loaded", () => {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");

  if (mobileMenuToggle) {
    mobileMenuToggle.setAttribute("aria-expanded", "false");
    mobileMenuToggle.setAttribute("aria-controls", "mobile-navigation");

    mobileMenuToggle.addEventListener("click", function () {
      const navigation = document.querySelector(".navbar__navigation");
      const navbar = document.querySelector(".navbar");
      const isOpen = navigation.classList.contains(
        "navbar__navigation--mobile-open"
      );

      navigation.classList.toggle("navbar__navigation--mobile-open");
      navbar.classList.toggle("navbar--menu-open");

      this.setAttribute("aria-expanded", !isOpen);

      const buttonText = this.querySelector(".navbar__menu-toggle-text");
      buttonText.textContent = !isOpen ? "Close" : "Menu";

      if (!isOpen) {
        setTimeout(() => {
          const firstMenuItem = navigation.querySelector(".navbar__menu a");
          if (firstMenuItem) firstMenuItem.focus();
        }, 100);

        trapFocus(navigation);
      } else {
        this.focus();
        removeFocusTrap();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        const navigation = document.querySelector(".navbar__navigation");
        if (navigation?.classList.contains("navbar__navigation--mobile-open")) {
          mobileMenuToggle.click();
        }
      }
    });
  }
});

function trapFocus(container) {
  focusTrapElements = container.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );

  if (focusTrapElements.length > 0) {
    firstFocusableElement = focusTrapElements[0];
    lastFocusableElement = focusTrapElements[focusTrapElements.length - 1];
    document.addEventListener("keydown", handleFocusTrap);
  }
}

function handleFocusTrap(e) {
  if (e.key === "Tab") {
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  }
}

function removeFocusTrap() {
  document.removeEventListener("keydown", handleFocusTrap);
  focusTrapElements = [];
  firstFocusableElement = null;
  lastFocusableElement = null;
}
