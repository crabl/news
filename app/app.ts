import { provide, Component } from 'angular2/core';
import { bootstrap, ELEMENT_PROBE_PROVIDERS } from 'angular2/platform/browser';
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, RouteConfig, Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { FORM_PROVIDERS } from 'angular2/common';

import Reader from './components/reader';

// Top-Level Component
@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS ],
  viewProviders: [HTTP_PROVIDERS],
  directives: [ ...ROUTER_DIRECTIVES ],
  template: `<router-outlet></router-outlet>`
})

@RouteConfig([
  { path: '/', component: Reader, name: 'Reader' },
  { path: '/**', redirectTo: ['Reader'] }
])

export default class App {
  constructor() {}
}

document.addEventListener('DOMContentLoaded', () => {
  bootstrap(App, [
    ...ELEMENT_PROBE_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
  ])
  .catch(err => console.error(err));
});
