const m = require('mithril');

function passwordInput (vnode) {
  const id = vnode.attrs.id || window.btoa(Date.now() + '.' + Math.random());

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
          id,
          type: 'password',
          ...options
        })
      );
    }
  };
}

passwordInput.handlesOwnLabel = false;

module.exports = passwordInput;
