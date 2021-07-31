# HTML detail 태그를 이용한 context menu

## html 코드 보기

[전체 코드 보기 🔗](/01.context-menu/html-js/index.html)

1. `details` 태그를 이용해서 내부에 p 태그에 컨텍스트 메뉴를 작성한다.
  
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

2. 클릭을 하면 `open`이라고 하는 어트리뷰트가 들어간다.
    
    ```css
    details p {
      position: absolute;
      background-color: #fff;
      border: 1px solid #000;
      top: calc(100% - 10px);
      right: 10px;
      width: 60%;
      padding: 10px;
      margin: 0;
      display: none;
      z-index: 1;
    }
    ```

    ![html-detail -02](https://user-images.githubusercontent.com/72931773/127733406-9bde766d-6793-4a5d-8701-adddeeadc737.gif)
    
    🔻 이 코드를 주석처리 하면, p태그에 작성된 글이 클릭할때마다 보인다.

    ```css
    details p {
      /* position: absolute;
      background-color: #fff;
      border: 1px solid #000;
      top: calc(100% - 10px);
      right: 10px;
      width: 60%;
      padding: 10px;
      margin: 0;
      display: none;
      z-index: 1; */
    }
    ```

    ![html-detail -01](https://user-images.githubusercontent.com/72931773/127733405-9ff26e45-f68b-4a83-9646-98bbbd0331d2.gif)


    html에서 클릭 이벤트에 대해서 더 이상 `open` `close`를 직접 작성할 필요가 없게 된다.


3. CSS에서 open, close 처리
    `details` 태그에 `open` 어트리뷰트가 있으면 하위요소 p 태그의 `display` 값을 `block` 처리

    ```css
    details[open] summary:after {
      content: 'close';
    }
    ```

    🔻 `details` 태그에 `open` 어트리뷰트가 있으면 하위요소 p 태그의 `display` 값을 `block` 처리

    ```css
    /* details 태그에 open 어트리뷰트가 있으면 하위요소 p 태그의 display 값을 block 처리 */
    details[open] p {
      display: block;
    }
    ```

이거랑 마찬가지로 `details`에 있는 `open`이라는 게 있어.
때 p. 태그는
dis플레이를 블락으로 바꿔주면 되겠죠.
그것만으로 일단 클릭에 대한 동작이 될 겁니다.
그렇죠 딴 데를 클릭해도 일단 들고 있을까 이거는 에스터 클래스일 뿐이니까 의미가 없고요.
이것만 마커를 지워놓고 보면. 원하는 스타일이 나오게 되겠죠 일단 이것에 대해서 그러니까 클릭 이벤트에서 아이템에 대해서는 저희가 관여할 필요가 없게 되고 관건은.
이제 이거 하나밖에 없을 겁니다 딴 데를 클릭했을 때 다른 아이템을 클릭했을 때 기존에 있던 거에서 `open` 어트릭트를 지워주기만 하면 되는 거죠.
그걸 한번 작성을 해볼게요
일단 아까는 `items`라고 잡았던 거를 얼루 `details`를 잡을게요 그 상태에서
바디의 이벤트를 갈게요 파티 이벤트를 거는데.
만약에. 엘레 2점 타겟의 노드 네임이 이번에는 클래스를 부여하지 않고서
그냥 태그만 가지고 했기 때문에 `summary`가 아닐 경우에는 아무 동작도 하지 말아라.
그러면 이 하위에서는 `summary`에 해당할 때에만 동작을 주는 거겠죠.
이 상태에서 `items`에 대해서 포위치를 걸어서 아이템이 2점 타겟의 패런트 엘리먼트 랑 같지.
않으면
이게 무슨 소리냐면요. 지금 `items`는 `details`를 가지고 잡았는데요.
저희가 클릭 이벤트가 발생하는 곳은 실제로는 `summary`에 대해서 발생을 하게 됩니다 그러니까 이 `summary`에 해당하는 그것이 현재 클릭한 대상의 `details`가 아니라 그 `details` 하위에 있는 `summary`에서 클릭 이벤트가 발생을 하게 되거든요.
그럼 이제 상위 엘리먼트가 현재 클릭한 대상의 `details`라는 태그가 되겠죠.
그 아이템은
아이템들은 이제 ``details`` 지에 대해서 잡혀 있기 때문에 `details`를 가지고 비교를 하는 거죠.
그러면 이제 클릭한 대상이 아닌 나머지 아이템들에 대해서 이 조건이 형성이 되는 거죠.
이때 아이템의 어트리뷰트를 지워주면 되겠습니다.
`open`을 진짜 해볼까요
네 되고 있죠. 자 여기서 지금 리턴을 시켰는데 이 리턴 시킨 부분에서 `summary`가 아닐 경우에는 다 지워줘라 라는 걸 넣으면 되겠네요.
`items`의 `forEach`로 이렇게 다 지워주면 다른 외부를 클릭했을 때의 동작이 되겠네요.
그죠 네. 근데 문제는 이번에는 p 태그를 클릭해도 지워지는 게 되고 있습니다.
그러니까 `summary`로만 비교할 게 아니라 노드 네임이 피일 경우에도 제어를 해줘야 될 것 같습니다.
피도 아니고 `summary`도 아닐 때는 지워줘라 라고 하면은 될 거 같네요.
네 이때는 동작을 하지 않고 때는 동작을 하고 딴 데 클릭할 땐 동작이 되고 네 `details`를 쓰우면 아까 말씀드린 대로 이 클릭한 대상에 대해서는 저희가 더 이상 고민할 필요가 없기 때문에 html에서 기본 제공하는 동작에 동작을 그대로 활용할 수 있기 때문에 좀 더 효율적인 작업이 되는 것도 있겠고 또 htmn에서 기본적으로 제공하는 동작이 자바스크립트에서 동작하는 동작을 이제 개발자가 직접 구현
때보다 아무래도 더 성능도 좋을 것이고 동작에 대한 신뢰도도 있을 수 있죠.
그리고 자바 스크립트가 제대로 동작하지 않는 상황에서도 원하는 바를 어쨌든 볼 수 있겠죠.
css를 껐다는 전제 하에서는 css를 끄고 보면 이런 게 다 보여지기 때문에 원하는 게 동작이 되는 거죠.
어쨌든 간에 보여질 수 있게 되는 거죠.
자바 스크립트가 완벽하게 동작할 때에만 제대로 볼 콘텐츠를 전부 볼 수 있는 것에 비해서 잘 동작하지 않더라도 어쨌든 문제가 최소화될 수 있는 점에서
하는 게 더 좋은 방법일 수 있다라고 생각이 들었습니다.
물론 이것도 목적에 맞게 쓰는 게 중요하겠지만요.
네 어쨌든 저는 한 구현을 하면서 소개를 드린 것에 그치고 다음으로 넘어가겠습니다