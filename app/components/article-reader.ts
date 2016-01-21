import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import 'xml2js';

@Component({
  selector: 'article-reader',
  template: `
    <div>This is an article</div>
  `
})

export default class ArticleReader {
  constructor() {}
}
