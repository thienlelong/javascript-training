function Square(character, img) {
	this.img = img;
	var content = {"@": "player", "#": "wall", "*": "exit", " ": "empty", "0": "boulder"}[character];
	if (content == null)
		throw new Error("Unrecognized character: '" + character + "'");
	this.setContent(content);
}
Square.prototype.setContent = function(content) {
	this.content = content;
	this.img.src = "img/" + content + ".png";
}