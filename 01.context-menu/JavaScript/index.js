// elements style
const $wrapper = document.querySelector('.wrapper');
$wrapper.style.border = '1px solid gray';
$wrapper.style.padding = '5px';

const $item = document.querySelectorAll('.item');
[...$item].forEach(elem => {
  elem.style.borderBottom = '1px solid lightgray';
  elem.style.padding = '5px';
});

const $context = document.querySelectorAll('.context');
[...$context].forEach(elem => {
  elem.style.position = 'absolute';
  elem.style.background = 'white';
  elem.style.width = '50%';
  elem.style.right = '5%';
  elem.style.padding = '5px';
  elem.style.border = '1px solid lightgray';
});
