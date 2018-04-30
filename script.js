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
    // отменяем действие по-умолчанию
    ev.preventDefault();
    // выбираем только поля с валидацией
    var inputs = Array.from(form.elements).filter(function(input) {
      return !!input.dataset.validator;
    });
    // массив с не валидными полями
    var errors = [];

    // логика добавления / удаления классов успешной валидации полей
    inputs.forEach(function(input) {
      removeClassInputError(input, inputErrorClass);
      if (!validateField(input)) {
        errors.push(input);
        setClassInputError(input, inputErrorClass);
      }
    });

    // индикация успешной валидации полей
    var successValidate = errors.length === 0;
    // индикация валидации формы в целом
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
        var min = field.dataset.validatorMin;
        var max = field.dataset.validatorMax;
        return numberValidate(value, min, max);
      case "regexp":
        return regexpValidate(value);
    }
    return false;
  }

  /**
   * Текстовая валидация, только кириллица и латинские буквы
   * @param value валидируемая строка
   * @returns {boolean}
   */
  function lettersValidate(value) {
    var lengthValidate = value.length > 0;
    var lettersValidate = /^[a-zа-яё\s]+$/iu.test(value);
    return lengthValidate && lettersValidate;
  }

  /**
   * Валидация числовых полей
   * @param value валидируемое строковое значение
   * @param min минимально допустимое занчение(опционально)
   * @param max максилмально допустимое занчение(опционально)
   * @returns {boolean}
   */
  function numberValidate(value, min, max) {
    var lengthValidate = value.length > 0;
    var isNumber = !isNaN(value);
    // результат проверок на число и длину
    var result = lengthValidate && isNumber;

    // учет минимального значения
    if (min) result = result && +value >= +min;

    // учет максимального значения
    if (max) result = result && +value <= +max;

    return result;
  }

  function regexpValidate(value) {
    var lengthValidate = value.length > 0;
    // console.log("regexpValidate", value.length > 0);
    return lengthValidate;
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

  /**
   * Добавляет класс ошибки к элементу формы
   * @param field элемент
   * @param className добавляемый класс
   */
  function setClassInputError(field, className) {
    field.classList.add(className);
  }

  /**
   * Удаляет класс ошибки от элемента формы
   * @param field элемент
   * @param className имя удаляемого класса
   */
  function removeClassInputError(field, className) {
    field.classList.remove(className);
  }
}
