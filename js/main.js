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
// var $fishIcon = document.querySelector('input.plain-fish');
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
var $homeClick = document.querySelector('a.home-click');
var $listClick = document.querySelector('a.list-click');
var $searchInput = document.querySelector('input.search-input');
var $resultList = document.querySelector('ul.result-list');
var $searchForm = document.querySelector('.search-form');
var searchResultView = document.querySelector('div[data-view="search-result"]');
var $fishResult = document.querySelector('ul.result-list');
var $backToSearch = document.querySelector('button.back-to-search');

var count = 0;
var imageList = [];
var $fishId;
var liked;

// $searchForm.addEventListener('submit', event => {
//   event.preventDefault();
//   var value = $searchInput.value;
//   console.log(value);

// });

// $searchInput.addEventListener('input', function (event) {
//   var value = event.target.value;
//   console.log('value', value);

//   if (value && value.trim().length > 0) {
//     value = value.trim().toLowerCase();
//     setList(fishObjects.filter(fish => {
//       return fish['Species Name'].include(value);
//     }));
//   }
// });

var searchClick = document.querySelector('a.search-click-two');

searchClick.addEventListener('click', function (event) {
  handleView('search');
});

$searchForm.addEventListener('submit', function (event) {
  event.preventDefault();

  var searchValue = $searchInput.value;

  var xhr = new XMLHttpRequest(name);
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var results = data.fishList;
    // console.log('searchValue.value', searchValue.value);
    // if (searchValue.value === undefined) {
    //   console.log('searchValue.value', searchValue.value);
    //   searchResultView.className = 'hidden';
    // }

    for (var fishId = 0; fishId < 30; fishId++) {
      var name = results[fishId]['Species Name'].toLowerCase();
      // console.log(name);
      // console.log('typeof name', typeof name);
      // console.log('value ', searchValue);
      // console.log('typeof value', typeof value);
      if (name.includes(searchValue)) {

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

        searchResultView.className = 'view';
      }
    }

    $searchForm.reset();
    searchValue.value = '';

  });
  xhr.send();
  clearList();
});

// var error;

$fishResult.addEventListener('click', fishDetails);

function clearList() {
  while ($resultList.firstChild) {
    $resultList.removeChild($resultList.firstChild);
  }
}
// function noResults() {
//   error = document.createElement('li');
//   error.classList.add('error-message');

//   // var text = document.createTextNode('No results found. Sorry!');
//   var text = document.createElement('p');
//   text.textContent = 'No Results Found. Sorry! Try it again!';
//   error.append(text);
//   $resultList.append(error);
// }

$previousIcon.addEventListener('click', previous);
$nextIcon.addEventListener('click', next);

//   if (state) {

//     $fishIcon.src = on;
//     localStorage.setItem('liked', 'on');
//   } else {
//     $fishIcon.src = off;
//     localStorage.setItem('liked', 'off');
// }

// function liked() {
//   if (state) {
//     $fishIcon.src = on;
//     localStorage.setItem('liked', 'on');
//   } else {
//     $fishIcon.src = off;
//     localStorage.setItem('liked', 'off');

//   }
// }

// fish list

function getFishDataList() {
  var xhr = new XMLHttpRequest(name);
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    data.fishList = xhr.response;
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

function fishDetails(event) {

  var closest = event.target.closest('ul > li');

  $fishId = parseInt(closest.getAttribute('id'), 10);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.fishList = xhr.response;
    liked = {
      fishId: $fishId,
      like: false,
      image: 'images/fish icon.png'
    };

    for (var index = 0; index < data.fishList.length; index++) {
      data.fishList[index].liked = liked;
    }

    // data.liked.push(liked);

    // $fishIcon.setAttribute('id', $fishId);

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

// Press like click event
// var on = 'images/fish-hook.png';
// var off = 'images/fish icon.png';

// $fishIcon.addEventListener('click', function (event) {

//   console.log('event.target', event.target);
//   console.log('$fishIcon.src', $fishIcon.src);
//   console.log('fishId', $fishId);
//   var icon = event.target.getAttribute('id');
//   var iconId = parseInt(icon, 10);
//   console.log(iconId);
//   if (iconId === data.fishList[$fishId].liked.fishId) {

//     var likesObject = {
//       fishId: $fishId,
//       like: true,
//       image: 'images/fish-hook.png'
//     };
//     data.likes.push(likesObject);
//     console.log('event.target.id', event.target.id);
//     console.log('same id?', iconId === data.fishList[$fishId].liked.fishId);
//     // console.log(data.fishList);
//     // data.fistList[$fishId].liked.like = true;
//     // data.fistList[$fishId].liked.source = on;
//     data.fishList[$fishId].liked.like = true;
//     event.target.src = on;
//     console.log(event.target.src);
//     data.fishList[$fishId].liked.source = on;

//     // } else {

//     //   //   // data.fistList[$fishId].liked.like = false;
//     //   //   // data.fistList[$fishId].liked.source = off;
//     //   //   // $fishIcon.src = off;
//     //   data.fishList[$fishId].liked.like = false;
//     //   $fishIcon.src = 'http://localhost:53137/' + off;
//     //   data.fishList[$fishId].liked.source = off;

//   // } else if (iconId !== data.fishList[$fishId].liked.fishId) {
//   //   data.fishList[$fishId].liked.like = false;
//   //   $fishIcon.src = 'http://localhost:53137/' + off;
//   //   data.fishList[$fishId].liked.source = off;
//   // }
//   }
//   $fishIcon.src = off;

// });

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

$backToSearch.addEventListener('click', function (event) {
  handleView('search');
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
