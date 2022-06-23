var targetUrl = encodeURIComponent('https://www.fishwatch.gov/api/species');

var $exploreButton = document.querySelector('.explore');
var $views = document.querySelectorAll('div[data-view]');
var $backHome = document.querySelector('a.back-home');
var $header = document.querySelector('.header');
var $fishList = document.querySelector('ul.fish-list');
var $fishIcon = document.querySelector('img.fish');
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
var $backToList = document.querySelector('button.back-to-list');
var $listClick = document.querySelector('a.list-click');
var $searchInput = document.querySelector('input.search-input');
var $resultList = document.querySelector('ul.result-list');
var $fishResult = document.querySelector('ul.result-list');
var $backToSearch = document.querySelector('button.back-to-search');
var searchClick = document.querySelector('a.search-click-two');

var count = 0;
var imageList = [];
var $fishId;

$fishResult.addEventListener('click', fishDetails);

$previousIcon.addEventListener('click', previous);
$nextIcon.addEventListener('click', next);

// fish list
function getFishDataList() {
  var xhr = new XMLHttpRequest(name);
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    data.fishList = xhr.response;
    for (var fishId = 0; fishId < 100; fishId++) {

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

function fishDetails(event) {

  var closest = event.target.closest('ul > li');

  $fishId = parseInt(closest.getAttribute('id'), 10);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.fishList = xhr.response;
    // var $fishIcon = document.querySelector('img.fish');
    // var inputFishId = parseInt($fishIcon.getAttribute('id'), 10);

    data.fishList[$fishId].liked = { fishId: $fishId, isLiked: false };

    $fishIcon.setAttribute('id', $fishId);

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

    if (xhr.response[$fishId]['Image Gallery'] === null) {

      imageList = [];
      $fishImage.setAttribute('src', xhr.response[$fishId]['Species Illustration Photo'].src);
      $fishImage.setAttribute('alt', xhr.response[$fishId]['Species Illustration Photo'].alt);

      $previousIcon.classList.remove('view');
      $nextIcon.classList.remove('view');
      $previousIcon.classList.add('hidden');
      $nextIcon.classList.add('hidden');

    } else if (xhr.response[$fishId]['Image Gallery'].length === undefined) {
      imageList = [];
      $fishImage.setAttribute('src', xhr.response[$fishId]['Image Gallery'].src);
      $fishImage.setAttribute('alt', xhr.response[$fishId]['Image Gallery'].alt);

      $previousIcon.classList.remove('view');
      $nextIcon.classList.remove('view');
      $previousIcon.classList.add('hidden');
      $nextIcon.classList.add('hidden');

    } else if (xhr.response[$fishId]['Image Gallery'].length > 1) {

      imageList = xhr.response[$fishId]['Image Gallery'];

      $fishImage.setAttribute('src', imageList[0].src);
      $fishImage.setAttribute('alt', imageList[0].alt);

      $previousIcon.classList.remove('hidden');
      $nextIcon.classList.remove('hidden');
      $previousIcon.classList.add('view');
      $nextIcon.classList.add('view');

    }

    handleView('fish');

    $fishIcon.addEventListener('click', function (event) {

      var inputFishId = parseInt($fishIcon.getAttribute('id'), 10);

      // var pressedLiked = {
      //   fishId: inputFishId,
      //   isLiked: false,
      //   image: 'blue'
      // };

      if (inputFishId === data.fishList[inputFishId].liked.fishId && data.fishList[inputFishId].liked.isLiked === false) {

        $fishIcon.className = 'fish orange';
        $fishIcon.src = 'images/fish-hook.png';
        data.fishList[inputFishId].liked.isLiked = true;

      } else if (inputFishId === data.fishList[inputFishId].liked.fishId && data.fishList[inputFishId].liked.isLiked === true) {

        // data.liked[like].isLike = false;
        // data.liked[like].image = 'images/fish icon.png';
        $fishIcon.className = 'fish blue';
        $fishIcon.src = 'images/fish icon.png';
        data.fishList[inputFishId].liked = false;

      }

    });

  });
  xhr.send();
}

function previous() {
  if (count <= 0) {
    count = imageList.length;
  }
  count--;
  return setImg();
}

function next() {
  if (count >= imageList.length - 1) {
    count = -1;
  }
  count++;
  return setImg();

}

function setImg() {
  imageList = data.fishList[$fishId]['Image Gallery'];
  if (data.fishList[$fishId]['Image Gallery'] === null) {
    imageList = [];
    $fishImage.setAttribute('src', data.fishList[$fishId]['Species Illustration Photo'].src);
    $fishImage.setAttribute('alt', data.fishList[$fishId]['Species Illustration Photo'].alt);

  } else if (data.fishList[$fishId]['Image Gallery'].length === undefined) {
    imageList = [];
    $fishImage.setAttribute('src', data.fishList[$fishId]['Image Gallery'].src);
    $fishImage.setAttribute('alt', data.fishList[$fishId]['Image Gallery'].alt);

  } else if (imageList.length > 1) {
    $fishImage.setAttribute('src', imageList[count].src);
    $fishImage.setAttribute('alt', imageList[count].alt);
  }
}

$fishList.addEventListener('click', fishDetails);
$listClick.addEventListener('click', function () {
  handleView('list');
});

$backToList.addEventListener('click', function (event) {
  handleView('list');
});

$backToSearch.addEventListener('click', function (event) {
  handleView('search');
  $header.classList.remove('hidden');
  $header.classList.add('view');

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
      $views[i].className = 'view hidden';
    }
  }
}

searchClick.addEventListener('click', function (event) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.fishList = xhr.response;

    for (var fishId = 0; fishId < 100; fishId++) {

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
      $resultList.append($fish);
    }

    var list = document.querySelectorAll('ul.result-list > li');
    $searchInput.onkeyup = () => {
      var search = $searchInput.value.toLowerCase();

      for (var i of list) {

        var item = i.innerHTML.toLowerCase();
        if (item.indexOf(search) === -1) {
          i.classList.add('hidden');
          i.classList.remove('view');
        } else {
          i.classList.remove('hidden');
          i.classList.add('view');
        }
      }
      search.value = '';
    };
  });

  xhr.send();
  handleView('search');

});
