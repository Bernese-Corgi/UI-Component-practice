// Import stylesheets
import './style.css';

// details 태그를 변수 items에 담는다.
const items = document.querySelectorAll('details');

// body에 클릭 이벤트
document.body.addEventListener('click', function (e) {
  if (e.target.nodeName !== 'P' && e.target.nodeName !== 'SUMMARY') {
    items.forEach(function (item) {
      item.removeAttribute('open');
    });
  }

  items.forEach(function (item) {
    if (item !== e.target.parentElement) {
      item.removeAttribute('open');
    }
  });
});
