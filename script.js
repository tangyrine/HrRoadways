// Select the scroll button
const scrollButton = document.getElementById("scrollButton");

// Show/hide scroll button with smooth animation
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    scrollButton.classList.add("show");
    scrollButton.style.animation = "fadeInButton 0.5s ease-out forwards";
  } else {
    scrollButton.style.animation = "fadeOutButton 0.5s ease-out forwards";
    setTimeout(() => {
      scrollButton.classList.remove("show");
    }, 500);
  }
});

// Smooth scroll with easing
scrollButton.addEventListener("click", () => {
  // Add active state
  scrollButton.classList.add("active");
  
  // Smooth scroll with cubic-bezier easing
  const scrollToTop = () => {
    const currentPosition = window.pageYOffset;
    if (currentPosition > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, currentPosition - currentPosition/8);
    } else {
      scrollButton.classList.remove("active");
    }
  };
  
  scrollToTop();
});

// Add hover effect
scrollButton.addEventListener("mouseover", () => {
  scrollButton.style.transform = "scale(1.15) translateY(-3px)";
  scrollButton.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4)";
});

scrollButton.addEventListener("mouseout", () => {
  scrollButton.style.transform = "scale(1)";
  scrollButton.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
});