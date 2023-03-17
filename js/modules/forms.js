"use strict";

export default class Forms {
  constructor(formsSelector, serverUrl) {
    this.forms = document.querySelectorAll(formsSelector);
    this.serverUrl = serverUrl;

    this.forms.forEach(form => {
      form.addEventListener("submit", e => {
        e.preventDefault();

        this.postData(form, this.convertFormDataToJson(new FormData(form)));
      });
    });
  }

  postData(form, body) {
    const res = fetch(this.serverUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: body
    })
      .then(() => alert("Ваши данные успешно отправлены!"))
      .catch(() => alert("Возникли некоторые технические неполадки!"))
      .finally(() => form.reset());
  }

  convertFormDataToJson(formData) {
    const obj = {};

    formData.forEach((value, key) => {
      obj[key] = value;
    });

    return JSON.stringify(obj);
  }
}