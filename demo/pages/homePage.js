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
            <h1>Mithui Kitchen Sink</h1>
            <p>Welcome.</p>
          </section>
        </main>
      `;
    }
  };
}

module.exports = notFoundPage;
