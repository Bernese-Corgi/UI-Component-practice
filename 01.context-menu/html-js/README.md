# HTML detail 태그를 이용한 context menu

- [HTML detail 태그를 이용한 context menu](#html-detail-태그를-이용한-context-menu)
  - [HTML, CSS 코드 보기](#html-css-코드-보기)
  - [JavaScript 코드 작성](#javascript-코드-작성)
  - [details 태그를 활용한 context menu의 장점](#details-태그를-활용한-context-menu의-장점)


## HTML, CSS 코드 보기

[HTML 전체 코드 보기 🔗](/01.context-menu/html-js/index.html)
[CSS 전체 코드 보기 🔗](/01.context-menu/html-js/style.css)

1. **`details` 태그를 이용해서 내부에 p 태그에 컨텍스트 메뉴를 작성한다.**
  
    ```html
      <div class="wrapper">
        <details>
          <summary>consectetur adipisicing elit.</summary>
          <p>Lorem ipsum dolor sit amet,</p>
        </details>
        <details>
          <summary>consequatur velit id doloribus quae dolorum facere nemo, inventore hic adipisci odit.</summary>
          <p>Dolorum distinctio eius quaerat natus quas et fugit iure dolorem! Quas repellat ea et debitis nostrum eos
            placeat
            accusantium voluptatibus vero culpa non, nesciunt assumenda earum a </p>
        </details>
        <details>
        <!-- ... -->
    ```

2. **`details` 태그는 클릭하면 `open`이라고 하는 어트리뷰트가 들어간다.**
    
    <div style="background: ghostwhite; padding: 10px; border-radius: 5px">
    
    **`open` 어트리뷰트**
    
    상세 정보, 즉 `<details>` 요소의 콘텐츠가 현재 보이는 상태인지 나타냅니다. 
    기본값 `false`는 정보가 보이지 않는다는 뜻입니다.

    </div>

    🔻현재 p 태그는 `display: none;` 상태

    ```css
    details p {
      /* ... */
      display: none;
    }
    ```

    ![html-detail -02](https://user-images.githubusercontent.com/72931773/127733406-9bde766d-6793-4a5d-8701-adddeeadc737.gif)
    
    🔻 이 코드를 주석처리 하면, p태그에 작성된 글이 클릭할때마다 보인다.

    ```css
    details p {
      /* display: none; */
    }
    ```

    ![html-detail -01](https://user-images.githubusercontent.com/72931773/127733405-9ff26e45-f68b-4a83-9646-98bbbd0331d2.gif)


3. **CSS에서 `open`, `close` 처리**

    `details` 태그에 `open` 어트리뷰트가 있으면 하위요소 p 태그의 `display` 값을 `block` 처리

    ```css
    details[open] p {
      display: block;
    }
    ```
    
    ![html-detail -03](https://user-images.githubusercontent.com/72931773/127763639-fa115ce9-f643-467a-945d-36b771eb6f93.gif)

    html과 css만으로도 클릭했을때 context가 보이는 동작이 가능하므로, 자바스크립트에서 클릭 이벤트에 대해서 작성할 필요가 없다.



## JavaScript 코드 작성

[JavaScript 전체 코드 🔗](/01.context-menu/html-js/index.js)

details 태그를 변수 items에 담는다.

```js
const items = document.querySelectorAll('details');
```

`body`에 클릭 이벤트

```js
document.body.addEventListener('click', function (e) {}
```

e.target의 nodeName이 `summary`가 아닌 경우 아무 동작도 하지 않는다.

```js
document.body.addEventListener('click', function (e) {
  // e.target의 nodeName이 summary가 아닌 경우 아무 동작도 하지 않는다.
  if (e.target.nodeName !== 'SUMMARY') return;

  // if문 아래의 코드는 summary에 해당할 때만 동작한다.
}
```


`items`에 대해서 순회하면서 item이 e.target의 parentElement와 같지 않으면 `open` 어트리뷰트를 제거한다

순회하는 대상은 `details`지만, 클릭 이벤트는 `details`의 하위에 있는 `summary`에 대해서 발생한다. (i문에서 e.target이 `summary`인 경우를 걸러주었기 때문.)


```js
document.body.addEventListener('click', function (e) {  
  // e.target이 summary가 아니면 아무 동작 안한다.
  if (e.target.nodeName !== 'SUMMARY') return;

  // e.target이 summary인 경우, items(details)를 순회
  items.forEach(function (item) {
    // e.target의 parentElement와 같지 않으면 (=클릭한 대상이 아닌 나머지 아이템인 경우)
    if (item !== e.target.parentElement) {
      // open 어트리뷰트 제거
      item.removeAttribute('open');
    }
  });
});
```

현재 문제는 p 태그를 클릭해도 지워지고 있다.

![html-detail -04](https://user-images.githubusercontent.com/72931773/127822863-a9391792-5923-46a5-b81e-b87909faa8c0.gif)

그러므로 `nodeName`이 `'P'`일 때도 걸러줘야 한다.

```js
document.body.addEventListener('click', function (e) {
  // nodeName이 'P'와 'SUMMARY' 둘 다 아닐 때
  if (e.target.nodeName !== 'P' && e.target.nodeName !== 'SUMMARY') {
    // items 돌면서 
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
```

## details 태그를 활용한 context menu의 장점

html에서 기본 제공하는 동작에 동작을 그대로 활용할 수 있기 때문에 좀 더 효율적인 작업이 된다.

htmn에서 기본적으로 제공하는 동작이 자바스크립트에서 동작하는 동작을 개발자가 직접 구현할 때보다 더 성능도 좋을 것이고, 동작에 대한 신뢰도도 있다.

자바스크립트가 제대로 동작하지 않는 상황에서도 원하는 바를 볼 수 있고,  CSS가 동작하지 않아도 details 태그의 기본 동작으로 context menu를 볼 수 있다.

⇒ 자바스크립트나 css가 동작하지 않아도 일단 동작하기 때문에, 문제가 최소화될 수 있는 점에서 장점이다.
