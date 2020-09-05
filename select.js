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

function select (vnode) {
  const state = {
    value: vnode.attrs.initialValue || false
  };

  return {
    oncreate: (vnode) => {
      vnode.dom.querySelector('select').value = state.value;
    },

    view: (vnode) => {
      const options = vnode.attrs;

      return m('mui-select',
        m('select', {
          id: options.id,
          autoFocus: options.autoFocus,
          name: options.name,
          oninput: handleInput(state, options)
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
