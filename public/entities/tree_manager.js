var TreeManager = function (level, game) {
	this.level = level;
	this.game = game;
	this.treeInterval = 700;
};

TreeManager.prototype.init = function (ctx) {
	this.level.trees = this.level.trees || [];

	for (var y = 0; y >= -this.level.warmUpLength * 0.8; y -= this.treeInterval) {
		var x = canvas.width / 2 + volatilityFactor(canvas.width / 2);
		this.level.trees.push(new Tree(this.level, this.game, x ,y));
	}
}
