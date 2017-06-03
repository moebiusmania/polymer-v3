'use strict';

import '@polymer/polymer/polymer-element.html';
import '@polymer/polymer/lib/elements/dom-repeat.html';
import './template.html';

import { store } from './../store';

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
        const filtered = data.filter((e,i) => {
          return i < 10;
        });
        this.data = filtered;
        store.dispatch({
          type: 'SET_ITEMS',
          data: filtered
        });
      });
  }

}

customElements.define(ListData.is, ListData);