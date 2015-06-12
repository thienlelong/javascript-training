/* global dom, Square, Point, addHandler, SokobanField, method, alert */

function SokobanGame(levels, place) {
	this.levels = levels;
	var newGame = dom('BUTTON', null, 'New game');
	addHandler(newGame, 'click', method(this, 'newGame'));
	var reset = dom('BUTTON', null, 'Reset level');
	addHandler(reset, 'click', method(this, 'resetLevel'));
	var select = dom('SELECT', null, dom('option', {'value': '0'}, '1'),
						dom('option', {'value': '1'}, '2'),
						dom('option', {'value': '2'}, '3'), 'Set level');
	addHandler(select, 'change', method(this, 'setLevel'));
	this.status = dom('DIV', { 'class': 'status'});
	this.container = dom('DIV', { 'class': 'container'}, dom('H1', { 'class': 'title'}, 'Sokoban'),
		dom('DIV', {'class': 'menu'}, newGame, ' ', reset, '', select), this.status);
	place.appendChild(this.container);
	addHandler(document, 'keydown', method(this, 'keyDown'));
	this.newGame();
}

SokobanGame.prototype.newGame = function() {
	this.level = 0;
	this.resetLevel();
};

SokobanGame.prototype.setLevel = function(event) {
	var level = Number(event.target.value);
	this.level = level;
	this.resetLevel();
};

SokobanGame.prototype.resetLevel = function() {
	if (this.field)
		this.field.remove();
	this.field = new SokobanField(this.levels[this.level]);
	this.field.place(this.container);
	this.updateStatus();
};

SokobanGame.prototype.updateStatus = function() {
	this.status.innerHTML = 'Level ' + (1 + this.level) + ': ' +
	this.field.status();
};

var arrowKeyCodes = {
	37: new Point(-1, 0), // left
	38: new Point(0, -1), // up
	39: new Point(1, 0), // right
	40: new Point(0, 1) // down
};
SokobanGame.prototype.keyDown = function(event) {
	if (arrowKeyCodes.hasOwnProperty(event.keyCode)) {
		event.stop();
		this.field.move(arrowKeyCodes[event.keyCode]);
		this.updateStatus();
		if (this.field.won()) {
			if (this.level < this.levels.length - 1) {
				alert('Excellent! Going to the next level.');
				this.level++;
				this.resetLevel();
			}
			else {
				alert('You win! Game over.');
				this.newGame();
			}
		}
	}
};
