document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".icon");

  icons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent click from bubbling

      const popup = icon.nextElementSibling;

      // close all other popups first
      document.querySelectorAll(".popup-menu").forEach((menu) => {
        if (menu !== popup) {
          menu.style.display = "none";
        }
        // menu.style.display = "none";
      });

      // toggle current popup
      if (popup.style.display == "none") {
        popup.style.display = "block";
      } else {
        popup.style.display = "none";
      }
      // popup.style.display =
      //   popup.style.display === "block" ? "none" : "block";
    });
  });

  // click anywhere outside to close any open popup
  document.addEventListener("click", () => {
    document.querySelectorAll(".popup-menu").forEach((menu) => {
      menu.style.display = "none";
    });
  });
});
