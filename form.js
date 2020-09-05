const m = require('mithril');

function renderErrors (errors) {
  return m('ul', {
    class: 'form-errors'
  }, errors.map(error => m('li', error)));
}

function handleInput (state, options) {
  return (event, data) => {
    state[data.name] = data.value;
    options.onInput && options.onInput(state);
  };
}

function form (vnode) {
  const state = {
    formId: Math.floor(Math.random() * 1e16)
  };

  vnode.attrs.fields.forEach(field => {
    state[field.name] = field.initialValue;
  });

  return {
    view: (vnode) => {
      const options = vnode.attrs;

      return m('mui-form',
        m('form',
          {
            onsubmit: event => options.onSubmit && options.onSubmit(event, state)
          },
          options.fields.map(field => {
            return m('div',
              {
                class: 'form-group'
              },
              field.component.handlesOwnLabel ? null : m('label', { for: state.formId + '_' + field.name }, field.label),
              field.errors ? renderErrors(field.errors) : null,
              m(field.component,
                {
                  id: state.formId + '_' + field.name,
                  ...field,
                  onInput: handleInput(state, options)
                })
            );
          }),
          m('button', 'Submit')
        )
      );
    }
  };
}

module.exports = form;
