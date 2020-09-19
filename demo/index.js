const m = require('mithril');

const formsPage = require('./pages/formsPage');
const dropdownsPage = require('./pages/dropdownsPage');
const homePage = require('./pages/homePage');
const notFoundPage = require('./pages/notFoundPage');

function demoApp () {
  let page = notFoundPage;

  if (window.location.pathname === '/') {
    page = homePage;
  }

  if (window.location.pathname === '/forms') {
    page = formsPage;
  }

  if (window.location.pathname === '/dropdowns') {
    page = dropdownsPage;
  }

  return {
    view: () => {
      return m(page);
    }
  };
}

document.addEventListener('DOMContentLoaded', function () {
  m.mount(document.body, demoApp());
});
