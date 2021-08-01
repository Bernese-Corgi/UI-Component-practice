# HTML detail 태그를 이용한 context menu

## html 코드 보기

[전체 코드 보기 🔗](/01.context-menu/html-js/index.html)

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


이거랑 마찬가지로 `details`에 있는 `open`이라는 게 있어.
때 p. 태그는
display를 block으로 바꿔주면 되겠죠.
그것만으로 일단 클릭에 대한 동작이 될 겁니다.
그렇죠 딴 데를 클릭해도 일단 들고 있을까 이거는 에스터 클래스일 뿐이니까 의미가 없고요.
이것만 마커를 지워놓고 보면. 원하는 스타일이 나오게 되겠죠 일단 이것에 대해서 그러니까 

클릭 이벤트에서 아이템에 대해서는 관여할 필요가 없게 되고(html과 css에서 ), 딴 데를 클릭했을 때 다른 아이템을 클릭했을 때 기존에 있던 거에서 `open` 어트리뷰트를 지워주기만 하면 되는 거죠.
그걸 한번 작성을 해볼게요

일단 아까는 `items`라고 잡았던 거를 얼루 `details`를 잡을게요 그 상태에서
바디의 이벤트를 갈게요 파티 이벤트를 거는데.
만약에. 엘레 e.target의 노드 네임이 이번에는 클래스를 부여하지 않고서
그냥 태그만 가지고 했기 때문에 `summary`가 아닐 경우에는 아무 동작도 하지 말아라.
그러면 이 하위에서는 `summary`에 해당할 때에만 동작을 주는 거겠죠.
이 상태에서 `items`에 대해서 forEach를 걸어서 아이템이 e.target의 패런트 엘리먼트 랑 같지.


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
