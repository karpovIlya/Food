"use strict";

export default class Card {
  constructor(cardClass, wrappClass, img, altimg, title, descr, price) {
    this.cardClass = cardClass;
    this.wrappClass = document.querySelector(wrappClass);
    this.img = img;
    this.altimg = altimg;
    this.title = title;
    this.descr = descr;
    this.price = price;

    this.render();
  }

  render() {
    const card = document.createElement("div");
    
    card.innerHTML = `
      <div class="${this.cardClass}">
        <img src="${this.img}" alt="${this.altimg}">
        <h3 class="${this.cardClass}-subtitle">${this.title}</h3>
        <div class="${this.cardClass}-descr">${this.descr}</div>
        <div class="${this.cardClass}-divider"></div>
        <div class="${this.cardClass}-price">
            <div class="${this.cardClass}-cost">Цена:</div>
            <div class="${this.cardClass}-total"><span>${this.price}</span> грн/день</div>
        </div>
      </div>
    `;

    this.wrappClass.append(card);
  }
}