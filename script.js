const favoriteButtons = document.querySelectorAll(".favorite-btn");

favoriteButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "♡") {
      btn.textContent = "♥";
      btn.style.color = "#e11d48";
    } else {
      btn.textContent = "♡";
      btn.style.color = "#000";
    }
  });
});
