document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("close-btn");

  // Open sidebar
  hamburger.addEventListener("click", () => {
    sidebar.classList.add("active");
    hamburger.style.display = "none"; // hide hamburger
  });

  // Close sidebar
  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
    hamburger.style.display = "block"; // show hamburger again
  });
});
