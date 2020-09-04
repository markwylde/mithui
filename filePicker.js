const mithril = require('mithril');
const html = require('hyperx')(mithril);

function filePicker (vnode) {
  const options = vnode.attrs;

  const state = {
    value: options.initialValue || ''
  };

  function handleChange (event) {
    const files = Array.from(event.target.files);
    state.value = state.value.concat(files.map(file => {
      return {
        name: (options.prefix || '') + file.name,
        file
      };
    }));

    event.target.value = null;

    options.onInput && options.onInput(event, state);
  }

  function removeFile (event, fileToDelete) {
    state.value = state.value.filter(file => file !== fileToDelete);
    options.onInput && options.onInput(event, state);
  }

  function addDragOverClass (event) {
    event.target.parentNode.classList.add('dragover');
  }

  function removeDragOverClass (event) {
    event.target.parentNode.classList.remove('dragover');
  }

  return {
    oncreate: (vnode) => {
      state.name = vnode.attrs.name;
    },

    view: (vnode) => {
      const options = vnode.attrs;

      return html`
        <mui-file-picker>
          <ul>
            ${state.value.map((file, fileIndex) => html`
              <li key=${file}>
                <input oncreate=${event => { event.dom.value = file.name; }}" />
                <button onclick=${event => removeFile(event, file)}>X</button>
              </li>
            `)}
          </ul>
          <div>
            Click or drag files here to upload
            <input ondragenter=${addDragOverClass} ondragleave=${removeDragOverClass} ondrop=${removeDragOverClass} type="file"
                  multiple="multiple"
                  id=${options.id}
                  ${options.autoFocus ? 'autofocus' : ''}
                  name="${options.name}"
                  onchange=${handleChange}
              />
          </div>
        </mui-file-picker>
      `;
    }
  };
}

module.exports = filePicker;
