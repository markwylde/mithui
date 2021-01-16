const m = require('mithril');

function checkbox (vnode) {
  const id = vnode.attrs.id || window.btoa(Date.now() + '.' + Math.random());

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
          id,
          type: 'checkbox',
          ...options
        }),
        m('label', {
          for: id
        }, options.label)
      );
    }
  };
}

checkbox.handlesOwnLabel = true;

module.exports = checkbox;
