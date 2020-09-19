const m = require('mithril');
const html = require('hyperx')(m);

const nav = require('../components/nav');

function notFoundPage () {
  return {
    view: () => {
      return html`
        <main>
          ${m(nav)}
          <section>
            <h1>Page Not Found</h1>
            <p>There is no page at the specified url.</p>
          </section>
        </main>
      `;
    }
  };
}

module.exports = notFoundPage;
