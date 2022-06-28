var bgn = document.getElementById("player");
function bgnPlay() {
  bgn.play();
  $(".play").addClass("active");
  $(".cog-img").addClass("rotatit");
  $(".stop").removeClass("active");
}
function bgnStop() {
  bgn.pause();
  bgn.currentTime = 0;
  $(".play").removeClass("active");
  $(".stop").addClass("active");
  $(".cog-img").removeClass("rotatit");
}
