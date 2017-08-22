'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';

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
      <style>
        h1{
          color: #dd3311;
          text-shadow: 2px 2px 3px rgba(0,0,0,0.2);
        }
      </style>
      <h1>Hello [[name]]!</h1>
    `;
  }
}

customElements.define('my-element', MyElement);