const mithril = require('mithril');
const html = require('hyperx')(mithril);

function renderErrors (errors) {
  return html`
    <ul class="form-errors">
      ${errors.map(error => html`<li>${error}</li>`)}
    </ul>
  `;
}

function form (vnode) {
  const state = {
    formId: Math.floor(Math.random() * 1e16)
  };

  function handleInput (event, data, onInput) {
    state[data.name] = data.value;
    onInput && onInput(state);
  }

  return {
    oncreate: (vnode) => {
      vnode.attrs.fields.forEach(field => {
        state[field.name] = field.initialValue;
      });
    },

    view: (vnode) => {
      const {
        onInput,
        onSubmit,
        fields
      } = vnode.attrs;

      return html`
        <mui-form>
          <form onsubmit=${event => onSubmit && onSubmit(event, state)}>
            ${fields.map(field => {
              return html`
                <div class="form-group">
                  ${field.component.handlesOwnLabel ? null : html`<label for=${state.formId + '_' + field.name}>${field.label}</label>`}
                  ${field.errors ? renderErrors(field.errors) : ''}
                  ${mithril(field.component, { id: state.formId + '_' + field.name, ...field, onInput: (event, data) => handleInput(event, data, onInput) })}
                </div>
              `;
            })}

            <button>Submit</button>
          </form>
        </mui-form>
      `;
    }
  };
}

module.exports = form;
