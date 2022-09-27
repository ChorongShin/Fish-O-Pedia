const targetUrl = encodeURIComponent('https://www.fishwatch.gov/api/species');

const $header = document.querySelector('header');
const $exploreButton = document.querySelector('.explore');
const $views = document.querySelectorAll('div[data-view]');
const $backHome = document.querySelector('a.back-home');
const $fishList = document.querySelector('ul.fish-list');
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
const $searchClick = document.querySelector('a.search-click-two');
const $noResult = document.querySelector('p.no-result');
const $form = document.querySelector('form.form');
const $seeMore = document.querySelector('.see-more');
const $mainMenu = document.querySelector('.main-menu');
const $threeFish = document.querySelector('ul.three-fish');
const $favorite = document.querySelector('a.favorite-click');
const $favoriteList = document.querySelector('ul.favorite-list');
const $noFav = document.querySelector('p.no-fav');
const $loader = document.querySelector('.lds-facebook');
const $errorMessage = document.querySelector('h2.error-message');
const $hamburger = document.querySelector('.hamburger');
const $navMenu = document.querySelector('.nav-menu');
const $overlayBox = document.querySelector('.overlay-box');
const $modal = document.querySelector('.modal');
const $cancelButton = document.querySelector('.cancel-button');
const $confirmButton = document.querySelector('.confirm-button');
const $addIcon = document.querySelector('i.fa-square-plus');
const $question = document.querySelector('p.question');
const $questionColumn = document.querySelector('.cancel');

let count = 0;
let imageList = [];
let $fishId;
const fishNames = [];

window.addEventListener('DOMContentLoaded', event => {
  event.preventDefault();
  getFishDataList(104, $fishList);
  getFishDataList(3, $threeFish);

  for (let i = 0; i < data.likes.length; i++) {
    $favoriteList.prepend(favFishList(data.likes[i]));
  }
});

$exploreButton.addEventListener('click', () => {
  handleView('main');
  $header.className = 'header';
});

function getFishDataList(number, list) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    data.fishList = xhr.response;

    // console.log('status:', xhr.status);
    if (xhr.status === 200) {
      $loader.className = 'lds-facebook hidden';
    } else {
      $errorMessage.className = 'error-message';
    }
    // three fish data on the home page
    data.fishList = xhr.response;
    for (let fishId = 0; fishId < number; fishId++) {
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
      list.append($fish);
    }
  });
  xhr.send();

}

function getFish(event) {
  if (event.target.tagName === 'I') {
    return;
  }

  const closest = event.target.closest('ul > li');
  $fishId = Number(closest.getAttribute('id'));

  $addIcon.setAttribute('id', $fishId);

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
}

$fishResult.addEventListener('click', event => {
  getFish(event);
  handleView('fish');
});

$threeFish.addEventListener('click', event => {
  getFish(event);
  handleView('fish');
});

$fishList.addEventListener('click', event => {
  getFish(event);
  handleView('fish');
});

$favoriteList.addEventListener('click', event => {
  if (event.target.tagName !== 'I') {
    getFish(event);
    handleView('fish');
  }

  // if (data.likes.length === 0) {
  //   $noFav.classList.remove('hidden');
  // } else {
  //   $noFav.classList.add('hidden');
  // }

  if ($favoriteList.children.length === 0) {
    $noFav.classList.remove('hidden');
  } else {
    $noFav.classList.add('hidden');
  }

});

$previousIcon.addEventListener('click', previous);
function previous() {
  if (count <= 0) {
    count = imageList.length;
  }
  count--;
  return setImg();
}

$nextIcon.addEventListener('click', next);
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

$seeMore.addEventListener('click', () => {
  handleView('sea-life');
});

$listClick.addEventListener('click', () => {
  handleView('sea-life');
  $form.reset();
});

$backToList.addEventListener('click', () => handleView('sea-life'));
$mainMenu.addEventListener('click', () => handleView('main'));

$backHome.addEventListener('click', () => {
  handleView('show-case');
  $header.className = 'hidden';
});

