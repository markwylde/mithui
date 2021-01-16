const m = require('mithril');

function select (vnode) {
  return {
    view: (vnode) => {
      const options = vnode.attrs;

      return m('mui-select',
        m('select',
          {
            id: options.id,
            autoFocus: options.autoFocus,
            name: options.name
          },
          options.options.map(option =>
            m('option', { value: option.value, selected: options.initialValue === option.value }, option.label)
          )
        )
      );
    }
  };
}

select.handlesOwnLabel = false;

module.exports = select;
