import './style.css';

// const wrapper = document.querySelector('.wrapper');
const items = document.querySelectorAll('.item');

// // wrapper가 포함하는 하위 엘리먼트들을 클릭하면 wrapper에 등록된 이벤트 리스너가 실행이 될 것이다.
// wrapper.addEventListener('click', function (e) {
//   // e.target : 현재 클릭한 대상
//   const targetElem = e.target;

//   // 이벤트 확산 방지 (버블링 방지)
//   e.stopPropagation();

//   // 현재 클릭한 대상의 classList에 item 클래스가 없으면 아무 동작도 하지 않는다.
//   // = 현재 클릭한 대상이 item이 아니면 아무 동작도 하지 않는다.
//   if (!targetElem.classList.contains('item')) return;
//   // if문 아래에서는 item 클래스를 가진 targetElem에 대해서만 동작된다.
//   // targetElem의 classList에 토글로 open 클래스를 준다.
//   targetElem.classList.toggle('open');
//   // item들에 대해 순회
//   items.forEach(function (elem) {
//     // 엘리먼트가 targetElem과 같지 않으면 open 클래스를 지운다.
//     if (elem !== targetElem) elem.classList.remove('open');
//   });
// });

// body 하나에만 이벤트 리스너 등록
document.body.addEventListener('click', function (e) {
  // e.target의 classList를 변수로 잡는다 - 변수를 잡아놓으면 조건을 따지기 쉬워진다.
  const targetClassList = e.target.classList;

  // 1. e.target의 classList가 context를 가지고 있다면 아무 동작도 하지 않는다.
  if (targetClassList.contains('context')) return;

  // 2. e.target의 classList가 item을 가지고 있다면 wrapper에 등록했던 이벤트 동작을 한다.
  if (targetClassList.contains('item')) {
    // e.target의 classList에 토글로 open 클래스를 준다.
    targetClassList.toggle('open');

    items.forEach(function (elem) {
      // items를 순회하면서 item이 e.target에 해당하지 않는 item에서는 open 클래스를 지운다.
      if (elem !== e.target) elem.classList.remove('open');
    });
    // 이 상태에서는 더이상 동작을 하면 안되므로 return 시킨다.
    return;
  }

  // context가 열려있는 상태 외의 item
  items.forEach(function (elem) {
    // 목록 이외에 모든 부분을 어떤 부분을 선택하면 item에 있는 open 클래스를 전부 지워준다.
    elem.classList.remove('open');
  });
});

/*
body 에 모든 이벤트를 등록해서 이벤트 리스너를 하나만 등록했을 때의 문제점

- 조건문들이 많아진다. 
  : 클릭 이벤트 하나에 대해서 조건을 계속 따져야 한다. 
  ⇒ 조건문을 최적화하는 방법을 고민할 필요가 있다. 
    
- 메모리 관리가 어렵다. 
  - body 전체에 addEventListner를 걸었기 때문에 페이지의 동작이 전부 종료되기 전까지는 body 하나의 이벤트 리스너에 전적으로 의존할 수밖에 없다. 
  - 이벤트 리스너를 body 하나만 사용하게 되면, 내용이 하나에 전부 들어가 있기 때문에 개별적인 리스너들에 대한 `addEventListner`, removeEventListner에 대한 관리가 될 수가 없는 문제가 있다. 
*/
