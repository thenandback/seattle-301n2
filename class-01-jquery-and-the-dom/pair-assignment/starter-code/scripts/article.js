var articles = [];

function Article (opts) {
  // DONE: Use the js object passed in to complete this contructor function:
  // Save ALL the properties of `opts` into `this`.
  this.title = opts.title;
  this.category = opts.category;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Article.prototype.toHtml = function() {
            var $newArticle = $('article.template').clone();
            $newArticle.attr('data-category', this.category);
            // DONE: Use jQuery to fill in the template with properties
            // from this particular Article instance. We need to fill in:
            // the author name and url, the article title and body, and the
            // publication date. Updated.

            $newArticle.find('h1').text(this.title);
            $newArticle.find('#citation').prepend('By');
            $newArticle.find('time').before('published ');
            $newArticle.find('address a').html(this.author);
            $newArticle.find('section.article-body').html(this.body);
            $newArticle.find('address a').attr('href', this.authorUrl);
            // Include the publication date as a 'title' attribute to show on hover:
            $newArticle.find('time').attr('title', this.publishedOn);

            // Display the date as a relative number of "days ago":
            $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

            $newArticle.append('<hr>');

            // DONE: This cloned article is no longer a template, so we should remove that class...

            // Remove article.template so that this will show on page:
            $('article').removeClass('template');

            return $newArticle;
}

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  articles.push(new Article(ele));
})

articles.forEach(function(a){
  $('#articles').append(a.toHtml())
});