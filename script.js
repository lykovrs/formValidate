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
    // отменяем действие по умолчанию
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
    var lengthError = value.length > 0;
    var lettersError = /^[a-zа-яё\s]+$/iu.test(value);
    return lengthError && lettersError;
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
