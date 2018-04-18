'use strict';
var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://jpm-lm-tc-booklist.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module) {
  function Book(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }


  Book.prototype.toHtml = function() {
    var template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  };

  Book.all = [];

  Book.loadAll = rows => {
    Book.all = rows.sort((a,b) => b.title - a.title).map(book => new Book(book));
  }

  Book.fetchAll = callback => {
    $.get(`${ENV.apiUrl}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(app.errorCallback);
  }
  module.Book = Book;
})(app)


