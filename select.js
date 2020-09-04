const mithril = require('mithril');
const html = require('hyperx')(mithril);

function select (options) {
  const state = {};

  function handleInput (event, onInput) {
    state.value = event.target.value;
    onInput && onInput(event, state);
  }

  return {
    oncreate: (vnode) => {
      state.name = vnode.attrs.name;
      vnode.dom.querySelector('select').value = vnode.attrs.initialValue || '';
    },

    view: (vnode) => {
      const options = vnode.attrs;

      return html`
        <mui-select>
          <select id=${options.id} ${options.autoFocus ? 'autofocus' : ''} name="${options.name}" oninput=${event => handleInput(event, options.onInput)}>
            ${options.options.map(option => html`
              <option value=${option.value}>${option.label}</option>
            `)}
          </select>
        </mui-select>
      `;
    }
  };
}

module.exports = select;
