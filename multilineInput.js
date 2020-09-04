const mithril = require('mithril');
const html = require('hyperx')(mithril);
const autosize = require('autosize');

function multilineInput (options) {
  const state = {};

  function handleInput (event, onInput) {
    state.value = event.target.value;
    onInput && onInput(event, state);
  }

  return {
    oncreate: (vnode) => {
      state.name = vnode.attrs.name;
      vnode.dom.querySelector('textarea').value = vnode.attrs.initialValue || '';
      autosize(vnode.dom);
    },

    view: (vnode) => {
      const options = vnode.attrs;
      return html`
        <mui-multiline-input>
          <textarea id=${options.id} ${options.autoFocus ? 'autofocus' : ''} name="${options.name}" oninput=${event => handleInput(event, options.onInput)}></textarea>
        </mui-multiline-input>
      `;
    }
  };
}

module.exports = multilineInput;
