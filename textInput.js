const mithril = require('mithril');
const html = require('hyperx')(mithril);

function textInput (options) {
  const state = {};

  function handleInput (event, onInput) {
    state.value = event.target.value;
    onInput && onInput(event, state);
  }

  return {
    oncreate: (vnode) => {
      state.name = vnode.attrs.name;
      vnode.dom.querySelector('input').value = vnode.attrs.initialValue || '';
    },

    view: (vnode) => {
      const options = vnode.attrs;

      return html`
        <mui-text-input>
          <input id=${options.id} ${options.autoFocus ? 'autofocus' : ''} name="${options.name}" oninput=${event => handleInput(event, options.onInput)} />
        </mui-text-input>
      `;
    }
  };
}

module.exports = textInput;
