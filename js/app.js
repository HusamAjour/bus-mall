function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
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
function findClickedImage(imgName){
  for(i=0; i< Product.all.length; i++){
    if(Product.all[i].name === imgName){
      Product.all[i].increaseClicks();
      break;
    }
  }
}
function checkInArray(val1, array1){
  for(var i=0; i < array1.length; i++)
  {
    if(val1 === array1[i]){
      return true;
    }
  }
  return false;
}
function generateThreeUniqueIntegers(prevValue1, prevValue2, prevValue3){
  var prevArray = [prevValue1, prevValue2, prevValue3];
  var random1 = 0;
  var random2 = 0;
  var random3 = 0;
  do {
    random1 = getRndInteger(0, images.length);
    random2 = getRndInteger(0, images.length);
    random3 = getRndInteger(0, images.length);
  }while(random1 === random2 || random2 === random3 || random1 === random3 || checkInArray(random1,prevArray) === true || checkInArray(random2,prevArray) === true || checkInArray(random3,prevArray) === true);
  console.log(randomArray);
  var randomArray = [random1, random2, random3];
  return randomArray;
}
var allNames =[];
function getAllProductsNames(){
  for(var i = 0; i < Product.all.length; i++){
    allNames.push(Product.all[i].name);
  }
}
var allViews =[];
function getAllProductsViews(){
  for(var i = 0; i < Product.all.length; i++){
    allViews.push(Product.all[i].views);
  }
}
var allClicks =[];
function getAllProductsClicks(){
  for(var i = 0; i < Product.all.length; i++){
    allClicks.push(Product.all[i].clicks);
  }
}
var images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

Product.all = [];
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

for (var i = 0; i < images.length; i++) {
  var imgName = images[i].split('.');
  var prod = new Product(imgName[0], (`images/${images[i]}`));

}
console.log(Product.all);

var clicksTotal = 0;
var sessionLength = 0;
var prevValues = [-1,-1,-1];
var imagesSection = document.getElementById('imagesContainer');
var mainContainer= document.getElementById('mainContainer');
var start = document.getElementById('startButton');

start.addEventListener('submit', function(event){
  event.preventDefault();
  imagesSection.classList.remove('hidden');
  mainContainer.classList.add('displayCenter');
  sessionLength = parseInt(event.target.sessionDuration.value);
  var randomIntegers = generateThreeUniqueIntegers(prevValues[0],prevValues[1],prevValues[2]);
  prevValues = randomIntegers;
  setLeftImgSrc(randomIntegers[0]);
  setMiddleImgSrc(randomIntegers[1]);
  setRightImgSrc(randomIntegers[2]);
  start.parentElement.classList.add('hidden');
});

imagesSection.addEventListener('click', pickRandomImages);

function pickRandomImages(event) {
  var clickId = event.target.id;
  if(clickId === 'middleImage' || clickId === 'leftImage' || clickId === 'rightImage'){
    clicksTotal++;
    if(clicksTotal < sessionLength){
      console.log(clicksTotal);
      findClickedImage(event.target.alt);
      var randomIntegers = generateThreeUniqueIntegers(prevValues[0],prevValues[1],prevValues[2]);
      prevValues = randomIntegers;
      setLeftImgSrc(randomIntegers[0]);
      setMiddleImgSrc(randomIntegers[1]);
      setRightImgSrc(randomIntegers[2]);
    }
    if(clicksTotal === sessionLength){
      imagesSection.classList.add('hidden');
      imagesSection.removeEventListener('click', pickRandomImages);
      showResult();
      getAllProductsNames();
      getAllProductsViews();
      getAllProductsClicks();
      displayChart();
      clicksTotal = 'done';
    }
  }
}

function showResult(){
  var resultsSection = document.getElementById('sidebar');
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


function displayChart(){
  var canvasDiv = document.getElementById('myChart').parentElement;
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
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
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
