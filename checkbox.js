const m = require('mithril');

function handleInput (state, options) {
  return event => {
    state.value = !!event.target.checked;
    options.onInput && options.onInput(event, {
      name: options.name,
      value: state.value
    });
  };
}

function checkbox (vnode) {
  const state = {
    value: vnode.attrs.initialValue || false
  };

  return {
    oncreate: (vnode) => {
      vnode.dom.querySelector('input').checked = state.value;
    },

    view: (vnode) => {
      const options = vnode.attrs;

      return m('mui-checkbox',
        m('input', {
          id: options.id,
          type: 'checkbox',
          autoFocus: options.autoFocus,
          name: options.name,
          oninput: handleInput(state, options)
        }),
        m('label', {
          for: options.id
        }, options.label)
      );
    }
  };
}

checkbox.handlesOwnLabel = true;

module.exports = checkbox;
