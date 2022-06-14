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
var fishCards = document.querySelector('.fish-cards');

var targetUrl = encodeURIComponent('https://www.fishwatch.gov/api/species');

function getFishData() {
  var xhr = new XMLHttpRequest(name);
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.status);
    // console.log(xhr.response[0]['Species Name']);
    for (var fishId = 0; fishId < 18; fishId++) {
      if (fishId === 6) {
        var columnThird = document.createElement('div');
        columnThird.setAttribute('class', 'column-one-third');

        var fishCard = document.createElement('div');
        fishCard.setAttribute('class', 'fish-card');

        var fishImage = document.createElement('img');
        fishImage.setAttribute('src', xhr.response[fishId]['Image Gallery'].src);
        fishImage.setAttribute('alt', xhr.response[fishId]['Image Gallery'].alt);

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

        columnThird.append(fishCard);
        fishCard.append(fishImage);
        fishCard.append(fishName);
        fishCard.append(learnMoreCard);
        learnMoreCard.append(learnText);
        learnText.append(icon);
        // renderFishCards(xhr.response[6]);
        // fishCards.append(renderFishCards(xhr.response[6]));
      } else if (xhr.response[fishId]['Image Gallery'] !== null) {
        columnThird = document.createElement('div');
        columnThird.setAttribute('class', 'column-one-third');

        fishCard = document.createElement('div');
        fishCard.setAttribute('class', 'fish-card');

        fishImage = document.createElement('img');
        fishImage.setAttribute('src', xhr.response[fishId]['Image Gallery'][0].src);
        fishImage.setAttribute('alt', xhr.response[fishId]['Image Gallery'][0].alt);

        fishName = document.createElement('p');
        fishName.setAttribute('class', 'fish-name');
        fishName.textContent = xhr.response[fishId]['Species Name'];

        learnMoreCard = document.createElement('div');
        learnMoreCard.setAttribute('class', 'learn-more-card');

        learnText = document.createElement('a');
        learnText.setAttribute('class', 'learn-text');
        learnText.setAttribute('href', '#');
        learnText.textContent = 'LEARN MORE';

        icon = document.createElement('i');
        icon.setAttribute('class', 'fa-solid fa-circle-info');

        columnThird.append(fishCard);
        fishCard.append(fishImage);
        fishCard.append(fishName);
        fishCard.append(learnMoreCard);
        learnMoreCard.append(learnText);
        learnText.append(icon);
        fishCards.append(columnThird);
        // renderFishCards(xhr.response[fishId]);
        // fishCards.append(renderFishCards(xhr.response[fishId]));

      } else {
        columnThird = document.createElement('div');
        columnThird.setAttribute('class', 'column-one-third');

        fishCard = document.createElement('div');
        fishCard.setAttribute('class', 'fish-card');

        fishImage = document.createElement('img');
        fishImage.setAttribute('src', 'images/fish icon.png');
        fishImage.setAttribute('alt', 'none');

        fishName = document.createElement('p');
        fishName.setAttribute('class', 'fish-name');
        fishName.textContent = xhr.response[fishId]['Species Name'];

        learnMoreCard = document.createElement('div');
        learnMoreCard.setAttribute('class', 'learn-more-card');

        learnText = document.createElement('a');
        learnText.setAttribute('class', 'learn-text');
        learnText.setAttribute('href', '#');
        learnText.textContent = 'LEARN MORE';

        icon = document.createElement('i');
        icon.setAttribute('class', 'fa-solid fa-circle-info');

        columnThird.append(fishCard);
        fishCard.append(fishImage);
        fishCard.append(fishName);
        fishCard.append(learnMoreCard);
        learnMoreCard.append(learnText);
        learnText.append(icon);
        fishCards.append(columnThird);
        // renderFishCards(xhr.response[fishId]);
        // fishCards.append(renderFishCards(xhr.response[fishId]));
      }
    }

  });

  xhr.send();
}

getFishData();

$menuToggle.addEventListener('click', function (event) {
  // console.log('working');
  $menuToggle.classList.toggle('active');
  $showcase.classList.toggle('active');
  menu.classList.toggle('open');

});

$headToggle.addEventListener('click', function (event) {
  // console.log('working111');
  $headToggle.classList.toggle('active');
  menuTwo.classList.toggle('open');
  menuToggleDiv.classList.toggle('hidden');

});

$exploreButton.addEventListener('click', function (event) {
  handleView('list');
  $header.classList.remove('hidden');
  $header.classList.add('view');
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

/* <div class="column-one-thirds">
  <div class="fish-card">
    <img src="images/Royal Blue Tang.jpg" alt="royal blue tang">
      <p class="fish-name">Royal Blue Tang</p>
      <div class="learn-more-card">
        <a class="learn-text" href="#"><i class="fa-solid fa-circle-info"></i>       LEARN MORE</a>
      </div>
  </div>
</div> */

// function renderFishCards(card) {
//   // var xhr = new XMLHttpRequest(name);
//   // xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
//   // xhr.responseType = 'json';
//   // xhr.reponse = card;
//   var fishId = 0;
//   var columnThird = document.createElement('div');
//   columnThird.setAttribute('class', 'column-one-third');

//   var fishCard = document.createElement('div');
//   fishCard.setAttribute('class', 'fish-card');

//   if (fishId === 6) {
//     var fishImage = document.createElement('img');
//     fishImage.setAttribute('src', card[fishId]['Image Gallery'].src);
//     fishImage.setAttribute('alt', card[fishId]['Image Gallery'].alt);
//   } else {
//     fishImage = document.createElement('img');
//     fishImage.setAttribute('src', card[fishId]['Image Gallery'][0].src);
//     fishImage.setAttribute('alt', card[fishId]['Image Gallery'][0].alt);
//   }

//   var fishName = document.createElement('p');
//   fishName.setAttribute('class', 'fish-name');
//   fishName.textContent = card[fishId]['Species Name'];

//   var learnMoreCard = document.createElement('div');
//   learnMoreCard.setAttribute('class', 'learn-more-card');

//   var learnText = document.createElement('a');
//   learnText.setAttribute('class', 'learn-text');
//   learnText.setAttribute('href', '#');
//   learnText.textContent = 'LEARN MORE';

//   var icon = document.createElement('i');
//   icon.setAttribute('class', 'fa-solid fa-circle-info');

//   columnThird.append(fishCard);
//   fishCard.append(fishImage);
//   fishCard.append(fishName);
//   fishCard.append(learnMoreCard);
//   learnMoreCard.append(learnText);
//   learnText.append(icon);

//   fishId++;
//   return columnThird;

// }
