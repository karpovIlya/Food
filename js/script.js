"use strict";

import Tabs from "./modules/tabs.js";
import Timer from "./modules/timer.js";
import Modal from "./modules/modal.js";
import Forms  from "./modules/forms.js";
import Slider from "./modules/slider.js";
import Card from "./modules/card.js";
import CalorieCalc from "./modules/calorieСalc.js";

window.addEventListener("DOMContentLoaded", () => {
  new Tabs(".tabcontent", ".tabheader__item", "tabheader__item_active");
  new Timer("2023-12-31T23:59", "#days", "#hours", "#minutes", "#seconds");
  new Modal(".modal", "[data-modal='open']", "[data-modal='close']");
  new Forms("form", "http://localhost:3000/requests");
  new Slider(".offer__slider", ".offer__slide", ".offer__slider-inner", ".offer__slider-prev", ".offer__slider-next", "#total", "#current")
    .createDot();
  new CalorieCalc("#gender div", "#activity div", "#inputs input", "calculating__choose-item_active", ".calculating__result span");

  fetch("http://localhost:3000/menu")
    .then(res => res.json())
    .then(cardData => {
      cardData.forEach(({img, altimg, title, descr, price}) => {
        new Card("menu__item", ".menu__field .container", img, altimg, title, descr, price);
      });
    });
});