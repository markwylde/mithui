const m = require('mithril');

function handleInput (options, state, file) {
  return event => {
    file.name = event.target.value;
    options.onInput && options.onInput(event, {
      name: options.name,
      value: state.value
    });
  };
}

function handleChange (options, state) {
  return event => {
    const files = Array.from(event.target.files);
    state.value = state.value.concat(files.map(file => {
      return {
        name: (options.prefix || '') + file.name,
        file
      };
    }));

    event.target.value = null;

    options.onInput && options.onInput(event, {
      name: options.name,
      value: state.value
    });
  };
}

function addDragOverClass (event) {
  event.target.parentNode.classList.add('dragover');
}

function removeDragOverClass (event) {
  event.target.parentNode.classList.remove('dragover');
}

function removeFile (options, state, fileToDelete) {
  return event => {
    event.preventDefault();
    state.value = state.value.filter(file => file !== fileToDelete);
    options.onInput && options.onInput(event, {
      name: options.name,
      value: state.value
    });
  };
}

function filePicker (vnode) {
  const state = {
    value: vnode.attrs.initialValue || {}
  };

  return {
    view: (vnode) => {
      const options = vnode.attrs;

      return m('mui-file-picker',
        m('ul', state.value.map((file, fileIndex) =>
          m('li', { key: file },
            m('input',
              {
                oninput: handleInput(options, state, file),
                oncreate: event => { event.dom.value = file.name; }
              }
            ),
            m('button', { onclick: removeFile(options, state, file) }, 'X')
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
            name: options.name,
            onchange: handleChange(options, state)
          })
        )
      );
    }
  };
}

module.exports = filePicker;
