import {it, describe, expect, beforeEach} from 'angular2/testing';

import {App} from './app.page';

describe('App', () => {
  var page: App = new App();

  beforeEach(() => {
    browser.get('/');
  });

  it('should match page title', () => {
    var title = browser.getTitle();
    expect(title).toEqual('Bonvoyage');
  });
});
