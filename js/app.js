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
function generateThreeUniqueIntegers(){
  var random1 = 0;
  var random2 = 0;
  var random3 = 0;
  while (true) {
    random1 = getRndInteger(0, images.length);
    random2 = getRndInteger(0, images.length);
    random3 = getRndInteger(0, images.length);
    if (random1 !== random2 && random2 !== random3 && random1 !== random3) {
      break;
    }
  }
  var randomArray = [random1, random2, random3];
  return randomArray;
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
var imagesSection = document.getElementById('imagesContainer');
var mainContainer= document.getElementById('mainContainer');
var start = document.getElementById('startButton');

start.addEventListener('submit', function(event){
  event.preventDefault();
  imagesSection.classList.remove('hidden');
  mainContainer.classList.add('displayCenter');
  sessionLength = parseInt(event.target.sessionDuration.value);
  var randomIntegers = generateThreeUniqueIntegers();
  setLeftImgSrc(randomIntegers[0]);
  setMiddleImgSrc(randomIntegers[1]);
  setRightImgSrc(randomIntegers[2]);
  start.parentElement.classList.add('hidden');
});

imagesSection.addEventListener('click', pickRandomImages);

function pickRandomImages(event) {
  var clickId = event.target.id;
  if(clickId === 'middleImage' || clickId === 'leftImage' || clickId === 'rightImage'){
    if(clicksTotal < sessionLength){
      findClickedImage(event.target.alt);
      clicksTotal++;
      var randomIntegers = generateThreeUniqueIntegers();
      setLeftImgSrc(randomIntegers[0]);
      setMiddleImgSrc(randomIntegers[1]);
      setRightImgSrc(randomIntegers[2]);
    }
    if(clicksTotal === sessionLength){
      showResult();
      clicksTotal = 'done';
    }
  }
}

function showResult(){
  var resultsSection = document.getElementById('sidebar');
  var resultsList = document.createElement('ul');
  var resultTitle = document.createElement('h2');
  resultTitle.textContent = 'Results:';
  resultsSection.appendChild(resultTitle)
  for(var i=0; i<Product.all.length; i++){
    var resultItem = document.createElement('li');
    var resultItemName = document.createElement('span');
    var resultItemValue = document.createElement('span');
    resultItemValue.textContent = `${Product.all[i].clicks} clicks`;
    resultItemName.textContent = `${Product.all[i].name}: `;
    resultItem.appendChild(resultItemName);
    resultItem.appendChild(resultItemValue);
    resultsList.appendChild(resultItem);
  }
  resultsSection.appendChild(resultsList);
}
