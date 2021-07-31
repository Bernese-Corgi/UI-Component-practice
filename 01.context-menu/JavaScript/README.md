# Context Menu - JavaScript

- [Context Menu - JavaScript](#context-menu---javascript)
  - [CSS 코드 살펴보기](#css-코드-살펴보기)
  - [자바스크립트 작성](#자바스크립트-작성)
    - [초보자가 쉽게 짤 수 있는 코드와, 그에 대한 문제점](#초보자가-쉽게-짤-수-있는-코드와-그에-대한-문제점)
    - [이벤트 리스너 등록을 최소화하는 방법](#이벤트-리스너-등록을-최소화하는-방법)
    - [목록 외부를 클릭하면 사라지는 동작](#목록-외부를-클릭하면-사라지는-동작)
    - [이벤트 리스너 등록 최소화 2](#이벤트-리스너-등록-최소화-2)
    - [이벤트를 2개로 분리했을때와, 1개로 통합했을 때의 차이 비교](#이벤트를-2개로-분리했을때와-1개로-통합했을-때의-차이-비교)

## CSS 코드 살펴보기

[HTML 전체 코드 보기 🔗](/01.context-menu/JavaScript/index.html)
[CSS 전체 코드 보기 🔗](/01.context-menu/html-js/style.css)

실제로는 버튼이 있는 것이 아닌데, open, close 컨텐트만 보이게끔 함

- 마우스가 오버됐을 때 open 컨텐트 들어감

    ```css
    .item:hover:after {
      content: 'open';
      cursor: pointer;
      background-color: teal;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
      color: white;
    }
    ```

- open 클래스가 있을 때 close라는 컨텐트가 들어간다.

    ```css
    .item.open:after {
      content: 'close';
    }
    ```

context 클래스에는 현재 display none으로 설정되어 있는데, 
어떤 특정 조건(open 클래스)이 갖춰진 경우 block으로 변경한다.

```css
.context {
  display: none;
  position: absolute;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
  top: calc(100% - 10px);
  right: 10px;
  width: 60%;
  padding: 10px;
  z-index: 1;
}
```

item에 open 클래스가 있으면 context의 diplay가 block으로 변경

```css
/* item에 open 클래스가 있으면 context의 diplay가 block으로 변경 */
.item.open .context {
  display: block;
}
```

## 자바스크립트 작성

### 초보자가 쉽게 짤 수 있는 코드와, 그에 대한 문제점

초보의 idea: 클릭했을 때 item에 open 클래스 부여 ⇒ item 하나하나에 클릭 이벤트 부여

1. 클릭했을때 해당 아이템에 open 클래스 부여

    ```jsx
    const items = document.querySelectorAll('.item');
    // item들을 순회하면서 이벤트를 부여
    items.forEach(function (item) {
      // 클릭했을 때 현재 item의 classList에 토글로 open 클래스 부여
      item.addEventListener('click', function (e) {
        item.classList.toggle('open');
      });
    });
    ```

2. 이미 open 클래스가 있는 경우 open 클래스를 지워준다.

    현재 클릭한 대상이 아닌 나머지 다른 item들에 대해서 open 클래스를 지워준다.

    ```jsx
    const items = document.querySelectorAll('.item');
    items.forEach(function (item) {
      item.addEventListener('click', function (e) {
        item.classList.toggle('open');
        items.forEach(function (elem) {
          // 이벤트 리스너 안에서 item이 아닌 경우, 즉 현재 클릭한 대상이 아닌 다른 나머지 item들의 open 클래스를 지워준다.
          if (elem !== item) elem.classList.remove('open');
        });
      });
    });
    ```

**동작은 되지만, 문제점이 있다.**

1. 이벤트 감시 대상이 너무 많다
    - 여러 개의 목록 아이템 하나하나마다 이벤트 리스너가 모두 등록이 되어 있다.
    - 클릭 이벤트만 여러 개가 등록이 되어 있는 것
    - 브라우저가 이 이벤트(= DOM의 변화) 모두를 감시하고 있는 상태이다.
    - 이벤트 감시 대상이 많다 ⇒ 성능 저하로 이어질 수밖에 없다.
  
2. 목록이 끊임없이 변화하는 경우, 예를 들어 아이템이 추가가 되는 경우 추가된 아이템에 대해서는 이벤트가 등록되지 않는다.
    - 이벤트가 등록이 되어있지 않기 때문에 새로운 아이템이 추가될 때마다 똑같은 이벤트 리스너 등록을 해당 아이템에 대해서 계속 해주어야 한다.

### 이벤트 리스너 등록을 최소화하는 방법

1. **item들을 감싸고 있는 wrapper를 변수에 담는다.**

    ```jsx
    const wrapper = document.querySelector('.wrapper');
    const items = document.querySelectorAll('.item');
    ```

2. **기존에 item에 등록했던 이벤트 리스너를, wrapper에 등록한다.**

    wrapper가 포함하는 하위 엘리먼트들을 클릭하면 wrapper에 등록된 이벤트 리스너가 실행이 될 것이다.
    ```jsx
    wrapper.addEventListener('click', function (e) {
    	// ...
    });
    ```

    현재 클릭한 대상 e.target을 변수로 잡는다.
    ```jsx
    wrapper.addEventListener('click', function (e) {
      // e.target : 현재 클릭한 대상
      const targetElem = e.target;
    });
    ```


    현재 클릭한 대상의 classList에 item 클래스가 없으면 아무 동작도 하지 않는다.
    = 현재 클릭한 대상이 item이 아니면 아무 동작도 하지 않는다.
    ```jsx
    wrapper.addEventListener('click', function (e) {
      const targetElem = e.target;
      // 현재 클릭한 대상의 classList에 item 클래스가 없으면 아무 동작도 하지 않는다.
      if (!targetElem.classList.contains('item')) return;
    });
    ```


    if문 아래에서는 item 클래스를 가진 targetElem에 대해서만 동작된다.
    targetElem의 classList에 토글로 open 클래스를 준다.
    ```jsx
    wrapper.addEventListener('click', function (e) {
      const targetElem = e.target;
      if (!targetElem.classList.contains('item')) return;

      // targetElem의 classList에 토글로 open 클래스를 준다.
    	targetElem.classList.toggle('open');
    });
    ```



    item들에 대해 순회하면서 엘리먼트가 targetElem과 같지 않으면 open 클래스를 지운다.
    ```jsx
    wrapper.addEventListener('click', function (e) {
      const targetElem = e.target;
      if (!targetElem.classList.contains('item')) return;

      targetElem.classList.toggle('open');
      
      // item들에 대해 순회하면서 엘리먼트가 targetElem과 같지 않으면 open 클래스를 지운다.
    	items.forEach(function (elem) {
    	  if (elem !== targetElem) elem.classList.remove('open');
      });
    });
    ```


    ```jsx
    wrapper.addEventListener('click', function (e) {
      const targetElem = e.target;
      // 이벤트 객체 검사
    	console.dir(e);

      if (!targetElem.classList.contains('item')) return;
      
      targetElem.classList.toggle('open');
      
    	items.forEach(function (elem) {
    	  if (elem !== targetElem) elem.classList.remove('open');
      });
    });
    ```

    🔻 이벤트 객체
    ![PointerEvent 객체](https://user-images.githubusercontent.com/72931773/127591444-4784a6d3-91bf-4c33-af88-40e183819aba.png)

    🔻 현재 클릭이 일어난 대상 타겟 (e.target)

    ![현재 클릭이 일어난 대상 타겟, e.target](https://user-images.githubusercontent.com/72931773/127591500-e4741eff-b687-4abf-832b-75cf84eb0809.png)

- 이벤트 리스너의 등록은 가급적 최소화하는 것이 바람직하다. → 이벤트 버블링, 캡쳐링에 대한 정확한 이해가 필요하다.

- wrapper(상위 DOM 요소)에 클릭 이벤트를 등록했는데 어떻게 하위에 있는 대상(item)을 클릭을 한 것이 동작이 될까?
  ⇒ 클릭 이벤트가 버블링이 이루어지기 때문

- 하위에 있는 DOM인 item에서 이벤트 발생
  → 더 상위에 있는 DOM인 wrapper로 이벤트 전파 (이벤트 버블링)
  → wrapper 클래스에는 클릭 이벤트 리스너가 등록이 되어 있으므로, 이벤트 실행
  → 실행은 되지만, item 클래스가 없으므로 아무 동작도 하지 않는다.

    ![이벤트 버블링](https://user-images.githubusercontent.com/72931773/127591516-c0bd5506-f650-4e61-a2f9-a15470171fd8.png)

### 목록 외부를 클릭하면 사라지는 동작

1. **목록 외부를 클릭하면 사라지는 코드**

    외부를 클릭한다 = 어디를 클릭하든지 마찬가지로 목록만 아니기만 하면 다 동작이 돼야함.

    document에 있는 body에 직접 리스너를 등록한다.
    ```jsx

    document.body.addEventListener('click', function (e) {
    	//...
    });
    ```


    e.target의 classList가 context를 가지고 있다면 아무일도 하지 않는다. 

    = context가 열려있는 상태면 동작하지 않는다.
    ```jsx
    document.body.addEventListener('click', function (e) {
    	if (e.target.classList.contains('context')) return;
    });
    ```


    목록 이외에 모든 부분을 어떤 부분을 선택하면 item에 있는 open 클래스를 전부 지워준다.
    ```jsx
    document.body.addEventListener('click', function (e) {
    	if (e.target.classList.contains('context')) return;
      items.forEach(function (elem) {
        elem.classList.remove('open');
      });
    });
    ```


    <br>
    ⁉️ 이 코드를 추가하면 context가 열리지 않는 것처럼 보인다. 왜그럴까?

    ![이벤트 버블링](https://user-images.githubusercontent.com/72931773/127591524-e74f3376-7444-4abd-b3d3-128159b8798a.png)

    - 이벤트가 두번 발생해서 열렸다가 바로 닫히는 것!

    - item → wrapper → body 순으로 이벤트가 전파(버블링)되고, 이벤트는 wrapper, body 에서 각각 발생해서 총 2번 이벤트가 발생하게 된다.

    - wrapper의 버블링을 더 이상 일어나지 않게 막아야한다.

2. **e.stopPropagation() 으로 이벤트 확산 방지**

    e.stopPropagation을 사용해 wrapper 이벤트의 버블링을 막는다.
    ```jsx
    wrapper.addEventListener('click', function (e) {
      const targetElem = e.target;

    	// 이벤트 확산 방지 (버블링 방지)
      e.stopPropagation();

      if (!targetElem.classList.contains('item')) return;
    	targetElem.classList.toggle('open');
    	  items.forEach(function (elem) {
    	    if (elem !== targetElem) elem.classList.remove('open');
      });
    });
    ```


    `preventDefault` vs `stopPropagation` : 모두 이벤트를 막는? 메서드지만, 두 가지의 용도가 다르다.

### 이벤트 리스너 등록 최소화 2

`body` 에만 이벤트 리스너를 등록해서 이 내부에 이벤트를 모두 구현할 수도 있다.
```jsx
document.body.addEventListener('click', function (e) {
	// ...
});
```


e.target의 classList를 변수로 잡는다 - 변수를 잡아놓으면 조건을 따지기 쉬워진다.
```jsx
document.body.addEventListener('click', function (e) {
  // e.target의 classList를 변수로 잡는다
  const targetClassList = e.target.classList;
});
```


**조건 1) 클릭한 타겟이 context에 해당하면**

e.target의 classList가 context를 가지고 있다면 아무 동작도 하지 않는다.
```jsx
document.body.addEventListener('click', function (e) {
  const targetClassList = e.target.classList;

  // e.target의 classList가 context를 가지고 있다면 아무 동작도 하지 않는다.
  if (targetClassList.contains('context')) return;
});
```


**조건 2) 클릭한 타겟이 item에 해당하면**

e.target의 classList가 item을 가지고 있다면 이전에 wrapper에 등록했던 이벤트를 작성한다.
```jsx
document.body.addEventListener('click', function (e) {
  const targetClassList = e.target.classList;

  if (targetClassList.contains('context')) return;
  
  // e.target의 classList가 item을 가지고 있는 경우
  if (targetClassList.contains('item')) {
		// ...
  }
});
```

e.target의 classList에 토글로 open 클래스를 준다.
```jsx
document.body.addEventListener('click', function (e) {
  const targetClassList = e.target.classList;

  if (targetClassList.contains('context')) return;

  if (targetClassList.contains('item')) {
    // e.target의 classList에 토글로 open 클래스를 준다.
    targetClassList.toggle('open');
  }
});
```

items를 순회하면서 item이 e.target에 해당하지 않는 item에서는 open 클래스를 지운다.

```jsx
document.body.addEventListener('click', function (e) {
  const targetClassList = e.target.classList;

  if (targetClassList.contains('context')) return;

  if (targetClassList.contains('item')) {
    targetClassList.toggle('open');

    // items를 순회하면서 item이 e.target에 해당하지 않는 item에서는 open 클래스를 지운다.
    items.forEach(function (elem) {
      if (elem !== e.target) elem.classList.remove('open');
    });
  }
});
```

이 상태에서는 더이상 동작을 하면 안되므로 return 시킨다.

```jsx
document.body.addEventListener('click', function (e) {
  const targetClassList = e.target.classList;

  if (targetClassList.contains('context')) return;

  if (targetClassList.contains('item')) {
    targetClassList.toggle('open');

    items.forEach(function (elem) {
      if (elem !== e.target) elem.classList.remove('open');
    });

    // 이 상태에서는 더이상 동작을 하면 안되므로 return 시킨다.
    return;
  }
});
```


**조건 3) 클릭한 타겟이 조건 1, 2 외의 나머지인 경우라면**

목록 이외에 모든 부분을 어떤 부분을 선택하면 item에 있는 open 클래스를 전부 지워준다.

```jsx
document.body.addEventListener('click', function (e) {
  const targetClassList = e.target.classList;

  if (targetClassList.contains('context')) return;

  if (targetClassList.contains('item')) {
    targetClassList.toggle('open');

    items.forEach(function (elem) {
      if (elem !== e.target) elem.classList.remove('open');
    });
    return;
  }

  // 목록 이외에 모든 부분을 어떤 부분을 선택하면 item에 있는 open 클래스를 전부 지워준다.
  items.forEach(function (elem) {
    elem.classList.remove('open');
  });
});
```


### 이벤트를 2개로 분리했을때와, 1개로 통합했을 때의 차이 비교

<div style="background: whitesmoke; padding: 10px; margin: 10px; border-radius: 5px">

<details markdown="1">
<summary style="color: teal; font-weight: 700">wrapper와, body에 각각 이벤트 리스너를 등록하는 경우</summary>

[🔗](#이벤트-리스너-등록을-최소화하는-방법)

```jsx
const wrapper = document.querySelector('.wrapper');
const items = document.querySelectorAll('.item');

wrapper.addEventListener('click', function (e) {
  const targetElem = e.target;

  // 이벤트 확산 방지 (버블링 방지)
  e.stopPropagation();

  if (!targetElem.classList.contains('item')) return;
  targetElem.classList.toggle('open');
    items.forEach(function (elem) {
      if (elem !== targetElem) elem.classList.remove('open');
  });
});

document.body.addEventListener('click', function (e) {
  if (e.target.classList.contains('context')) return;
  items.forEach(function (elem) {
    elem.classList.remove('open');
  });
});
```

</details>

<br/>

**장점**

메모리 관리가 용이하다.
- wrapper가 사라졌을 때 `wrapper.addEventListner(...)` 역시도 동작을 안하게 되면서 최적화가 관리가 자동으로 될 수 있다.
- wrapper에 대한 클릭 이벤트 감시를 중단하고 싶을 때, `wrapper.addEventListner(...)` 에 대해서만 `removeEventListner`를 해주면 된다.

**단점** : 이벤트 리스너가 2개로 늘어난다.

</div>


<div style="background: whitesmoke; padding: 10px; margin: 10px; border-radius: 5px">

<details markdown="1">
<summary style="color: teal; font-weight: 700">body에만 이벤트 리스너를 등록해서 모든 이벤트 동작을 기술하는 경우</summary>

[🔗](#이벤트-리스너-등록-최소화-2)

```jsx
const items = document.querySelectorAll('.item');

document.body.addEventListener('click', function (e) {
  const targetClassList = e.target.classList;

  if (targetClassList.contains('context')) return;

  if (targetClassList.contains('item')) {
    targetClassList.toggle('open');

    items.forEach(function (elem) {
      if (elem !== e.target) elem.classList.remove('open');
    });
    return;
  }

  items.forEach(function (elem) {
    elem.classList.remove('open');
  });
});
```

</details>

<br/>

**장점** : 리스너가 줄어든다

**단점**

① 조건문들이 많아진다.
- 클릭 이벤트 하나에 대해서 조건을 계속 따져야 한다. 
⇒ 조건문을 최적화하는 방법을 고민할 필요가 있다.

② 메모리 관리가 어렵다.
- body 전체에 addEventListner를 걸었기 때문에 페이지의 동작이 전부 종료되기 전까지는 body 하나의 이벤트 리스너에 전적으로 의존할 수밖에 없다.
- 이벤트 리스너를 body 하나만 사용하게 되면, 내용이 하나에 전부 들어가 있기 때문에 개별적인 리스너들에 대한 `addEventListner`, removeEventListner에 대한 관리가 될 수가 없는 문제가 있다.

</div>

⇒ 결론 : 상황에 따라 적절한 이벤트 리스너를 달아주도록 한다!
