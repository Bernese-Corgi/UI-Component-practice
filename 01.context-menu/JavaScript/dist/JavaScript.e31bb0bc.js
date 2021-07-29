// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("./style.css");

const wrapper = document.querySelector('.wrapper');
const items = document.querySelectorAll('.item'); // // 2. 기존에 item에 등록했던 이벤트 리스너를, wrapper에 등록한다.
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
//

document.body.addEventListener('click', function (e) {
  const targetClassList = e.target.classList; // 1. e.target의 classList가 context를 가지고 있다면 아무 동작도 하지 않는다.

  if (targetClassList.contains('context')) return; // 2. e.target의 classList가 item을 가지고 있다면 wrapper에 등록했던 이벤트 동작을 한다.

  if (targetClassList.contains('item')) {
    // e.target의 classList에 토글로 open 클래스를 준다.
    targetClassList.toggle('open');
    items.forEach(function (elem) {
      // item이 e.target과 같지 않으면 open 클래스를 지운다.
      console.log(elem, e.target);
      if (elem !== e.target) elem.classList.remove('open');
    });
    return;
  } // context가 열려있는 상태 외의 item


  items.forEach(function (elem) {
    // 목록 이외에 모든 부분을 어떤 부분을 선택하면 item에 있는 open 클래스를 전부 지워준다.
    elem.classList.remove('open');
  });
}); // 기서 한 번 잡아보자 타겟의 classList를 한번 변수를 먼저 잡아놓고 보겠습니다 이렇게 변수를 잡아놓으면 조건을 따지기가 쉬워지죠
// contains로. 아까처럼 이거를 바꾸면 되겠죠.
// 얘를 targetClassList가 context이면은.
// 아무 동작도 하지 말고 다시 targetClassList가 item을 가지고 있다.
// 라고 하면은 이때는 이 위에 있는 동작을 하면 되겠죠
// targetClassList를 토글로 open을 톡을 시켜주고요 item들 forEach를 돌려서 이 부분이죠.
// 가져가겠습니다
// 네 elem과 e.target 비교하면 되겠죠 이 상태에서 여기서는 더 이상 동작을 하면 안 되니까 여기서는 return을 시켜주겠습니다.
// 그러면 된 거 같은데요 지금 제가 어떤 작업을 했냐면 body 하나에만 클릭 이벤트를 구매를 하고선 context에 해당하는지 item에 해당하는지 혹은 그 외에 다른 어떤 것인지 네 따라서 처리를 다르게 한 겁니다 context일 때는 아무 동작도 하지 않고 return에서 바로 끝내버리고 item에 다 할 때는 이제 해당 item에는 open 클리스를 넣어주고 나머지는 지워주는 작업 하고 종류 그렇지 않은 그외의 경우에는 전북 open 클래스를 지워라라는 내용이 되겠죠.
// 타. 게 오타가 있네요 여기. 이것만 고쳐주면 될 것 같은데요 왜 딴 데를 클릭하면 사라지고 네 목표하는 바를 다 이뤘습니다.
// 장점은 뭔가요. 리스너가 줄어든다는 거는 굉장한 장점입니다 단점이라고 하면 이 조건문들이 많아질 수밖에 없는 거죠.
// 클릭 이벤트 하나의 대해서 조건을 계속 따져야 돼요 이 조건문을 최적화하는 방법을 고민할 필요가 있겠습니다 그리고 또 한 가지 문제는 이제 body 전체에다가 에디 이벤트 리스를 걸었기 때문에 이 페이지의 동작이 전부 종료되기 전까지는
// 이 하나의 이벤트 리스너에 전적으로 의존할 수밖에 없습니다.
// 그러니까 만약에 예전에 같은 경우는 이 wrapper라고 하는 거에 리스너를 걸어놓고.
// body 리스너를 걸었을 때는 wrapper가 사라졌을 때.
// 이 이벤트 리스 역시도 동작을 안 하게 되면서 최적화가 관리가 자동으로 될 수 있습니다.
// 혹은 내가 이 wrapper에 대한 클릭 이벤트 감시를 중단하고 싶다라고 하면은 얘에 대해서만 remove 이벤트.
// 리스너를 해주면. 됐어요 이런 식으로 메모리 관리를 할 수가 있는데 이 경우는
// 내용이 하나의 전부 들어가 있기 때문에 개별적인 리스너들에 대한 에드 remove에 대한 관리가 될 수가 없는 문제가 있습니다.
// 애들 장단점을 잘 따져서 앞에 먼저 방금 소개해 드렸던 wrapper의 클래스 레포의 클릭 이벤트를 걸고 body에도 클릭 이벤트를 거는 이 두 개의 클릭 이벤트를 이용하는 방법과 body에다가 하나만 거는거 방법이 두 가지 중에서 잘 고민해서 작업을 하시면 되겠습니다.
// 실무에서는
},{"./style.css":"style.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59174" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/JavaScript.e31bb0bc.js.map