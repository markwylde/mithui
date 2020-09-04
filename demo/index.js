const mithril = require('mithril');
const html = require('hyperx')(mithril);

window.m = mithril;

const mui = require('../');

const eventLog = [];
let errors = window.errors = {};

function demoApp () {
  return html`
    <main >
      <section>
        <h1>Example Form</h1>

        <h2>Simple form</h2>
        <div class="exampleFormContainer">
        ${mithril(mui.form, {
          fields: [
            {
              name: 'firstName',
              label: 'First Name',
              errors: errors.firstName,
              component: mui.textInput,
              autoFocus: true,
              initialValue: 'Joe'
            },
            {
              name: 'lastName',
              label: 'Last Name',
              errors: errors.lastName,
              component: mui.textInput,
              initialValue: 'Bloggs'
            },
            {
              name: 'bio',
              label: 'Profile Bio',
              errors: errors.lastName,
              component: mui.multilineInput,
              initialValue: 'Some cool information about me'
            },
            {
              name: 'location',
              label: 'Location',
              errors: errors.location,
              component: mui.select,
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
            },
            {
              name: 'active',
              label: 'Active',
              errors: errors.active,
              component: mui.checkbox,
              initialValue: true
            },
            {
              name: 'pictures',
              label: 'Profile Pictures',
              errors: errors.picture,
              prefix: '/data/avatars/',
              component: mui.filePicker,
              multiple: true,
              initialValue: [{
                name: 'bbb.txt',
                id: 12
              }]
            },
            {
              name: 'failOnSubmit',
              label: 'Fail on submit',
              errors: errors.failOnSubmit,
              component: mui.checkbox,
              initialValue: false
            }
          ],
          onSubmit: (event, state) => {
            event.preventDefault();
            errors = {};
            render();

            const button = event.target.querySelector('form > button');
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
              render();
            }, 500);
          },
          onInput: state => {
            eventLog.unshift(['inputted', JSON.stringify(state, null, 2)]);
            render();
          }
        })}
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

function render () {
  mithril.render(document.body, demoApp());
}

document.addEventListener('DOMContentLoaded', function () {
  render();
});
