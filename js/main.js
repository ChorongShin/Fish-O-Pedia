var $menuToggle = document.querySelector('button.toggle');
var $showcase = document.querySelector('.showcase');
var $exploreButton = document.querySelector('.explore');
var $views = document.querySelectorAll('div[data-view]');
var $backHome = document.querySelector('a.back-home');
var $headToggle = document.querySelector('button.button-toggle');
var $header = document.querySelector('.header');
var menu = document.querySelector('ul.menu-one');
var menuTwo = document.querySelector('ul.menu-two');
var menuToggleDiv = document.querySelector('div.menu-toggle');
var $fishList = document.querySelector('ul.fish-list');

var targetUrl = encodeURIComponent('https://www.fishwatch.gov/api/species');

$fishList.addEventListener('click', function (event) {

  var closest = event.target.closest('ul > li');
  var closestId = parseInt(closest.getAttribute('id'), 10);

  for (var i = 0; i < $fishList.length; i++) {
    if ($fishList[i] === closestId) {
      handleView(data.fishList.id);
      break;
    }
  }

});

function getFishDataList() {
  var xhr = new XMLHttpRequest(name);
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var fishId = 0; fishId < 30; fishId++) {

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

      // fishList.append(renderFishCards(xhr.response[fishId]));
      var $fish = document.createElement('li');
      $fish.setAttribute('id', fishId);

      var fishColumn = document.createElement('div');
      fishColumn.setAttribute('class', 'fish-column');

      var fishCard = document.createElement('div');
      fishCard.setAttribute('class', 'fish-card');

      var fishImage = document.createElement('img');
      fishImage.setAttribute('src', xhr.response[fishId]['Species Illustration Photo'].src);
      fishImage.setAttribute('alt', xhr.response[fishId]['Species Illustration Photo'].title);

      var fishName = document.createElement('p');
      fishName.setAttribute('class', 'fish-name');
      fishName.textContent = xhr.response[fishId]['Species Name'];

      var learnMoreCard = document.createElement('div');
      learnMoreCard.setAttribute('class', 'learn-more-card');

      var learnText = document.createElement('a');
      learnText.setAttribute('class', 'learn-text');
      learnText.setAttribute('href', '#');
      learnText.textContent = 'LEARN MORE';

      var icon = document.createElement('i');
      icon.setAttribute('class', 'fa-solid fa-circle-info');

      $fish.append(fishColumn);
      fishColumn.append(fishCard);
      fishCard.append(fishImage);
      fishCard.append(fishName);
      fishCard.append(learnMoreCard);
      learnMoreCard.append(icon);
      icon.append(learnText);
      $fishList.append($fish);
    }

  });

  xhr.send();
}

$menuToggle.addEventListener('click', function (event) {
  $menuToggle.classList.toggle('active');
  $showcase.classList.toggle('active');
  menu.classList.toggle('open');

});

$headToggle.addEventListener('click', function (event) {
  $headToggle.classList.toggle('active');
  menuTwo.classList.toggle('open');
  menuToggleDiv.classList.toggle('hidden');

});

$exploreButton.addEventListener('click', function (event) {
  handleView('list');
  $header.classList.remove('hidden');
  $header.classList.add('view');
  getFishDataList();
});

$backHome.addEventListener('click', function () {
  handleView('show-case');
  $header.classList.add('hidden');
});

function handleView(viewData) {
  data.view = viewData;
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === viewData) {
      $views[i].className = 'view';
    } else {
      $views[i].className = 'hidden';
    }
  }
}

// function renderFishCards(card) {
//   // var xhr = new XMLHttpRequest(name);
//   // xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
//   // xhr.responseType = 'json';
//   // xhr.reponse = card

//   var $fish = document.createElement('li');
//   $fish.setAttribute('id', card.id);

//   var fishColumn = document.createElement('div');
//   fishColumn.setAttribute('class', 'fish-column');

//   var fishCard = document.createElement('div');
//   fishCard.setAttribute('class', 'fish-card');

//   var fishImage = document.createElement('img');
//   fishImage.setAttribute('src', card.id['Species Illustration Photo'].src);
//   fishImage.setAttribute('alt', card.id['Species Illustration Photo'].title);

//   var fishName = document.createElement('p');
//   fishName.setAttribute('class', 'fish-name');
//   fishName.textContent = card.id['Species Name'];

//   var learnMoreCard = document.createElement('div');
//   learnMoreCard.setAttribute('class', 'learn-more-card');

//   var learnText = document.createElement('a');
//   learnText.setAttribute('class', 'learn-text');
//   learnText.setAttribute('href', '#');
//   learnText.textContent = 'LEARN MORE';

//   var icon = document.createElement('i');
//   icon.setAttribute('class', 'fa-solid fa-circle-info');

//   $fish.append(fishColumn);
//   fishColumn.append(fishCard);
//   fishCard.append(fishImage);
//   fishCard.append(fishName);
//   fishCard.append(learnMoreCard);
//   learnMoreCard.append(icon);
//   icon.append(learnText);

//   return $fish;
// }
