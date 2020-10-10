const m = require('mithril');

function handleInput (options) {
  return event => {
    options.onInput && options.onInput(event, {
      name: options.name,
      value: event.target.value
    });
  };
}

function select (vnode) {
  return {
    oncreate: (vnode) => {
      vnode.dom.querySelector('select').value = vnode.attrs.value;
    },

    onupdate: (vnode) => {
      vnode.dom.querySelector('select').value = vnode.attrs.value;
    },

    view: (vnode) => {
      const options = vnode.attrs;

      return m('mui-select',
        m('select', {
          id: options.id,
          autoFocus: options.autoFocus,
          name: options.name,
          oninput: handleInput(options)
        },
        options.options.map(option =>
          m('option', { value: option.value }, option.label)
        )
        )
      );
    }
  };
}

module.exports = select;
