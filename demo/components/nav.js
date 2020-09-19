const m = require('mithril');
const html = require('hyperx')(m);

function nav () {
  return {
    view: () => {
      return html`
        <nav>
          <a href="/">Home</a>
          <a href="/forms">Forms</a>
          <a href="/dropdowns">Dropdowns</a>
        </nav>
      `;
    }
  };
}

module.exports = nav;
