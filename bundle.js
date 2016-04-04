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
    var Grid = require('./grid.js').Grid;
    var Stone = require('./stone.js').Stone;
    var History = require('./history.js').History;

    // 假设只 9x9

    var Board = (function () {
      // 9x9 13x13 19x19

      function Board(size) {
        _classCallCheck(this, Board);

        this.size = size;
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
        key: "removeStone",
        value: function removeStone(i, j) {
          if (this.board[i][j]) {
            this.board[i][j].$stone.remove();
            this.board[i][j] = null;
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
        }
      }, {
        key: "render",
        value: function render($element) {
          var boardSize = 576,
              padding = 24,
              gridSize = boardSize / (this.size - 1);

          var dom = $("<div class=\"board\" style=\"width: " + boardSize + "px; height: " + boardSize + "px;\"></div>");
          var stoneWidth = gridSize - 4;

          for (var i = 0; i < this.size - 1; i++) {
            var gridRow = $('<div class="grid-row"></div>');
            for (var j = 0; j < this.size - 1; j++) {
              var grid = $("<div style='width: " + gridSize + "px; height: " + gridSize + "px;' class=\"grid\"></div>");

              var gridTouch = $("<div class=\"grid-touch\"\n                                data-row=" + i + "\n                                data-col=" + j + "\n                                style=\"width: " + stoneWidth + "px; height: " + stoneWidth + "px; left: " + -stoneWidth / 2 + "px; top: " + -stoneWidth / 2 + "px;\"> </div>");
              this.boardDom[i][j] = new Grid(gridTouch, grid, this);
              grid.append(gridTouch);

              if (j === this.size - 2) {
                var _gridTouch = $("<div class=\"grid-touch grid-touch-right-top\"\n                                  data-row=" + i + "\n                                  data-col=" + (j + 1) + "\n                                  style=\"width: " + stoneWidth + "px; height: " + stoneWidth + "px; right: " + -stoneWidth / 2 + "px; top: " + -stoneWidth / 2 + "px;\"> </div>");
                this.boardDom[i][j + 1] = new Grid(_gridTouch, grid, this);
                grid.append(_gridTouch);
              }

              if (i === this.size - 2) {
                var _gridTouch2 = $("<div class=\"grid-touch grid-touch-left-bottom\"\n                                  data-row=" + (i + 1) + "\n                                  data-col=" + j + "\n                                  style=\"width: " + stoneWidth + "px; height: " + stoneWidth + "px; left: " + -stoneWidth / 2 + "px; bottom: " + -stoneWidth / 2 + "px;\"> </div>");
                this.boardDom[i + 1][j] = new Grid(_gridTouch2, grid, this);
                grid.append(_gridTouch2);
              }

              if (i === this.size - 2 && j === this.size - 2) {
                var _gridTouch3 = $("<div class=\"grid-touch grid-touch-right-bottom\"\n                                  data-row=" + (i + 1) + "\n                                  data-col=" + (j + 1) + "\n                                  style=\"width: " + stoneWidth + "px; height: " + stoneWidth + "px; right: " + -stoneWidth / 2 + "px; bottom: " + -stoneWidth / 2 + "px;\"> </div>");
                this.boardDom[i + 1][j + 1] = new Grid(_gridTouch3, grid, this);
                grid.append(_gridTouch3);
              }

              gridRow.append(grid);
            }
            dom.append(gridRow);
          }

          $element.append(dom);
        }
      }]);

      return Board;
    })();

    module.exports = {
      Board: Board
    };
  }, { "./grid.js": 2, "./history.js": 3, "./stone.js": 5 }], 2: [function (require, module, exports) {
    'use strict';

    var Stone = require('./stone.js').Stone;

    var Grid = (function () {
      function Grid($gridTouch, $grid, board) {
        var _this = this;

        _classCallCheck(this, Grid);

        this.$gridTouch = $gridTouch;
        this.$grid = $grid;
        this.board = board;
        this.stoneSize = Number(this.$grid.css('width').replace('px', ''));

        this.$hoverElement = null;

        $gridTouch.click(function () {
          var row = _this.$gridTouch.data('row');
          var col = _this.$gridTouch.data('col');

          if (_this.board.board[row][col]) return;

          var $stone = $("<div class=\"stone " + (_this.board.turn % 2 === 0 ? 'black' : 'white') + "\" style='width: " + _this.stoneSize + "px; height: " + _this.stoneSize + "px; border-radius: " + _this.stoneSize + "px; background-image: url(\"" + _this.getStoneImage() + "\");' data-row=" + row + " data-col=" + col + "> </div>");

          _this.board.board[row][col] = new Stone($stone, _this.board); // set to Go board

          _this.$gridTouch.append($stone);
          _this.board.turn += 1;

          _this.board.checkCapture(row, col);
        });

        $gridTouch.hover(function () {
          var row = _this.$gridTouch.data('row');
          var col = _this.$gridTouch.data('col');

          if (_this.$hoverElement || _this.board.board[row][col]) return;else {
            _this.$hoverElement = $("<div class=\"stone " + (_this.board.turn % 2 === 0 ? 'black' : 'white') + "\" style='width: " + _this.stoneSize + "px; height: " + _this.stoneSize + "px; border-radius: " + _this.stoneSize + "px; background-image: url(\"" + _this.getStoneImage() + "\"); opacity: 0.5;' data-row=" + row + " data-col=" + col + "> </div>");

            _this.$gridTouch.append(_this.$hoverElement);
          }
        }, function () {
          var row = _this.$gridTouch.data('row');
          var col = _this.$gridTouch.data('col');

          if (_this.$hoverElement) {
            _this.$hoverElement.remove();
            _this.$hoverElement = null;
          }
        });
      }

      _createClass(Grid, [{
        key: "getStoneImage",
        value: function getStoneImage() {
          if (this.board.turn % 2 === 0) {
            return './images/b.png';
          } else {
            return "./images/w" + Math.floor(Math.random() * 15 + 1) + ".png";
          }
        }
      }]);

      return Grid;
    })();

    module.exports = {
      Grid: Grid
    };
  }, { "./stone.js": 5 }], 3: [function (require, module, exports) {
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
  }, {}], 4: [function (require, module, exports) {
    'use strict';

    var Stone = require('./stone.js').Stone;
    var Board = require('./board.js').Board;

    var board = new Board(9);
    board.render($('.game'));
  }, { "./board.js": 1, "./stone.js": 5 }], 5: [function (require, module, exports) {
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

    module.exports = {
      Stone: Stone
    };
  }, {}] }, {}, [4]);
