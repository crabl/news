'use strict';

let fs = require('fs');
let xml2js = require('xml2js');
let feedReader = require('feed-read');
let moment = require('moment');
let shuffle = require('knuth-shuffle').knuthShuffle;
let OpmlParser = require('opmlparser');

let Q = require('Q');

function parseOpml(fileName) {
  let deferred = Q.defer();

  let parser = new OpmlParser();
  let feeds = [];

  let readFile = fs.createReadStream(fileName);
  readFile.on('open', () => readFile.pipe(parser));

  parser.on('readable', function () {
    var outline;

    while (outline = this.read()) {
      if (outline['#type'] === 'feed') {
        feeds.push({
          url: outline.xmlurl
        });
      }
    }
  });

  parser.on('end', () => deferred.resolve(feeds));

  return deferred.promise;
}

function calculatePublicationFrequency(articles) {
  const dates = articles.map(article => moment(article.published));

  return dates
    .map((current, index) => {
      let last = index === 0 ? moment() : dates[index - 1];
      return last.diff(current, 'days');
    })
    .reduce((total, n) => total + n, 0) / (dates.length);
}

function fetchArticles(feeds) {
  return Q.all(feeds.map(feed => {
    let deferred = Q.defer();

    feedReader(feed.url, (err, articles) => {
      if (err) { deferred.reject(err); }

      // TODO: will have to add a nonce in here somewhere to keep the order sufficiently random
      const todayArticles = articles
        .filter(article => moment().diff(moment(article.published), 'days') <= 1)
        .map(article => ({
          title: article.title,
          frequency: calculatePublicationFrequency(articles)
          // content: article.content
        }));

      deferred.resolve(todayArticles);
    });

    return deferred.promise;
  }));
}

parseOpml('news.opml')
 .then(feeds => fetchArticles(feeds)) // for each feed, fetch today's articles
 .then(nested => nested.reduce((flattened, articles) => [...flattened, ...articles], [])) // flatten into a single array
 .then(articles => shuffle([...articles])) // shuffle articles randomly using Fisher-Yates algorithm
 .then(articles => {
   console.log(JSON.stringify(articles, null, 2));
 });
