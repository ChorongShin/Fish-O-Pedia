var targetUrl = encodeURIComponent('https://www.fishwatch.gov/api/species');

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
var $fishIcon = document.querySelector('img.plain-fish');
var $fishName = document.querySelector('p.title');
var $fishImage = document.querySelector('img.fish-img');
var $fishScientificName = document.querySelector('td.scientific-name');
var $fishLocation = document.querySelector('td.location-li');
var $fishLocationList = document.querySelector('ul.fish-location-list');
var $fishPopulation = document.querySelector('td.population');
var $fishBiology = document.querySelector('td.biology-li');
var $fishBiologyList = document.querySelector('ul.fish-biology-list');
var $previousIcon = document.querySelector('.fa-angle-left');
var $nextIcon = document.querySelector('.fa-angle-right');
// var $angleLeft = document.querySelector('span.angle-left');
// var $angleRight = document.querySelector('span.angle-right');
var $backToList = document.querySelector('button.back-to-list');
var $homeClick = document.querySelector('a.home-click');
var $listClick = document.querySelector('a.list-click');

// Press like click event
var on = 'images/fish-hook.png';
var off = 'images/fish icon.png';
var state = false;
$fishIcon.addEventListener('click', function (event) {

  if (state) {
    $fishIcon.src = on;
    state = false;
  } else {
    $fishIcon.src = off;
    state = true;
  }
});

// fish list
function getFishDataList() {
  var xhr = new XMLHttpRequest(name);
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var fishId = 0; fishId < 30; fishId++) {

      var $fish = document.createElement('li');
      $fish.setAttribute('id', fishId);

      var fishColumn = document.createElement('div');
      fishColumn.setAttribute('class', 'fish-column');

      var fishCard = document.createElement('div');
      fishCard.setAttribute('class', 'fish-card');

      var fishCardImage = document.createElement('div');
      fishCardImage.setAttribute('class', 'fish-card-image');

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

      $fish.append(fishColumn);
      fishColumn.append(fishCard);
      fishCard.append(fishCardImage);
      fishCardImage.append(fishImage);
      fishCard.append(fishName);
      fishCard.append(learnMoreCard);
      learnMoreCard.append(learnText);
      $fishList.append($fish);
    }

  });

  xhr.send();
}

var count = 0;
var imageList = [];

