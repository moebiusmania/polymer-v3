'use strict';

import '@polymer/polymer/polymer-element.html';
import './template.html';

class FakeApp extends Polymer.Element {
  static get is() { return 'fake-app' }
  static get properties() {
    return {
      test: {
        type: String,
        value: "hello world"
      },
      version: {
        type: String,
        value: () => { return window.Polymer.version }  
      }
    }
  }

}

customElements.define(FakeApp.is, FakeApp);