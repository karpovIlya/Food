"use strict";

export default class Modal {
  constructor(modalSelector, openTriggers, closeTrigger) {
    this.modalWin = document.querySelector(modalSelector);
    this.openTriggers = document.querySelectorAll(openTriggers);
    this.closeTrigger = document.querySelector(closeTrigger);

    this.openTriggers.forEach(button => {
      button.addEventListener("click", () => {
        this.openModal();
      });
    });

    this.modalWin.addEventListener("click", e => {
      if (e.target && (e.target === this.closeTrigger || e.target === this.modalWin)) {
        this.closeModal();
      }
    });
  }

  openModal() {
    this.modalWin.classList.add("show");
  }

  closeModal() {
    this.modalWin.classList.remove("show");
  }
}