class StringUtils {

	constructor (data) {
		this.data = data;
	}

	get toCommaDelimtedStringFromArray () {
		return this.createCommaDelimitedStringFromArray();
	}

	//create comma delimited concatenated string from array of strings
	createCommaDelimitedStringFromArray () {
		const arrayLength = this.data.length;
		if(!Array.isArray(this.data) || arrayLength === 1) {
			return this.data.toString();
		}

		var list = '';
		for (var i = 0; i < arrayLength; i++) {
			if (i < (arrayLength - 1)) {
				list = list + this.data[i].toString() + ', ';
			}
			else{
				list = list + this.data[i].toString();
			}
		}

		return list;
	}

}

module.exports = StringUtils;

