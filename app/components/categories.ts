import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import 'xml2js';

@Component({
  selector: 'categories',
  template: `
    <div>
      <ul>
        <li>Real Estate</li>
        <li>Personal Finance</li>
        <li>Technology</li>
        <li>JavaScript</li>
      </ul>
    </div>
  `
})

export default class Categories {
  constructor() {}
}
