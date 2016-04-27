/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Simple = __webpack_require__(1);

	var _Simple2 = _interopRequireDefault(_Simple);

	var _game = __webpack_require__(5);

	var _game2 = _interopRequireDefault(_game);

	var _menu = __webpack_require__(14);

	var _menu2 = _interopRequireDefault(_menu);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	class GameManager {
	  constructor() {
	    this.$game = $('.game')
	    userAPI.checkAuth((res)=> {
	      if (res && res.success) {
	        this.playerID = res.userID
	        // $('.user-id').html('User ID: ' + this.playerID)
	        socketAPI.userLoggedIn(this.playerID)
	        this.showMenu()
	      } else {
	        this.signup_login_page = new Signup_Login()
	        this.signup_login_page.appendTo($('.game'))
	      }
	    })

	    document.body.addEventListener('touchmove', function(e){ e.preventDefault()})

	    // this.startNewMatch(19, 'white', 'opponentID')
	  }

	  setPlayerID(id) {
	    this.playerID = id
	  }

	  startNewMatch(size, playerColor, opponentID) {
	    this.board = new Board({  size,
	                              playerColor,
	                              playerID: this.playerID,
	                              opponentID,
	                              gameManager: this})
	    this.board.render(this.$game)
	    // this.board.appendTo(this.$game)

	    this.boardMenu = new BoardMenu(this.board)
	    this.boardMenu.appendTo(this.$game)
	  }

	  updateBoardMenu() {
	    this.boardMenu.forceUpdate()
	  }

	  showMenu() {
	    if (this.signup_login_page) {
	      this.signup_login_page.remove()
	      this.signup_login_page = null
	    }

	    if (this.board) {
	      this.board.remove()
	      this.board = null
	    }

	    if (this.boardMenu) {
	      this.boardMenu.remove()
	      this.boardMenu = null
	    }

	    // TODO: remove board

	    this.menu = new Menu(this)
	    this.menu.appendTo($('.game'))
	  }
	}

	*/

	// 没什么卵用的 loading screen
	/**
	$('.loading-screen .logo').fadeIn(1000, ()=> {
	  setTimeout(()=> {
	    $('.loading-screen .logo').fadeOut(1000, ()=> {
	      $('.loading-screen').remove()
	    })
	  }, 1600)
	})
	*/
	$('.loading-screen').remove();

	var game = (0, _game2.default)();
	_Simple2.default.render((0, _game2.default)(), document.getElementById('game'));

	// let emitter = game.emitter
	// emitter.emit('start-match', {opponentID: 'shd101wyy2', size: 9, color: 'black'})

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Component = __webpack_require__(2);
	var Emitter = __webpack_require__(4);

	var render = function render(component, domElement) {
	  var element = component._initialRender();
	  if (element) {
	    domElement.appendChild(element);
	  }
	};

	var createEmitter = function createEmitter(initialState) {
	  return new Emitter(initialState);
	};

	var Simple = {
	  Component: Component,
	  Emitter: Emitter,
	  createEmitter: createEmitter,
	  render: render
	};

	if (typeof window !== 'undefined') {
	  window.Simple = Simple;
	}

	if (true) {
	  module.exports = Simple;
	}

	exports.default = Simple;
	exports.Component = Component;
	exports.Emitter = Emitter;
	exports.createEmitter = createEmitter;
	exports.render = render;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SimpleDOM = __webpack_require__(3);

	function createSimpleComponent(methods) {
	  var SimpleComponent = function SimpleComponent(props) {
	    if (!this || !(this instanceof SimpleComponent)) {
	      return new SimpleComponent(props);
	    }
	    SimpleDOM.call(this);

	    for (var _len = arguments.length, children = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      children[_key - 1] = arguments[_key];
	    }

	    if (children) {
	      this.children = children;
	    }

	    if (props) {
	      Object.assign(this.props, props);
	    }

	    this.init();
	    //this.forceUpdate()      // render element
	    //this.componentDidMount()
	  };

	  SimpleComponent.prototype = Object.create(SimpleDOM.prototype);

	  for (var key in methods) {
	    SimpleComponent.prototype[key] = methods[key];
	  }

	  SimpleComponent.prototype.constructor = SimpleComponent;

	  return SimpleComponent;
	}

	function createStatelessSimpleComponent(func) {
	  var SimpleComponent = function SimpleComponent(props) {
	    if (!this || !this instanceof SimpleComponent) {
	      return new SimpleComponent(props);
	    }
	    SimpleDOM.call(this);

	    this.render = func.bind(this, props);
	    // this.toDOM(func.call(this, props)) // render element
	  };
	  SimpleComponent.prototype = Object.create(SimpleDOM.prototype);

	  return SimpleComponent;
	}

	function Component(arg) {
	  if (arg.constructor === Function) {
	    return createStatelessSimpleComponent(arg);
	  } else {
	    return createSimpleComponent(arg);
	  }
	}

	module.exports = Component;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	function isNativeEvent(eventname) {
	  return typeof document.body["on" + eventname] !== "undefined";
	}

	// http://stackoverflow.com/questions/3076679/javascript-event-registering-without-using-jquery
	function addEvent(el, eventType, handler) {
	  if (el.addEventListener) {
	    // DOM Level 2 browsers
	    el.addEventListener(eventType, handler, false);
	  } else if (el.attachEvent) {
	    // IE <= 8
	    el.attachEvent('on' + eventType, handler);
	  } else {
	    // ancient browsers
	    el['on' + eventType] = handler;
	  }
	}

	function removeEvent(el, eventType, handler) {
	  if (el.removeEventListener) {
	    // DOM Level 2 browsers
	    el.removeEventListener(eventType, handler, false);
	  } else if (el.attachEvent) {
	    // IE <= 8
	    el.detachEvent('on' + eventType, handler);
	  }
	}

	var validTags = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section  select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr'.split(' ');

	// http://stackoverflow.com/questions/10865025/merge-flatten-a-multidimensional-array-in-javascript
	function flatten(arr) {
	  return arr.reduce(function (flat, toFlatten) {
	    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
	  }, []);
	}

	/**
	 */
	function SimpleDOM() {
	  this.props = this.getDefaultProps();
	  this.refs = {};
	}

	SimpleDOM.prototype = Object.create(SimpleDOM.prototype);

	SimpleDOM.prototype.getDefaultProps = function () {
	  return {};
	};

	SimpleDOM.prototype.emit = function (name) {
	  var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	  if (this.emitter) {
	    this.emitter.emit(name, data, this);
	  }
	};

	SimpleDOM.prototype.render = function () {
	  throw "Render function is not implemented";
	};

	SimpleDOM.prototype.init = function () {};

	SimpleDOM.prototype.componentDidMount = function () {};

	SimpleDOM.prototype.componentWillUpdate = function () {};

	SimpleDOM.prototype.componentDidUpdate = function () {};

	SimpleDOM.prototype.componentWillUnmount = function () {};

	SimpleDOM.prototype.componentDidUnmount = function () {};

	SimpleDOM.prototype.setState = function (newState) {
	  if (this.state) {
	    Object.assign(this.state, newState);
	  }
	  this.forceUpdate();
	};

	SimpleDOM.prototype.setProps = function (newProps) {
	  Object.assign(this.props, newProps);
	  this.forceUpdate();
	};

	SimpleDOM.prototype.forceUpdate = function () {
	  this.componentWillUpdate();

	  this._render(this.element); // render element

	  this.componentDidUpdate();
	};

	SimpleDOM.prototype._render = function (oldElement) {
	  var sameLevel = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	  var d = null;
	  if (this.tagName) {
	    d = this;
	  } else {
	    d = this.render();
	  }
	  if (!d.tagName) {
	    this.element = d._render(oldElement, false);
	    if (sameLevel) {
	      this.componentWillUpdate();
	      this.props = d.props; // 'react' only changes props
	      this.componentDidUpdate();
	    }
	  } else if (d) {
	    this.element = this.diff(oldElement, d);
	  }
	  return this.element;
	};

	SimpleDOM.prototype.diff = function (element, d) {
	  if (element.tagName !== d.tagName) {
	    // different tag
	    var el = d._initialRender();
	    element.parentNode.replaceChild(el, element);
	    return el;
	  } else {
	    // set content
	    if (d.content) {
	      var node = element.firstChild;
	      if (node && node.nodeName === '#text') {
	        node.nodeValue = d.content;
	      } else {
	        element.insertBefore(document.createTextNode(d.content), node);
	      }
	    } else {
	      var _node = element.firstChild;
	      if (_node && _node.nodeName === '#text' && _node.nodeValue) {
	        _node.nodeValue = '';
	      }
	    }

	    // set attributes
	    // for (let i = 0; i < element.attributes.length; i++) {
	    while (element.attributes.length > 0) {
	      element.removeAttribute(element.attributes[0].name);
	    }

	    var eventsLength = 0,
	        _eventListeners = element._eventListeners || {},
	        events = {},
	        findEvent = false;

	    if (d.attributes) {
	      for (var key in d.attributes) {
	        var val = d.attributes[key];
	        if (isNativeEvent(key)) {
	          findEvent = true;
	          if (_eventListeners[key] !== val) {
	            removeEvent(element, key, _eventListeners[key]);
	            addEvent(element, key, val);
	            // _eventListeners[key] = val
	            events[key] = val;
	          }
	        } else if (key === 'ref') {
	          this.owner.refs[val] = element;
	        } else if (key === 'style' && val.constructor === Object) {
	          for (var styleKey in val) {
	            element.style[styleKey] = val[styleKey];
	          }
	        } else {
	          element.setAttribute(key, val);
	        }
	      }
	    }

	    for (var _key in _eventListeners) {
	      if (!events[_key]) {
	        removeEvent(element, _key, _eventListeners[_key]);
	      }
	    }
	    _eventListeners = null;
	    if (findEvent) {
	      element._eventListeners = events;
	    } else {
	      element._eventListeners = undefined;
	    }

	    // diff children
	    if (element.children.length === d.children.length) {
	      for (var i = 0; i < element.children.length; i++) {
	        d.children[i]._render(element.children[i], true);
	      }
	    } else if (element.children.length > d.children.length) {
	      var _i = 0;
	      for (; _i < d.children.length; _i++) {
	        d.children[_i]._render(element.children[_i], true);
	      }
	      while (element.children.length !== d.children.length) {
	        element.removeChild(element.children[_i]);
	      }
	    } else {
	      // if (element.children.length < d.children.length) {
	      var _i2 = 0;
	      for (; _i2 < element.children.length; _i2++) {
	        d.children[_i2]._render(element.children[_i2], true);
	      }
	      for (; _i2 < d.children.length; _i2++) {
	        element.appendChild(d.children[_i2]._initialRender());
	      }
	    }
	    return element;
	  }
	};

	SimpleDOM.prototype.appendChildrenDOMElements = function (children) {
	  var _this = this;

	  if (!children.length) return;

	  children.forEach(function (child) {
	    if (child.constructor === Array) {
	      _this.appendChildrenDOMElements(child);
	    } else {
	      _this.element.appendChild(child._initialRender());
	    }
	  });
	};

	SimpleDOM.prototype.generateDOM = function () {
	  var _eventListeners = {},
	      eventLength = 0;

	  this.element = document.createElement(this.tagName);

	  if (this.content) {
	    this.element.appendChild(document.createTextNode(this.content));
	  }

	  if (this.attributes) {
	    for (var key in this.attributes) {
	      var val = this.attributes[key];
	      if (isNativeEvent(key)) {
	        addEvent(this.element, key, val);
	        _eventListeners[key] = val;
	        eventLength += 1;
	      } else if (key === 'ref') {
	        this.owner.refs[val] = this.element;
	      } else if (key === 'style' && val.constructor === Object) {
	        for (var styleKey in val) {
	          this.element.style[styleKey] = val[styleKey];
	        }
	      } else {
	        this.element.setAttribute(key, val);
	      }
	    }
	  }

	  if (eventLength) {
	    this.element._eventListeners = _eventListeners; // HACK
	  }

	  this.appendChildrenDOMElements(this.children);

	  return this.element;
	};

	SimpleDOM.prototype._initialRender = function () {
	  if (this.tagName) {
	    // div ...
	    this.generateDOM();
	  } else {
	    var d = this.render();
	    if (d) {
	      this.element = d._initialRender();
	    }
	    this.componentDidMount();
	  }
	  return this.element;
	};

	// add tags

	var _loop = function _loop(i) {
	  SimpleDOM.prototype[validTags[i]] = function () {
	    var attributes = {},
	        content = null,
	        children = [];

	    var offset = 0;
	    if (arguments[offset] !== null && typeof arguments[offset] !== 'undefined' && arguments[offset].constructor === Object) {
	      attributes = arguments[offset];
	      offset += 1;
	    }

	    if (arguments[offset] !== null && typeof arguments[offset] !== 'undefined' && (arguments[offset].constructor === String || arguments[offset].constructor === Number)) {
	      content = arguments[offset];
	      offset += 1;
	    }

	    children = [];
	    function appendChildren(args) {
	      var offset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	      for (var _i3 = offset; _i3 < args.length; _i3++) {
	        if (args[_i3]) {
	          if (args[_i3].constructor === Array) {
	            appendChildren(args[_i3]);
	          } else {
	            children.push(args[_i3]);
	          }
	        }
	      }
	    }

	    appendChildren(arguments, offset);

	    var d = new SimpleDOM();
	    d.tagName = validTags[i].toUpperCase();
	    d.attributes = attributes;
	    d.content = content;
	    d.children = children;
	    d.owner = this;
	    d._eventListeners = {};
	    return d;
	  };
	};

	for (var i = 0; i < validTags.length; i++) {
	  _loop(i);
	}

	SimpleDOM.prototype.constructor = SimpleDOM;

	module.exports = SimpleDOM;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	/*
	 * Event emitter class
	 */

	var emitters = {};

	function Emitter() {
	  var initialState = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  this.subscriptions = {};
	  this.id = null;

	  if (initialState.constructor === Function) {
	    var initFunc = initialState;
	    this.state = initialState;
	    initFunc.call(this);
	  } else {
	    this.state = initialState;
	  }
	}

	Emitter.prototype.constructor = Emitter;

	Emitter.prototype.registerId = function (id) {
	  if (emitters[id]) {
	    throw 'Error: ' + id + ' is already registered in Emitters';
	  } else {
	    this.id = id;
	    emitters[id] = this;
	  }
	};

	Emitter.getEmitterById = function (id) {
	  return emitters[id];
	};

	// emitter.emit()
	Emitter.prototype.emit = function (name) {
	  var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	  var sender = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	  if (this.subscriptions[name]) {
	    this.subscriptions[name].call(this, data, sender);
	  }
	};

	// emitter.on()
	// callback should be
	// - function(data, component) {
	//   }
	Emitter.prototype.on = function () {
	  if (arguments.length === 2) {
	    var name = arguments[0],
	        callback = arguments[1];
	    if (this.subscriptions[name]) {
	      throw 'Error: ' + name + ' is already registered in Emitter object';
	    } else {
	      this.subscriptions[name] = callback;
	    }
	  } else {
	    var obj = arguments[0];
	    for (var _name in obj) {
	      this.on(_name, obj[_name]);
	    }
	  }
	};

	// unsubscript the event
	Emitter.prototype.off = function (name) {
	  this.subscriptions[name] = null;
	};

	Emitter.prototype.destroy = function () {
	  this.state = {};
	  this.subscriptions = {};
	};

	/*
	Emitter.prototype.getState = function() {
	  return this.state
	}
	*/

	module.exports = Emitter;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Simple = __webpack_require__(1);

	var _Simple2 = _interopRequireDefault(_Simple);

	var _emitter = __webpack_require__(6);

	var _emitter2 = _interopRequireDefault(_emitter);

	var _signup_login = __webpack_require__(13);

	var _signup_login2 = _interopRequireDefault(_signup_login);

	var _menu = __webpack_require__(14);

	var _menu2 = _interopRequireDefault(_menu);

	var _match = __webpack_require__(15);

	var _match2 = _interopRequireDefault(_match);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Game = _Simple2.default.Component({
	  emitter: _emitter2.default,
	  getDefaultProps: function getDefaultProps() {
	    return {
	      page: 'SHOW_LOGIN_SIGNUP',
	      playerID: null,
	      opponentID: null,
	      MMR: 0,
	      size: null,
	      color: null,
	      board: null
	    };
	  },
	  init: function init() {
	    document.body.addEventListener('touchmove', function (e) {
	      e.preventDefault();
	    });
	  },
	  componentDidMount: function componentDidMount() {
	    this.emit('check-auth');
	  },
	  render: function render() {
	    if (this.props.page === 'SHOW_LOGIN_SIGNUP') {
	      return (0, _signup_login2.default)();
	    } else if (this.props.page === 'SHOW_MENU') {
	      return (0, _menu2.default)({ playerID: this.props.playerID, MMR: this.props.MMR });
	    } else if (this.props.page === 'SHOW_MATCH') {
	      return (0, _match2.default)({ board: this.props.board });
	    }
	  }
	});

	exports.default = Game;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Simple = __webpack_require__(1);

	var _Simple2 = _interopRequireDefault(_Simple);

	var _signup_login = __webpack_require__(9);

	var _signup_login2 = _interopRequireDefault(_signup_login);

	var _chat = __webpack_require__(19);

	var _chat2 = _interopRequireDefault(_chat);

	var _menu = __webpack_require__(20);

	var _menu2 = _interopRequireDefault(_menu);

	var _match = __webpack_require__(21);

	var _match2 = _interopRequireDefault(_match);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var emitter = _Simple2.default.createEmitter({
	  playerID: null,
	  MMR: 0,
	  opponentID: null,
	  board: null,
	  chat: {
	    messages: [], // {id, message, me}
	    component: null
	  },

	  boardComponent: null,
	  matchComponent: null,
	  menuComponent: null,
	  gameComponent: null
	});

	emitter.registerId('emitter');

	emitter.on(_signup_login2.default);
	emitter.on(_chat2.default);
	emitter.on(_menu2.default);
	emitter.on(_match2.default);

	exports.default = emitter;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Simple = __webpack_require__(1);

	var _Simple2 = _interopRequireDefault(_Simple);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (!window.socket) {
	  window.socket = io();
	}

	var socket = window.socket;

	var socketAPI = {
	  inviteMatch: function inviteMatch(_ref) {
	    var opponentID = _ref.opponentID;
	    var size = _ref.size;
	    var color = _ref.color;
	    var komi = _ref.komi;

	    socket.emit('invite-match', opponentID, size, color, komi);
	  },

	  sendMove: function sendMove(opponentID, row, col) {
	    socket.emit('send-move', [opponentID, row, col]);
	  },

	  userLoggedIn: function userLoggedIn(userID) {
	    socket.emit('user-logged-in', userID);
	  },

	  resign: function resign(userID, opponentID) {
	    socket.emit('resign', userID, opponentID);
	  },

	  score: function score(userID, opponentID) {
	    socket.emit('score', userID, opponentID);
	  },

	  sendMessage: function sendMessage(_ref2) {
	    var playerID = _ref2.playerID;
	    var opponentID = _ref2.opponentID;
	    var message = _ref2.message;

	    socket.emit('send-message', playerID, opponentID, message);
	  }
	};

	socket.on('opponent-not-found', function (opponentID) {
	  toastr.warning('opponent ' + opponentID + ' not found');
	});

	socket.on('invitation-sent', function (opponentID) {
	  toastr.warning('Invitation to ' + opponentID + ' is sent');
	});

	socket.on('receive-match-invitation', function (playerID, opponentID, size, color, komi) {
	  var $el = $('<div> <p> ' + opponentID + ' invites you to play go! </p>\n                      <p> board size: ' + size + ' </p>\n                      <button class=\'accept\'> accept </button>\n                      <button> decline </button>\n               </div>');
	  toastr.options = { "timeOut": "30000" };
	  toastr.info($el);
	  toastr.options = { "timeOut": "5000" };

	  $('.accept', $el).click(function () {
	    socket.emit('accept-invitation', { playerID: playerID, opponentID: opponentID, size: size, color: color, komi: komi });
	  });
	});

	socket.on('start-match', function (data) {
	  var size = data.size,
	      color = data.color,
	      opponentID = data.opponentID,
	      komi = data.komi,
	      ranked = data.ranked;

	  _Simple2.default.Emitter.getEmitterById('emitter').emit('start-match', { opponentID: opponentID, size: size, color: color, komi: komi, ranked: ranked });
	});

	socket.on('receive-move', function (data) {
	  var row = data[0],
	      col = data[1];

	  _Simple2.default.Emitter.getEmitterById('emitter').emit('board-receive-move', { row: row, col: col });
	});

	socket.on('opponent-resign', function () {
	  _Simple2.default.Emitter.getEmitterById('emitter').emit('opponent-resign');
	});

	socket.on('opponent-score', function () {
	  _Simple2.default.Emitter.getEmitterById('emitter').emit('opponent-score');
	});

	socket.on('opponent-disconnect', function (opponentID) {
	  toastr.warning('opponent disconnect: ' + opponentID);
	});

	socket.on('receive-message', function (opponentID, message) {
	  _Simple2.default.Emitter.getEmitterById('emitter').emit('receive-message', { opponentID: opponentID, message: message });
	});

	socket.on('opponnet-in-game', function (opponentID) {
	  toastr.warning(opponentID + ' is currently in the game.');
	});

	exports.default = socketAPI;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var userAPI = {
	  signup: function signup(email, userID, password, callback) {
	    $.ajax('/signup', {
	      type: 'POST',
	      dataType: 'json',
	      data: { email: email, password: password, userID: userID },
	      success: function success(res) {
	        if (res) {
	          if (callback) callback(res);else callback(null);
	        } else if (callback) {
	          callback(null);
	        }
	      },
	      error: function error(res) {
	        if (callback) callback(null);
	      }
	    });
	  },

	  signin: function signin(email, password, callback) {
	    $.ajax('/signin', {
	      type: 'POST',
	      dataType: 'json',
	      data: { email: email, password: password },
	      success: function success(res) {
	        if (res) {
	          if (callback) callback(res);else callback(null);
	        } else if (callback) {
	          callback(null);
	        }
	      },
	      error: function error(res) {
	        if (callback) callback(null);
	      }
	    });
	  },

	  checkAuth: function checkAuth(callback) {
	    $.ajax('/auth', {
	      type: 'GET',
	      dataType: 'json',
	      success: function success(res) {
	        console.log('auth success', res);
	        if (res) {
	          if (callback) callback(res);else callback(null);
	        } else if (callback) {
	          callback(null);
	        }
	      },
	      error: function error(res) {
	        if (callback) callback(null);
	      }
	    });
	  },

	  requestTop50Players: function requestTop50Players(callback) {
	    $.ajax('/top50', {
	      type: 'GET',
	      dataType: 'json',
	      success: function success(res) {
	        console.log('get top 50 players', res);
	        if (res) {
	          if (callback) callback(res);else callback(null);
	        } else if (callback) {
	          callback(null);
	        }
	      },
	      error: function error(res) {
	        if (callback) callback(null);
	      }
	    });
	  },

	  findRankedMatch: function findRankedMatch(_ref) {
	    var playerID = _ref.playerID;
	    var MMR = _ref.MMR;
	    var size = _ref.size;

	    $.ajax('/find_ranked_match', {
	      type: 'POST',
	      dataType: 'json',
	      data: { playerID: playerID, MMR: MMR, size: size }
	    });
	  },

	  stopFindingRankedMatch: function stopFindingRankedMatch(_ref2) {
	    var playerID = _ref2.playerID;

	    $.ajax('/stop_finding_ranked_match', {
	      type: 'POST',
	      dataType: 'json',
	      data: { playerID: playerID }
	    });
	  },

	  findPublicMatch: function findPublicMatch(_ref3) {
	    var playerID = _ref3.playerID;
	    var MMR = _ref3.MMR;
	    var size = _ref3.size;

	    $.ajax('/find_public_match', {
	      type: 'POST',
	      dataType: 'json',
	      data: { playerID: playerID, MMR: MMR, size: size }
	    });
	  },

	  stopFindingPublicMatch: function stopFindingPublicMatch(_ref4) {
	    var playerID = _ref4.playerID;

	    $.ajax('/stop_finding_public_match', {
	      type: 'POST',
	      dataType: 'json',
	      data: { playerID: playerID }
	    });
	  },

	  win: function win(_ref5) {
	    var playerID = _ref5.playerID;
	    var opponentID = _ref5.opponentID;

	    $.ajax('/win_ranked', {
	      type: 'POST',
	      dataType: 'json',
	      data: { playerID: playerID, opponentID: opponentID } });
	  },

	  lose: function lose(_ref6) {
	    var playerID = _ref6.playerID;
	    var opponentID = _ref6.opponentID;

	    $.ajax('/lose_ranked', {
	      type: 'POST',
	      dataType: 'json',
	      data: { playerID: playerID, opponentID: opponentID } });
	  }

	};

	exports.default = userAPI;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _socket_api = __webpack_require__(7);

	var _socket_api2 = _interopRequireDefault(_socket_api);

	var _user_api = __webpack_require__(8);

	var _user_api2 = _interopRequireDefault(_user_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var signupLogin = {
	  'check-auth': function checkAuth(data, component) {
	    var _this = this;

	    console.log('check auth');
	    this.state.gameComponent = component;
	    _user_api2.default.checkAuth(function (res) {
	      if (res && res.success) {
	        _this.state.playerID = res.userID;
	        _this.state.MMR = res.MMR;
	        _socket_api2.default.userLoggedIn(_this.state.playerID);
	        component.setProps({ page: 'SHOW_MENU', playerID: _this.state.playerID, MMR: _this.state.MMR });
	      }
	    });
	  },

	  'login': function login(_ref, component) {
	    var _this2 = this;

	    var email = _ref.email;
	    var password = _ref.password;

	    _user_api2.default.signin(email, password, function (res) {
	      if (!res) {
	        toastr.error('Failed to signin');
	      } else {
	        _this2.state.playerID = res.userID;
	        _this2.state.MMR = res.MMR;
	        _socket_api2.default.userLoggedIn(_this2.state.playerID);
	        _this2.state.gameComponent.setProps({ page: 'SHOW_MENU', playerID: _this2.state.playerID, MMR: _this2.state.MMR });
	      }
	    });
	  },

	  'signup': function signup(_ref2) {
	    var _this3 = this;

	    var email = _ref2.email;
	    var userID = _ref2.userID;
	    var password = _ref2.password;

	    _user_api2.default.signup(email, userID, password, function (res) {
	      if (!res) {
	        toastr.error('Failed to signup');
	      } else {
	        _this3.state.playerID = res.userID;
	        _this3.state.MMR = res.MMR;
	        _socket_api2.default.userLoggedIn(_this3.state.playerID);
	        _this3.state.gameComponent.setProps({ page: 'SHOW_MENU', playerID: _this3.state.playerID, MMR: _this3.state.MMR });
	      }
	    });
	  }
	};

	exports.default = signupLogin;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _history = __webpack_require__(11);

	var _history2 = _interopRequireDefault(_history);

	var _stone2 = __webpack_require__(12);

	var _stone3 = _interopRequireDefault(_stone2);

	var _socket_api = __webpack_require__(7);

	var _socket_api2 = _interopRequireDefault(_socket_api);

	var _user_api = __webpack_require__(8);

	var _user_api2 = _interopRequireDefault(_user_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// go board class

	var Board = function () {
	  // 9x9 13x13 19x19

	  function Board(_ref) {
	    var size = _ref.size;
	    var playerColor = _ref.playerColor;
	    var playerID = _ref.playerID;
	    var opponentID = _ref.opponentID;
	    var komi = _ref.komi;
	    var ranked = _ref.ranked;

	    _classCallCheck(this, Board);

	    this.size = parseInt(size) || 19;
	    this.playerColor = playerColor || 'black';
	    this.playerID = playerID || null;
	    this.opponentID = opponentID || null;
	    this.komi = komi || 0;
	    this.ranked = ranked || false;

	    this.board = [];

	    this.turn = 0;
	    this.history = new _history2.default();

	    this.justPass = false;

	    this.lastMove = null; // [row, col]

	    // create board data
	    for (var i = 0; i < this.size; i++) {
	      this.board.push([]);

	      for (var j = 0; j < this.size; j++) {
	        this.board[i].push(null);
	      }
	    }

	    this.history.add(this.board);
	  }

	  // mark all stones as unchecked


	  _createClass(Board, [{
	    key: 'markAllStonsUncheckd',
	    value: function markAllStonsUncheckd() {
	      for (var i = 0; i < this.size; i++) {
	        for (var j = 0; j < this.size; j++) {
	          if (this.board[i][j]) {
	            this.board[i][j].checked = false;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'getColorForCurrentTurn',
	    value: function getColorForCurrentTurn() {
	      if (this.turn % 2 === 0) {
	        return 'black';
	      } else {
	        return 'white';
	      }
	    }
	  }, {
	    key: 'isMyTurn',
	    value: function isMyTurn() {
	      return this.getColorForCurrentTurn() === this.playerColor;
	    }
	  }, {
	    key: 'getStoneImage',
	    value: function getStoneImage() {
	      if (this.turn % 2 === 0) {
	        return './images/b.png';
	      } else {
	        return './images/w' + Math.floor(Math.random() * 15 + 1) + '.png';
	      }
	    }
	  }, {
	    key: 'nextTurn',
	    value: function nextTurn(justPass) {
	      this.justPass = justPass;
	      this.turn += 1;
	      this.markAllStonsUncheckd();
	    }
	  }, {
	    key: 'addStone',
	    value: function addStone(row, col) {
	      if (this.board[row][col]) return;

	      var color = this.getColorForCurrentTurn();
	      var stone = new _stone3.default({ board: this, row: row, col: col, color: color });

	      this.board[row][col] = stone; // set to Go board

	      this.turn += 1;

	      return this.checkCapture(row, col);
	    }
	  }, {
	    key: 'removeStone',
	    value: function removeStone(row, col) {
	      if (this.board[row][col]) {
	        this.board[row][col] = null;
	      }
	    }
	  }, {
	    key: 'score',
	    value: function score() {
	      var _this = this;

	      var boardData = [];
	      // initialize flood fill data structure
	      for (var i = 0; i < this.size; i++) {
	        boardData.push([]);
	        for (var j = 0; j < this.size; j++) {
	          boardData[i][j] = { white: false, black: false, visited: false };
	          if (this.board[i][j]) {
	            if (this.board[i][j].color === 'white') {
	              boardData[i][j].white = true;
	            } else {
	              boardData[i][j].black = true;
	            }
	          }
	        }
	      }

	      // flood fill algorithm
	      var scoreFloodFill = function scoreFloodFill(i, j, color) {
	        if (i >= 0 && i < _this.size && j >= 0 && j < _this.size) {
	          if (_this.board[i][j]) return;
	          if (boardData[i][j][color]) return;
	          boardData[i][j][color] = true;
	          boardData[i][j].visited = true;
	          scoreFloodFill(i, j + 1, color);
	          scoreFloodFill(i, j - 1, color);
	          scoreFloodFill(i + 1, j, color);
	          scoreFloodFill(i - 1, j, color);
	        }
	      };

	      for (var _i = 0; _i < this.size; _i++) {
	        for (var _j = 0; _j < this.size; _j++) {
	          if (!boardData[_i][_j].visited && this.board[_i][_j]) {
	            boardData[_i][_j].visited = true;
	            scoreFloodFill(_i, _j + 1, this.board[_i][_j].color);
	            scoreFloodFill(_i, _j - 1, this.board[_i][_j].color);
	            scoreFloodFill(_i + 1, _j, this.board[_i][_j].color);
	            scoreFloodFill(_i - 1, _j, this.board[_i][_j].color);
	          }
	        }
	      }

	      var whiteScore = 0,
	          blackScore = 0;

	      for (var _i2 = 0; _i2 < this.size; _i2++) {
	        for (var _j2 = 0; _j2 < this.size; _j2++) {
	          if (boardData[_i2][_j2].white && boardData[_i2][_j2].black) continue;else if (boardData[_i2][_j2].white) whiteScore++;else if (boardData[_i2][_j2].black) blackScore++;else continue;
	        }
	      }

	      // console.log(boardData)
	      console.log(whiteScore);
	      console.log(blackScore);

	      /**toastr.success**/alert('white score: ' + whiteScore + '+' + this.komi + '=' + (whiteScore + this.komi) + ', black score: ' + blackScore);

	      if (this.ranked) {
	        var w = whiteScore + this.komi,
	            b = blackScore;
	        if (this.playerColor === 'white') {
	          if (w < b) {
	            // lose
	            _user_api2.default.lose({ playerID: this.playerID, opponentID: this.opponentID });
	          } else if (w > b) {
	            // win
	            _user_api2.default.win({ playerID: this.playerID, opponentID: this.opponentID });
	          }
	        } else {
	          if (b < w) {
	            // lose
	            _user_api2.default.lose({ playerID: this.playerID, opponentID: this.opponentID });
	          } else if (b > w) {
	            // win
	            _user_api2.default.win({ playerID: this.playerID, opponentID: this.opponentID });
	          }
	        }
	      }

	      location.reload();
	    }
	  }, {
	    key: 'pass',
	    value: function pass() {
	      console.log('pass');
	      if (this.justPass) {
	        this.score();
	        _socket_api2.default.score(this.playerID, this.opponentID);
	        return;
	      }

	      if (this.opponentID) {
	        _socket_api2.default.sendMove(this.opponentID, -1, -1);
	      }

	      this.nextTurn();
	    }
	  }, {
	    key: 'resign',
	    value: function resign() {
	      console.log('resign');
	      _socket_api2.default.resign(this.playerID, this.opponentID);
	      /**toastr.info**/alert('You resigned');

	      if (this.ranked) {
	        _user_api2.default.lose({ playerID: this.playerID, opponentID: this.opponentID });
	      }

	      location.reload();
	    }
	  }, {
	    key: 'opponentResign',
	    value: function opponentResign() {
	      /**toastr.info**/alert('Opponent ' + this.opponentID + ' resigned');

	      if (this.ranked) {
	        _user_api2.default.win({ playerID: this.playerID, opponentID: this.opponentID });
	      }

	      location.reload();
	    }

	    // check if two boards have the same.

	  }, {
	    key: 'twoBoardsEqual',
	    value: function twoBoardsEqual(board) {
	      var board1 = this.board;
	      var board2 = board;

	      for (var i = 0; i < this.size; i++) {
	        for (var j = 0; j < this.size; j++) {
	          var stone1 = board1[i][j];
	          var stone2 = board2[i][j];

	          if (!stone1 && !stone2) {
	            continue;
	          } else if (stone1 && stone2 && stone1.color === stone2.color) {
	            continue;
	          } else {
	            return false;
	          }
	        }
	      }
	      return true;
	    }

	    // return true if it's a legal move
	    // otherwise return 'jie' or 'suicide'

	  }, {
	    key: 'checkCapture',
	    value: function checkCapture(row, col) {
	      var color = this.getColorForCurrentTurn();
	      var last = this.history.get(-1);

	      // check opponent
	      for (var i = 0; i < this.size; i++) {
	        for (var j = 0; j < this.size; j++) {
	          var stone = this.board[i][j];
	          if (stone && !stone.checked && stone.sameColor(color)) {
	            if (stone.hasNoQi()) {
	              this.board[i][j] = null; // not remove dom yet
	              if (this.twoBoardsEqual(last)) {
	                console.log('打劫！');
	                this.board[i][j] = stone; // restore
	                this.removeStone(row, col);
	                this.turn -= 1;
	                this.markAllStonsUncheckd();
	                return 'jie';
	              } else {
	                this.board[i][j] = stone; // restore. Have to restore first.
	                stone.removeStones();
	              }
	            }
	          }
	        }
	      }

	      // check self
	      for (var _i3 = 0; _i3 < this.size; _i3++) {
	        for (var _j3 = 0; _j3 < this.size; _j3++) {
	          var _stone = this.board[_i3][_j3];
	          if (_stone && !_stone.checked) {
	            // console.log('@@ check ' + i + ' ' + j)
	            if (_stone.hasNoQi()) {
	              // suicide
	              // TODO: hint user not to put stone this way
	              // console.log('@@ no qi ' + i + ' ' + j)
	              console.log('suicide');
	              this.removeStone(row, col); // restore
	              this.turn -= 1;
	              this.markAllStonsUncheckd();
	              return 'suicide';
	            }
	          }
	        }
	      }

	      this.markAllStonsUncheckd();
	      this.history.add(this.board); // save to history

	      this.justPass = false;

	      this.lastMove = [row, col];
	      return true;
	    }
	  }]);

	  return Board;
	}();

	module.exports = Board;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var History = function () {
	  function History() {
	    _classCallCheck(this, History);

	    this.history = [];
	  }

	  _createClass(History, [{
	    key: 'add',
	    value: function add(board) {
	      var b = [];
	      for (var i = 0; i < board.length; i++) {
	        b.push([]);
	        for (var j = 0; j < board[i].length; j++) {
	          b[i].push(board[i][j]);
	        }
	      }
	      this.history.push(b);
	    }
	  }, {
	    key: 'pop',
	    value: function pop() {
	      this.history.pop();
	    }
	  }, {
	    key: 'get',
	    value: function get(num) {
	      if (num >= 0) {
	        return this.history[num];
	      } else {
	        return this.history[this.history.length - 1 + num];
	      }
	    }
	  }]);

	  return History;
	}();

	exports.default = History;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Stone = function () {
	  function Stone(_ref) {
	    var board = _ref.board;
	    var row = _ref.row;
	    var col = _ref.col;
	    var color = _ref.color;

	    _classCallCheck(this, Stone);

	    this.board = board;
	    this.row = row;
	    this.col = col;
	    this.checked = false;
	    this.color = color;
	    this.image = this.getImage();
	  }

	  _createClass(Stone, [{
	    key: 'getImage',
	    value: function getImage() {
	      if (this.color === 'black') {
	        return './images/b.png';
	      } else {
	        return './images/w' + Math.floor(Math.random() * 15 + 1) + '.png';
	      }
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return 'Stone(' + this.row + ', ' + this.col + ')';
	    }
	  }, {
	    key: 'sameColor',
	    value: function sameColor(color) {
	      return this.color === color;
	    }

	    // check self and nearby stones qi

	  }, {
	    key: 'hasNoQi',
	    value: function hasNoQi() {
	      this.checked = true;

	      var noQi = true;
	      if (this.getQi() > 0) {
	        noQi = false;
	      }

	      var top = this.getTopStone(),
	          left = this.getLeftStone(),
	          right = this.getRightStone(),
	          bottom = this.getBottomStone();

	      if (top && top.sameColor(this.color) && !top.checked && !top.hasNoQi()) {
	        noQi = false;
	      }

	      if (left && left.sameColor(this.color) && !left.checked && !left.hasNoQi()) {
	        noQi = false;
	      }

	      if (right && right.sameColor(this.color) && !right.checked && !right.hasNoQi()) {
	        noQi = false;
	      }

	      if (bottom && bottom.sameColor(this.color) && !bottom.checked && !bottom.hasNoQi()) {
	        noQi = false;
	      }

	      return noQi;
	    }
	  }, {
	    key: 'getTopStone',
	    value: function getTopStone() {
	      if (this.row > 0) {
	        return this.board.board[this.row - 1][this.col];
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'getBottomStone',
	    value: function getBottomStone() {
	      if (this.row < this.board.size - 1) {
	        return this.board.board[this.row + 1][this.col];
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'getLeftStone',
	    value: function getLeftStone() {
	      if (this.col > 0) {
	        return this.board.board[this.row][this.col - 1];
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'getRightStone',
	    value: function getRightStone() {
	      if (this.col < this.board.size - 1) {
	        return this.board.board[this.row][this.col + 1];
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'getQi',
	    value: function getQi() {
	      var qi = 0;

	      // check top
	      if (this.row > 0) {
	        if (!this.board.board[this.row - 1][this.col]) {
	          qi += 1;
	        }
	      }

	      // check left
	      if (this.col > 0) {
	        if (!this.board.board[this.row][this.col - 1]) {
	          qi += 1;
	        }
	      }

	      // check right
	      if (this.col < this.board.size - 1) {
	        if (!this.board.board[this.row][this.col + 1]) {
	          qi += 1;
	        }
	      }

	      // check bottom
	      if (this.row < this.board.size - 1) {
	        if (!this.board.board[this.row + 1][this.col]) {
	          qi += 1;
	        }
	      }

	      return qi;
	    }

	    // return how many stones are removed

	  }, {
	    key: 'removeStones',
	    value: function removeStones() {
	      var count = 1;
	      this.board.removeStone(this.row, this.col);

	      var top = this.getTopStone(),
	          left = this.getLeftStone(),
	          right = this.getRightStone(),
	          bottom = this.getBottomStone();

	      if (top && top.sameColor(this.color)) {
	        count += top.removeStones();
	      }

	      if (left && left.sameColor(this.color)) {
	        count += left.removeStones();
	      }

	      if (right && right.sameColor(this.color)) {
	        count += right.removeStones();
	      }

	      if (bottom && bottom.sameColor(this.color)) {
	        count += bottom.removeStones();
	      }

	      return count;
	    }
	  }]);

	  return Stone;
	}();

	exports.default = Stone;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Simple = __webpack_require__(1);

	var _Simple2 = _interopRequireDefault(_Simple);

	var _emitter = __webpack_require__(6);

	var _emitter2 = _interopRequireDefault(_emitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Signup_Login = _Simple2.default.Component({
	  emitter: _emitter2.default,
	  init: function init() {
	    this.state = { showLogin: true };
	  },
	  render: function render() {
	    var _this = this;

	    return this.div({ class: 'signup-login-page' }, this.div({ class: 'container' }, this.div({ class: 'email field' }, this.input({ placeholder: 'Email', ref: 'email' })), this.div({ class: 'userID field ' + (this.state.showLogin ? 'hide' : 'show') }, this.input({ placeholder: 'User ID', ref: 'userID' })), this.div({ class: 'password field' }, this.input({ placeholder: 'Password', type: 'password', ref: 'password' })), this.div({ class: 'go', click: this.go.bind(this) }, 'Go'), this.a({ class: 'switch', click: function click() {
	        _this.setState({ showLogin: !_this.state.showLogin });
	      } }, this.state.showLogin ? 'Don\'t have account yet? Click me' : 'Already have an account? Click me')));
	  },
	  go: function go() {
	    var email = this.refs.email.value,
	        userID = this.refs.userID.value,
	        password = this.refs.password.value;

	    if (this.state.showLogin) {
	      // login
	      // missing information
	      if (!email.length || !password.length) {
	        return;
	      }

	      this.emit('login', { email: email, password: password });
	    } else {
	      // missing information
	      if (!email.length || !userID.length || !password.length) {
	        return;
	      }

	      this.emit('signup', { email: email, userID: userID, password: password });
	    }
	  }
	});

	exports.default = Signup_Login;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Simple = __webpack_require__(1);

	var _Simple2 = _interopRequireDefault(_Simple);

	var _emitter = __webpack_require__(6);

	var _emitter2 = _interopRequireDefault(_emitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Menu = _Simple2.default.Component({
	  emitter: _emitter2.default,
	  getDefaultProps: function getDefaultProps() {
	    return { playerID: null, MMR: 0 };
	  },
	  init: function init() {
	    /**
	     *  MAIN_MENU
	     *  SHOW_BOARD_SIZE
	     *  SHOW_MATCH_OPTIONS
	     *  SHOW_LEARDERBOARDS
	     *  SHOW_PUBLIC_MATCH
	     *  SHOW_RANKED_MATCH
	     *  RANKED_MATCH_FINDING_GAME
	     *  PUBLIC_MATCH_FINDING_GAME
	     */
	    this.state = { page: 'MAIN_MENU',
	      size: null,
	      color: 'black',
	      komi: 5.5,
	      opponentID: '',
	      leaderboards: [],
	      time: 0 };
	  },

	  selectBoardSize: function selectBoardSize(size, e) {
	    e.stopPropagation();
	    e.preventDefault();
	    this.state.size = size;
	    this.setState({ page: 'SHOW_MATCH_OPTIONS' });
	  },
	  rankedSelectBoardSize: function rankedSelectBoardSize(size) {
	    var _this = this;

	    this.emit('start-finding-ranked-match', { playerID: this.props.playerID, MMR: this.props.MMR, size: size });

	    this.setState({ page: 'RANKED_MATCH_FINDING_GAME' });

	    var time = 0;
	    this.interval = setInterval(function () {
	      time += 1;
	      _this.setState({ time: time });
	    }, 1000);
	  },
	  stopFindingRankedMatch: function stopFindingRankedMatch() {
	    this.emit('stop-finding-ranked-match', { playerID: this.props.playerID });

	    clearInterval(this.interval);
	    this.setState({ page: 'SHOW_RANKED_MATCH', time: 0 });
	  },
	  stopTimer: function stopTimer() {
	    clearInterval(this.interval);
	  },
	  publicSelectBoardSize: function publicSelectBoardSize(size) {
	    var _this2 = this;

	    this.emit('start-finding-public-match', { playerID: this.props.playerID, MMR: this.props.MMR, size: size });

	    this.setState({ page: 'PUBLIC_MATCH_FINDING_GAME' });

	    var time = 0;
	    this.interval = setInterval(function () {
	      time += 1;
	      _this2.setState({ time: time });
	    }, 1000);
	  },
	  stopFindingPublicMatch: function stopFindingPublicMatch() {
	    this.emit('stop-finding-public-match', { playerID: this.props.playerID });

	    clearInterval(this.interval);
	    this.setState({ page: 'SHOW_PUBLIC_MATCH', time: 0 });
	  },
	  selectColor: function selectColor(color) {
	    this.setState({ color: color });
	  },
	  showBoardSize: function showBoardSize(e) {
	    e.stopPropagation();
	    e.preventDefault();
	    this.setState({ page: 'SHOW_BOARD_SIZE' });
	  },
	  play: function play(mode) {
	    var komi = this.refs.komi.value;

	    if (isNaN(komi) || komi.trim() === '') {
	      toastr.warning('komi ' + komi + ' is an invalid number');
	      return;
	    }

	    komi = Number(komi);

	    var opponentID = this.refs.opponentID.value;
	    if (!opponentID) {
	      toastr.warning('please enter opponent ID');
	      return;
	    }

	    this.state.komi = komi;
	    this.state.opponentID = opponentID;

	    var size = this.state.size,
	        color = this.state.color;

	    if (color === 'random') {
	      if (Math.random() < 0.5) {
	        color = 'black';
	      } else {
	        color = 'white';
	      }
	    }

	    this.emit('find-private-match', { opponentID: opponentID, size: size, color: color, komi: komi });
	  },

	  showLeaderboards: function showLeaderboards() {
	    this.emit('request-top-50-players');
	    this.setState({ page: 'SHOW_LEARDERBOARDS' });
	  },

	  showPublicMatch: function showPublicMatch() {
	    this.setState({ page: 'SHOW_PUBLIC_MATCH' });
	  },

	  showRankedMatch: function showRankedMatch() {
	    this.setState({ page: 'SHOW_RANKED_MATCH' });
	  },

	  MMRNotHightEnough: function MMRNotHightEnough() {
	    toastr.warning('Sorry, you MMR ' + this.props.MMR + ' is not high enough to challenge this board size');
	  },

	  render: function render() {
	    var _this3 = this;

	    if (this.state.page === 'SHOW_MATCH_OPTIONS') {
	      return this.div({ class: 'menu' }, this.div({ class: 'pick-opponent' }, this.p({ class: 'title' }, 'Opponent ID'), this.input({ placeholder: 'opponent id here', value: this.state.opponentID, ref: 'opponentID', input: function input() {
	          _this3.state.opponentID = _this3.refs.opponentID.value;
	        } })), this.div({ class: 'pick-color' }, this.p({ class: 'title' }, 'Your Color'), this.div({ class: 'color-group' }, this.div({ class: 'black color ' + (this.state.color === 'black' ? 'selected' : ''), click: this.selectColor.bind(this, 'black') }, this.span('Black')), this.div({ class: 'white color ' + (this.state.color === 'white' ? 'selected' : ''), click: this.selectColor.bind(this, 'white') }, this.span('White')), this.div({ class: 'random color ' + (this.state.color === 'random' ? 'selected' : ''), click: this.selectColor.bind(this, 'random') }, this.span('Random')))), this.div({ class: 'pick-komi' }, this.p({ class: 'title' }, 'Komi'), this.input({ value: this.state.komi, ref: 'komi' })), this.div({ class: 'bottom-button-group' }, this.div({ class: 'small-btn', click: this.showBoardSize.bind(this) }, this.span('back')), this.div({ class: 'small-btn play', click: this.play.bind(this, 'private') }, this.span('play'))));
	    } else if (this.state.page === 'SHOW_BOARD_SIZE') {
	      return this.div({ class: 'menu' }, this.p({ class: 'menu-title' }, 'Board Size'), this.div({ class: 'button play', size: '19', click: this.selectBoardSize.bind(this, 19) }, this.span({ size: '19' }, '19x19')), this.div({ class: 'button play', size: '13', click: this.selectBoardSize.bind(this, 13) }, this.span({ size: '13' }, '13x13')), this.div({ class: 'button play', size: '9', click: this.selectBoardSize.bind(this, 9) }, this.span({ size: '9' }, '9x9')), this.div({ class: 'button back', click: function click() {
	          _this3.setState({ page: 'MAIN_MENU' });
	        } }, this.span('Back')));
	    } else if (this.state.page === 'SHOW_LEARDERBOARDS') {
	      var list = this.state.leaderboards.map(function (l) {
	        return _this3.div({ class: 'player ' + (l.userID === _this3.props.playerID ? 'me' : '') }, _this3.p({ class: 'ID' }, 'ID: ', _this3.span(l.userID)), _this3.p({ class: 'MMR' }, l.MMR));
	      });
	      return this.div({ class: 'leaderboards' }, this.p({ class: 'title' }, 'Your MMR is ', this.span(this.props.MMR)), this.div({ class: 'list' }, list), this.div({ class: 'btn', click: function click() {
	          _this3.setState({ page: 'MAIN_MENU' });
	        } }, this.span('Back')));
	    } else if (this.state.page === 'SHOW_RANKED_MATCH') {
	      return this.div({ class: 'menu ranked' }, this.p({ class: 'menu-title' }, 'Board Size'), this.div({ class: 'button play' + (this.props.MMR < 1600 ? ' locked' : ''), size: '19', click: this.props.MMR < 1600 ? this.MMRNotHightEnough.bind(this) : this.rankedSelectBoardSize.bind(this, 19) }, this.span({ size: '19' }, '19x19')), this.div({ class: 'button play' + (this.props.MMR < 1300 ? ' locked' : ''), size: '13', click: this.props.MMR < 1300 ? this.MMRNotHightEnough.bind(this) : this.rankedSelectBoardSize.bind(this, 13) }, this.span({ size: '13' }, '13x13')), this.div({ class: 'button play', size: '9', click: this.rankedSelectBoardSize.bind(this, 9) }, this.span({ size: '9' }, '9x9')), this.div({ class: 'button back', click: function click() {
	          _this3.setState({ page: 'MAIN_MENU' });
	        } }, this.span('Back')));
	    } else if (this.state.page === 'RANKED_MATCH_FINDING_GAME') {
	      return this.div({ class: 'menu ranked' }, this.p({ style: 'font-size: 32px;' }, 'Finding Match ...'), this.p({ style: 'font-size: 18px; margin-left: 32px;' }, this.state.time + 's'), this.div({ click: this.stopFindingRankedMatch.bind(this), style: 'padding: 12px; border: 2px solid white; width: 143px; text-align: center; margin-top: 32px; cursor: pointer;' }, 'Stop Finding Match'));
	    } else if (this.state.page === 'SHOW_PUBLIC_MATCH') {
	      return this.div({ class: 'menu public' }, this.p({ class: 'menu-title' }, 'Board Size'), this.div({ class: 'button play', size: '19', click: this.publicSelectBoardSize.bind(this, 19) }, this.span({ size: '19' }, '19x19')), this.div({ class: 'button play', size: '13', click: this.publicSelectBoardSize.bind(this, 13) }, this.span({ size: '13' }, '13x13')), this.div({ class: 'button play', size: '9', click: this.publicSelectBoardSize.bind(this, 9) }, this.span({ size: '9' }, '9x9')), this.div({ class: 'button back', click: function click() {
	          _this3.setState({ page: 'MAIN_MENU' });
	        } }, this.span('Back')));
	    } else if (this.state.page === 'PUBLIC_MATCH_FINDING_GAME') {
	      return this.div({ class: 'menu public' }, this.p({ style: 'font-size: 32px;' }, 'Finding Match ...'), this.p({ style: 'font-size: 18px; margin-left: 32px;' }, this.state.time + 's'), this.div({ click: this.stopFindingPublicMatch.bind(this), style: 'padding: 12px; border: 2px solid white; width: 143px; text-align: center; margin-top: 32px; cursor: pointer;' }, 'Stop Finding Match'));
	    } else {
	      // if (this.state.page === 'MAIN_MENU') {
	      return this.div({ class: 'menu' }, this.p({ class: 'menu-title' }, 'Go! ' + this.props.playerID), this.div({ class: 'button private-match',
	        click: function click() {
	          _this3.setState({ page: 'SHOW_BOARD_SIZE' });
	        } }, this.span('Private Match')), this.div({ class: 'button public-match', click: this.showPublicMatch.bind(this) }, this.span('Public Match')), this.div({ class: 'button', click: this.showRankedMatch.bind(this) }, this.span('Ranked Match')), this.div({ class: 'button', click: this.showLeaderboards.bind(this) }, this.span('Leaderboards')));
	    }
	  }
	});

	exports.default = Menu;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Simple = __webpack_require__(1);

	var _Simple2 = _interopRequireDefault(_Simple);

	var _emitter = __webpack_require__(6);

	var _emitter2 = _interopRequireDefault(_emitter);

	var _board = __webpack_require__(16);

	var _board2 = _interopRequireDefault(_board);

	var _board_menu = __webpack_require__(17);

	var _board_menu2 = _interopRequireDefault(_board_menu);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Match = _Simple2.default.Component({
	  emitter: _emitter2.default,
	  getDefaultProps: function getDefaultProps() {
	    return { board: null, messages: [] };
	  },
	  init: function init() {
	    this.emit('match-register-self');
	  },
	  // componentDidMount doesn't work
	  render: function render() {
	    return this.div({ class: 'match' }, (0, _board2.default)({ board: this.props.board }), (0, _board_menu2.default)({ board: this.props.board, messages: this.props.messages }));
	  }
	});

	exports.default = Match;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Simple = __webpack_require__(1);

	var _Simple2 = _interopRequireDefault(_Simple);

	var _emitter = __webpack_require__(6);

	var _emitter2 = _interopRequireDefault(_emitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Stone = _Simple2.default.Component({});

	var GridTouch = _Simple2.default.Component({
	  emitter: _emitter2.default,
	  init: function init() {
	    this.state = {
	      hover: false,
	      showIcon: false
	    };
	  },
	  onClick: function onClick(e) {
	    e.preventDefault();
	    e.stopPropagation();

	    var row = this.props.row,
	        col = this.props.col,
	        board = this.props.board;

	    this.emit('board-put-stone', { row: row, col: col });
	  },

	  onMouseEnter: function onMouseEnter() {
	    this.setState({ hover: true });
	  },

	  onMouseLeave: function onMouseLeave() {
	    this.setState({ hover: false });
	  },

	  render: function render() {
	    var row = this.props.row,
	        col = this.props.col,
	        gridSize = this.props.gridSize,
	        board = this.props.board;

	    var style = {
	      width: gridSize,
	      height: gridSize
	    };

	    // background: 'rgba(88, 149, 40, 0.5)'
	    if (row < board.size - 1 && col < board.size - 1) {
	      style.left = -gridSize / 2;
	      style.top = -gridSize / 2;
	    } else if (row === board.size - 1 && col === board.size - 1) {
	      style.right = -gridSize / 2;
	      style.bottom = -gridSize / 2;
	    } else if (row === board.size - 1) {
	      style.left = -gridSize / 2;
	      style.bottom = -gridSize / 2;
	    } else if (col === board.size - 1) {
	      style.right = -gridSize / 2;
	      style.top = -gridSize / 2;
	    }

	    if (board.board[row][col]) {
	      var s = board.board[row][col];
	      style.backgroundImage = 'url("' + s.image + '")';
	      style.borderRadius = gridSize + 'px';

	      var mark = null;
	      if (board.lastMove && board.lastMove[0] === row && board.lastMove[1] === col) {
	        mark = this.div({ class: s.color === 'black' ? 'mark-w' : 'mark-b',
	          style: {
	            width: gridSize,
	            height: gridSize
	          } });
	      }

	      return this.div({ class: 'stone ' + s.color,
	        style: style }, mark);
	    }

	    if (this.state.showIcon) {
	      return this.div({ class: this.state.showIcon,
	        style: style });
	    }

	    var dot = null;

	    if (board.size === 9) {
	      if ((row === 2 || row === 6) && (col === 2 || col === 6) || row === 4 && col === 4) {
	        dot = this.div({ class: 'dot' });
	      }
	    }

	    if (board.size === 13) {
	      if ((row === 3 || row === 9) && (col === 3 || col === 9) || row === 6 && col === 6) {
	        dot = this.div({ class: 'dot' });
	      }
	    }

	    if (board.size === 19) {
	      if ((row === 3 || row === 9 || row === 15) && (col === 3 || col === 9 || col === 15) || row === 9 && col === 9) {
	        dot = this.div({ class: 'dot dot-19' });
	      }
	    }

	    return this.div({ class: 'grid-touch',
	      style: style,
	      click: this.onClick.bind(this),
	      mouseenter: this.onMouseEnter.bind(this),
	      mouseleave: this.onMouseLeave.bind(this) }, dot, this.state.hover && board.isMyTurn() ? this.div({ class: 'stone ' + (board.turn % 2 === 0 ? 'black' : 'white'),
	      style: {
	        width: gridSize,
	        height: gridSize,
	        borderRadius: gridSize + 'px',
	        backgroundImage: 'url("' + board.getStoneImage() + '")',
	        opacity: 0.5
	      } }) : null);
	  }
	});

	var GridRow = _Simple2.default.Component({
	  render: function render() {
	    var row = this.props.row,
	        i = row,
	        board = this.props.board,
	        boardSize = 664 - 96,
	        gridSize = boardSize / (board.size - 1);

	    var grids = [];
	    for (var j = 0; j < board.size - 1; j++) {
	      grids.push(this.div({ style: { width: gridSize, height: gridSize }, class: 'grid' }, GridTouch({ row: i, col: j, gridSize: gridSize, board: board }), j === board.size - 2 ? GridTouch({ row: i, col: j + 1, gridSize: gridSize, board: board }) : null, i === board.size - 2 ? GridTouch({ row: i + 1, col: j, gridSize: gridSize, board: board }) : null, i === board.size - 2 && j === board.size - 2 ? GridTouch({ row: i + 1, col: j + 1, gridSize: gridSize, board: board }) : null));
	    }
	    return this.div({ class: 'grid-row' }, grids);
	  }
	});

	var Board = _Simple2.default.Component({
	  emitter: _emitter2.default,
	  getDefaultProps: function getDefaultProps() {
	    return {
	      board: null
	    };
	  },
	  init: function init() {
	    this.emit('board-register-self');
	  },
	  render: function render() {
	    var board = this.props.board;

	    var gridRow = [];
	    for (var i = 0; i < board.size - 1; i++) {
	      gridRow.push(GridRow({ row: i, board: board }));
	    }
	    return this.div({ class: 'board' }, gridRow);
	  }
	});

	exports.default = Board;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Simple = __webpack_require__(1);

	var _Simple2 = _interopRequireDefault(_Simple);

	var _chat = __webpack_require__(18);

	var _chat2 = _interopRequireDefault(_chat);

	var _emitter = __webpack_require__(6);

	var _emitter2 = _interopRequireDefault(_emitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Card = _Simple2.default.Component(function (_ref) {
	  var board = _ref.board;
	  var color = _ref.color;

	  return this.div({ class: 'card ' + color + ' ' + (board.getColorForCurrentTurn() === color ? 'this-turn' : '') }, this.div({ class: 'profile-image' }), this.p({ class: 'name' }, board.playerColor === color ? board.playerID : board.opponentID), board.playerColor === color ? board.isMyTurn() ? this.div({ class: 'button-group' }, this.div({ class: 'pass' }, this.div({ class: 'btn pass-btn', click: function click() {
	      _emitter2.default.emit('pass');
	    } }, 'Pass')), this.div({ class: 'resign' }, this.div({ class: 'btn resign-btn', click: function click() {
	      _emitter2.default.emit('resign');
	    } }, 'Resign'))) : this.div({ class: 'button-group' }, color === 'black' ? 'White to move' : 'Black to move') : null);
	});

	/**
	 * Require props:
	 * 		playerID
	 * 		opponentID
	 * 		board
	 */
	var BoardMenu = _Simple2.default.Component({
	  getDefaultProps: function getDefaultProps() {
	    return { messages: [] };
	  },
	  render: function render() {
	    return this.div({ class: 'board-menu' }, this.div({ class: 'players' }, this.div({ class: 'player' }, Card({ board: this.props.board, color: 'black' })), this.div({ class: 'player' }, Card({ board: this.props.board, color: 'white' }))), (0, _chat2.default)({ playerID: this.props.board.playerID,
	      opponentID: this.props.board.opponentID,
	      messages: this.props.messages }));
	  }
	});

	exports.default = BoardMenu;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Simple = __webpack_require__(1);

	var _Simple2 = _interopRequireDefault(_Simple);

	var _emitter = __webpack_require__(6);

	var _emitter2 = _interopRequireDefault(_emitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Message = _Simple2.default.Component(function (props) {
	  var id = props.id,
	      message = props.message,
	      me = props.me;
	  return this.div({ class: 'message-box ' + (me ? 'me' : '') }, this.p({ class: 'id' }, id + ':'), this.p({ class: 'message' }, message));
	});

	/**
	 *
	 * Require props:
	 * 		playerID
	 *   	opponentID
	 *   	messages
	 */
	var Chat = _Simple2.default.Component({
	  emitter: _emitter2.default,
	  getDefaultProps: function getDefaultProps() {
	    return {
	      messages: []
	    };
	  },
	  init: function init() {
	    this.emit('chat-register-self');
	  },
	  //componentDidMount: function() {
	  //},
	  onInput: function onInput(e) {
	    if (e.which === 13) {
	      var message = e.target.value.trim();
	      if (!message) return;
	      this.emit('send-message', { message: message });
	      e.target.value = '';
	    }
	  },

	  render: function render() {
	    var messagesDom = [];
	    for (var i = this.props.messages.length - 1; i >= 0; i--) {
	      messagesDom.push(Message(this.props.messages[i]));
	    }
	    return this.div({ class: 'chat-div' }, this.div({ class: 'chat-content' }, messagesDom), this.div({ class: 'input-box' }, this.input({ placeholder: 'enter your chat message here',
	      keypress: this.onInput.bind(this) })));
	  }
	});

	exports.default = Chat;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _socket_api = __webpack_require__(7);

	var _socket_api2 = _interopRequireDefault(_socket_api);

	var _user_api = __webpack_require__(8);

	var _user_api2 = _interopRequireDefault(_user_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var chat = {
	  'chat-register-self': function chatRegisterSelf(data, component) {
	    this.state.chat.component = component;
	  },

	  'send-message': function sendMessage(_ref, component) {
	    var message = _ref.message;

	    var playerID = this.state.playerID,
	        opponentID = this.state.opponentID;

	    _socket_api2.default.sendMessage({ playerID: playerID, opponentID: opponentID, message: message });
	    var messages = this.state.chat.messages;
	    messages.push({ id: playerID, message: message, me: true });
	    component.setProps({ playerID: playerID, opponentID: opponentID, messages: messages });
	  },
	  'receive-message': function receiveMessage(_ref2) {
	    var opponentID = _ref2.opponentID;
	    var message = _ref2.message;

	    var messages = this.state.chat.messages,
	        playerID = this.state.playerID;

	    messages.push({ id: opponentID, message: message, me: false });

	    if (this.state.chat.component) {
	      this.state.chat.component.setProps({ playerID: playerID, opponentID: opponentID, messages: messages.slice(0) });
	    }
	  }
	};

	exports.default = chat;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _socket_api = __webpack_require__(7);

	var _socket_api2 = _interopRequireDefault(_socket_api);

	var _user_api = __webpack_require__(8);

	var _user_api2 = _interopRequireDefault(_user_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var menu = {
	  'request-top-50-players': function requestTop50Players(data, component) {
	    _user_api2.default.requestTop50Players(function (res) {
	      if (res && res.length) {
	        component.setState({ leaderboards: res });
	      }
	    });
	  },

	  'find-private-match': function findPrivateMatch(_ref, component) {
	    var opponentID = _ref.opponentID;
	    var size = _ref.size;
	    var color = _ref.color;
	    var komi = _ref.komi;

	    _socket_api2.default.inviteMatch({ opponentID: opponentID, size: size, color: color, komi: komi });
	  },

	  'start-finding-ranked-match': function startFindingRankedMatch(_ref2, component) {
	    var playerID = _ref2.playerID;
	    var MMR = _ref2.MMR;
	    var size = _ref2.size;

	    this.state.menuComponent = component;
	    _user_api2.default.findRankedMatch({ playerID: playerID, MMR: MMR, size: size });
	  },

	  'stop-finding-ranked-match': function stopFindingRankedMatch(_ref3, component) {
	    var playerID = _ref3.playerID;

	    _user_api2.default.stopFindingRankedMatch({ playerID: playerID });
	  },

	  'start-finding-public-match': function startFindingPublicMatch(_ref4, component) {
	    var playerID = _ref4.playerID;
	    var MMR = _ref4.MMR;
	    var size = _ref4.size;

	    this.state.menuComponent = component;
	    _user_api2.default.findPublicMatch({ playerID: playerID, MMR: MMR, size: size });
	  },

	  'stop-finding-public-match': function stopFindingPublicMatch(_ref5, component) {
	    var playerID = _ref5.playerID;

	    _user_api2.default.stopFindingPublicMatch({ playerID: playerID });
	  }
	};

	exports.default = menu;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _socket_api = __webpack_require__(7);

	var _socket_api2 = _interopRequireDefault(_socket_api);

	var _user_api = __webpack_require__(8);

	var _user_api2 = _interopRequireDefault(_user_api);

	var _board = __webpack_require__(10);

	var _board2 = _interopRequireDefault(_board);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var match = {
	  'start-match': function startMatch(_ref) {
	    var opponentID = _ref.opponentID;
	    var size = _ref.size;
	    var color = _ref.color;
	    var komi = _ref.komi;
	    var ranked = _ref.ranked;

	    this.state.opponentID = opponentID;
	    this.state.board = new _board2.default({ playerID: this.state.playerID, opponentID: opponentID, size: size, playerColor: color, komi: komi, ranked: ranked });

	    if (this.state.menuComponent) {
	      // as componentDidUnmount is not implemented in Simple library...
	      this.state.menuComponent.stopTimer();
	    }

	    var gameComponent = this.state.gameComponent;
	    gameComponent.setProps({ page: 'SHOW_MATCH', board: this.state.board });
	  },

	  'match-register-self': function matchRegisterSelf(data, component) {
	    this.state.matchComponent = component;
	  },

	  'board-register-self': function boardRegisterSelf(data, component) {
	    this.state.boardComponent = component;
	  },

	  'board-put-stone': function boardPutStone(_ref2, component) {
	    var row = _ref2.row;
	    var col = _ref2.col;

	    var board = this.state.board;
	    if (!board.isMyTurn()) return;
	    var res = board.addStone(row, col);

	    if (res === true) {
	      _socket_api2.default.sendMove(this.state.opponentID, row, col);
	      this.state.matchComponent.setProps({ board: board, messages: this.state.chat.messages.slice(0) });
	    } else {
	      component.setState({ 'showIcon': res });

	      setTimeout(function () {
	        component.setState({ 'showIcon': false });
	      }, 2000);
	    }
	  },

	  'board-receive-move': function boardReceiveMove(_ref3) {
	    var row = _ref3.row;
	    var col = _ref3.col;

	    var board = this.state.board;
	    if (row === -1 || col === -1) {
	      // pass
	      board.nextTurn(true);
	    } else {
	      board.addStone(row, col);
	    }
	    this.state.matchComponent.setProps({ board: board, messages: this.state.chat.messages.slice(0) });
	  },

	  'pass': function pass() {
	    this.state.board.pass();
	    this.state.matchComponent.setProps({ board: this.state.board, messages: this.state.chat.messages.slice(0) });
	  },

	  'resign': function resign() {
	    this.state.board.resign();
	  },

	  'opponent-score': function opponentScore() {
	    this.state.board.score();
	  },

	  'opponent-resign': function opponentResign() {
	    this.state.board.opponentResign();
	  }

	};

	exports.default = match;

/***/ }
/******/ ]);