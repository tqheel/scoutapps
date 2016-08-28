'use strict';

class StringUtils {

	constructor (data) {
		this.data = data;
	}

	//create comma delimited concatenated string from array of strings
	createCommaDelimitedStringFromArray (localData, next) {
		const arrayLength = localData.length;
		if(!Array.isArray(localData) || arrayLength === 1) {
			localData = (Array.isArray(localData)) ? localData[0] : localData;
			console.log('data converted');
			next(localData);
		}
		else{
			var list = '';
			for (var i = 0; i < arrayLength; i++) {
				if (i < (arrayLength - 1)) {
					list = list + localData[i].toString() + ', ';
				}
				else{
					list = list + localData[i].toString();
				}
			}
			console.log(list);
			next(list);
		}

		
	}

}

module.exports = StringUtils;