function fishDetails(event) {

  var closest = event.target.closest('ul > li');

  var $fishId = parseInt(closest.getAttribute('id'), 10);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    $fishName.textContent = xhr.response[$fishId]['Species Name'];
    $fishScientificName.textContent = xhr.response[$fishId]['Scientific Name'];

    if (xhr.response[$fishId].Location === null) {
      $fishLocation.textContent = 'No Data Available';
      $fishLocation.setAttribute('class', 'no-li');
    } else {
      var locationUL = xhr.response[$fishId].Location.trim();
      var locationArray = locationUL.split('\n');
      for (var i = 0; i < locationArray.length; i++) {
        if (locationArray[i] === '<ul>' || locationArray[i] === '</ul>') {
          locationArray.splice(i, 1);
        }
      }
      var locationString = locationArray.join(' ');
      $fishLocationList.innerHTML = locationString;
    }

    if (xhr.response[$fishId].Biology === null) {
      $fishBiology.textContent = 'No Data Available';
      $fishBiology.setAttribute('class', 'no-li');
    } else if (xhr.response[$fishId].Biology !== null) {
      var biologyUL = xhr.response[$fishId].Biology.trim();
      var biologyArray = biologyUL.split('\n');
      for (var j = 0; j < biologyArray.length; j++) {
        if (biologyArray[j] === ' <ul>' || biologyArray[j] === ' </ul>') {
          biologyArray.splice(j, 1);
        }

      }

      var biologyString = biologyArray.join(' ');
      $fishBiologyList.innerHTML = biologyString;
      var uls = document.querySelectorAll('ul.fish-biology-list > ul');
      uls.forEach(ul => ul.classList.add('fish-biology-list'));
    }

    if (xhr.response[$fishId].Population === null) {
      $fishPopulation.textContent = 'No Data Available';
      $fishPopulation.setAttribute('class', 'population');
    } else {
      $fishPopulation.textContent = xhr.response[$fishId].Population;
      $fishPopulation.setAttribute('class', 'population');
    }
    // console.log(xhr.response[$fishId]['Species Name']);
    // console.log(xhr.response[$fishId]['Image Gallery']);
    // console.log(xhr.response[0]['Image Gallery'].length);

    // var previousIcon = document.querySelector('i.fa-angle-left');
    // var nextIcon = document.querySelector('i.fa-angle-right');

    if (xhr.response[$fishId]['Image Gallery'].length > 1) {
      // var $previousIcon = document.createElement('i');
      // $previousIcon.setAttribute('class', 'fa-solid fa-angle-left fa-2xl');
      // $angleLeft.append($previousIcon);

      // var $nextIcon = document.createElement('i');
      // $nextIcon.setAttribute('class', 'fa-solid fa-angle-right fa-2xl');
      // $angleRight.append($nextIcon);

      imageList = xhr.response[$fishId]['Image Gallery'];
      // var $fishImage3 = document.createElement('img');
      // $fishImage.setAttribute('class', 'fish-img');
      $fishImage.setAttribute('src', imageList[0].src);
      $fishImage.setAttribute('alt', imageList[0].alt);
      // $fishDiv.append($fishImage3);
      $previousIcon.addEventListener('click', previous);
      $nextIcon.addEventListener('click', next);
    } else if (xhr.response[$fishId]['Image Gallery'] === null) {
      // var $fishImage = document.createElement('img');
      // $fishImage.setAttribute('class', 'fish-img');
      $fishImage.setAttribute('src', xhr.response[$fishId]['Species Illustration Photo'].src);
      $fishImage.setAttribute('alt', xhr.response[$fishId]['Species Illustration Photo'].alt);

      // $previousIcon.remove();

      // $nextIcon.remove();
      // $fishDiv.append($fishImage);

      // } else if (xhr.response[$fishId]['Image Gallery'].length === undefined) {
      //   // var $fishImage2 = document.createElement('img');
      //   // $fishImage2.setAttribute('class', 'fish-img');
      //   $fishImage.setAttribute('src', xhr.response[$fishId]['Image Gallery'].src);
      //   $fishImage.setAttribute('alt', xhr.response[$fishId]['Image Gallery'].alt);
      //   // $fishDiv.append($fishImage2);
      //   $previousIcon.remove();
      //   $nextIcon.remove();

      // var $previousIcon = document.querySelector('.fa-angle-left');
      // var $nextIcon = document.querySelector('.fa-angle-right');

    } else if (xhr.response[7]['Image Gallery']) {
      $fishImage.setAttribute('src', xhr.response[7]['Image Gallery'].src);
      $fishImage.setAttribute('alt', xhr.response[7]['Image Gallery'].alt);
      // $previousIcon.remove();
      // $nextIcon.remove();
    }

    function previous() {
      if (count <= 0) {
        count = imageList.length;
      }
      count--;
      // console.log('previous count:', count);
      return setImg();
    }

    function next() {
      if (count >= imageList.length - 1) {
        count = -1;
      }
      count++;
      // console.log('next count:', count);
      return setImg();

    }

    function setImg(number) {
      number = count;
      $fishImage.setAttribute('src', imageList[number].src);
      $fishImage.setAttribute('alt', imageList[number].alt);
    }

    handleView('fish');

  });
  xhr.send();
}

$fishList.addEventListener('click', fishDetails);

$homeClick.addEventListener('click', function () {
  // console.log('working');
  handleView('show-case');
});

$listClick.addEventListener('click', function () {
  // console.log('working');
  // $menuToggle.classList.toggle('active');
  // $showcase.classList.toggle('active');
  handleView('list');
});

$backToList.addEventListener('click', function (event) {
  handleView('list');
});

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

window.addEventListener('DOMContentLoaded', function (event) {

});

function handleView(viewData) {
  data.view = viewData;
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === viewData) {
      $views[i].className = 'view';
    } else {
      $views[i].className = 'view hidden';
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
