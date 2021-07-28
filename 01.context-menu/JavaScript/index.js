import './style.css';

// 1. item들을 감싸고 있는 wrapper를 변수에 담는다.
const wrapper = document.querySelector('.wrapper');
const items = document.querySelectorAll('.item');

// 2. 기존에 item에 등록했던 이벤트 리스너를, wrapper에 등록한다.
// wrapper가 포함하는 하위 엘리먼트들을 클릭하면 wrapper에 등록된 이벤트 리스너가 실행이 될 것이다.
wrapper.addEventListener('click', function (e) {
  // e.target : 현재 클릭한 대상
  const targetElem = e.target;

  // 이벤트 확산 방지 (버블링 방지)
  e.stopPropagation();

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

// 3. 목록 외부를 클릭하면 사라지는 동작
// document에 있는 body에 직접 리스너를 등록한다.
document.body.addEventListener('click', function (e) {
  // e.target의 classList가 context를 가지고 있다면 아무일도 하지 않는다. (context가 열려있는 상태면 동작하지 않는다.)
  if (e.target.classList.contains('context')) return;

  // context가 열려있는 상태 외의 item
  items.forEach(function (elem) {
    // 목록 이외에 모든 부분을 어떤 부분을 선택하면 item에 있는 open 클래스를 전부 지워준다.
    elem.classList.remove('open');
  });
});
// 이 코드를 추가하면 context가 열리지 않는 것처럼 보인다.
// open이 안 되는 게 아니라 open됐다가 close가 바로 처리가 되는 것이다.
// item -> wrapper -> body 순으로 이벤트가 전파(버블링)되고, 이벤트는 wrapper, body 에서 각각 발생해서 총 2번 이벤트가 발생하게 된다.
// wrapper의 버블링을 더 이상 일어나지 않게 막아야한다.
