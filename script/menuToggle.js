document.addEventListener("templates-loaded", () => {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      const navigation = document.querySelector(".navbar__navigation");
      const navbar = document.querySelector(".navbar");

      navigation.classList.toggle("navbar__navigation--mobile-open");
      navbar.classList.toggle("navbar--menu-open");

      // Update button text
      const buttonText = this.querySelector(".navbar__menu-toggle-text");
      buttonText.textContent = navigation.classList.contains(
        "navbar__navigation--mobile-open"
      )
        ? "Close"
        : "Menu";
    });
  } else {
    console.error("Mobile menu toggle button not found.");
  }
});
