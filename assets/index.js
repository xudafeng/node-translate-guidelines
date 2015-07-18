(function() {
  var $ = function(id) {
    var el = 'string' === typeof(id) ? document.getElementById(id) : id;
    el.on = function(event, fn) {
      el.addEventListener ? el.addEventListener(event, fn, false) : el.attachEvent("on" + event, fn);
    };
    el.all = function(selector) {
      return $(el.querySelectorAll(selector));
    };
    el.each = function(fn){
      for (var i = 0, len = el.length; i < len; ++i) {
        fn($(el[i]), i);
      }
    };
    el.getClasses = function() {
      return this.getAttribute('class') ? this.getAttribute('class').split(/\s+/) : [];
    };
    el.addClass = function(name) {
      var classes = this.getAttribute('class');
      el.setAttribute('class', classes ? classes + ' ' + name : name);
    };
    el.removeClass = function(name) {
      var classes = this.getClasses().filter(function(curr) {
        return curr != name;
      });
      this.setAttribute('class', classes.join(' '));
    };
    return el;
  }

  var ajax = function(url, successCallback, failCallback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onreadystatechange = function() {
      if (this.readyState === 4) {

        if (this.status >= 200 && this.status < 400) {
          successCallback(this.responseText);
        } else {
          failCallback();
        }
      }
    };

    request.send();
    request = null;
  };
  ajax('./TERMINOLOGY.md', function(d) {
    $('wrapper').innerHTML = marked(d);
    $('search').on('keyup', function(e) {
      var str = $('search').value;
      var links = $('wrapper').all('li');

      links.each(function(link) {
        var text = link.textContent;

        if (str.length && ~text.indexOf(str)) {
          link.addClass('highlight');
        } else {
          link.removeClass('highlight');
        }
      });
    });
  });
})();
