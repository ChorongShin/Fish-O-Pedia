const targetUrl = encodeURIComponent('https://www.fishwatch.gov/api/species');

const $exploreButton = document.querySelector('.explore');
const $views = document.querySelectorAll('div[data-view]');
const $backHome = document.querySelector('a.back-home');
const $fishList = document.querySelector('ul.fish-list');
const $fishIcon = document.querySelector('img.fish');
const $fishName = document.querySelector('p.title');
const $fishImage = document.querySelector('img.fish-img');
const $fishScientificName = document.querySelector('td.scientific-name');
const $fishLocation = document.querySelector('td.location-li');
const $fishLocationList = document.querySelector('ul.fish-location-list');
const $fishPopulation = document.querySelector('td.population');
const $fishBiology = document.querySelector('td.biology-li');
const $fishBiologyList = document.querySelector('ul.fish-biology-list');
const $previousIcon = document.querySelector('.fa-angle-left');
const $nextIcon = document.querySelector('.fa-angle-right');
const $backToList = document.querySelector('button.back-to-list');
const $listClick = document.querySelector('a.list-click');
const $searchInput = document.querySelector('input.search-input');
const $resultList = document.querySelector('ul.result-list');
const $fishResult = document.querySelector('ul.result-list');
const searchClick = document.querySelector('a.search-click-two');
const listClick = document.querySelector('a.list-click');
const $noResult = document.querySelector('p.no-result');
const $form = document.querySelector('form.form');

let count = 0;
let imageList = [];
let $fishId;
const fishNames = [];

$fishResult.addEventListener('click', event => {
  const closest = event.target.closest('ul > li');
  $fishId = Number(closest.getAttribute('id'));

  if (data.fishList[$fishId].liked === undefined) {
    data.fishList[$fishId].liked = { fishId: $fishId, isLiked: false };
  }

  if (data.fishList[$fishId].liked.isLiked) {
    $fishIcon.className = 'fish orange';
    $fishIcon.src = 'images/fish-hook.png';
  } else {
    $fishIcon.className = 'fish blue';
    $fishIcon.src = 'images/fish icon.png';
  }

  $fishIcon.setAttribute('id', $fishId);

  $fishName.textContent = data.fishList[$fishId]['Species Name'];
  $fishScientificName.textContent = data.fishList[$fishId]['Scientific Name'];

  if (data.fishList[$fishId].Location === null) {
    $fishLocation.textContent = 'No Data Available';
    $fishLocation.setAttribute('class', 'no-li');
  } else {
    const locationUL = data.fishList[$fishId].Location.trim();
    const locationArray = locationUL.split('\n');
    for (let i = 0; i < locationArray.length; i++) {
      if (locationArray[i] === '<ul>' || locationArray[i] === '</ul>') {
        locationArray.splice(i, 1);
      }
    }
    const locationString = locationArray.join(' ');
    $fishLocationList.innerHTML = locationString;
  }

  if (data.fishList[$fishId].Biology === null) {
    $fishBiology.textContent = 'No Data Available';
    $fishBiology.setAttribute('class', 'no-li');
  } else if (data.fishList[$fishId].Biology !== null) {
    const biologyUL = data.fishList[$fishId].Biology.trim();
    const biologyArray = biologyUL.split('\n');
    for (let j = 0; j < biologyArray.length; j++) {
      if (biologyArray[j] === ' <ul>' || biologyArray[j] === ' </ul>') {
        biologyArray.splice(j, 1);
      }
    }
    const biologyString = biologyArray.join(' ');
    $fishBiologyList.innerHTML = biologyString;
    const uls = document.querySelectorAll('ul.fish-biology-list > ul');
    uls.forEach(ul => ul.classList.add('fish-biology-list'));
  }

  if (data.fishList[$fishId].Population === null) {
    $fishPopulation.textContent = 'No Data Available';
    $fishPopulation.setAttribute('class', 'population');
  } else {
    $fishPopulation.textContent = data.fishList[$fishId].Population;
    $fishPopulation.setAttribute('class', 'population');
  }

  if (data.fishList[$fishId]['Image Gallery'] === null) {

    imageList = [];
    $fishImage.setAttribute('src', data.fishList[$fishId]['Species Illustration Photo'].src);
    $fishImage.setAttribute('alt', data.fishList[$fishId]['Species Illustration Photo'].alt);

    $previousIcon.classList.remove('view');
    $nextIcon.classList.remove('view');
    $previousIcon.classList.add('hidden');
    $nextIcon.classList.add('hidden');

  } else if (data.fishList[$fishId]['Image Gallery'].length === undefined) {
    imageList = [];
    $fishImage.setAttribute('src', data.fishList[$fishId]['Image Gallery'].src);
    $fishImage.setAttribute('alt', data.fishList[$fishId]['Image Gallery'].alt);

    $previousIcon.classList.remove('view');
    $nextIcon.classList.remove('view');
    $previousIcon.classList.add('hidden');
    $nextIcon.classList.add('hidden');

  } else if (data.fishList[$fishId]['Image Gallery'].length > 1) {

    imageList = data.fishList[$fishId]['Image Gallery'];

    $fishImage.setAttribute('src', imageList[0].src);
    $fishImage.setAttribute('alt', imageList[0].alt);

    $previousIcon.classList.remove('hidden');
    $nextIcon.classList.remove('hidden');
    $previousIcon.classList.add('view');
    $nextIcon.classList.add('view');

  }

  handleView('fish');
  $fishIcon.removeEventListener('click', handleFishLikeClick);
  $fishIcon.addEventListener('click', handleFishLikeClick);
});

