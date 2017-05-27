'use strict';

import '@polymer/polymer/polymer-element.html';
import '@polymer/polymer/lib/elements/dom-repeat.html';
import './template.html';

class ListData extends Polymer.Element {
  static get is() { return 'list-data' }
  static get properties() {
    return {
      data: {
        type: Array,
        value: []
      }
    }
  }

  connectedCallback(){
    fetch('http://jsonplaceholder.typicode.com/posts/')
      .then(resp => resp.json())
      .then(data => {
        this.data = data
      });
  }

}

customElements.define(ListData.is, ListData);