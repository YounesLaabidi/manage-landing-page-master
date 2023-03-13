// MOBILE MENU
const menuBtn = document.querySelector('[alt="menu-btn"]');
const menu = document.querySelector(".nav-list");
menuBtn.addEventListener("click", (e) => {
  menu.classList.toggle("active");
  e.target.setAttribute("src", "./assets/images/icon-close.svg");
  e.target.classList.toggle("active");
  if (!menu.classList.contains("active")) {
    e.target.setAttribute("src", "./assets/images/icon-hamburger.svg");
  }
});
// SCROLL ANIMATION
const elements = document.querySelectorAll("[scrollAnimation]");
const endSection = document.querySelector("[endSection]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);
elements.forEach((element) => {
  observer.observe(element);
});
observer.observe(endSection);
// FORM VALIDATION
const form = document.querySelector("#form");
const input = document.querySelector("#email");
const errorMessage = document.querySelector("[errorMessage]");
form.addEventListener("submit", (e) => {
  let message = [];
  let i = 0;
  for (alpha of input.value) {
    if (alpha === "@" || alpha === ".") {
      i++;
    }
  }
  if (
    input.value === "" ||
    input.value === null ||
    i <= 1 ||
    input.value.length < 10
  ) {
    message.push("Please insert a valid email");
  }
  if (message.length > 0) {
    e.preventDefault();
    input.style.color = "#d40320";
  }

  errorMessage.innerText = message.join(", ");
});
// Carousel
class Carsouel {
  constructor() {
    this.track = document.querySelector(".carousel__cards");
    this.prevBtn = document.querySelector(".button--left");
    this.nextBtn = document.querySelector(".button--right");
    this.cards = Array.from(this.track.children);
    this.navIndicators = document.querySelector(".carousel__nav");
    this.indicators = Array.from(this.navIndicators.children);
    this.run();
  }
  run() {
    this.intialPlace();
    this.place();
    this.nextButton();
    this.previousButton();
    this.indicator();
  }
  intialPlace() {
    const intialWidth = this.cards[0].getBoundingClientRect().width + 20;
    this.track.style.transform = `translateY(-50%) translateX(-${intialWidth}px)`;
  }
  place() {
    const cardWidth = this.cards[0].getBoundingClientRect().width;
    this.cards.forEach((card, index) => {
      card.style.left = `${(20 + cardWidth) * index}px`;
    });
  }
  move(currentSlide, targetSlide) {
    this.track.style.transform = `translateY(-50%) translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove("current-card");
    targetSlide.classList.add("current-card");
  }
  static buttonPositon(targetCard, targetBtn) {
    const targetCardWidth = document
      .querySelector(".current-card")
      .previousElementSibling.getBoundingClientRect().left;
    const targetCardTop = targetCard.getBoundingClientRect().top;
    const targetCardHeight = targetCard.getBoundingClientRect().height;
    targetBtn.style.setProperty("--width", ` ${targetCardWidth - 20}px`);
    targetBtn.style.setProperty("--top", ` ${targetCardTop}px`);
    targetBtn.style.setProperty("--height", ` ${targetCardHeight}px`);
  }
  previousButton() {
    let target = this.track.querySelector(".current-card");
    Carsouel.buttonPositon(target.previousElementSibling, this.prevBtn);
    this.prevBtn.addEventListener("click", (e) => {
      const currentSlide = this.track.querySelector(".current-card");
      const prevSlide = currentSlide.previousElementSibling;
      this.move(currentSlide, prevSlide);
      target = this.track.querySelector(".current-card");
      this.btnVisibility(prevSlide);
      const currentIndicator =
        this.indicators[this.cards.findIndex((card) => card === currentSlide)];
      const targetIndicator =
        this.indicators[this.cards.findIndex((card) => card === prevSlide)];
      this.showIndicator(currentIndicator, targetIndicator);
    });
  }
  nextButton() {
    let target = this.track.querySelector(".current-card");
    Carsouel.buttonPositon(target.nextElementSibling, this.nextBtn);
    this.nextBtn.addEventListener("click", () => {
      const currentSlide = this.track.querySelector(".current-card");
      const nextSlide = currentSlide.nextElementSibling;
      this.move(currentSlide, nextSlide);
      this.btnVisibility(nextSlide);
      const currentIndicator =
        this.indicators[this.cards.findIndex((card) => card === currentSlide)];
      const targetIndicator =
        this.indicators[this.cards.findIndex((card) => card === nextSlide)];
      this.showIndicator(currentIndicator, targetIndicator);
    });
  }
  showIndicator(currInd, targtInd) {
    currInd.classList.remove("current-indicator");
    targtInd.classList.add("current-indicator");
  }
  indicator() {
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", (e) => {
        const targetIndicator = this.cards[index];
        const currentIndicator =
          this.navIndicators.querySelector(".current-indicator");
        this.move(currentIndicator, targetIndicator);
        this.showIndicator(currentIndicator, e.target);
        this.btnVisibility(targetIndicator);
      });
    });
  }
  btnVisibility(targetInd) {
    if (targetInd === this.cards[0]) {
      this.prevBtn.classList.add("active");
      this.nextBtn.classList.remove("active");
    } else if (targetInd === this.cards[this.cards.length - 1]) {
      this.prevBtn.classList.remove("active");
      this.nextBtn.classList.add("active");
    } else {
      this.prevBtn.classList.remove("active");
      this.nextBtn.classList.remove("active");
    }
  }
}
const c1 = new Carsouel();
