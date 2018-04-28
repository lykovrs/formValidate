"use strict";

// Код валидации формы

/**
 * Функция валидации формы
 * @param options
 */
function validateForm(options) {
  var formId = options.formId;
  var formValidClass = options.formValidClass;
  var formInvalidClass = options.formInvalidClass;
  var inputErrorClass = options.inputErrorClass;

  var form = document.getElementById(formId);

  var name = form.elements.name;
  var age = form.elements.age;
  // var phone = form.elements.phone;
  // var number = form.elements.number;

  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    var inputs = Array.from(form.elements);
    inputs.forEach(function(input) {
      validateField(input, formValidClass, formInvalidClass, inputErrorClass);
    });
  });

  /**
   * Функция валидации полей
   * @param field валидируемый элемент
   * @param validClassName класс успешной валидации
   * @param invalidClassName класс не успешной валидации
   * @param errorClassName класс ошибочного заполнения
   */
  function validateField(
    field,
    validClassName,
    invalidClassName,
    errorClassName,
  ) {
    var validType = field.dataset.validator;
    var value = field.value;
    switch (validType) {
      case "letters":
        //TODO: вынести эту логику в отедльную функцию
        if (lettersValidate(value)) {
          field.classList.add(validClassName);
        } else {
          field.classList.add(invalidClassName);
        }
        console.log("letters", value, lettersValidate(value));
        break;
      case "number":
        console.log("numbers");
        break;
      case "regexp":
        console.log("regexp");
        break;
    }
  }

  /**
   * Класс текстовой валидации
   * @param value
   * @returns {boolean}
   */
  function lettersValidate(value) {
    return !!value;
  }

  function numberValidate(value) {
    return !!value;
  }

  function regexpValidate(value) {
    return !!value;
  }
}
