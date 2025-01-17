// Select the scroll button
const scrollButton = document.getElementById("scrollButton");

// Show button when scrolled down
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    scrollButton.classList.add("show");
  } else {
    scrollButton.classList.remove("show");
  }
});

// Scroll to the top when button is clicked
scrollButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});