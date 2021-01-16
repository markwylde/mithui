const m = require('mithril');

function select (vnode) {
  const id = vnode.attrs.id || window.btoa(Date.now() + '.' + Math.random());

  return {
    view: (vnode) => {
      const options = vnode.attrs;
      const { options: _, ...optionsWithoutOptions } = options;

      return m('mui-select',
        m('select',
          {
            id,
            ...optionsWithoutOptions
          },
          options.options.map(option =>
            m('option', {
              value: option.value,
              selected: options.initialValue === option.value
            }, option.label)
          )
        )
      );
    }
  };
}

select.handlesOwnLabel = false;

module.exports = select;
