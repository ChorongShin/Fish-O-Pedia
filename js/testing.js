/* imported fish */

// var $menuToggle = document.querySelector('button.toggle');
// var $showcase = document.querySelector('.showcase');
// var $exploreButton = document.querySelector('.explore');
// var $views = document.querySelectorAll('div[data-view]');
// var $backHome = document.querySelector('a.back-home');
// var $headToggle = document.querySelector('button.button-toggle');
// var $header = document.querySelector('.header');
// var menu = document.querySelector('ul.menu-one');
// var menuTwo = document.querySelector('ul.menu-two');
// var menuToggleDiv = document.querySelector('div.menu-toggle');
// var $fishList = document.querySelector('ul.fish-list');
// var $fishIcon = document.querySelector('img.plain-fish');
// var $fishName = document.querySelector('p.title');
// var $fishImage = document.querySelector('img.fish-img');
// var $fishScientificName = document.querySelector('td.scientific-name');
// var $fishLocation = document.querySelector('td.location.have-li');
// var $fishPopulation = document.querySelector('td.population');

// // Press like click event
// var on = 'images/fish-hook.png';
// var off = 'images/fish icon.png';
// var state = false;
// $fishIcon.addEventListener('click', function (event) {

//   if (state) {
//     $fishIcon.src = on;
//     state = false;
//   } else {
//     $fishIcon.src = off;
//     state = true;
//   }
// });

// // fish list
// // function getFishDataList() {

// //   for (var fishId = 0; fishId < 30; fishId++) {
// //     // fishList.append(renderFishCards(xhr.response[fishId]));
// //     var $fish = document.createElement('li');
// //     $fish.setAttribute('id', fishId);

// //     var fishColumn = document.createElement('div');
// //     fishColumn.setAttribute('class', 'fish-column');

// //     var fishCard = document.createElement('div');
// //     fishCard.setAttribute('class', 'fish-card');

// //     var fishImage = document.createElement('img');
// //     fishImage.setAttribute('src', fish[fishId]['Species Illustration Photo'].src);
// //     fishImage.setAttribute('alt', fish[fishId]['Species Illustration Photo'].title);

// //     var fishName = document.createElement('p');
// //     fishName.setAttribute('class', 'fish-name');
// //     fishName.textContent = fish[fishId]['Species Name'];

// //     var learnMoreCard = document.createElement('div');
// //     learnMoreCard.setAttribute('class', 'learn-more-card');

// //     var learnText = document.createElement('a');
// //     learnText.setAttribute('class', 'learn-text');
// //     learnText.setAttribute('href', '#');
// //     learnText.textContent = 'LEARN MORE';

// //     var icon = document.createElement('i');
// //     icon.setAttribute('class', 'fa-solid fa-circle-info');

// //     $fish.append(fishColumn);
// //     fishColumn.append(fishCard);
// //     fishCard.append(fishImage);
// //     fishCard.append(fishName);
// //     fishCard.append(learnMoreCard);
// //     learnMoreCard.append(icon);
// //     icon.append(learnText);
// //     $fishList.append($fish);
// //   }

// $fishList.addEventListener('click', function (event) {
//   // console.log('working');
//   var closest = event.target.closest('ul > li');
//   // console.log(closest);
//   var $fishId = parseInt(closest.getAttribute('id'), 10);
//   // console.log($fishId);
//   // for (var id = 0; id < 30; id++) {
//   // if ($fishId === xhr.response[id]) {
//   // console.log('are they the same id number?', $fishId);
//   $fishName.textContent = fish[$fishId]['Species Name'];
//   $fishScientificName.textContent = fish[$fishId]['Scientific Name'];
//   $fishLocation.append(fish[$fishId].Location);
//   $fishPopulation.textContent = fish[$fishId].Population;
//   // var locationUL = xhr.reponse[$fishId].Location.querySelector('ul');
//   // console.log(locationUL);
//   // locationUL.setAttribute('class', 'fish-icon-list');
//   // console.log(locationUL.setAttribute('class', 'fish-icon-list'));

//   if (fish[$fishId]['Image Gallery'] === null) {
//     $fishImage.setAttribute('src', 'images/empty fish.png');
//   }
//   if (fish[$fishId]['Image Gallery'] !== null) {
//     for (var number = 0; number < fish[$fishId]['Image Gallery'].length; number++) {
//       $fishImage.setAttribute('src', fish[$fishId]['Image Gallery'][number].src);
//     }
//   }
//   // getFishPhotos(xhr.response[$fishId]['Image Gallery']);
//   handleView('fish');
//   // }
//   // }
// });

