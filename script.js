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
      validateFields(input, formValidClass, formInvalidClass, inputErrorClass);
    });
  });

  /**
   * Функция валидации полей
   * @param field валидируемый элемент
   * @param validClassName класс успешной валидации
   * @param invalidClassName класс не успешной валидации
   * @param errorClassName класс ошибочного заполнения
   */
  function validateFields(
    field,
    validClassName,
    invalidClassName,
    errorClassName,
  ) {
    var validType = field.dataset.validator;
    var value = field.value;
    var error = false;
    switch (validType) {
      case "letters":
        lettersValidate(value);
        break;
      case "number":
        numberValidate(value);
        break;
      case "regexp":
        regexpValidate(value);
        break;
    }

    toggleClassFormValidate(form, false, validClassName, invalidClassName);
  }

  /**
   * Класс текстовой валидации
   * @param value
   * @returns {boolean}
   */
  function lettersValidate(value) {
    console.log("lettersValidate");
    return !!value;
  }

  function numberValidate(value) {
    console.log("numberValidate");
    return !!value;
  }

  function regexpValidate(value) {
    console.log("regexpValidate");
    return !!value;
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
}
