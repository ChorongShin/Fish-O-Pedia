/* exported data */
var data = {
  view: 'show-case'
};

var previousDataJSON = localStorage.getItem('entry-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  this.localStorage.setItem('entry-local-storage', dataJSON);
});
