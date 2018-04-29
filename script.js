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

  /**
   * Обработчик отправки формы
   */
  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    var inputs = Array.from(form.elements).filter(function(input) {
      return !!input.dataset.validator;
    });

    var errors = [];

    inputs.forEach(function(input) {
      if (!validateField(input)) errors.push(input);
    });

    var successValidate = errors.some(function(item) {
      return !!item;
    });
    console.log(errors, successValidate);
    toggleClassFormValidate(
      form,
      successValidate,
      formValidClass,
      formInvalidClass,
    );
  });

  /**
   * Функция валидации полей
   * @param field валидируемый элемент
   * @returns {boolean}
   */

  function validateField(field) {
    var validType = field.dataset.validator;
    var value = field.value;
    switch (validType) {
      case "letters":
        return lettersValidate(value);
      case "number":
        return numberValidate(value);
      case "regexp":
        return regexpValidate(value);
    }
    return false;
  }

  /**
   * Класс текстовой валидации
   * @param value
   * @returns {boolean}
   */
  function lettersValidate(value) {
    console.log("lettersValidate", value.length > 0);
    return value.length > 0;
  }

  function numberValidate(value) {
    console.log("numberValidate", value.length > 0);
    return value.length > 0;
  }

  function regexpValidate(value) {
    console.log("regexpValidate", value.length > 0);
    return value.length > 0;
  }

  /**
   * Устанавливает класс в зависимости от успешности валидации полей
   * @param form элемент формы
   * @param valid валидность формы
   * @param validClass класс успешной валидации
   * @param invalidClass класс ошибки валидации
   */
  function toggleClassFormValidate(form, valid, validClass, invalidClass) {
    if (valid) {
      form.classList.remove(invalidClass);
      form.classList.add(validClass);
    } else {
      form.classList.remove(validClass);
      form.classList.add(invalidClass);
    }
  }

  function setClassInputError(field, className) {
    field.classList.add(className);
  }

  function removeClassInputError(field, className) {
    field.classList.remove(className);
  }
}
