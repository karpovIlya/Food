"use strict";

export default class CalorieCalc {
  constructor(genderWrapper, activityWrapper, inputsWrapper, activeClass, resultSelector) {
    this.genderBtns = document.querySelectorAll(genderWrapper);
    this.activityBtns = document.querySelectorAll(activityWrapper);
    this.inputs = document.querySelectorAll(inputsWrapper);
    this.resultBox = document.querySelector(resultSelector);
  
    this.activeClass = activeClass;

    this.gender = this.initLocalStorage("genderValue", "genderIndex", this.genderBtns, "female", 0);
    this.activity = this.initLocalStorage("activityValue", "activityIndex", this.activityBtns, "small", 1);
    this.getActivityRatio();

    this.showResult();

    this.genderBtns.forEach((genderBtn, index) => {
      genderBtn.addEventListener("click", () => {
        this.hideActiveBtn(this.genderBtns);
        this.showActiveBtn(this.genderBtns, index);

        this.gender = genderBtn.getAttribute("id");
        
        localStorage.setItem("genderValue", this.gender);
        localStorage.setItem("genderIndex", index);

        this.showResult();
      });
    });

    this.activityBtns.forEach((activityBtn, index) => {
      activityBtn.addEventListener("click", () => {
        this.hideActiveBtn(this.activityBtns);
        this.showActiveBtn(this.activityBtns, index);

        this.activity = activityBtn.getAttribute("id");
        this.getActivityRatio();

        localStorage.setItem("activityValue", this.activity);
        localStorage.setItem("activityIndex", index);

        this.showResult();
      });
    });

    this.inputs.forEach(input => {
      input.addEventListener("input", () => {
        if (input.value.search(/\D/g) >= 0) {
          input.style.border = "solid red 1px";
        } else {
          input.style.border = "none";
        }

        switch (input.getAttribute("id")) {
          case "height":
            this.height = +input.value;
            break;
          case "weight":
            this.weight = +input.value;
            break;
          case "age":
            this.age = +input.value;
            break;
        }

        this.showResult();
      });
    });
  }

  hideActiveBtn(btnsArr) {
    btnsArr.forEach(btn => {
      btn.classList.remove(this.activeClass);
    });
  }

  showActiveBtn(btnsArr, index) {
    btnsArr.forEach((btn, btnIndex) => {
      if (btnIndex === index) {
        btn.classList.add(this.activeClass);
      }
    });
  }

  initLocalStorage(value, index, elemArr, baseValue, baseIndex) {
    let resultValue;

    if (localStorage.getItem(value)) {
      resultValue = localStorage.getItem(value);
      this.showActiveBtn(elemArr, +localStorage.getItem(index));
    } else {
      resultValue = baseValue;
      this.showActiveBtn(elemArr, baseIndex);
    }

    return resultValue;
  }

  getActivityRatio() {
    switch(this.activity) {
      case "low":
        this.activityRatio = 1.2;
        break;
      case "small":
        this.activityRatio = 1.375;
        break;
      case "medium":
        this.activityRatio = 1.55;
        break;
      case "high":
        this.activityRatio = 1.725;
        break;
    }
  }

  showResult() {
    if ((!isNaN(this.height) && !isNaN(this.weight) && !isNaN(this.age)) && (this.height > 0 && this.weight > 0 && this.age > 0)) {
      if (this.gender === "female") {
        this.result = Math.round((88.36 + (13.4 * this.weight) + (4.8 * this.height) - (5.7 * this.age)) * +this.activityRatio);
      } else {
        this.result = Math.round((447.6 + (9.2 * this.weight) + (3.1 * this.height) - (4.3 * this.age)) * +this.activityRatio);
      }
    } else {
      this.result = "(´･ᴗ･ ` )";
    }

    this.resultBox .innerHTML = this.result;
  }
}