$previousIcon.addEventListener('click', previous);
$nextIcon.addEventListener('click', next);

function getFishDataList() {
  const xhr = new XMLHttpRequest(name);
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    data.fishList = xhr.response;
    for (let fishId = 0; fishId < 100; fishId++) {

      const $fish = document.createElement('li');
      $fish.setAttribute('id', fishId);
      data.fishList[fishId].id = fishId;

      const fishColumn = document.createElement('div');
      fishColumn.setAttribute('class', 'fish-column');

      const fishCard = document.createElement('div');
      fishCard.setAttribute('class', 'fish-card');

      const fishCardImage = document.createElement('div');
      fishCardImage.setAttribute('class', 'fish-card-image');

      const fishImage = document.createElement('img');
      fishImage.setAttribute('src', xhr.response[fishId]['Species Illustration Photo'].src);
      fishImage.setAttribute('alt', xhr.response[fishId]['Species Illustration Photo'].title);

      const fishName = document.createElement('p');
      fishName.setAttribute('class', 'fish-name');
      fishName.textContent = xhr.response[fishId]['Species Name'];

      const learnMoreCard = document.createElement('div');
      learnMoreCard.setAttribute('class', 'learn-more-card');

      const learnText = document.createElement('a');
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

$fishList.addEventListener('click', event => {
  const closest = event.target.closest('ul > li');
  $fishId = Number(closest.getAttribute('id'));

  // if we've never visited here, then liked is undefined, then
  // we should define with default values
  if (data.fishList[$fishId].liked === undefined) {
    data.fishList[$fishId].liked = { fishId: $fishId, isLiked: false };
  }

  if (data.fishList[$fishId].liked.isLiked) {
    $fishIcon.className = 'fish orange';
    $fishIcon.src = 'images/fish-hook.png';
  } else {
    $fishIcon.className = 'fish blue';
    $fishIcon.src = 'images/fish icon.png';
  }

  $fishIcon.setAttribute('id', $fishId);

  $fishName.textContent = data.fishList[$fishId]['Species Name'];
  $fishScientificName.textContent = data.fishList[$fishId]['Scientific Name'];

  if (data.fishList[$fishId].Location === null) {
    $fishLocation.textContent = 'No Data Available';
    $fishLocation.setAttribute('class', 'no-li');
  } else {
    const locationUL = data.fishList[$fishId].Location.trim();
    const locationArray = locationUL.split('\n');
    for (let i = 0; i < locationArray.length; i++) {
      if (locationArray[i] === '<ul>' || locationArray[i] === '</ul>') {
        locationArray.splice(i, 1);
      }
    }
    const locationString = locationArray.join(' ');
    $fishLocationList.innerHTML = locationString;
  }

  if (data.fishList[$fishId].Biology === null) {
    $fishBiology.textContent = 'No Data Available';
    $fishBiology.setAttribute('class', 'no-li');
  } else if (data.fishList[$fishId].Biology !== null) {
    const biologyUL = data.fishList[$fishId].Biology.trim();
    const biologyArray = biologyUL.split('\n');
    for (let j = 0; j < biologyArray.length; j++) {
      if (biologyArray[j] === ' <ul>' || biologyArray[j] === ' </ul>') {
        biologyArray.splice(j, 1);
      }

    }

    const biologyString = biologyArray.join(' ');
    $fishBiologyList.innerHTML = biologyString;
    const uls = document.querySelectorAll('ul.fish-biology-list > ul');
    uls.forEach(ul => ul.classList.add('fish-biology-list'));
  }

  if (data.fishList[$fishId].Population === null) {
    $fishPopulation.textContent = 'No Data Available';
    $fishPopulation.setAttribute('class', 'population');
  } else {
    $fishPopulation.textContent = data.fishList[$fishId].Population;
    $fishPopulation.setAttribute('class', 'population');
  }

  if (data.fishList[$fishId]['Image Gallery'] === null) {

    imageList = [];
    $fishImage.setAttribute('src', data.fishList[$fishId]['Species Illustration Photo'].src);
    $fishImage.setAttribute('alt', data.fishList[$fishId]['Species Illustration Photo'].alt);

    $previousIcon.classList.remove('view');
    $nextIcon.classList.remove('view');
    $previousIcon.classList.add('hidden');
    $nextIcon.classList.add('hidden');

  } else if (data.fishList[$fishId]['Image Gallery'].length === undefined) {
    imageList = [];
    $fishImage.setAttribute('src', data.fishList[$fishId]['Image Gallery'].src);
    $fishImage.setAttribute('alt', data.fishList[$fishId]['Image Gallery'].alt);

    $previousIcon.classList.remove('view');
    $nextIcon.classList.remove('view');
    $previousIcon.classList.add('hidden');
    $nextIcon.classList.add('hidden');

  } else if (data.fishList[$fishId]['Image Gallery'].length > 1) {

    imageList = data.fishList[$fishId]['Image Gallery'];

    $fishImage.setAttribute('src', imageList[0].src);
    $fishImage.setAttribute('alt', imageList[0].alt);

    $previousIcon.classList.remove('hidden');
    $nextIcon.classList.remove('hidden');
    $previousIcon.classList.add('view');
    $nextIcon.classList.add('view');

  }

  handleView('fish');
  $fishIcon.removeEventListener('click', handleFishLikeClick);
  $fishIcon.addEventListener('click', handleFishLikeClick);
});

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

const handleFishLikeClick = function (event) {
  const inputFishId = Number($fishIcon.getAttribute('id'));

  if (inputFishId === data.fishList[inputFishId].liked.fishId && data.fishList[inputFishId].liked.isLiked === false) {

    $fishIcon.className = 'fish orange';
    $fishIcon.src = 'images/fish-hook.png';
    data.fishList[inputFishId].liked.isLiked = true;

  } else if (
    inputFishId === data.fishList[inputFishId].liked.fishId &&
    data.fishList[inputFishId].liked.isLiked === true
  ) {

    $fishIcon.className = 'fish blue';
    $fishIcon.src = 'images/fish icon.png';
    data.fishList[inputFishId].liked.isLiked = false;

  }

};

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

$listClick.addEventListener('click', function () {
  handleView('list');
  $form.reset();
});

$backToList.addEventListener('click', function (event) {
  handleView('list');
});

$exploreButton.addEventListener('click', function (event) {
  handleView('list');
  getFishDataList();
});

$backHome.addEventListener('click', function () {
  handleView('show-case');
});

listClick.addEventListener('click', function (event) {
  handleView('list');
});

searchClick.addEventListener('click', function (event) {
  $resultList.innerHTML = '';
  handleView('search');

  const fishData = data.fishList;

  for (let i = 0; i < fishData.length; i++) {
    const fishName = fishData[i]['Species Name'].toLowerCase();
    fishNames.push(fishName);
  }
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  $resultList.innerHTML = '';

  const searchValue = $searchInput.value.toLowerCase();

  for (let i = 0; i < 100; i++) {

    if (fishNames[i].indexOf(searchValue) > -1) {

      const $fish = document.createElement('li');
      $fish.setAttribute('id', i);

      const fishColumn = document.createElement('div');
      fishColumn.setAttribute('class', 'fish-column');

      const fishCard = document.createElement('div');
      fishCard.setAttribute('class', 'fish-card');

      const fishCardImage = document.createElement('div');
      fishCardImage.setAttribute('class', 'fish-card-image');

      const fishImage = document.createElement('img');
      fishImage.setAttribute('src', data.fishList[i]['Species Illustration Photo'].src);
      fishImage.setAttribute('alt', data.fishList[i]['Species Illustration Photo'].title);

      const fishName = document.createElement('p');
      fishName.setAttribute('class', 'fish-name');
      fishName.textContent = data.fishList[i]['Species Name'];

      const learnMoreCard = document.createElement('div');
      learnMoreCard.setAttribute('class', 'learn-more-card');

      const learnText = document.createElement('a');
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
  }

  if ($resultList.children.length === 0) {
    $noResult.classList.add('view');
    $noResult.classList.remove('hidden');
  } else {
    $noResult.classList.remove('view');
    $noResult.classList.add('hidden');
  }

  $searchInput.value = '';
  $form.reset();
});

function handleView(viewData) {
  data.view = viewData;
  for (let i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === viewData) {
      $views[i].className = 'view';
    } else {
      $views[i].className = 'view hidden';
    }
  }
}
