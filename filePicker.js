const m = require('mithril');

// function handleInput (options, state, setState, file) {
//   return event => {
//     file.name = event.target.value;
//     options.onInput && options.onInput(event, {
//       name: options.name,
//       value: state.value
//     });
//   };
// }

function handleChange (options, state, setState) {
  return event => {
    const files = Array.from(event.target.files);
    const newState = state.value.concat(files.map(file => {
      return {
        name: (options.prefix || '') + file.name,
        file
      };
    }));

    setState({ value: newState });
  };
}

function addDragOverClass (event) {
  event.target.parentNode.classList.add('dragover');
}

function removeDragOverClass (event) {
  event.target.parentNode.classList.remove('dragover');
}

function removeFile (options, state, setState, fileToDelete) {
  return event => {
    const newState = state.value.filter(file => file !== fileToDelete);
    setState({ value: newState });
  };
}

function filePicker (vnode) {
  const options = vnode.attrs;

  let state = {
    value: vnode.attrs.initialValue || []
  };

  function setState (newState) {
    state = newState;
    vnode.attrs.value = state.value;
    vnode.dom.value = state.value;
  }

  return {
    oncreate: (vnode) => {
      setState(state);
    },

    view: (vnode) => {
      return m('mui-file-picker', { name: options.name },
        m('ul', state.value.map((file, fileIndex) =>
          m('li', { key: file },
            m('input',
              {
                // oninput: handleInput(options, state, setState, file),
                oncreate: event => { event.dom.value = file.name; }
              }
            ),
            m('button', { onclick: removeFile(options, state, setState, file) }, 'X')
          )
        )),
        m('div',
          'Click or drag files here to upload',
          m('input', {
            ondragenter: addDragOverClass,
            ondragleave: removeDragOverClass,
            ondrop: removeDragOverClass,
            type: 'file',
            multiple: 'multiple',
            id: options.id,
            autofocus: options.autoFocus,
            onchange: handleChange(options, state, setState)
          })
        )
      );
    }
  };
}

filePicker.handlesOwnLabel = false;

module.exports = filePicker;
