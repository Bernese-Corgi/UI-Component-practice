// elements select
// const $wrapper = document.querySelector('.wrapper');

const $item = document.querySelectorAll('.item');

// const $context = document.querySelectorAll('.context');

// toggle close/open event
const clickOpenButton = (openButton, childContext) => {
  openButton.addEventListener('click', () => {
    // [...$item].forEach(elem => {
    //   const isOpen = elem.childNodes[3]
    //     ? elem.childNodes[3].classList.contains('open')
    //     : null;
    //   isOpen ? elem.childNodes[3].classList.remove('open') : null;
    // });

    if (openButton.classList.contains('open')) {
      console.log(openButton);
    }

    openButton.classList.toggle('open');

    openButton.classList.contains('open')
      ? (openButton.textContent = 'close')
      : (openButton.textContent = 'open');

    openButton.classList.contains('open')
      ? (childContext.style.display = 'block')
      : (childContext.style.display = 'none');
  });
};

[...$item].forEach(elem => {
  const $openButton = document.createElement('button');
  $openButton.textContent = 'open';

  elem.addEventListener('mouseenter', () => {
    elem.appendChild($openButton);
    const $childContext = elem.childNodes[1];
    clickOpenButton($openButton, $childContext);
  });

  elem.addEventListener('mouseleave', () => {
    elem.removeChild($openButton);
  });
});
