/* exported data fish */
var data = {
  view: 'show-case',
  fishList: [],
  likes: []
};

var previousDataJSON = localStorage.getItem('entry-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  this.localStorage.setItem('javascript-local-storage', dataJSON);
});

// var oneFish = {
//   title: null,
//   photo: null,
//   population: null,
//   biology: null,
//   location: null,
//   id: fishId
// };

// oneFish.title = xhr.response[fishId]['Species Name'];
// oneFish.photo = xhr.response[fishId]['Species Illustration Photo'];
// oneFish.populatopn = xhr.response[fishId].population;
// oneFish.biology = xhr.response[fishId].biology;
// oneFish.location = xhr.response[fishId].Location;
// data.fishList.unshift(oneFish);
