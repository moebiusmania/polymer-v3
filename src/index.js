'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element.js';

export class MyElement extends PolymerElement {
    static get properties() {
      return {
        name: {
          type: String,
          value: 'Foobar'
        }
      } 
    }

    static get template() {
      return `
      <h1>Hello [[name]]!</h1>
    `;
  }
}

customElements.define('my-element', MyElement);