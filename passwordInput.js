const m = require('mithril');

function handleInput (state, options) {
  return event => {
    state.value = event.target.value;
    options.onInput && options.onInput(event, {
      name: options.name,
      value: state.value
    });
  };
}

function textInput (vnode) {
  const state = {
    value: vnode.attrs.initialValue || ''
  };

  return {
    oncreate: (vnode) => {
      vnode.dom.querySelector('input').value = state.value;
    },

    view: (vnode) => {
      const options = vnode.attrs;

      return m('mui-text-input',
        m('input', {
          id: options.id,
          type: 'password',
          autoFocus: options.autoFocus,
          name: options.name,
          oninput: handleInput(state, options)
        })
      );
    }
  };
}

module.exports = textInput;
