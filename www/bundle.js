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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Stone = __webpack_require__(1).Stone;
	var Board = __webpack_require__(2);
	var socketAPI = __webpack_require__(5);
	var userAPI = __webpack_require__(8);
	var Menu = __webpack_require__(9);
	var Signup_Login = __webpack_require__(10);
	var BoardMenu = __webpack_require__(11);

	var GameManager = function () {
	  function GameManager() {
	    var _this = this;

	    _classCallCheck(this, GameManager);

	    this.$game = $('.game');
	    userAPI.checkAuth(function (res) {
	      if (res && res.success) {
	        _this.playerID = res.userID;
	        // $('.user-id').html('User ID: ' + this.playerID)
	        socketAPI.userLoggedIn(_this.playerID);
	        _this.showMenu();
	      } else {
	        _this.signup_login_page = new Signup_Login();
	        _this.signup_login_page.appendTo($('.game'));
	      }
	    });

	    document.body.addEventListener('touchmove', function (e) {
	      e.preventDefault();
	    });

	    // this.startNewMatch(19, 'white', 'opponentID')
	  }

	  _createClass(GameManager, [{
	    key: 'setPlayerID',
	    value: function setPlayerID(id) {
	      this.playerID = id;
	    }
	  }, {
	    key: 'startNewMatch',
	    value: function startNewMatch(size, playerColor, opponentID) {
	      this.board = new Board({ size: size,
	        playerColor: playerColor,
	        playerID: this.playerID,
	        opponentID: opponentID,
	        gameManager: this });
	      this.board.render(this.$game);
	      // this.board.appendTo(this.$game)

	      this.boardMenu = new BoardMenu(this.board);
	      this.boardMenu.appendTo(this.$game);
	    }
	  }, {
	    key: 'updateBoardMenu',
	    value: function updateBoardMenu() {
	      this.boardMenu.forceUpdate();
	    }
	  }, {
	    key: 'showMenu',
	    value: function showMenu() {
	      if (this.signup_login_page) {
	        this.signup_login_page.remove();
	        this.signup_login_page = null;
	      }

	      if (this.board) {
	        this.board.remove();
	        this.board = null;
	      }

	      if (this.boardMenu) {
	        this.boardMenu.remove();
	        this.boardMenu = null;
	      }

	      // TODO: remove board

	      this.menu = new Menu(this);
	      this.menu.appendTo($('.game'));
	    }
	  }]);

	  return GameManager;
	}();

	// 没什么卵用的 loading screen


	$('.loading-screen .logo').fadeIn(1000, function () {
	  setTimeout(function () {
	    $('.loading-screen .logo').fadeOut(1000, function () {
	      $('.loading-screen').remove();
	    });
	  }, 1600);
	});

	window.gameManager = new GameManager();
	// let board = new Board({size: 9})
	//board.board[1][1] = {color: 'black'}
	// board.score()

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Stone = function () {
	  function Stone($stone, board) {
	    _classCallCheck(this, Stone);

	    this.$stone = $stone;
	    this.board = board;
	    this.row = $stone.data('row');
	    this.col = $stone.data('col');
	    this.checked = false;
	    this.color = $stone.hasClass('black') ? 'black' : 'white';
	  }

	  _createClass(Stone, [{
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

	      // console.log(this.row + ' ' + this.col + ' qi: ' + qi)

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

	module.exports = Stone;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Grid = __webpack_require__(3);
	var Stone = __webpack_require__(1);
	var History = __webpack_require__(4).History;
	var socketAPI = __webpack_require__(5);
	var Simple = __webpack_require__(7);

	// 假设只 9x9

	var Board = function (_Simple) {
	  _inherits(Board, _Simple);

	  // 9x9 13x13 19x19

	  function Board( /*size, playerColor, opponentID */props) {
	    _classCallCheck(this, Board);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Board).call(this));

	    _this.size = props.size || 19;
	    _this.playerColor = props.playerColor || 'black';
	    _this.playerID = props.playerID || null;
	    _this.opponentID = props.opponentID || null;
	    _this.gameManager = props.gameManager || null;

	    _this.board = [];
	    _this.boardDom = [];

	    _this.turn = 0;
	    _this.history = new History();

	    _this.$mark = null;
	    _this.justPass = false;

	    // create board data
	    for (var i = 0; i < _this.size; i++) {
	      _this.board.push([]);
	      _this.boardDom.push([]);

	      for (var j = 0; j < _this.size; j++) {
	        _this.board[i].push(null);
	        _this.boardDom[i].push(null);
	      }
	    }

	    _this.history.add(_this.board);
	    return _this;
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

	      this.gameManager.updateBoardMenu();
	    }
	  }, {
	    key: 'addStone',
	    value: function addStone(row, col) {
	      if (this.board[row][col]) return;

	      var $stone = $('<div class="stone ' + (this.turn % 2 === 0 ? 'black' : 'white') + '" style=\'width: ' + this.stoneSize + 'px; height: ' + this.stoneSize + 'px; border-radius: ' + this.stoneSize + 'px; background-image: url("' + this.getStoneImage() + '");\' data-row=' + row + ' data-col=' + col + ' id="stone-' + row + '-' + col + '"> </div>');

	      $('#grid-touch-' + row + '-' + col).append($stone);

	      var stone = new Stone($stone, this);

	      this.board[row][col] = stone; // set to Go board

	      this.turn += 1;

	      // console.log('enter here')

	      this.checkCapture(row, col);
	    }
	  }, {
	    key: 'removeStone',
	    value: function removeStone(row, col) {
	      if (this.board[row][col]) {
	        this.board[row][col].$stone.remove();
	        this.board[row][col] = null;
	      }
	    }
	  }, {
	    key: 'score',
	    value: function score() {
	      var _this2 = this;

	      console.log('score');
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
	        if (i >= 0 && i < _this2.size && j >= 0 && j < _this2.size) {
	          if (_this2.board[i][j]) return;
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

	      console.log(boardData);
	      console.log(whiteScore);
	      console.log(blackScore);

	      alert('white score: ' + whiteScore + ', black score: ' + blackScore);

	      location.reload();
	    }
	  }, {
	    key: 'pass',
	    value: function pass() {
	      console.log('pass');
	      if (this.justPass) {
	        this.score();
	        socketAPI.score(this.userID, this.opponentID);
	        return;
	      }

	      if (this.opponentID) {
	        socketAPI.sendMove(this.opponentID, -1, -1);
	      }

	      this.nextTurn();
	    }
	  }, {
	    key: 'resign',
	    value: function resign() {
	      console.log('resign');
	      socketAPI.resign(this.userID, this.opponentID);
	      alert('You resigned');

	      location.reload();
	    }
	  }, {
	    key: 'opponentResign',
	    value: function opponentResign() {
	      alert('Opponent ' + this.opponentID + ' resigned');

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
	  }, {
	    key: 'showIcon',
	    value: function showIcon(row, col, iconName) {
	      var $gridTouch = this.boardDom[row][col].$gridTouch;
	      var $icon = $('<div class=\'' + iconName + '\'> </div>');
	      $icon.css('width', $gridTouch.css('width'));
	      $icon.css('height', $gridTouch.css('height'));
	      $icon.css('left', $gridTouch.css('left'));
	      $icon.css('right', $gridTouch.css('right'));
	      $icon.css('top', $gridTouch.css('top'));
	      $icon.css('bottom', $gridTouch.css('bottom'));

	      this.boardDom[row][col].$grid.append($icon);

	      $icon.fadeOut(2000, function () {
	        $icon.remove();
	      });
	    }
	  }, {
	    key: 'setMark',
	    value: function setMark(row, col) {
	      if (this.$mark) {
	        this.$mark.remove();
	      }

	      var $grid = this.boardDom[row][col].$grid;
	      var $gridTouch = this.boardDom[row][col].$gridTouch;
	      var $mark = $('<div class="' + (this.board[row][col].color === 'black' ? 'mark-w' : 'mark-b') + '"></div>');
	      $mark.css('width', $grid.css('width'));
	      $mark.css('height', $grid.css('height'));
	      $mark.css('left', $gridTouch.css('left'));
	      $mark.css('right', $gridTouch.css('right'));
	      $mark.css('top', $gridTouch.css('top'));
	      $mark.css('bottom', $gridTouch.css('bottom'));

	      this.$mark = $mark;
	      this.boardDom[row][col].$grid.append(this.$mark);

	      if (this.$mark) {
	        this.$mark.remove();
	      } else {
	        var _$gridTouch = this.boardDom[row][col].$gridTouch;
	        var _$mark = $('<div class=\'mark\'> </div>');
	        _$mark.css('width', _$gridTouch.css('width'));
	        _$mark.css('height', _$gridTouch.css('height'));
	        _$mark.css('left', _$gridTouch.css('left'));
	        _$mark.css('right', _$gridTouch.css('right'));
	        _$mark.css('top', _$gridTouch.css('top'));
	        _$mark.css('bottom', _$gridTouch.css('bottom'));

	        this.$mark = _$mark;
	      }

	      this.boardDom[row][col].$grid.append(this.$mark);
	    }
	  }, {
	    key: 'checkCapture',
	    value: function checkCapture(row, col) {
	      var color = this.turn % 2 === 0 ? 'black' : 'white';
	      var last = this.history.get(-1);

	      // check opponent
	      for (var i = 0; i < this.size; i++) {
	        for (var j = 0; j < this.size; j++) {
	          var stone = this.board[i][j];
	          if (stone && !stone.checked && stone.sameColor(color)) {
	            // console.log('@ check ' + i + ' ' + j)
	            if (stone.hasNoQi()) {
	              this.board[i][j] = null; // not remove dom yet
	              if (this.twoBoardsEqual(last)) {
	                console.log('打劫！');
	                this.showIcon(row, col, 'jie');
	                this.board[i][j] = stone; // restore
	                this.removeStone(row, col);
	                this.turn -= 1;
	                this.markAllStonsUncheckd();
	                return;
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
	              this.showIcon(row, col, 'suicide');
	              this.removeStone(row, col); // restore
	              this.turn -= 1;
	              this.markAllStonsUncheckd();
	              return;
	            }
	          }
	        }
	      }

	      this.markAllStonsUncheckd();
	      this.history.add(this.board); // save to history
	      // this.setMark(row, col) // mark lastest stone
	      this.setMark(row, col);

	      this.justPass = false;

	      if (this.opponentID) {
	        socketAPI.sendMove(this.opponentID, row, col);
	      }

	      if (this.gameManager) {
	        this.gameManager.updateBoardMenu();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render($el) {
	      var dom = $('<div class="board"></div>');

	      if ($el) {
	        $el.append(dom);
	      }

	      var boardSize = dom.width(),
	          // excluding padding  // 576,
	      gridSize = boardSize / (this.size - 1);

	      dom.css('height', boardSize + parseInt(dom.css('padding'), 10) * 2 + 'px'); // set height

	      var stoneSize = gridSize;
	      this.stoneSize = gridSize;

	      for (var i = 0; i < this.size - 1; i++) {
	        var gridRow = $('<div class="grid-row"></div>');
	        for (var j = 0; j < this.size - 1; j++) {
	          var grid = $('<div style=\'width: ' + gridSize + 'px; height: ' + gridSize + 'px;\' class="grid"></div>');

	          var gridTouch = $('<div class="grid-touch"\n                                data-row=' + i + '\n                                data-col=' + j + '\n                                id="grid-touch-' + i + '-' + j + '"\n                                style="width: ' + stoneSize + 'px; height: ' + stoneSize + 'px; left: ' + -stoneSize / 2 + 'px; top: ' + -stoneSize / 2 + 'px;"> </div>');
	          this.boardDom[i][j] = new Grid(gridTouch, grid, this);
	          grid.append(gridTouch);

	          if (j === this.size - 2) {
	            var _gridTouch = $('<div class="grid-touch grid-touch-right-top"\n                                  data-row=' + i + '\n                                  data-col=' + (j + 1) + '\n                                  id="grid-touch-' + i + '-' + (j + 1) + '"\n                                  style="width: ' + stoneSize + 'px; height: ' + stoneSize + 'px; right: ' + -stoneSize / 2 + 'px; top: ' + -stoneSize / 2 + 'px;"> </div>');
	            this.boardDom[i][j + 1] = new Grid(_gridTouch, grid, this);
	            grid.append(_gridTouch);
	          }

	          if (i === this.size - 2) {
	            var _gridTouch2 = $('<div class="grid-touch grid-touch-left-bottom"\n                                  data-row=' + (i + 1) + '\n                                  data-col=' + j + '\n                                  id="grid-touch-' + (i + 1) + '-' + j + '"\n                                  style="width: ' + stoneSize + 'px; height: ' + stoneSize + 'px; left: ' + -stoneSize / 2 + 'px; bottom: ' + -stoneSize / 2 + 'px;"> </div>');
	            this.boardDom[i + 1][j] = new Grid(_gridTouch2, grid, this);
	            grid.append(_gridTouch2);
	          }

	          if (i === this.size - 2 && j === this.size - 2) {
	            var _gridTouch3 = $('<div class="grid-touch grid-touch-right-bottom"\n                                  data-row=' + (i + 1) + '\n                                  data-col=' + (j + 1) + '\n                                  id="grid-touch-' + (i + 1) + '-' + (j + 1) + '"\n                                  style="width: ' + stoneSize + 'px; height: ' + stoneSize + 'px; right: ' + -stoneSize / 2 + 'px; bottom: ' + -stoneSize / 2 + 'px;"> </div>');
	            this.boardDom[i + 1][j + 1] = new Grid(_gridTouch3, grid, this);
	            grid.append(_gridTouch3);
	          }

	          gridRow.append(grid);
	        }
	        dom.append(gridRow);
	      }

	      return dom;
	    }
	  }]);

	  return Board;
	}(Simple);

	module.exports = Board;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Stone = __webpack_require__(1);

	var Grid = function () {
	  function Grid($gridTouch, $grid, board) {
	    var _this = this;

	    _classCallCheck(this, Grid);

	    this.$gridTouch = $gridTouch;
	    this.$grid = $grid;
	    this.board = board;
	    this.stoneSize = Number(this.$grid.css('width').replace('px', ''));

	    this.$hoverElement = null;

	    this.row = this.$gridTouch.data('row');
	    this.col = this.$gridTouch.data('col');

	    this.addDot();

	    $gridTouch.click(function () {
	      if (!_this.board.isMyTurn()) return;
	      _this.board.addStone(_this.row, _this.col);
	    });

	    var isTouchDevice = 'ontouchstart' in window || 'onmsgesturechange' in window;
	    if (!isTouchDevice) {
	      $gridTouch.hover(function () {
	        if (_this.$hoverElement || _this.board.board[_this.row][_this.col] || !_this.board.isMyTurn()) return;else {
	          _this.$hoverElement = $('<div class="stone ' + (_this.board.turn % 2 === 0 ? 'black' : 'white') + '" style=\'width: ' + _this.stoneSize + 'px; height: ' + _this.stoneSize + 'px; border-radius: ' + _this.stoneSize + 'px; background-image: url("' + _this.board.getStoneImage() + '"); opacity: 0.5;\' data-row=' + _this.row + ' data-col=' + _this.col + '> </div>');

	          _this.$gridTouch.append(_this.$hoverElement);
	        }
	      }, function () {
	        if (_this.$hoverElement) {
	          _this.$hoverElement.remove();
	          _this.$hoverElement = null;
	        }
	      });
	    }
	  }

	  _createClass(Grid, [{
	    key: 'addDot',
	    value: function addDot() {
	      if (this.board.size === 9) {
	        if ((this.row === 2 || this.row === 6) && (this.col === 2 || this.col === 6) || this.row === 4 && this.col === 4) {
	          this.$gridTouch.append($('<div class="dot"></div>'));
	        }
	      }

	      if (this.board.size === 13) {
	        if ((this.row === 3 || this.row === 9) && (this.col === 3 || this.col === 9) || this.row === 6 && this.col === 6) {
	          this.$gridTouch.append($('<div class="dot"></div>'));
	        }
	      }

	      if (this.board.size === 19) {
	        if ((this.row === 3 || this.row === 9 || this.row === 15) && (this.col === 3 || this.col === 9 || this.col === 15) || this.row === 9 && this.col === 9) {
	          this.$gridTouch.append($('<div class="dot dot-19"></div>'));
	        }
	      }
	    }
	  }]);

	  return Grid;
	}();

	module.exports = Grid;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

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

	module.exports = {
	  History: History
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Simple = __webpack_require__(6);

	var _Simple2 = _interopRequireDefault(_Simple);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (!window.socket) {
	  window.socket = io();
	}

	var socket = window.socket;
	var emitters = {};

	var socketAPI = {
	  inviteMatch: function inviteMatch(opponentID, size) {
	    socket.emit('invite-match', opponentID, size);
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

	  sendMessage: function sendMessage(_ref) {
	    var playerID = _ref.playerID;
	    var opponentID = _ref.opponentID;
	    var message = _ref.message;
	    var chatEmitter = _ref.chatEmitter;

	    socket.emit('send-message', playerID, opponentID, message);
	    emitters.chatEmitter = chatEmitter;
	  }
	};

	socket.on('opponent-not-found', function (opponentID) {
	  alert('opponent ' + opponentID + ' not found');
	});

	socket.on('invitation-sent', function (opponentID) {
	  alert('opponent ' + opponentID + ' not found');
	});

	socket.on('receive-match-invitation', function (opponentID) {
	  alert('receive match invitation from ' + opponentID);
	});

	socket.on('start-match', function (data) {
	  var size = data.size,
	      color = data.color,
	      opponentID = data.opponentID;

	  $('.menu').remove();
	  window.gameManager.startNewMatch(size, color, opponentID);
	});

	socket.on('receive-move', function (data) {
	  var row = data[0],
	      col = data[1];

	  if (row === -1 || col === -1) {
	    // pass
	    window.gameManager.board.nextTurn(true);
	  } else {
	    window.gameManager.board.addStone(row, col);
	  }
	});

	socket.on('opponent-resign', function () {
	  window.gameManager.board.opponentResign();
	});

	socket.on('opponent-score', function () {
	  window.gameManager.board.score();
	});

	socket.on('opponent-disconnect', function (opponentID) {
	  alert('opponent disconnect: ' + opponentID);
	});

	socket.on('receive-message', function (opponentID, message) {
	  console.log('receive message');
	  var chatEmitter = _Simple2.default.Emitter.getEmitterById('chat');
	  if (chatEmitter) {
	    chatEmitter.emit('receive-message', { opponentID: opponentID, message: message });
	  }
	});

	module.exports = socketAPI;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports =
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

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		var Component = __webpack_require__(1);
		var Emitter = __webpack_require__(4);

		var Simple = {
		  Component: Component,
		  Emitter: Emitter
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

	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var SimpleBase = __webpack_require__(2);

		function createSimpleComponent(methods) {
		  var SimpleComponent = function SimpleComponent(props) {
		    if (!this || !(this instanceof SimpleComponent)) {
		      return new SimpleComponent(props);
		    }
		    SimpleBase.call(this);

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
		    this.forceUpdate(); // render element
		    this.componentDidMount();
		  };

		  SimpleComponent.prototype = Object.create(SimpleBase.prototype);

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
		    SimpleBase.call(this);

		    this.toDOM(func.call(this, props)); // render element
		  };
		  SimpleComponent.prototype = Object.create(SimpleBase.prototype);

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
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var SimpleDOM = __webpack_require__(3);

		var validTags = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section  select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr'.split(' ');

		// http://stackoverflow.com/questions/10865025/merge-flatten-a-multidimensional-array-in-javascript
		function flatten(arr) {
		  return arr.reduce(function (flat, toFlatten) {
		    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
		  }, []);
		}

		/**
		 * Derive from SimpleDOM class
		 */
		function SimpleBase() {
		  SimpleDOM.call(this);
		  this.props = this.getDefaultProps();
		  this.refs = {};
		}

		SimpleBase.prototype = Object.create(SimpleDOM.prototype);

		SimpleBase.prototype.getDefaultProps = function () {
		  return {};
		};

		SimpleBase.prototype.emit = function (name) {
		  var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

		  if (this.emitter) {
		    this.emitter.emit(name, data, this);
		  }
		};

		SimpleBase.prototype.render = function () {
		  throw "Render function is not implemented";
		};

		SimpleBase.prototype.remove = function () {
		  this.componentWillUnmount();

		  Object.getPrototypeOf(SimpleBase.prototype).remove.call(this);

		  this.componentDidUnmount();
		};

		SimpleBase.prototype.init = function () {};

		SimpleBase.prototype.componentDidMount = function () {};

		SimpleBase.prototype.componentWillUpdate = function () {};

		SimpleBase.prototype.componentDidUpdate = function () {};

		SimpleBase.prototype.componentWillUnmount = function () {};

		SimpleBase.prototype.componentDidUnmount = function () {};

		SimpleBase.prototype.setState = function (newState) {
		  if (this.state) {
		    Object.assign(this.state, newState);
		  }
		  this.forceUpdate();
		};

		SimpleBase.prototype.setProps = function (newProps) {
		  Object.assign(this.props, newProps);
		  this.forceUpdate();
		};

		SimpleBase.prototype.forceUpdate = function () {
		  this.componentWillUpdate();

		  this.toDOM(this.render()); // render element

		  this.componentDidUpdate();
		};

		SimpleBase.prototype.appendTo = function (obj) {
		  if (obj instanceof SimpleDOM) {
		    obj.appendChild(this);
		  } else {
		    obj.appendChild(this.element);
		  }
		  return this;
		};

		// add tags

		var _loop = function _loop(i) {
		  SimpleBase.prototype[validTags[i]] = function () {
		    var attributes = {},
		        content = null,
		        children = [];

		    var offset = 0;
		    if (typeof arguments[offset] !== 'undefined' && arguments[offset].constructor === Object) {
		      attributes = arguments[offset];
		      offset += 1;
		    }

		    if (typeof arguments[offset] !== 'undefined' && (arguments[offset].constructor === String || arguments[offset].constructor === Number)) {
		      content = arguments[offset];
		      offset += 1;
		    }

		    children = [];
		    function appendChildren(args) {
		      for (var _i = 0; _i < args.length; _i++) {
		        if (args[_i]) {
		          if (args[_i].constructor === Array) {
		            appendChildren(args[_i]);
		          } else {
		            children.push(args[_i]);
		          }
		        }
		      }
		    }
		    for (var _i2 = offset; _i2 < arguments.length; _i2++) {
		      if (arguments[_i2]) {
		        if (arguments[_i2].constructor === Array) {
		          appendChildren(arguments[_i2]);
		        } else {
		          children.push(arguments[_i2]);
		        }
		      }
		    }
		    /*
		    if (offset < arguments.length) {
		      children = Array.prototype.slice.call(arguments, offset)
		      children = [].concat.apply([], children)
		    }
		    */

		    return new SimpleDOM(validTags[i], attributes, content, children, this);
		  };
		};

		for (var i = 0; i < validTags.length; i++) {
		  _loop(i);
		}

		SimpleBase.prototype.constructor = SimpleBase;

		module.exports = SimpleBase;

	/***/ },
	/* 3 */
	/***/ function(module, exports) {

		'use strict';
		// A kind of Virtual DOM written by Yiyi Wang (shd101wyy)

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

		/**
		 * [SimpleDOM description]
		 * @param {[String]} tagName    [description]
		 * @param {[Object]} attributes [description]
		 * @param {[String]} content    [description]
		 * @param {[Array of (SimpleDOM|SimpleBase)]} children   [description]
		 */
		function SimpleDOM(tagName, attributes, content, children, owner) {
		  this.tagName = tagName || null;
		  this.attributes = attributes || {};
		  this.content = content || null;
		  this.children = children || [];
		  this.owner = owner || null;

		  this.element = null; // DOM element

		  this._eventListeners = {};
		}

		/**
		 * Remove itself
		 */
		SimpleDOM.prototype.remove = function () {
		  if (this.element && this.element.parentNode) {
		    this.element.parentNode.removeChild(this.element);
		    this.element = null;
		  }
		};

		/**
		 * Append SimpleDOM simpleDOM as child
		 * @param  {[SimpleDOM]} simpleDOM [description]
		 */
		SimpleDOM.prototype.appendChild = function (simpleDOM) {
		  this.children.push(simpleDOM);
		  this.element.appendChild(simpleDOM.element);
		};

		/**
		 * Create children DOM elements and append them to this.element
		 * @param  {[Array of SimpleDOM]} children [description]
		 * @return {[NULL]}          [description]
		 */
		SimpleDOM.prototype.appendChildrenDOMElements = function (children) {
		  var _this = this;

		  if (!children.length) return;

		  children.forEach(function (child) {
		    if (child.constructor === Array) {
		      _this.appendChildrenDOMElements.apply(_this, [child]);
		    } else if (child instanceof SimpleDOM) {
		      if (!child.element) {
		        child.toDOM();
		      }
		      _this.element.appendChild(child.element);
		    } else {
		      throw 'Invalid SimpleDOM';
		    }
		  });
		};

		/**
		 * Differentiate with simpleDOM (new one) to generate DOM element
		 * @param  {[SimpleDOM]} simpleDOM [description]
		 * @return {[DOMElement]}           [description]
		 */
		SimpleDOM.prototype.toDOM = function (simpleDOM) {
		  if (!this.element || simpleDOM.tagName !== this.tagName) {
		    // element not existed [OR] different tagName, need to create DOM element again
		    var newTagName = simpleDOM ? simpleDOM.tagName : this.tagName,
		        newAttributes = simpleDOM ? simpleDOM.attributes : this.attributes,
		        newContent = simpleDOM ? simpleDOM.content : this.content,
		        newChildren = simpleDOM ? simpleDOM.children : this.children,
		        newOwner = simpleDOM ? simpleDOM.owner : this.owner;

		    var newElement = document.createElement(newTagName);

		    // set content
		    if (newContent) {
		      newElement.appendChild(document.createTextNode(newContent));
		    }

		    // set attributes
		    if (newAttributes) {
		      for (var key in newAttributes) {
		        var val = newAttributes[key];
		        if (isNativeEvent(key)) {
		          addEvent(newElement, key, val /*.bind(this.owner)*/);
		          this._eventListeners[key] = val; // save to _eventListeners
		        } else if (key === 'ref') {
		            newOwner.refs[val] = newElement;
		          } else if (key === 'style' && val.constructor === Object) {
		            for (var styleKey in val) {
		              newElement.style[styleKey] = val[styleKey];
		            }
		          } else {
		            newElement.setAttribute(key, val);
		          }
		      }
		    }

		    if (this.element && simpleDOM) {
		      // replace this.element with newElement
		      var parentNode = this.element.parentNode; // this should/must exist
		      parentNode.insertBefore(newElement, this.element);
		      this.remove();

		      this.element = newElement;

		      if (this.props && simpleDOM.props) {
		        this.props = simpleDOM.props;
		        // this.state = simpleDOM.state
		      }
		    } else {
		        this.element = newElement;
		      }

		    this.tagName = newTagName;
		    this.attributes = newAttributes;
		    this.content = newContent;
		    this.children = newChildren;
		    this.owner = newOwner;

		    // append children
		    this.appendChildrenDOMElements(this.children);

		    return this.element;
		  } else {
		    var oldAttributes = this.attributes,
		        oldContent = this.content,
		        oldElement = this.element,
		        oldChildren = this.children,
		        oldOwner = this.owner;

		    var attributes = simpleDOM.attributes,
		        content = simpleDOM.content,
		        element = simpleDOM.element,
		        children = simpleDOM.children,
		        owner = simpleDOM.owner;

		    // update Content
		    if (oldContent) {
		      if (content) {
		        var textNode = oldElement.childNodes[0];
		        textNode.nodeValue = content;
		      } else {
		        var _textNode = oldElement.childNodes[0];
		        oldElement.removeChild(_textNode);
		      }
		    } else if (content) {
		      var _textNode2 = document.createTextNode(content);
		      if (oldElement.childNodes.length) {
		        oldElement.insertBefore(_textNode2, oldElement.childNodes[0]);
		      } else {
		        oldElement.appendChild(_textNode2);
		      }
		    }

		    // update Attribute
		    if (attributes) {
		      for (var _key in attributes) {
		        var _val = attributes[_key];
		        if (isNativeEvent(_key)) {
		          if (this.attributes.hasOwnProperty(_key)) {
		            if (this.attributes[_key] === _val) {
		              // same event
		              continue;
		            } else {
		              // replace event
		              removeEvent(this.element, _key, this._eventListeners[_key]);
		              addEvent(this.element, _key, _val /*.bind(owner)*/);
		              this._eventListeners[_key] = _val;
		            }
		          } else {
		            addEvent(this.element, _key, _val /*.bind(owner)*/);
		            this._eventListeners[_key] = _val;
		          }
		        } else if (_key === 'ref') {
		          owner.refs[_val] = this.element;
		        } else if (_key === 'style' && _val.constructor === Object) {
		          // remove old inline style
		          this.element.setAttribute('style', ''); // here might be wrong
		          for (var _styleKey in _val) {
		            this.element.style[_styleKey] = _val[_styleKey];
		          }
		        } else {
		          this.element.setAttribute(_key, _val);
		        }
		      }
		    } else if (this.attributes) {
		      // remove all attributes in this.attributes
		      for (var _key2 in this.attributes) {
		        var _val2 = this.attributes[_key2];
		        if (isNativeEvent(_key2)) {
		          removeEvent(this.element, _key2, _val2); // TODO: val here is wrong. as it is not binded to this
		        } else {
		            this.element.removeAttribute(_key2);
		          }
		      }
		    }

		    // remove old attributes that are existed in the new one
		    if (attributes && this.attributes) {
		      for (var _key3 in this.attributes) {
		        if (!attributes.hasOwnProperty(_key3)) {
		          if (isNativeEvent(_key3)) {
		            removeEvent(this.element, _key3, this.attributes[_key3]);
		          } else {
		            this.element.removeAttribute(_key3);
		          }
		        }
		      }
		    }

		    // update Children
		    if (children.length === oldChildren.length) {
		      for (var i = 0; i < children.length; i++) {
		        oldChildren[i].toDOM(children[i]);
		      }
		    } else if (children.length > oldChildren.length) {
		      var _i = 0;
		      for (_i = 0; _i < oldChildren.length; _i++) {
		        oldChildren[_i].toDOM(children[_i]);
		      }

		      var j = _i;
		      for (; _i < children.length; _i++) {
		        oldChildren.push(children[_i]);
		      }

		      this.appendChildrenDOMElements(children.slice(j));
		    } else {
		      // if (children.length < oldChildren.length) {
		      var oldLength = oldChildren.length;
		      for (var _i2 = children.length; _i2 < oldLength; _i2++) {
		        oldChildren.pop().remove();
		      }

		      for (var _i3 = 0; _i3 < children.length; _i3++) {
		        oldChildren[_i3].toDOM(children[_i3]);
		      }
		    }

		    this.attributes = attributes;
		    this.content = content;
		    // this.children = children // This is wrong. Should assign like this as this.children already changed.
		    this.owner = owner;

		    if (this.props && simpleDOM.props) {
		      this.props = simpleDOM.props;
		      // this.state = simpleDOM.state
		    }

		    // update element
		    return this.element;
		  }
		};

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

		  if (!(this instanceof Emitter)) {
		    return new Emitter(initialState);
		  }
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

		Emitter.prototype.getState = function () {
		  return this.state;
		};

		module.exports = Emitter;

	/***/ }
	/******/ ]);

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	  My Simple and silly front end library called "Simple"
	 */

	var Simple = function () {
	  function Simple() {
	    _classCallCheck(this, Simple);

	    this.state = {};
	    this.$el = null;
	  }

	  _createClass(Simple, [{
	    key: 'setState',
	    value: function setState(newState) {
	      // copy state and then rerender dom element
	      for (var key in newState) {
	        this.state[key] = newState[key];
	      }

	      this.forceUpdate();
	    }
	  }, {
	    key: 'forceUpdate',
	    value: function forceUpdate() {
	      var $new = this._render();

	      if (this.$el) {
	        this.$el.replaceWith($new);
	        this.$el = $new;
	      } else {
	        this.$el = $new;
	      }
	    }
	  }, {
	    key: '_render',
	    value: function _render() {
	      var res = this.render();
	      if (typeof res === 'string') {
	        return $(res);
	      } else {
	        return res;
	      }
	    }
	  }, {
	    key: 'appendTo',
	    value: function appendTo($element) {
	      if (!this.$el) {
	        this.$el = this._render();
	      }
	      $element.append(this.$el);
	    }
	  }, {
	    key: 'remove',
	    value: function remove() {
	      if (this.$el) {
	        this.$el.remove();
	        this.$el = null;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      throw 'Simple Exception: render function not implemented';
	      return null;
	    }
	  }]);

	  return Simple;
	}();

	module.exports = Simple;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

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
	  }
	};

	module.exports = userAPI;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var socketAPI = __webpack_require__(5);
	var Simple = __webpack_require__(7);

	var Menu = function (_Simple) {
	  _inherits(Menu, _Simple);

	  function Menu(gameManager) {
	    _classCallCheck(this, Menu);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).call(this));

	    _this.gameManager = gameManager;

	    _this.state = {
	      showBoardSize: false
	    };
	    return _this;
	  }

	  _createClass(Menu, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      if (this.state.showBoardSize) {
	        var $menu = $('<div class="menu">\n                      <p class="menu-title"> Board Size </p>\n                      <div class="button play" size="19"> <span size="19"> 19x19 </span> </div>\n                      <div class="button play" size="13"> <span size="13"> 13x13 </span> </div>\n                      <div class="button play" size="9"> <span size="9"> 9x9 </span> </div>\n                      <div class="button back"> <span> Back </span> </div>\n                    </div>');

	        $('.play', $menu).click(function (event) {
	          var size = parseInt(event.target.getAttribute('size'));

	          var opponentID = prompt('enter opponent id');
	          socketAPI.inviteMatch(opponentID, size);
	        });

	        $('.back', $menu).click(function (event) {
	          _this2.setState({ showBoardSize: false });
	        });

	        return $menu;
	      } else {
	        var _$menu = $(' <div class="menu">\n                        <p class="menu-title"> Go! ' + this.gameManager.playerID + ' </p>\n                        <div class="button private-match"> <span> Private Match </span> </div>\n                        <div class="button public-match"> <span> Public Match </span> </div>\n                        <div class="button"> <span> Bot Match </span> </div>\n                      </div>');

	        $('.private-match', _$menu).click(function () {
	          _this2.setState({ showBoardSize: true });
	        });

	        $('.public-match', _$menu).click(function () {
	          console.log('public match');
	        });

	        return _$menu;
	      }
	    }
	  }]);

	  return Menu;
	}(Simple);

	module.exports = Menu;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Simple = __webpack_require__(7);
	var userAPI = __webpack_require__(8);
	var socketAPI = __webpack_require__(5);

	var Signup_Login = function (_Simple) {
	  _inherits(Signup_Login, _Simple);

	  function Signup_Login() {
	    _classCallCheck(this, Signup_Login);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Signup_Login).call(this));

	    _this.state = {
	      showLogin: true
	    };
	    return _this;
	  }

	  _createClass(Signup_Login, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var $email = $('<div class="email field"> <input placeholder="Email" /> </div>');
	      var $userID = $('<div class="userID field  ' + (this.state.showLogin ? 'hide' : 'show') + '"> <input placeholder="User ID" /> </div>');
	      var $password = $('<div class="password field"> <input placeholder="Password" type="password" /> </div>');

	      var $switch = $('<a class="switch"> ' + (this.state.showLogin ? 'Don\'t have account yet? Click me ' : 'Already have an account? Click me') + ' </a>');

	      var $go = $('<div class="go"> Go </div>');

	      var $container = $('<div class="container"></div>');

	      $container.append($email);
	      $container.append($userID);
	      $container.append($password);
	      $container.append($switch);
	      $container.append($go);

	      var $pageElement = $('\n      <div class="signup-login-page">\n      </div>\n      ');

	      $pageElement.append($container);

	      $switch.click(function () {
	        _this2.setState({ showLogin: !_this2.state.showLogin });
	      });

	      $go.click(function () {
	        var email = $('input', $email).val().trim(),
	            userID = $('input', $userID).val().trim(),
	            password = $('input', $password).val();

	        if (_this2.state.showLogin) {
	          // login
	          // missing information
	          if (!email.length || !password.length) {
	            return;
	          }
	          console.log('login');
	          userAPI.signin(email, password, function (res) {
	            console.log(res);
	            if (!res) {
	              alert('Failed to signin');
	            } else {
	              // $('.user-id').html('User ID: ' + res.userID)
	              window.gameManager.setPlayerID(res.userID);
	              window.gameManager.showMenu();
	              socketAPI.userLoggedIn(res.userID);
	            }
	          });
	        } else {
	          // missing information
	          if (!email.length || !userID.length || !password.length) {
	            return;
	          }
	          console.log('signup');
	          userAPI.signup(email, userID, password, function (res) {
	            console.log(res);
	            if (!res) {
	              alert('Failed to signup');
	            } else {
	              // $('.user-id').html('User ID: ' + res.userID)
	              window.gameManager.setPlayerID(res.userID);
	              window.gameManager.showMenu();
	              socketAPI.userLoggedIn(res.userID);
	            }
	          });
	        }
	      });

	      return $pageElement;
	    }
	  }]);

	  return Signup_Login;
	}(Simple);

	module.exports = Signup_Login;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _chat = __webpack_require__(12);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Simple = __webpack_require__(7);

	var BoardMenu = function (_Simple) {
	  _inherits(BoardMenu, _Simple);

	  function BoardMenu(board) {
	    _classCallCheck(this, BoardMenu);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BoardMenu).call(this));

	    _this.board = board;
	    return _this;
	  }

	  _createClass(BoardMenu, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var $menu = $('\n<div class="board-menu">\n  <div class="players">\n    <div class="player">\n      <div class="card black ' + (this.board.getColorForCurrentTurn() === 'black' ? 'this-turn' : '') + '">\n        <div class="profile-image"> </div>\n        <p class="name"> ' + (this.board.playerColor === 'black' ? this.board.playerID : this.board.opponentID) + ' </p>\n\n        ' + (this.board.playerColor === 'black' ? this.board.isMyTurn() ? ' <div class="button-group">\n              <div class="pass"> <div class="btn pass-btn"> Pass </div> </div>\n              <div class="resign"> <div class="btn resign-btn"> Resign </div> </div>\n            </div>' : '<div class="button-group"> White to move</div>' : '') + '\n\n      </div>\n    </div>\n    <div class="player">\n      <div class="card white ' + (this.board.getColorForCurrentTurn() === 'white' ? 'this-turn' : '') + '">\n        <div class="profile-image"> </div>\n        <p class="name"> ' + (this.board.playerColor === 'white' ? this.board.playerID : this.board.opponentID) + ' </p>\n\n        ' + (this.board.playerColor === 'white' ? this.board.isMyTurn() ? ' <div class="button-group">\n              <div class="pass"> <div class="btn pass-btn"> Pass </div> </div>\n              <div class="resign"> <div class="btn resign-btn"> Resign </div> </div>\n            </div>' : '<div class="button-group"> Black to move </div>' : '') + '\n      </div>\n    </div>\n  </div>\n</div>\n');

	      $('.pass-btn', $menu).click(function () {
	        _this2.board.pass();
	      });

	      $('.resign-btn', $menu).click(function () {
	        _this2.board.resign();
	      });

	      // create Chat
	      var chat = (0, _chat.Chat)({ playerID: this.board.playerID, opponentID: this.board.opponentID });
	      chat.appendTo($menu[0]);

	      return $menu;
	    }
	  }]);

	  return BoardMenu;
	}(Simple);

	module.exports = BoardMenu;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.chatEmitter = exports.Chat = undefined;

	var _Simple = __webpack_require__(6);

	var _Simple2 = _interopRequireDefault(_Simple);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var socketAPI = __webpack_require__(5);


	var chatEmitter = _Simple2.default.Emitter({
	  messages: [],
	  playerID: null,
	  opponentID: null
	});

	chatEmitter.registerId('chat');

	chatEmitter.on('register-self', function (_ref, component) {
	  var playerID = _ref.playerID;
	  var opponentID = _ref.opponentID;

	  this.state.playerID = playerID;
	  this.state.opponentID = opponentID;
	  this.state.component = component;
	});

	chatEmitter.on('send-message', function (_ref2, component) {
	  var playerID = _ref2.playerID;
	  var opponentID = _ref2.opponentID;
	  var message = _ref2.message;

	  socketAPI.sendMessage({ playerID: playerID, opponentID: opponentID, message: message, chatEmitter: this });

	  this.state.messages.push({ id: playerID, message: message, me: true });
	  this.state.playerID = playerID;
	  this.state.opponentID = opponentID;

	  component.setProps(this.state);
	});

	chatEmitter.on('receive-message', function (_ref3) {
	  var opponentID = _ref3.opponentID;
	  var message = _ref3.message;

	  console.log('receive message', { opponentID: opponentID, message: message });
	  this.state.messages.push({ id: opponentID, message: message, me: false });

	  if (this.state.component) {
	    this.state.component.setProps(this.state);
	  }
	});

	var Message = _Simple2.default.Component(function (props) {
	  var id = props.id,
	      message = props.message,
	      me = props.me;
	  return this.div({ class: 'message-box ' + (me ? 'me' : '') }, this.p({ class: 'id' }, id + ':'), this.p({ class: 'message' }, message));
	});

	var Chat = _Simple2.default.Component({
	  emitter: chatEmitter,
	  getDefaultProps: function getDefaultProps() {
	    return {
	      playerID: null,
	      opponentID: null,
	      messages: []
	    };
	  },
	  init: function init() {
	    this.emit('register-self', { playerID: this.props.playerID, opponentID: this.props.opponentID });
	  },
	  onInput: function onInput(e) {
	    if (e.which === 13) {
	      var message = e.target.value.trim();
	      if (!message) return;
	      this.emit('send-message', { playerID: this.props.playerID,
	        opponentID: this.props.opponentID,
	        message: message });
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

	exports.Chat = Chat;
	exports.chatEmitter = chatEmitter;

/***/ }
/******/ ]);