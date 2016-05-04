import {
  TestComponentBuilder,
  describe,
  expect,
  inject,
  it,
  beforeEachProviders
} from 'angular2/testing';
import {Component, provide} from 'angular2/core';
import {DirectiveResolver} from 'angular2/compiler';

import {Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import {Location} from 'angular2/platform/common';
import {SpyLocation} from 'angular2/src/mock/location_mock';
import {RootRouter} from 'angular2/src/router/router';

import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {AppComponent} from './app.component';

export function main() {

  describe('App component', () => {
    // Support for testing component that uses Router
    beforeEachProviders(() => [
      RouteRegistry,
      DirectiveResolver,
      provide(Location, {useClass: SpyLocation}),
      provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
      provide(Router, {useClass: RootRouter})
    ]);

    it('should work',
      expect(1 === 1);
  });
}

@Component({
  selector: 'test-cmp',
  template: '<fp-app></fp-app>',
  directives: [AppComponent]
})
class TestComponent {}