$searchClick.addEventListener('click', () => {
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

  for (let i = 0; i < 104; i++) {

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

$hamburger.addEventListener('click', () => {
  $hamburger.classList.toggle('active');
  $navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => {
  n.addEventListener('click', () => {
    $hamburger.classList.remove('active');
    $navMenu.classList.remove('active');
  });
});

$favorite.addEventListener('click', event => {
  if ($favoriteList.children.length === 0) {
    $noFav.classList.remove('hidden');
  } else {
    $noFav.classList.add('hidden');
  }
  handleView('favorite');
});

$addIcon.addEventListener('click', () => {
  $overlayBox.className = 'overlay-box on';
  $modal.className = 'modal view';
});

$cancelButton.addEventListener('click', () => {
  $overlayBox.className = 'overlay-box';
  $modal.className = 'modal hidden';
});

$favoriteList.addEventListener('click', event => {
  if (event.target.tagName !== 'I') {
    return;
  }

  const closestElement = event.target.closest('.favorite-fish');
  const currentFish = Number(closestElement.id);
  for (let i = 0; i < data.likes.length; i++) {
    const fish = data.likes[i].id;

    if (fish === currentFish) {
      data.likes.splice(i, 1);
      closestElement.remove();
      break;
    }
  }
  if ($favoriteList.children.length === 0) {
    $noFav.classList.remove('hidden');
  } else {
    $noFav.classList.add('hidden');
  }
});

$addIcon.addEventListener('click', event => {
  const iconId = Number(event.target.id);

  for (let i = data.likes.length - 1; i >= 0; i--) {
    if (iconId === Number(data.likes[i].id)) {
      $question.textContent = 'This fish is already added.';
      $confirmButton.className = 'confirm-button hide';
      $questionColumn.style.width = '100%';
      $questionColumn.style.marginTop = '3rem';
    } else {
      $question.textContent = 'Would you like to add this fish to your favorite list?';
      $confirmButton.className = 'confirm-button';
      $questionColumn.style.width = '50%';
      $questionColumn.style.marginTop = '2rem';
    }
  }
});

$confirmButton.addEventListener('click', addItem);

function addItem(event) {
  const favFish = {
    speciesName: '',
    src: '',
    title: '',
    id: '',
    isLiked: false,
    likedId: data.nextLikedId
  };

  favFish.likedId = data.nextLikedId;
  favFish.id = $fishId;
  favFish.speciesName = data.fishList[$fishId]['Species Name'];
  favFish.src = data.fishList[$fishId]['Species Illustration Photo'].src;
  favFish.title = data.fishList[$fishId]['Species Illustration Photo'].title;
  favFish.isLiked = true;

  data.likes.unshift(favFish);
  const newFavorite = favFishList(data.likes[0]);
  $favoriteList.prepend(newFavorite);
  data.nextLikedId++;

  $overlayBox.className = 'overlay-box';
  $modal.className = 'modal hidden';
  if ($favoriteList.children.length === 0) {
    $noFav.classList.remove('hidden');
  } else {
    $noFav.classList.add('hidden');
  }
  handleView('favorite');

}

// DOM tree for Favorite Fish List
function favFishList(e) {
  const $fish = document.createElement('li');
  $fish.setAttribute('id', e.id);
  $fish.setAttribute('class', 'favorite-fish');
  const fishColumn = document.createElement('div');
  fishColumn.setAttribute('class', 'fish-column');

  const fishCard = document.createElement('div');
  fishCard.setAttribute('class', 'fish-card');

  const fishCardImage = document.createElement('div');
  fishCardImage.setAttribute('class', 'fish-card-image');

  const fishImage = document.createElement('img');
  fishImage.setAttribute('src', e.src);
  fishImage.setAttribute('alt', e.title);

  const fishName = document.createElement('p');
  fishName.setAttribute('class', 'fish-name');
  fishName.textContent = e.speciesName;

  const learnMoreCard = document.createElement('div');
  learnMoreCard.setAttribute('class', 'learn-more-card');

  const deleteIcon = document.createElement('span');
  deleteIcon.setAttribute('class', 'delete-icon');
  const icon = document.createElement('i');
  icon.setAttribute('class', 'fa-solid fa-trash-can fa-2xl');
  deleteIcon.append(icon);

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
  fishCardImage.append(deleteIcon);

  return $fish;
}

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
