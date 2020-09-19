const m = require('mithril');
const html = require('hyperx')(m);

const mui = require('../');

const eventLog = [];
let errors = window.errors = {};

function demoApp () {
  return {
    view: () => {
      return html`
        <main >
          <section>
            <h1>Dropdown</h1>
            <h2>Text Based</h2>
            ${m(mui.dropdown, { class: 'with-icon full-width' }, [
              m('a', { href: '#one' }, 'Item 1'),
              m('a', { href: '#two' }, 'Item 2'),
              m('a', { href: '#three' }, 'Item 3')
            ])}

            <h2>Icon Based</h2>
            ${m(mui.dropdown, { class: '', head: '☰' }, [
              m('a', { href: '#four' }, 'Item 4'),
              m('a', { href: '#five' }, 'Item 5'),
              m('a', { href: '#six' }, 'Item 6')
            ])}

            <h2>Aligned Right Based</h2>
            <h3>With Space</h3>
            <div style="width: 100%; max-width: 400px; text-align: right;">
              ${m(mui.dropdown, { class: 'align-right', head: '☰' }, [
                m('a', { href: '#four' }, 'Item 4'),
                m('a', { href: '#five' }, 'Item 5'),
                m('a', { href: '#six' }, 'Item 6')
              ])}
            </div>

            <h3>Without Space</h3>
            ${m(mui.dropdown, { class: 'align-right', head: '☰' }, [
              m('a', { href: '#four' }, 'Item 4'),
              m('a', { href: '#five' }, 'Item 5'),
              m('a', { href: '#six' }, 'Item 6')
            ])}

            <h1>Example Form</h1>

            <h2>Simple form</h2>
            <div class="exampleFormContainer">
            ${m(mui.form, {
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
                m.redraw();

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
                  m.redraw();
                }, 500);
              },
              onInput: state => {
                eventLog.unshift(['inputted', JSON.stringify(state, null, 2)]);
                m.redraw();
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
  };
}

document.addEventListener('DOMContentLoaded', function () {
  m.mount(document.body, demoApp());
});
