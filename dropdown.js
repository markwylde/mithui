const m = require('mithril');

function dropdown (vnode) {
  let collapsed = true;
  let overideAlignRight = false;

  function handleDocumentMouseUp (event) {
    if (!vnode.dom.contains(event.target)) {
      collapsed = true;
      m.redraw();
    }
  }

  function handleFocusIn (event) {
    collapsed = false;
    const dropdownHead = vnode.dom.querySelector('mui-dropdown-head');
    const dropdownBody = vnode.dom.querySelector('mui-dropdown-body');
    dropdownBody.style.minWidth = dropdownHead.offsetWidth + 'px';

    if (parseInt(dropdownHead.parentNode.offsetLeft) < 100) {
      overideAlignRight = true;
    } else {
      overideAlignRight = false;
    }

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
      let classes = vnode.attrs.class;

      if (overideAlignRight) {
        classes = classes.replace('align-right', '');
      }

      return m('mui-dropdown', { tabindex: 0, class: classes },
        m('mui-dropdown-head', { onmousedown: handleHeadClick }, vnode.attrs.head || 'Selected: one'),
        m('mui-dropdown-body', { hidden: collapsed }, vnode.children)
      );
    }
  };
}

module.exports = dropdown;
