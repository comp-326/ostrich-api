/**
 * ************ BUILD ALPHABETS *******
 */
const ALPHABET = () => {
	let LowerCaseLetters = []
	let UpperCaseLetters = []
	let symbols = []
	let numbers = []
	const llRange = [97, 122]
	const symbolRange = [33, 47]
	const numberRange = [48, 57]
	const uppRange = [65, 90]
	/**
	 * Generate lowercase letters
	 */
	for (let index = llRange[0]; index <= llRange[1]; index++) {
		LowerCaseLetters.push(String.fromCharCode(index))
	}
	/**
	 * Generate uppercase letters
	 */
	for (let index = uppRange[0]; index <= uppRange[1]; index++) {
		UpperCaseLetters.push(String.fromCharCode(index))
	}
	/**
	 * Generate numbers
	 */
	for (let index = numberRange[0]; index <= numberRange[1]; index++) {
		numbers.push(String.fromCharCode(index))
	}
	/**
	 * Generate Symbols
	 */
	for (let index = symbolRange[0]; index <= symbolRange[1]; index++) {
		symbols.push(String.fromCharCode(index))
	}
	const alphabets = UpperCaseLetters.concat(LowerCaseLetters)
		.concat(numbers)
		.concat(symbols)
	return { alphabets, LowerCaseLetters, UpperCaseLetters, numbers, symbols }
}
const alphabs = ALPHABET()

export default Object.freeze({
	LOWERCASE: alphabs.LowerCaseLetters,
	UPPERCASE: alphabs.UpperCaseLetters,
	SYMBOLS: alphabs.symbols,
	NUMBERS: alphabs.numbers,
	ALPHABETS: alphabs.alphabets,
})
