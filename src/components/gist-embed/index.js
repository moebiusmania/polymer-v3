'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import properties from './props';
import template from './template.html';
import fetchJsonp from 'fetch-jsonp';

export class GistEmbed extends PolymerElement {

  static get properties() { return properties }

  static get template() { return template }

  connectedCallback(){
    super.connectedCallback();
    
    this._getData(this.user, this.uuid).then(data => {
      this._css = data.stylesheet;
      this._html = data.div;
      this._loading = data.loading;
    });
  }

  _getData(user, uuid){
    const url = `https://gist.github.com/${user}/${uuid}.json`;;
    return fetchJsonp(url).then((res) => res.json())
      .then((data) => {
        const dataExt= Object.assign({}, data, { loading: false});
        return dataExt;
      });
  }

  _compLoader(loader){
    const arr = ['loading'];
    loader ? arr.push('show') : null;
    return arr.join(' ');
  }

  _compEmbed(loader, noMeta){
    const arr = loader ? [''] : ['show'];
    noMeta ? arr.push('no-meta') : null;
    return arr.join(' ');
  }
}

customElements.define('gist-embed', GistEmbed);