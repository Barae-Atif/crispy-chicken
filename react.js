document.addEventListener("DOMContentLoaded", () => {

  const hearts = document.querySelectorAll(".heart");

  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      heart.classList.toggle("active");
    });
  });

});

