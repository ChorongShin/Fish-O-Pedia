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

// Image carousel

// function getFishPhotos(fish) {
//   var fishId = 0;
//   var count = 0;

//   var fishImages = fish[fishId]['Image Gallery'];

//   if (fishImages !== null) {
//     for (fishId = 0; fishId < 30; fishId++) {
//       for (count; count < fishImages.length; count++) {
//         $fishImage.setAttribute('src', fishImages[count].src);
//       }
//     }
//   } else {
//     $fishImage.setAttribute('src', 'images/empty fish.png');
//   }

//   function previous() {
//     if (count <= 0) {
//       count = fishImages.length;
//     }
//     count--;
//     return setImg();
//   }

//   function next() {
//     if (count >= fishImages.length - 1) {
//       count--;
//     }
//     count++;
//     return setImg();
//   }

//   function setImg() {
//     if (fishImages !== null) {
//       $fishImage.setAttribute('src', fishImages[count].src);
//       $fishImage.setAttribute('alt', fishImages[count].title);
//     } else {
//       $fishImage.setAttribute('src', 'images/empty fish.png');
//       $fishImage.setAttribute('alt', 'No fish');
//       var paragraph = document.createElement('p');
//       paragraph.textContent = 'Sorry, we don\'t  have a picture';
//       $fishImage.append(paragraph);
//     }
//   }
//   $previousIcon.addEventListener('click', previous);
//   $nextIcon.addEventListener('click', next);

// }

// getFishPhotos();

// var fish = {
//   views: ['Royal Blue Tang', 'Clownfish', 'white fish', 'blue fish'],
//   images: ['Royal Blue Tang.jpg', 'Logo.jpg', 'empty fish.png', 'fish icon.png']
// };

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

function fishDetails(event) {
  // console.log('working');
  var closest = event.target.closest('ul > li');
  // console.log(closest);
  var $fishId = parseInt(closest.getAttribute('id'), 10);
  // console.log($fishId);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    $fishName.textContent = xhr.response[$fishId]['Species Name'];
    $fishScientificName.textContent = xhr.response[$fishId]['Scientific Name'];

    if (xhr.response[$fishId].Location === null) {
      $fishLocation.textContent = 'Unknown Location';
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

    if (xhr.response[$fishId].biology === null) {
      $fishBiology.textContent = 'No Description';
      $fishBiology.setAttribute('class', 'no-li');
    } else {
      var BiologyUL = xhr.response[$fishId].Biology.trim();
      var biologyArray = BiologyUL.split('\n');
      for (var j = 0; j < biologyArray.length; j++) {
        if (biologyArray[j] === '<ul>' || biologyArray[j] === '</ul>') {
          biologyArray.splice(j, 1);
        }
      }
      var biologyString = biologyArray.join(' ');
      $fishBiologyList.innerHTML = biologyString;
    }

    if (xhr.response[$fishId].Population === null) {
      $fishPopulation.textContent = 'Unknown Population';
      $fishPopulation.setAttribute('class', 'population');
    } else {
      $fishPopulation.textContent = xhr.response[$fishId].Population;
      $fishPopulation.setAttribute('class', 'population');
    }

    if (xhr.response[$fishId]['Image Gallery'] === null) {
      $fishImage.setAttribute('src', xhr.response[$fishId]['Species Illustration Photo'].src);
      $fishImage.setAttribute('alt', xhr.response[$fishId]['Species Illustration Photo'].alt);
      $previousIcon.remove();
      $nextIcon.remove();

    } else if (xhr.response[$fishId]['Image Gallery'].length === 1) {
      $fishImage.setAttribute('src', xhr.response[$fishId]['Image Gallery'].src);
      $previousIcon.remove();
      $nextIcon.remove();

    } else if (xhr.response[$fishId]['Image Gallery'].length > 1) {
      for (var number = 0; number < xhr.response[$fishId]['Image Gallery'].length; number++) {
        $fishImage.setAttribute('src', xhr.response[$fishId]['Image Gallery'][number].src);
      }
    }

    handleView('fish');

  });
  xhr.send();
}

$fishList.addEventListener('click', fishDetails);

// $fishList.addEventListener('click', function (event) {
//   console.log('working');
//   var closest = event.target.closest('ul > li');
//   console.log(closest);
//   var closestId = parseInt(closest.getAttribute('id'), 10);
//   console.log(closestId);

//   xhr.response;
//   handleView('fish');

// });

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
