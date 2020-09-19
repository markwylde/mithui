const m = require('mithril');

function dropdown (vnode) {
  let collapsed = true;
  let forceAlignLeft = false;
  let forceAlignTop = false;

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
    dropdownBody.style.opacity = 0;

    window.requestAnimationFrame(() => {
      dropdownBody.style.minWidth = dropdownHead.offsetWidth + 'px';

      if (parseInt(dropdownHead.parentNode.offsetLeft) < 100) {
        forceAlignLeft = true;
      } else {
        forceAlignLeft = false;
      }

      if (parseInt(dropdownBody.offsetHeight) + parseInt(dropdownBody.parentNode.offsetTop) > (window.scrollY + window.innerHeight - 50)) {
        forceAlignTop = true;
      } else {
        forceAlignTop = false;
      }

      m.redraw();

      window.requestAnimationFrame(() => {
        dropdownBody.style.opacity = 1;
      });
    });
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
      let classes = vnode.attrs.class || '';

      if (forceAlignLeft) {
        classes = classes.replace('align-right', '');
      }

      if (forceAlignTop && !classes.includes('align-up')) {
        classes = classes + ' align-up';
      }

      return m('mui-dropdown', { tabindex: 0, class: classes },
        m('mui-dropdown-head', { onmousedown: handleHeadClick }, vnode.attrs.head || 'Selected: one'),
        m('mui-dropdown-body', { hidden: collapsed }, vnode.children)
      );
    }
  };
}

module.exports = dropdown;
