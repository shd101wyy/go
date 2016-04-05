"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
      }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    'use strict';

    var Board = require('../board.js');

    if (!window.socket) {
      window.socket = io();
    }

    var socket = window.socket;

    var socketAPI = {
      inviteMatch: function inviteMatch(opponentID) {
        socket.emit('invite-match', opponentID);
      },

      sendMove: function sendMove(opponentID, row, col) {
        socket.emit('send-move', [opponentID, row, col]);
      }
    };

    socket.on('generate-user-id', function (userID) {
      console.log('get userID: ', userID);
      $('.user-id').html('User ID: ' + userID);
    });

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

      window.gameManager.board.addStone(row, col);
    });

    socket.on('opponent-disconnect', function (opponentID) {
      alert('opponent disconnect: ' + opponentID);
    });

    module.exports = socketAPI;
  }, { "../board.js": 2 }], 2: [function (require, module, exports) {
    var Grid = require('./grid.js');
    var Stone = require('./stone.js');
    var History = require('./history.js').History;
    var socketAPI = require('./api/socket_api');

    // 假设只 9x9

    var Board = (function () {
      // 9x9 13x13 19x19

      function Board(size, playerColor, opponentID) {
        _classCallCheck(this, Board);

        this.size = size;
        this.playerColor = playerColor;
        this.opponentID = opponentID;

        this.board = [];
        this.boardDom = [];

        this.turn = 0;
        this.history = new History();

        this.$mark = null;

        // create board data
        for (var i = 0; i < this.size; i++) {
          this.board.push([]);
          this.boardDom.push([]);

          for (var j = 0; j < this.size; j++) {
            this.board[i].push(null);
            this.boardDom[i].push(null);
          }
        }

        this.history.add(this.board);
      }

      // mark all stones as unchecked

      _createClass(Board, [{
        key: "markAllStonsUncheckd",
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
        key: "getColorForCurrentTurn",
        value: function getColorForCurrentTurn() {
          if (this.turn % 2 === 0) {
            return 'black';
          } else {
            return 'white';
          }
        }
      }, {
        key: "isMyTurn",
        value: function isMyTurn() {
          return this.getColorForCurrentTurn() === this.playerColor;
        }
      }, {
        key: "getStoneImage",
        value: function getStoneImage() {
          if (this.turn % 2 === 0) {
            return './images/b.png';
          } else {
            return "./images/w" + Math.floor(Math.random() * 15 + 1) + ".png";
          }
        }
      }, {
        key: "addStone",
        value: function addStone(row, col) {
          if (this.board[row][col]) return;

          var $stone = $("<div class=\"stone " + (this.turn % 2 === 0 ? 'black' : 'white') + "\" style='width: " + this.stoneSize + "px; height: " + this.stoneSize + "px; border-radius: " + this.stoneSize + "px; background-image: url(\"" + this.getStoneImage() + "\");' data-row=" + row + " data-col=" + col + " id=\"stone-" + row + "-" + col + "\"> </div>");

          $("#grid-touch-" + row + "-" + col).append($stone);

          var stone = new Stone($stone, this);

          this.board[row][col] = stone; // set to Go board

          this.turn += 1;

          // console.log('enter here')

          this.checkCapture(row, col);
        }
      }, {
        key: "removeStone",
        value: function removeStone(row, col) {
          if (this.board[row][col]) {
            this.board[row][col].$stone.remove();
            this.board[row][col] = null;
          }
        }

        // check if two boards have the same.

      }, {
        key: "twoBoardsEqual",
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
        key: "showIcon",
        value: function showIcon(row, col, iconName) {
          var $gridTouch = this.boardDom[row][col].$gridTouch;
          var $icon = $("<div class='" + iconName + "'> </div>");
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
        key: "setMark",
        value: function setMark(row, col) {
          if (this.$mark) {
            this.$mark.remove();
          }

          var $grid = this.boardDom[row][col].$grid;
          var $gridTouch = this.boardDom[row][col].$gridTouch;
          var $mark = $("<div class=\"" + (this.board[row][col].color === 'black' ? 'mark-w' : 'mark-b') + "\"></div>");
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
            var _$mark = $("<div class='mark'> </div>");
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
        key: "checkCapture",
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
          for (var _i = 0; _i < this.size; _i++) {
            for (var _j = 0; _j < this.size; _j++) {
              var _stone = this.board[_i][_j];
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

          if (this.opponentID) {
            socketAPI.sendMove(this.opponentID, row, col);
          }
        }
      }, {
        key: "render",
        value: function render($element) {
          var dom = $("<div class=\"board\"></div>");
          $element.append(dom);

          var boardSize = dom.width(),
              // excluding padding  // 576,
          gridSize = boardSize / (this.size - 1);

          dom.css('height', boardSize + parseInt(dom.css('padding'), 10) * 2 + 'px'); // set height

          var stoneSize = gridSize;
          this.stoneSize = gridSize;

          for (var i = 0; i < this.size - 1; i++) {
            var gridRow = $('<div class="grid-row"></div>');
            for (var j = 0; j < this.size - 1; j++) {
              var grid = $("<div style='width: " + gridSize + "px; height: " + gridSize + "px;' class=\"grid\"></div>");

              var gridTouch = $("<div class=\"grid-touch\"\n                                data-row=" + i + "\n                                data-col=" + j + "\n                                id=\"grid-touch-" + i + "-" + j + "\"\n                                style=\"width: " + stoneSize + "px; height: " + stoneSize + "px; left: " + -stoneSize / 2 + "px; top: " + -stoneSize / 2 + "px;\"> </div>");
              this.boardDom[i][j] = new Grid(gridTouch, grid, this);
              grid.append(gridTouch);

              if (j === this.size - 2) {
                var _gridTouch = $("<div class=\"grid-touch grid-touch-right-top\"\n                                  data-row=" + i + "\n                                  data-col=" + (j + 1) + "\n                                  id=\"grid-touch-" + i + "-" + (j + 1) + "\"\n                                  style=\"width: " + stoneSize + "px; height: " + stoneSize + "px; right: " + -stoneSize / 2 + "px; top: " + -stoneSize / 2 + "px;\"> </div>");
                this.boardDom[i][j + 1] = new Grid(_gridTouch, grid, this);
                grid.append(_gridTouch);
              }

              if (i === this.size - 2) {
                var _gridTouch2 = $("<div class=\"grid-touch grid-touch-left-bottom\"\n                                  data-row=" + (i + 1) + "\n                                  data-col=" + j + "\n                                  id=\"grid-touch-" + (i + 1) + "-" + j + "\"\n                                  style=\"width: " + stoneSize + "px; height: " + stoneSize + "px; left: " + -stoneSize / 2 + "px; bottom: " + -stoneSize / 2 + "px;\"> </div>");
                this.boardDom[i + 1][j] = new Grid(_gridTouch2, grid, this);
                grid.append(_gridTouch2);
              }

              if (i === this.size - 2 && j === this.size - 2) {
                var _gridTouch3 = $("<div class=\"grid-touch grid-touch-right-bottom\"\n                                  data-row=" + (i + 1) + "\n                                  data-col=" + (j + 1) + "\n                                  id=\"grid-touch-" + (i + 1) + "-" + (j + 1) + "\"\n                                  style=\"width: " + stoneSize + "px; height: " + stoneSize + "px; right: " + -stoneSize / 2 + "px; bottom: " + -stoneSize / 2 + "px;\"> </div>");
                this.boardDom[i + 1][j + 1] = new Grid(_gridTouch3, grid, this);
                grid.append(_gridTouch3);
              }

              gridRow.append(grid);
            }
            dom.append(gridRow);
          }
        }
      }]);

      return Board;
    })();

    module.exports = Board;
  }, { "./api/socket_api": 1, "./grid.js": 3, "./history.js": 4, "./stone.js": 7 }], 3: [function (require, module, exports) {
    'use strict';

    var Stone = require('./stone.js');

    var Grid = (function () {
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
              _this.$hoverElement = $("<div class=\"stone " + (_this.board.turn % 2 === 0 ? 'black' : 'white') + "\" style='width: " + _this.stoneSize + "px; height: " + _this.stoneSize + "px; border-radius: " + _this.stoneSize + "px; background-image: url(\"" + _this.board.getStoneImage() + "\"); opacity: 0.5;' data-row=" + _this.row + " data-col=" + _this.col + "> </div>");

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
        key: "addDot",
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
    })();

    module.exports = Grid;
  }, { "./stone.js": 7 }], 4: [function (require, module, exports) {
    'use strict';

    var History = (function () {
      function History() {
        _classCallCheck(this, History);

        this.history = [];
      }

      _createClass(History, [{
        key: "add",
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
        key: "pop",
        value: function pop() {
          this.history.pop();
        }
      }, {
        key: "get",
        value: function get(num) {
          if (num >= 0) {
            return this.history[num];
          } else {
            return this.history[this.history.length - 1 + num];
          }
        }
      }]);

      return History;
    })();

    module.exports = {
      History: History
    };
  }, {}], 5: [function (require, module, exports) {
    'use strict';

    var Stone = require('./stone.js').Stone;
    var Board = require('./board.js');
    var socketAPI = require('./api/socket_api.js');
    var Menu = require('./menu.js');

    var GameManager = (function () {
      function GameManager() {
        _classCallCheck(this, GameManager);
      }

      _createClass(GameManager, [{
        key: "startNewMatch",
        value: function startNewMatch(size, playerColor, opponentID) {
          this.board = new Board(size, playerColor, opponentID);
          this.board.render($('.game'));
        }
      }, {
        key: "showMenu",
        value: function showMenu() {
          this.menu = new Menu();
          this.menu.render($('.game'));
        }
      }]);

      return GameManager;
    })();

    // 没什么卵用的 loading screen

    $('.loading-screen .logo').fadeIn(1000, function () {
      setTimeout(function () {
        $('.loading-screen .logo').fadeOut(1000, function () {
          $('.loading-screen').remove();
        });
      }, 1600);
    });

    // let board = new Board(13)
    // board.render($('.game'))
    window.gameManager = new GameManager();
    gameManager.showMenu();
  }, { "./api/socket_api.js": 1, "./board.js": 2, "./menu.js": 6, "./stone.js": 7 }], 6: [function (require, module, exports) {
    'use strict';

    var socketAPI = require('./api/socket_api.js');

    var Menu = (function () {
      function Menu() {
        _classCallCheck(this, Menu);
      }

      _createClass(Menu, [{
        key: "render",
        value: function render($element) {
          var $menu = $('<div class="menu"> </div>'),
              $privateMatchBtn = $('<div class="button"> <span> Private Match </span> </div>');

          $privateMatchBtn.click(function () {
            var opponentID = prompt('enter opponent id');
            socketAPI.inviteMatch(opponentID);
          });

          $menu.append($privateMatchBtn);

          $element.append($menu);
        }
      }]);

      return Menu;
    })();

    module.exports = Menu;
  }, { "./api/socket_api.js": 1 }], 7: [function (require, module, exports) {
    'use strict';

    var Stone = (function () {
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
        key: "toString",
        value: function toString() {
          return "Stone(" + this.row + ", " + this.col + ")";
        }
      }, {
        key: "sameColor",
        value: function sameColor(color) {
          return this.color === color;
        }

        // check self and nearby stones qi

      }, {
        key: "hasNoQi",
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
        key: "getTopStone",
        value: function getTopStone() {
          if (this.row > 0) {
            return this.board.board[this.row - 1][this.col];
          } else {
            return null;
          }
        }
      }, {
        key: "getBottomStone",
        value: function getBottomStone() {
          if (this.row < this.board.size - 1) {
            return this.board.board[this.row + 1][this.col];
          } else {
            return null;
          }
        }
      }, {
        key: "getLeftStone",
        value: function getLeftStone() {
          if (this.col > 0) {
            return this.board.board[this.row][this.col - 1];
          } else {
            return null;
          }
        }
      }, {
        key: "getRightStone",
        value: function getRightStone() {
          if (this.col < this.board.size - 1) {
            return this.board.board[this.row][this.col + 1];
          } else {
            return null;
          }
        }
      }, {
        key: "getQi",
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
        key: "removeStones",
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
    })();

    module.exports = Stone;
  }, {}] }, {}, [5]);
