
(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';
      console.log(results)


      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        console.log(results[i].score)
        appendString += '<li><a href="' + item.url + '"><h3>' + item.title + '</h3></a>';
        appendString += '<p>' + item.content.substring(0, 150) + '...</p></li>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>No results found</li>';
    }
  }

  var myNgramTokenizer = function () {
    var n_small = 2;
    var n_large = 10;
    // this.stemmer  = (function() {
    //   /* TODO Chinese stemmer  */
    //   return function(word) {
    //     console.log("stemmer")
    //     return word;
    //   }
    // })();

    // this.trimmer = function (token) {
    //   return token.update(function (s) {
    //     console.log("trimmer")
    //     return s
    //   })
    // }

    this.tokenizer = function (obj, metadata) {
      // ngram implementation

      if (obj == null || obj == undefined) {
        return [];
      }
      if (Array.isArray(obj)) {
        return obj.map(function (t) {
          return new lunr.Token(
            lunr.utils.asString(t).toLowerCase(),
            lunr.utils.clone(metadata)
          )
        })
      }

      var str = obj.toString().toLowerCase(),
      len = str.length,
      tokens = []


      for (var slice = n_small; slice <= n_large; slice++) {
        for (var index = 0; index <= len-slice; index++){
          var tokenMetadata = lunr.utils.clone(metadata) || {}
          tokenMetadata["position"] = [index, index+slice]
          tokenMetadata["index"] = tokens.length
          tokens.push(
            new lunr.Token (
              str.slice(index, slice+index),
              tokenMetadata
            )
          )
        }
    }
    // console.log(tokens)
    return tokens
  }
  // this.pipeline.reset();
  //     this.pipeline.add(
  //       this.trimmer,
  //       this.stopWordFilter,
  //       this.stemmer
  //     );
}

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {

      this.use(myNgramTokenizer);


      this.field('id');
      this.field('title', { boost: 10 });
      this.field('author');
      this.field('category');
      this.field('content');
      // this.b(0.01);

      for (var key in window.store) { // Add the data to lunr
        this.add({
          'id': key,
          'title': window.store[key].title,
          'author': window.store[key].author,
          'category': window.store[key].category,
          'content': window.store[key].content
        });
      }
    });

    console.log(idx);

    
    var results = idx.search(searchTerm); // Get lunr to perform a search
    displaySearchResults(results, window.store); // We'll write this in the next section
  }
})();
