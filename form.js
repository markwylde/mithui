const m = require('mithril');

function renderErrors (errors) {
  return m('ul', {
    class: 'form-errors'
  }, errors.map(error => m('li', error)));
}

function form (vnode) {
  const state = {
    formId: Math.floor(Math.random() * 1e16)
  };

  return {
    view: (vnode) => {
      const children = vnode.children.filter(child => !!child);

      children.forEach(field => {
        state[field.name] = field.initialValue;
      });

      children.forEach(field => {
        state[field.name] = state[field.name] || field.initialValue;
      });

      return m('mui-form',
        m('form',
          {
            onsubmit: vnode.attrs.onsubmit
          },
          children.map(fieldVnode => {
            const attrs = fieldVnode.attrs || {};
            attrs.id = attrs.id || window.btoa(Date.now() + '.' + Math.random());

            return m('div',
              {
                class: 'form-group' + (attrs.errors ? ' had-error' : '')
              },
              fieldVnode.tag.handlesOwnLabel === false ? m('label', { for: attrs.id }, attrs.label) : null,
              attrs.errors ? renderErrors(attrs.errors) : null,
              fieldVnode
            );
          })
        )
      );
    }
  };
}

module.exports = form;
