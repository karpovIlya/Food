"use strict";

import { addZero } from "./utility";

export default class Slider {
  constructor(slider, slides, slidesInner, prev, next, totalBox, currentBox) {
    this.slider = document.querySelector(slider);
    this.slides = document.querySelectorAll(slides);
    this.slidesInner = document.querySelector(slidesInner);
    this.prevBtn = document.querySelector(prev);
    this.nextBtn = document.querySelector(next);
    this.totalBox = document.querySelector(totalBox);
    this.currentBox = document.querySelector(currentBox);

    this.currentCount = 0;

    this.totalBox.innerHTML = addZero(this.slides.length);
    this.slidesInner.style.width = `${this.slides.length * 100}%`;
    this.changeSlide();

    this.nextBtn.addEventListener("click", () => {
      this.addSlide();
      this.changeSlide();
    });

    this.prevBtn.addEventListener("click", () => {
      this.subSlide();
      this.changeSlide();
    });
  }

  addSlide() {
    if (this.dotsArray) {
      this.dotsArray[this.currentCount].style.opacity = ".5";
    }

    this.currentCount++;

    if (this.currentCount > this.slides.length - 1) {
      this.currentCount = 0;
    }
  }

  subSlide() {
    if (this.dotsArray) {
      this.dotsArray[this.currentCount].style.opacity = ".5";
    }

    this.currentCount--;

    if (this.currentCount < 0) {
      this.currentCount = this.slides.length - 1;
    }
  }

  changeSlide() {
    this.currentBox.innerHTML = addZero(this.currentCount + 1);
    this.slidesInner.style.marginLeft = `-${100 * this.currentCount}%`;

    if (this.dotsArray) {
      this.dotsArray.forEach((dot, index) => {
        if (index == this.currentCount) {
          dot.style.opacity = "1";
        }
      });
    }
  }

  createDot() {
    this.dotsContainer = document.createElement("div");
    this.dotsContainer.classList.add("carousel-indicators");
    this.dotsArray = [];

    this.slides.forEach((slide, index) => {
      const dot = document.createElement("div");

      dot.classList.add("dot");
      dot.setAttribute("data-slide-to", index);

      if (index == this.currentCount) {
        dot.style.opacity = "1";
      }

      this.dotsContainer.append(dot);
      this.dotsArray.push(dot);
    });

    this.slider.append(this.dotsContainer);

    this.dotsArray.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.dotsArray[this.currentCount].style.opacity = ".5";

        this.currentCount = index;
        this.changeSlide();
      });
    });
  } 
}