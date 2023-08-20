//DOM Element
const openNavbarBtn = document.getElementById("open-navbar");
const closeNavbarBtn = document.getElementById("close-navbar");
const navbar = document.getElementById("navbar");
const navbarLinks = Array.from(document.querySelectorAll("#navbar a"));

const slider = document.getElementById("slider-wrapper");
const prevBtn= document.getElementById("prev");
const nextBtn = document.getElementById("next");

const masonry = document.getElementById("masonry");
const expandBtn = document.getElementById("expand");

const cards = Array.from(document.querySelectorAll('.card'));

//data - image list
const IMAGE_LIST = [
  { url: "./assets/image-h-5.jpeg" }, 
  { url: "./assets/image-h-4.jpeg" },
  { url: "./assets/image-v-4.jpeg" },
  { url: "./assets/image-h-1.jpeg" },
  { url: "./assets/image-h-3.jpeg" },
  { url: "./assets/image-v-2.jpeg" },
  { url: "./assets/image-h-2.jpeg" }, 
  { url: "./assets/image-v-1.jpeg" },
  { url: "./assets/image-h-1.jpeg" },
];

//number of slides
const SLIDES_AMOUNT = slider.querySelectorAll("img").length;


//interval - slider
let interval;

//masonry and fullscreen slideshow
//obie biblioteki stworzyłam samodzielnie
//Masonry Gallery: https://github.com/MartaZaorska/masonry-gallery
//Fullscreen Slideshow: https://github.com/MartaZaorska/fullscreen-slideshow
const { open } = createFullscreenSlideshow(IMAGE_LIST, { displayNumeration: false, background: "linear-gradient(to top, #F5F0EC 0%, #FFF 100%)", controls: true, fontColor: "#111" });

const { update } = createMasonryGallery(masonry, IMAGE_LIST, {
  gap: "24px",
  responsive: [1,2,2,3,3,3],
  cursorPointer: true
}, (data, index) => open(index));


//intersection observer - card animation
const observer = new IntersectionObserver((entries) => entries.forEach(entry => {
  if(entry.isIntersecting) entry.target.classList.add('translate-x-0', 'translate-y-0', 'opacity-100');
}), { threshold: 0.7 });

cards.forEach(card => observer.observe(card));


//events handler
openNavbarBtn.addEventListener("click", openNavbar);
closeNavbarBtn.addEventListener("click", closeNavbar);

navbarLinks.forEach((link) => link.addEventListener("click", () => {
  if(document.body.getBoundingClientRect().width < 992) closeNavbar();
}));

prevBtn.addEventListener("click", () => sliderHandler(prevSlide));
nextBtn.addEventListener("click", () => sliderHandler(nextSlide));

expandBtn.addEventListener("click", () => {
  document.getElementById("masonry-gradient").classList.add("hidden");
  expandBtn.classList.add("hidden");
  //add more images - method from library masonry-gallery
  //update([...IMAGE_LIST, ...ANOTHER_IMAGE_LIST]);
});

window.addEventListener("resize", () => {
  slider.style.setProperty("--slide", 0);
  initInterval();
});

//functions
function openNavbar(){ navbar.setAttribute("data-state", "opened"); }
function closeNavbar(){ navbar.setAttribute("data-state", "closed"); }

function prevSlide() {
  const index = +getComputedStyle(slider).getPropertyValue("--slide");
  const new_index = index === 0 ? SLIDES_AMOUNT - 1 : index - 1;
  slider.style.setProperty("--slide", new_index);
}

function nextSlide(){
  const index = +getComputedStyle(slider).getPropertyValue("--slide");
  const new_index = index === SLIDES_AMOUNT - 1 ? 0 : index + 1;
  slider.style.setProperty("--slide", new_index);
}

function sliderHandler(cb){
  clearInterval(interval);
  cb();
  initInterval();
}

function initInterval(){
  clearInterval(interval);
  if(document.body.getBoundingClientRect().width >= 992) interval = setInterval(nextSlide, 5000);
}

initInterval();