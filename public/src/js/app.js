"use strict";

const tinderContainer = document.querySelector(".tinder");
const tinderCards = document.querySelector("#tinderCards");

const createCard = (name, description, imgSrc) => {
  const card = document.createElement("div");
  card.classList.add("tinder--card");

  const image = document.createElement("img");
  image.src = imgSrc;
  image.loading = "lazy";
  image.alt = "Damn are you trying to get a blind date?";

  const surname = document.createElement("h3");
  surname.innerText = name;

  const desc = document.createElement("p");
  desc.innerHTML = description;

  card.appendChild(image);
  card.appendChild(surname);
  card.appendChild(desc);

  return card;
};

/* <div class="tinder--card">
<img src="https://placeimg.com/600/300/people">
<h3>Demo card 1</h3>
<p>This is a demo for Tinder like swipe cards</p>
</div> */

const getNewCards = async (number) => {
  const res = await fetch(`/getCards.json?number=${number}`,);
  const data = await res.json();
  for (const cardData of data) {
    const card = createCard(cardData.name, cardData.description, cardData.img);
    tinderCards.appendChild(card);
    initCard(card);
  }
};

const refreshCards = async () => {
  let newCards = document.querySelectorAll(".tinder--card:not(.removed)");
  if (newCards.length < 5) {
    await getNewCards(5);
    newCards = document.querySelectorAll(".tinder--card:not(.removed)");
  }

  newCards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index;
    const n1 = (20 - index) / 20;
    const n2 = 30 * index;
    card.style.transform = `scale(${n1}) translateY(-${n2}px)`;
    card.style.opacity = (10 - index) / 10;
  });

  tinderContainer.classList.add("loaded");
};

const initCard = (el) => {
  const hammertime = new Hammer(el);

  hammertime.on("pan", function (event) {
    el.classList.add("moving");
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    tinderContainer.classList.toggle("tinder_love", event.deltaX > 0);
    tinderContainer.classList.toggle("tinder_nope", event.deltaX < 0);

    const xMulti = event.deltaX * 0.03;
    const yMulti = event.deltaY / 80;
    const rotate = xMulti * yMulti;

    event.target.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
  });

  hammertime.on("panend", function (event) {
    el.classList.remove("moving");
    tinderContainer.classList.remove("tinder_love");
    tinderContainer.classList.remove("tinder_nope");

    const moveOutWidth = document.body.clientWidth;
    const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    event.target.classList.toggle("removed", !keep);

    if (keep) {
      event.target.style.transform = "";
    } else {
      const endX = Math.max(
        Math.abs(event.velocityX) * moveOutWidth,
        moveOutWidth
      );
      const toX = event.deltaX > 0 ? endX : -endX;
      const endY = Math.abs(event.velocityY) * moveOutWidth;
      let toY = event.deltaY > 0 ? endY : -endY;
      toY += event.deltaY;
      const xMulti = event.deltaX * 0.03;
      const yMulti = event.deltaY / 80;
      const rotate = xMulti * yMulti;

      event.target.style.transform = `translate(${toX}px, ${toY}px) rotate(${rotate}deg)`;
      refreshCards();
    }
  });
};

const createButtonListener = (love) => (event) => {
  const cards = document.querySelectorAll(".tinder--card:not(.removed)");
  const moveOutWidth = document.body.clientWidth * 1.5;

  if (!cards.length) return false;

  const card = cards[0];

  card.classList.add("removed");

  if (love) {
    card.style.transform =
      "translate(" + moveOutWidth + "px, -100px) rotate(-30deg)";
  } else {
    card.style.transform =
      "translate(-" + moveOutWidth + "px, -100px) rotate(30deg)";
  }

  refreshCards();

  event.preventDefault();
};

const allCards = document.querySelectorAll(".tinder--card");
refreshCards().then(() => {
  allCards.forEach(initCard);
});

const nope = document.getElementById("nope");
const nopeListener = createButtonListener(false);
nope.addEventListener("click", nopeListener);

const love = document.getElementById("love");
const loveListener = createButtonListener(true);
love.addEventListener("click", loveListener);
