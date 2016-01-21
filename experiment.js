'use strict';

let fs = require('fs');
let xml2js = require('xml2js');
let feedReader = require('feed-read');
let moment = require('moment');
let shuffle = require('knuth-shuffle').knuthShuffle;

let Q = require('Q');

let feeds = [{
  url: 'http://www.fool.ca/feed',
  obscurity: 0,
  specificity: 0
}, {
  url: 'http://www.greaterfool.ca/feed/',
  obscurity: 0,
  specificity: 0
}, {
  url: 'http://www.donrcampbell.com/rss',
  obscurity: 0,
  specificity: 0
}, {
  url: 'http://blog.reincanada.com/rss.xml',
  obscurity: 0,
  specificity: 0
}, {
  url: 'http://edmontonrealestateblog.com/feed/',
  obscurity: 0,
  specificity: 0
}, {
  url: 'https://www.ratehub.ca/blog/home/feed/',
  obscurity: 0,
  specificity: 0
}];

let allArticles = feeds.map(feed => {
  let deferred = Q.defer();

  feedReader(feed.url, (err, articles) => {
    if (err) { deferred.reject(err); }

    let dates = articles.map(article => moment(article.published));

    let averagePublicationFrequency = dates
      .map((current, index) => {
        let last = index === 0 ? moment() : dates[index - 1];
        return last.diff(current, 'days');
      })
      .reduce((total, n) => total + n, 0) / (dates.length);

    // TODO: will have to add a nonce in here somewhere to keep the order sufficiently random
    let todayArticles = articles
      .filter(article => moment().diff(moment(article.published), 'days') <= 20)
      .map(article => ({
        title: article.title,
        frequency: averagePublicationFrequency
        // content: article.content
      }));

    deferred.resolve(todayArticles);
  });

  return deferred.promise;
});

Q.all(allArticles)
 .then(collection => collection.reduce((flat, arr) => flat.concat(arr), []))
 .then(articles => shuffle([...articles]))
 .then(articles => {
   console.log(JSON.stringify(articles, null, 2));
 });
