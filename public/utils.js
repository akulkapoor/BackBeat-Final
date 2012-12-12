//Separates the name into 10 character lines for viewing purposes
function nameSeparate(name) {
	var newIndex = 0;
	var size = 0;
	var newArray = [];
	var newString = "";
	var words = name.split(" ");
	for (var x = 0; x<words.length;x++) {
		if (size + words[x].length<= 10) {
			if (size !== 0) {
				newArray[newIndex] += " "
				newArray[newIndex] += words[x]
				size += words[x].length + 1;
			}
			else {
				newArray[newIndex] = words[x];
				size += words[x].length;	
			}
		}
		else {
			if (size===0) {
				newArray[newIndex] = words[x];
				newIndex++;
			}
			else {
				newIndex++;
				newArray[newIndex] = words[x];
				size = words[x].length;
			}
		} 
	}
	for (var y = 0; y<newArray.length; y++) {
		if (y !== 0) {
			newString += "<br>"
		}
		newString += newArray[y];
	}
	return newString;
}


//replaces each occurence of stringtoFind with stringToReplace in the source
function replaceAll(Source,stringToFind,stringToReplace){
  var temp = Source;
    var index = temp.indexOf(stringToFind);
        while(index != -1){
            temp = temp.replace(stringToFind,stringToReplace);
            index = temp.indexOf(stringToFind);
        }
        return temp;
}