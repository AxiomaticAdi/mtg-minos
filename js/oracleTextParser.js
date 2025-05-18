/**
 * Parses oracle text input and converts it into Scryfall query parts
 * @param {string} oracleText - The oracle text to parse
 * @returns {string[]} Array of query parts formatted for Scryfall
 */
function parseOracleText(oracleText) {
	if (!oracleText?.trim()) return [];

	const queryParts = [];

	// Match quoted phrases
	const quotedMatches = [...oracleText.matchAll(/"([^"]+)"/g)];
	const quotedPhrases = quotedMatches.map(match => match[1]);

	// Remove quoted phrases from input text
	let cleanedText = oracleText;
	quotedMatches.forEach(match => {
		cleanedText = cleanedText.replace(match[0], "");
	});

	// Get remaining words
	const remainingWords = cleanedText
		.split(/\s+/)
		.map(word => word.trim())
		.filter(Boolean);

	// Combine into query parts
	quotedPhrases.forEach(phrase => queryParts.push(`oracle:"${phrase}"`));
	remainingWords.forEach(word => queryParts.push(`oracle:${word}`));

	// Fallback in case everything was empty or only quotes
	if (queryParts.length === 0) {
		queryParts.push(`oracle:"${oracleText.trim()}"`);
	}

	return queryParts;
}
