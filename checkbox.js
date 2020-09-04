const mithril = require('mithril');
const html = require('hyperx')(mithril);

function checkbox (options) {
  const state = {};

  function handleInput (event, onInput) {
    state.value = !!event.target.checked;
    onInput && onInput(event, state);
  }

  return {
    oncreate: (vnode) => {
      state.name = vnode.attrs.name;
      vnode.dom.querySelector('input').checked = vnode.attrs.initialValue || false;
    },

    view: (vnode) => {
      const { id, autoFocus, name, label, onInput } = vnode.attrs;

      return html`
        <mui-checkbox>
          <input id=${id} type="checkbox" ${autoFocus ? 'autofocus' : ''} name="${name}" oninput=${event => handleInput(event, onInput)} />
          <label for=${id}>${label}</label>
        </mui-checkbox>
      `;
    }
  };
}

checkbox.handlesOwnLabel = true;

module.exports = checkbox;
