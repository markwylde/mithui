const m = require('mithril');
const autosize = require('autosize');

function handleInput (state, options) {
  return event => {
    state.value = event.target.value;
    options.onInput && options.onInput(event, {
      name: options.name,
      value: state.value
    });
  };
}

function multilineInput (vnode) {
  const state = {
    value: vnode.attrs.initialValue || ''
  };

  return {
    oncreate: (vnode) => {
      const textareaElement = vnode.dom.querySelector('textarea');
      textareaElement.value = state.value;
      autosize(textareaElement);
    },

    view: (vnode) => {
      const options = vnode.attrs;

      return m('mui-multiline-input',
        m('textarea', {
          id: options.id,
          autoFocus: options.autoFocus,
          name: options.name,
          oninput: handleInput(state, options)
        })
      );
    }
  };
}

module.exports = multilineInput;
