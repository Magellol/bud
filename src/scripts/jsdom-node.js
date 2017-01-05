/**
 * This little snippet is being required by mocha
 * before running the React tests, it is required when
 * we do full DOM render.
 */
const jsdom = require('jsdom');

global.document = jsdom.jsdom('');
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
