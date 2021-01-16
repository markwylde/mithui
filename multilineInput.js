const m = require('mithril');
const autosize = require('autosize');

function multilineInput (vnode) {
  const id = vnode.attrs.id || window.btoa(Date.now() + '.' + Math.random());

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
          id,
          ...options
        })
      );
    }
  };
}

multilineInput.handlesOwnLabel = false;

module.exports = multilineInput;
