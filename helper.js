// Returns the right multiple, given the volatility factor,
// e.g. give it 0.3, and it returns a number between 0.7 and 1.3
var volatilityMultiple = function (volatility) {
	return 1 + (Math.random() * volatility * 2 - volatility);
}
