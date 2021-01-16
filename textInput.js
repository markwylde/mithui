const m = require('mithril');

function textInput (vnode) {
  const id = vnode.attrs.id || window.btoa(Date.now() + '.' + Math.random());

  const initialValue = vnode.attrs.initialValue || '';

  return {
    oncreate: (vnode) => {
      vnode.dom.querySelector('input').value = initialValue;
    },

    view: (vnode) => {
      const options = vnode.attrs;

      return m('mui-text-input',
        m('input', {
          id,
          ...options
        })
      );
    }
  };
}

textInput.handlesOwnLabel = false;

module.exports = textInput;
