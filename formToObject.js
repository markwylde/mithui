module.exports = function (form) {
  return Array
    .from(form.querySelectorAll('[name]'))
    .reduce(function (state, field) {
      if (field.type === 'select-multiple') {
        Array.from(field.options).forEach(function (option) {
          if (option.selected) {
            state[field.getAttribute('name')] = option.value;
          }
        });
      } else if (field.type === 'checkbox' || field.type === 'radio') {
        if (field.checked) {
          state[field.getAttribute('name')] = true;
        } else {
          state[field.getAttribute('name')] = false;
        }
      } else {
        state[field.getAttribute('name')] = field.value;
      }

      return state;
    }, {});
};
