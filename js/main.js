const modal = document.getElementById("videoModal");
const openBtns = document.querySelectorAll("#openVideo, #openVideoBtn");
const closeBtn = document.getElementById("closeVideo");
const iframe = document.getElementById("videoFrame");

// TU VIDEO DE YOUTUBE
const videoURL =
  "https://www.youtube-nocookie.com/embed/SteYmUPLgbI?autoplay=1";

openBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.style.display = "flex";
    iframe.src = videoURL;
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  iframe.src = "";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    iframe.src = "";
  }
});
