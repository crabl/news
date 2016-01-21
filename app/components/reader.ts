import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';

import Categories from './categories';
import ArticleReader from './article-reader';


@Component({
  selector: 'reader',
  directives: [Categories, ArticleReader],
  template: `
    <div>
      <categories></categories>
      <article-reader></article-reader>
    </div>
  `
})

export default class Reader {
  constructor() {}
}
