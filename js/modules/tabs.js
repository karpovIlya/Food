"use strict";

export default class Tabs {
  constructor(tabContents, tabTitles, tabTitlesActiveClass) {
    this.contentBlocks = document.querySelectorAll(tabContents);
    this.titles = document.querySelectorAll(tabTitles);
    this.activeClass = tabTitlesActiveClass;
    
    this.hideAllTabs();
    this.openContentBlock(0);

    this.titles.forEach((title, index) => {
        title.addEventListener("click", () => {

        this.hideAllTabs();
        this.openContentBlock(index);
      });
    });
  }

  hideAllTabs() {
    this.contentBlocks.forEach(block => {
      block.classList.add("hide");
    });

    this.titles.forEach(title => {
      title.classList.remove(this.activeClass);
    });
  }

  openContentBlock(openedIndex) {
    this.contentBlocks.forEach((block, index)=> {
      if (index === openedIndex) {
        block.classList.remove("hide");
      }
    });

    this.titles.forEach((title, index) => {
      if (index === openedIndex) {
        title.classList.add(this.activeClass);
      }
    });
  }
}