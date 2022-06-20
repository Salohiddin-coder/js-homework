var elForm = document.querySelector('.js-form');
var elInput = document.querySelector('.js-input');
var elButton = document.querySelector('.js-button');
var elSpeaker = document.querySelector('.js-speaker');
var elList = document.querySelector('.js-list');
var record = new webkitSpeechRecognition();
var text = [];
var count = 0;

function main(speech, elResult) {
  var elResult = elInput.value;
  count += 1;
  if(elResult == '') {
    text.push({
      id: count,
      content: speech
    })
  } else {
    text.push({
      id: count,
      content: elResult
    })
  } 
}

elForm.addEventListener('submit', function(evt){
  evt.preventDefault();

  var elResult = elInput.value;
  main(elResult);
  elList.innerHTML = "";
  elInput.value = '';

  for (item of text) {
    var newItem = document.createElement('li');
    newItem.textContent = `${item.id}. ${item.content}`
    elList.appendChild(newItem);
  }
})

elSpeaker.addEventListener('click', function(add){
  record.start();
})

record.onresult = function (func){
  var newItem = document.createElement('li');
  var speech = func.results[0][0].transcript;
  main(speech);
  newItem.textContent = `${count}. ${speech}`;
  console.log(speech);
  elList.appendChild(newItem);
}