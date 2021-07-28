import './style.css';

// 1. item들을 감싸고 있는 wrapper를 변수에 담는다.
const wrapper = document.querySelector('.wrapper');
const items = document.querySelectorAll('.item');

// 2. 기존에 item에 등록했던 이벤트 리스너를, wrapper에 등록한다.
// wrapper가 포함하는 하위 엘리먼트들을 클릭하면 wrapper에 등록된 이벤트 리스너가 실행이 될 것이다.
wrapper.addEventListener('click', function (e) {
  // e.target : 현재 클릭한 대상
  const targetElem = e.target;

  // 현재 클릭한 대상의 classList에 item 클래스가 없으면 아무 동작도 하지 않는다.
  // = 현재 클릭한 대상이 item이 아니면 아무 동작도 하지 않는다.
  if (!targetElem.classList.contains('item')) return;
  // if문 아래에서는 item 클래스를 가진 targetElem에 대해서만 동작된다.
  // targetElem의 classList에 토글로 open 클래스를 준다.
  targetElem.classList.toggle('open');

  // item들에 대해 순회
  items.forEach(function (elem) {
    // 엘리먼트가 targetElem과 같지 않으면 open 클래스를 지운다.
    if (elem !== targetElem) elem.classList.remove('open');
  });
});
