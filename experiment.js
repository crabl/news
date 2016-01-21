'use strict';

let fs = require('fs');
let xml2js = require('xml2js');
let feed = require('feed-read');
let moment = require('moment');

let Q = require('Q');

let feeds = [{
  url: 'http://www.fool.ca/feed',
}, {
  url: 'http://www.greaterfool.ca/feed/',
}, {
  url: 'http://www.donrcampbell.com/rss'
}];

let articles = feeds.map(url => {
  let deferred = Q.defer();

  feed(url, (err, articles) => {
    if (err) {
      deferred.reject(err);
    }

    let todayArticles = articles.filter(article => {
      // return articles published in the last day
      return moment().diff(moment(article.published), 'days') <= 1;
    }).map(article => ({
      title: article.title,
      // content: article.content
    }));

    deferred.resolve(todayArticles);
  });

  return deferred.promise;
});

Q.all(articles).then(collection => {
  let flattened = collection.reduce((items, current) => items.concat(current), []);
  console.log(flattened);
});

// feed("http://craphound.com/?feed=rss2", (err, articles) => {
//   if (err) throw err;
//
//   let todayArticles = articles.filter(article => moment().diff(moment(article.published), 'days') <= 1);
//
//   // Each article has the following properties:
//   //
//   //   * "title"     - The article title (String).
//   //   * "author"    - The author's name (String).
//   //   * "link"      - The original article link (String).
//   //   * "content"   - The HTML content of the article (String).
//   //   * "published" - The date that the article was published (Date).
//   //   * "feed"      - {name, source, link}
//   //
// });
