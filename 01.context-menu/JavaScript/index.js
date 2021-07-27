import './style.css';

// 초보의 idea: 클릭했을 때 item에 open 클래스 부여 => item 하나하나에 클릭 이벤트 부여
// 1. 클릭했을때 해당 아이템에 open 클래스 부여
const items = document.querySelectorAll('.item');
// item들을 순회하면서 이벤트를 부여
items.forEach(function (item) {
  // 클릭했을 떄 현재 item의 classList에 토글로 open 클래스 부여
  item.addEventListener('click', function (e) {
    item.classList.toggle('open');
    // 2. 이미 open 클래스가 있는 경우 open 클래스를 지워준다.
    // 현재 클릭한 대상이 아닌 나머지 다른 item들에 대해서 open 클래스를 지워준다.
    items.forEach(function (elem) {
      // 이벤트 리스너 안에서 item이 아닌 경우, 즉 현재 클릭한 대상이 아닌 다른 나머지 item들의 open 클래스를 지워준다.
      if (elem !== item) elem.classList.remove('open');
    });
  });
});

/* 동작은 되지만, 문제점이 있다.
1. 이벤트 감시 대상이 너무 많다
  - 여러 개의 목록 아이템 하나하나마다 이벤트 리스너가 모두 등록이 되어 있다.
  - 클릭 이벤트만 여러 개가 등록이 되어 있는 것
  - 브라우저가 이 이벤트(= DOM의 변화) 모두를 감시하고 있는 상태이다. 
  - 이벤트 감시 대상이 많다 => 성능 저하로 이어질 수밖에 없다.

2. 목록이 끊임없이 변화하는 경우, 예를 들어 아이템이 추가가 되는 경우 추가된 아이템에 대해서는 이벤트가 등록되지 않는다.
  - 이벤트가 등록이 되어있지 않기 때문에 새로운 아이템이 추가될 때마다 똑같은 이벤트 리스너 등록을 해당 아이템에 대해서 계속 해주어야 한다. */
