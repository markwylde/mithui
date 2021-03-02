const m = require('mithril');

const formField = require('./formField');

function form () {
  return {
    view: (vnode) => {
      const children = vnode.children.filter(child => !!child);

      return m('mui-form',
        m('form',
          vnode.attrs,
          children.map(formField)
        )
      );
    }
  };
}

module.exports = form;
