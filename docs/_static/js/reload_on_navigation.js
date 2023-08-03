window.onload = function () {
  var links = document.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function () {
      location.reload(true);
    });
  }
};