// $menuToggle.addEventListener('click', function (event) {
//   $menuToggle.classList.toggle('active');
//   $showcase.classList.toggle('active');
//   menu.classList.toggle('open');

// });

// $headToggle.addEventListener('click', function (event) {
//   $headToggle.classList.toggle('active');
//   menuTwo.classList.toggle('open');
//   menuToggleDiv.classList.toggle('hidden');

// });

// $exploreButton.addEventListener('click', function (event) {

//   for (var fishId = 0; fishId < 30; fishId++) {
//     // fishList.append(renderFishCards(xhr.response[fishId]));
//     var $fish = document.createElement('li');
//     $fish.setAttribute('id', fishId);

//     var fishColumn = document.createElement('div');
//     fishColumn.setAttribute('class', 'fish-column');

//     var fishCard = document.createElement('div');
//     fishCard.setAttribute('class', 'fish-card');

//     var fishImage = document.createElement('img');
//     fishImage.setAttribute('src', fish[fishId]['Species Illustration Photo'].src);
//     fishImage.setAttribute('alt', fish[fishId]['Species Illustration Photo'].title);

//     var fishName = document.createElement('p');
//     fishName.setAttribute('class', 'fish-name');
//     fishName.textContent = fish[fishId]['Species Name'];

//     var learnMoreCard = document.createElement('div');
//     learnMoreCard.setAttribute('class', 'learn-more-card');

//     var learnText = document.createElement('a');
//     learnText.setAttribute('class', 'learn-text');
//     learnText.setAttribute('href', '#');
//     learnText.textContent = 'LEARN MORE';

//     var icon = document.createElement('i');
//     icon.setAttribute('class', 'fa-solid fa-circle-info');

//     $fish.append(fishColumn);
//     fishColumn.append(fishCard);
//     fishCard.append(fishImage);
//     fishCard.append(fishName);
//     fishCard.append(learnMoreCard);
//     learnMoreCard.append(icon);
//     icon.append(learnText);
//     $fishList.append($fish);
//   }

//   handleView('list');
//   $header.classList.remove('hidden');
//   $header.classList.add('view');
// });

// $backHome.addEventListener('click', function () {
//   handleView('show-case');
//   $header.classList.add('hidden');
// });

// window.addEventListener('DOMContentLoaded', function (event) {

// });

// function handleView(viewData) {
//   data.view = viewData;
//   for (var i = 0; i < $views.length; i++) {
//     if ($views[i].getAttribute('data-view') === viewData) {
//       $views[i].className = 'view';
//     } else {
//       $views[i].className = 'view hidden';
//     }
//   }
// }

// // function renderFishCards(card) {
// //   // var xhr = new XMLHttpRequest(name);
// //   // xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
// //   // xhr.responseType = 'json';
// //   // xhr.reponse = card

// //   var $fish = document.createElement('li');
// //   $fish.setAttribute('id', card.id);

// //   var fishColumn = document.createElement('div');
// //   fishColumn.setAttribute('class', 'fish-column');

// //   var fishCard = document.createElement('div');
// //   fishCard.setAttribute('class', 'fish-card');

// //   var fishImage = document.createElement('img');
// //   fishImage.setAttribute('src', card.id['Species Illustration Photo'].src);
// //   fishImage.setAttribute('alt', card.id['Species Illustration Photo'].title);

// //   var fishName = document.createElement('p');
// //   fishName.setAttribute('class', 'fish-name');
// //   fishName.textContent = card.id['Species Name'];

// //   var learnMoreCard = document.createElement('div');
// //   learnMoreCard.setAttribute('class', 'learn-more-card');

// //   var learnText = document.createElement('a');
// //   learnText.setAttribute('class', 'learn-text');
// //   learnText.setAttribute('href', '#');
// //   learnText.textContent = 'LEARN MORE';

// //   var icon = document.createElement('i');
// //   icon.setAttribute('class', 'fa-solid fa-circle-info');

// //   $fish.append(fishColumn);
// //   fishColumn.append(fishCard);
// //   fishCard.append(fishImage);
// //   fishCard.append(fishName);
// //   fishCard.append(learnMoreCard);
// //   learnMoreCard.append(icon);
// //   icon.append(learnText);

// //   return $fish;
// // }
