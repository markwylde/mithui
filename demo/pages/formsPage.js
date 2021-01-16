const m = require('mithril');
const html = require('hyperx')(m);

const nav = require('../components/nav');
const mui = require('../../');

const formToObject = require('../../formToObject');

function formsPage () {
  const eventLog = [];
  let errors = window.errors = {};

  return {
    view: () => {
      return html`
        <main>
          ${m(nav)}
          <section>
            <h1>Example Form</h1>

            <h2>Simple form</h2>
            <div class="exampleFormContainer">
            ${m(mui.form, {
              oncreate: (event) => {
                event.dom.addEventListener('change', () => {
                  console.log('changed');
                });
              },
              onsubmit: (event) => {
                event.preventDefault();
                const state = formToObject(event.target);
                errors = {};
                m.redraw();

                const button = event.target.querySelector('button');
                button.disabled = true;

                eventLog.unshift(['submitted', JSON.stringify(state, null, 2)]);

                setTimeout(() => {
                  button.disabled = false;
                  if (state.failOnSubmit) {
                    errors = {
                      firstName: ['Must be unique'],
                      lastName: ['Must be valid']
                    };
                  }
                  m.redraw();
                }, 500);
              },
              oninput: event => {
                eventLog.unshift(['inputted', event.target.name, event.target.value]);
                m.redraw();
              }
            },

              m(mui.textInput, {
                name: 'firstName',
                label: 'First Name',
                errors: errors.firstName,
                autoFocus: true,
                initialValue: 'Joe'
              }),

              m(mui.textInput, {
                name: 'lastName',
                label: 'Last Name',
                errors: errors.lastName,
                initialValue: 'Bloggs'
              }),

              m(mui.multilineInput, {
                name: 'bio',
                label: 'Profile Bio',
                errors: errors.lastName,
                initialValue: 'Some cool information about me'
              }),

              m(mui.select, {
                name: 'location',
                label: 'Location',
                errors: errors.location,
                options: [
                  {
                    value: 'au',
                    label: 'Australia'
                  },
                  {
                    value: 'uk',
                    label: 'United Kingdom'
                  }
                ],
                initialValue: 'uk'
              }),

              m(mui.checkbox, {
                name: 'active',
                label: 'Active',
                errors: errors.active,
                component: mui.checkbox,
                initialValue: true
              }),

              m(mui.filePicker, {
                name: 'pictures',
                label: 'Profile Pictures',
                errors: errors.picture,
                prefix: '/data/avatars/',
                multiple: true,
                initialValue: [{
                  name: 'bbb.txt',
                  id: 12
                }]
              }),

              m(mui.checkbox, {
                name: 'failOnSubmit',
                label: 'Fail on submit',
                errors: errors.failOnSubmit,
                component: mui.checkbox,
                initialValue: false
              }),

              m('button', 'Submit')
            )}
            </div>

            <ul>
            ${eventLog.map(entry => {
              return html`
                <li>
                  <strong>${entry[0]}</strong>
                  <pre><code>${entry[1]}</code></pre>
              </li>
              `;
            })}
            </ul>
          </section>
        </main>
      `;
    }
  };
}

module.exports = formsPage;
