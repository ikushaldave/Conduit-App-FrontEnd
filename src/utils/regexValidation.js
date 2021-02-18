function regexValidation(pattern, value) {
	return value.trim().length === 0 || pattern.test(value);
}

export default regexValidation;