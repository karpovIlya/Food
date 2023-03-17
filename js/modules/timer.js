"use strict";

import { addZero } from "./utility";

export default class Timer {
  constructor(deadline, daysDiv, hoursDiv, minutesDiv, secondsDiv) {
    this.deadline = deadline;
    this.daysDiv = document.querySelector(daysDiv);
    this.hoursDiv = document.querySelector(hoursDiv);
    this.minutesDiv = document.querySelector(minutesDiv);
    this.secondsDiv = document.querySelector(secondsDiv);

    this.getTheRestTime();
    this.updateTimer();

    setInterval(() => {
      this.getTheRestTime();
      this.updateTimer();
    }, 1000);
  }

  getTheRestTime() {
    const restTime = Date.parse(this.deadline) - Date.parse(new Date());

    this.seconds = addZero(this.resetToZero(Math.floor((restTime / 1000) % 60)));
    this.minutes = addZero(this.resetToZero(Math.floor((restTime / 60000) % 60)));
    this.hours = addZero(this.resetToZero(Math.floor((restTime / (1000 * 60 * 60)) % 24)));
    this.days = addZero(this.resetToZero(Math.floor(restTime / (1000 * 60 * 60 * 24))));
  }
  
  resetToZero(num) {
    if (num <= 0) {
      return 0;
    } else {
      return num;
    }
  }

  updateTimer() {
    this.daysDiv.innerHTML = `${this.days}`;
    this.hoursDiv.innerHTML = `${this.hours}`;
    this.minutesDiv.innerHTML = `${this.minutes}`;
    this.secondsDiv.innerHTML = `${this.seconds}`;
  }
}