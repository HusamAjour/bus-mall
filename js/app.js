/* array that includes all the images paths */
var images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

/* Product constroctor and its prototype methods */
Product.all;
function Product(imgName, imgSrc) {
  this.name = imgName;
  this.imgURL = imgSrc;
  this.views = 0;
  this.clicks = 0;
  Product.all.push(this);
}
Product.prototype.increaseViews = function () {
  this.views++;
};
Product.prototype.increaseClicks = function () {
  this.clicks++;
};
/* Create objects for all images loop */
function createProductObjects(){
  Product.all = [];
  for (var i = 0; i < images.length; i++) {
    var imgName = images[i].split('.');
    var prod = new Product(imgName[0], (`images/${images[i]}`));
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/*  Generate 3 different integers */
var prevValues = [-1,-1,-1];
function generateThreeUniqueIntegers(prevValue1, prevValue2, prevValue3){
  var prevArray = [prevValue1, prevValue2, prevValue3];
  var random1 = 0;
  var random2 = 0;
  var random3 = 0;
  do {
    random1 = getRndInteger(0, images.length);
    random2 = getRndInteger(0, images.length);
    random3 = getRndInteger(0, images.length);
  }while(random1 === random2 || random2 === random3 || random1 === random3 || prevArray.includes(random1) === true || prevArray.includes(random2) === true || prevArray.includes(random3) === true);
  var randomArray = [random1, random2, random3];
  return randomArray;
}

/*  set Left, Middle, and Right images functions */
function setLeftImgSrc(imgIndex){
  var imgLeft = document.getElementById('leftImage');
  imgLeft.setAttribute('src', Product.all[imgIndex].imgURL);
  imgLeft.setAttribute('alt', Product.all[imgIndex].name);
  Product.all[imgIndex].increaseViews();
}
function setMiddleImgSrc(imgIndex){
  var imgMiddle = document.getElementById('middleImage');
  imgMiddle.setAttribute('src', Product.all[imgIndex].imgURL);
  imgMiddle.setAttribute('alt', Product.all[imgIndex].name);
  Product.all[imgIndex].increaseViews();
}
function setRightImgSrc(imgIndex){
  var imgRight = document.getElementById('rightImage');
  imgRight.setAttribute('src', Product.all[imgIndex].imgURL);
  imgRight.setAttribute('alt', Product.all[imgIndex].name);
  Product.all[imgIndex].increaseViews();
}

/* Finds the image that was clicked belongs to which object and increase the number of clicks of that object */
function findClickedImage(imgName){
  for( var i=0; i< Product.all.length; i++){
    if(Product.all[i].name === imgName){
      Product.all[i].increaseClicks();
      break;
    }
  }
}

/* Store all the names of images in an array function */
var allNames =[];
function getAllProductsNames(){
  for(var i = 0; i < Product.all.length; i++){
    allNames.push(Product.all[i].name);
  }
}

/* Store the total views in an array function */
var allViews =[];
function getAllProductsViews(){
  for(var i = 0; i < Product.all.length; i++){
    allViews.push(Product.all[i].views);
  }
}

/* Store the total clicks in an array function */
var allClicks =[];
function getAllProductsClicks(){
  for(var i = 0; i < Product.all.length; i++){
    allClicks.push(Product.all[i].clicks);
  }
}
/* get the length of the session function */
createProductObjects();
function newSession(){
  resultsSection.innerHTML= '';
  canvasDiv.classList.add('hidden');
  allNames=[];
  allViews=[];
  allClicks=[];
  restartButton.classList.add('hidden');
  start.parentElement.classList.remove('hidden');
  clicksTotal = 0;
  sessionLength = 0;
  setTotalClicksLS();
  setSessionLenght();
  start.addEventListener('submit', function(event){
    event.preventDefault();
    imagesSection.classList.remove('hidden');
    mainContainer.classList.add('displayCenter');
    sessionLength = parseInt(event.target.sessionDuration.value);
    setSessionLenght();
    randomIntegers = generateThreeUniqueIntegers(prevValues[0],prevValues[1],prevValues[2]);
    prevValues = randomIntegers;
    setLeftImgSrc(randomIntegers[0]);
    setMiddleImgSrc(randomIntegers[1]);
    setRightImgSrc(randomIntegers[2]);
    start.parentElement.classList.add('hidden');
  });
}
function continueSession(){
  /*restoreSavedProducts();*/
  clicksTotal = JSON.parse(localStorage.getItem('totalClicks'));
  imagesSection.classList.remove('hidden');
  start.parentElement.classList.add('hidden');
  randomIntegers = generateThreeUniqueIntegers(prevValues[0],prevValues[1],prevValues[2]);
  prevValues = randomIntegers;
  setLeftImgSrc(randomIntegers[0]);
  setMiddleImgSrc(randomIntegers[1]);
  setRightImgSrc(randomIntegers[2]);
}
/* Rendering the images function */
function renderFunction(event) {
  var clickId = event.target.id;
  if(clickId === 'middleImage' || clickId === 'leftImage' || clickId === 'rightImage'){
    clicksTotal++;
    setTotalClicksLS();
    findClickedImage(event.target.alt);
    if(clicksTotal < sessionLength){
      var randomIntegers = generateThreeUniqueIntegers(prevValues[0],prevValues[1],prevValues[2]);
      prevValues = randomIntegers;
      setLeftImgSrc(randomIntegers[0]);
      setMiddleImgSrc(randomIntegers[1]);
      setRightImgSrc(randomIntegers[2]);
    }
    if(clicksTotal === sessionLength){
      imagesSection.classList.add('hidden');
      showResult();
      getAllProductsNames();
      getAllProductsViews();
      getAllProductsClicks();
      displayChart();
      clicksTotal = 'done';
      restartButton.classList.remove('hidden');
    }
  }
}

/* Showing result function */
function showResult(){
  var resultsList = document.createElement('ul');
  var resultTitle = document.createElement('h2');
  resultTitle.textContent = 'Results:';
  resultsSection.appendChild(resultTitle);
  for(var i=0; i<Product.all.length; i++){
    var resultItem = document.createElement('li');
    var resultItemName = document.createElement('span');
    var resultItemValue = document.createElement('span');
    resultItemValue.textContent = `${Product.all[i].views} view(s) and ${Product.all[i].clicks} click(s)`;
    resultItemName.textContent = `${Product.all[i].name}: `;
    resultItem.appendChild(resultItemName);
    resultItem.appendChild(resultItemValue);
    resultsList.appendChild(resultItem);
  }
  resultsSection.appendChild(resultsList);
}

/* Create and display bar chart function */
function displayChart(){
  canvasDiv.innerHTML =
  canvasDiv.classList.remove('hidden');
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: allNames,
      datasets: [{
        label: '# of Clicks',
        data: allClicks,
        backgroundColor: 'rgb(59,74,77)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },{
        label: '# of Views',
        data: allViews,
        backgroundColor: 'rgb(255,68,49)',
        borderColor: [
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

/* Local storage function */

var allClickArray;
function storeAllClicks() {
  allClickArray=[];
  for(var i=0; i<Product.all.length; i++){
    allClickArray.push(Product.all[i].clicks);
  }
}
function setTotalClicksLS(){
  localStorage.setItem( 'totalClicks', JSON.stringify(clicksTotal));
}

function setSessionLenght(){
  localStorage.setItem( 'sessionLength', JSON.stringify(sessionLength));
}

/* function calls */
var start = document.getElementById('startButton');
var restartButton = document.getElementById('restartButton');
var resultsSection = document.getElementById('sidebar');
var canvasDiv = document.getElementById('myChart').parentElement;
var clicksTotal;
var sessionLength;
var imagesSection = document.getElementById('imagesContainer');
var mainContainer= document.getElementById('mainContainer');
var randomIntegers;
if (localStorage.getItem('sessionLength') === null || localStorage.getItem('sessionLength') === localStorage.getItem( 'totalClicks')) {
  newSession();
  imagesSection.addEventListener('click', renderFunction);
}
else{
  sessionLength = JSON.parse(localStorage.getItem( 'sessionLength'));
  continueSession();
  imagesSection.addEventListener('click', renderFunction);
}

/*imagesSection.addEventListener('click', renderFunction);*/
restartButton.addEventListener('click', newSession);
