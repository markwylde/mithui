const m = require('mithril');
const html = require('hyperx')(m);

const nav = require('../components/nav');
const mui = require('../../');

function dropdownPage () {
  return {
    view: () => {
      return html`
        <main>
          ${m(nav)}

          <section>
            <h1>Dropdown</h1>
            <h2>Text Based</h2>
            ${m(mui.dropdown, { class: 'with-icon full-width' }, [
              m('div', m('a', { href: '#one' }, 'Item 1')),
              m('div', m('a', { href: '#two' }, 'Item 2')),
              m('div', m('a', { href: '#three' }, 'Item 3'))
            ])}

            <h2>Icon Based</h2>
            ${m(mui.dropdown, { class: '', head: '☰' }, [
              m('div', m('a', { href: '#four' }, 'Item 4')),
              m('div', m('a', { href: '#five' }, 'Item 5')),
              m('div', m('a', { href: '#six' }, 'Item 6'))
            ])}

            <h2>Aligned Right Based</h2>
            <h3>With Space</h3>
            <div style="width: 100%; max-width: 400px; text-align: right;">
              ${m(mui.dropdown, { class: 'align-right', head: '☰' }, [
                m('div', m('a', { href: '#four' }, 'Item 4')),
                m('div', m('a', { href: '#five' }, 'Item 5')),
                m('div', m('a', { href: '#six' }, 'Item 6'))
              ])}
            </div>

            <h3>Without Space</h3>
            ${m(mui.dropdown, { class: 'align-right', head: '☰' }, [
              m('div', m('a', { href: '#four' }, 'Item 4')),
              m('div', m('a', { href: '#five' }, 'Item 5')),
              m('div', m('a', { href: '#six' }, 'Item 6'))
            ])}

            <h2>Aligned Up Based</h2>
            <h3>With Space</h3>
            ${m(mui.dropdown, { class: 'align-up', head: '☰' }, [
              m('div', m('a', { href: '#four' }, 'Item 4')),
              m('div', m('a', { href: '#five' }, 'Item 5')),
              m('div', m('a', { href: '#six' }, 'Item 6'))
            ])}

            <h2>Aligned Down Based</h2>
            <h3>Without Space</h3>
            ${m(mui.dropdown, { head: '☰' }, [
              m('div', m('a', { href: '#one' }, 'Item 1')),
              m('div', m('a', { href: '#two' }, 'Item 2')),
              m('div', m('a', { href: '#three' }, 'Item 3')),
              m('div', m('a', { href: '#four' }, 'Item 4')),
              m('div', m('a', { href: '#five' }, 'Item 5')),
              m('div', m('a', { href: '#six' }, 'Item 6')),
              m('div', m('a', { href: '#seven' }, 'Item 7'))
            ])}

            <h3>And top aligned</h3>
            <div style="width: 100%; max-width: 400px; text-align: right;">
              ${m(mui.dropdown, { class: 'align-right align-top', head: '☰' }, [
                m('div', m('a', { href: '#four' }, 'Item 4')),
                m('div', m('a', { href: '#five' }, 'Item 5')),
                m('div', m('a', { href: '#six' }, 'Item 6'))
              ])}
            </div>
          </section>
        </main>
      `;
    }
  };
}

module.exports = dropdownPage;
