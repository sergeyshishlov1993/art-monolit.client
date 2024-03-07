import { reactive } from "vue";

const defaultErrorObject = {
  isDirty: false,
  errors: [],
}; //create a default object with an error for each input

export const errorsFormData = reactive({}); //create a reactive object to store errors

export function createErrorObj(name) {
  errorsFormData[name] = { ...defaultErrorObject }; //create a function that will create a default object with errors where the object key is the name of the input
}
export function validateField(value, name, password) {
  //we check the input fields where the name parameter is the name of the input, the value parameter is the input value, password is the password input value for comparison

  errorsFormData[name].errors = []; //reset the error value in the object so that errors are not duplicated

  // Is required
  if (!value) {
    errorsFormData[name].errors.push("Це поле обов'язкове до заповнення!");
  }

  if (!!value && name === "phone" && value.length != 13) {
    errorsFormData[name].errors = [];
    errorsFormData[name].errors.push("Введіть номер телефону");
  }

  if (!!value && name === "phone" && /[a-z].*\d|\d.*[a-z]/i.test(value)) {
    errorsFormData[name].errors = [];
    errorsFormData[name].errors.push("Тільки цифри");
  }
}
