const m = require('mithril');

function dropdown (vnode) {
  let collapsed = true;

  function handleDocumentMouseUp (event) {
    if (!vnode.dom.contains(event.target)) {
      collapsed = true;
      m.redraw();
    }
  }

  function handleFocusIn (event) {
    collapsed = false;
    const dropdownHead = vnode.dom.querySelector('mui-dropdown-head');
    vnode.dom.querySelector('mui-dropdown-body').style.minWidth = dropdownHead.offsetWidth + 'px';
    m.redraw();
  }

  function handleFocusOut (event) {
    collapsed = true;
    m.redraw();
  }

  function handleHeadClick (event) {
    if (!collapsed) {
      setTimeout(() => vnode.dom.blur());
    }
  }

  return {
    oncreate: (vnode) => {
      document.addEventListener('mouseup', handleDocumentMouseUp);
      vnode.dom.addEventListener('focusin', handleFocusIn);
      vnode.dom.addEventListener('focusout', handleFocusOut);
    },

    onremove: (vnode) => {
      document.removeEventListener('mouseup', handleDocumentMouseUp);
      vnode.dom.removeEventListener('focusin', handleFocusIn);
      vnode.dom.removeEventListener('focusout', handleFocusOut);
    },

    view: (vnode) => {
      return m('mui-dropdown', { tabindex: 0, class: vnode.attrs.class },
        m('mui-dropdown-head', { onmousedown: handleHeadClick }, vnode.attrs.head || 'Selected: one'),
        m('mui-dropdown-body', { hidden: collapsed }, vnode.children)
      );
    }
  };
}

module.exports = dropdown;
