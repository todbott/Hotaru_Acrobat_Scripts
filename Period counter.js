function OMU (up) {
	
	var nc = 0;
	var pc = 0;
	var numbers = "0123456789";
	var letters = new Array();
	
	var annot_in_question = this.addAnnot({
			page: this.pageNum, 
			type: "Square", 
			author: "python",
			rect: [up[0], up[1], this.mouseX, this.mouseY],
			strokeColor: color.blue,
		});
	
	// get the quads of the rectangle we just made and put them in an array (trim1) in the order of ux, uy, lx, ly
	var trim = (annot_in_question.rect);
	trim = String(trim);
	trim_shuffle_yo = trim.split(',');
	var trim1 = new Array();
	trim1.push(trim_shuffle_yo[0]);
	trim1.push(trim_shuffle_yo[3]);
	trim1.push(trim_shuffle_yo[2]);
	trim1.push(trim_shuffle_yo[1]);
	
	
	var word = ""
	var word_list = ""
	
	if (global.page != this.pageNum) { // if we haven't already put all the words / quads into an array for this page, do so
		allWords = new Array();
		allQuads = new Array();
		
		for (var w = 0; w < this.getPageNumWords(this.pageNum); w++)
		{
			word = this.getPageNthWord(this.pageNum, w, false);
			allWords.push(word);
			
			q = this.getPageNthWordQuads(this.pageNum, w);
			q = String(q);
			quads_raw = q.split(',');
			var quads = new Array();
			quads.push(quads_raw[0]);
			quads.push(quads_raw[1]);
			quads.push(quads_raw[6]);
			quads.push(quads_raw[7]);
			allQuads.push(quads);
		}
	}
	
	for (var place = 0; place < allWords.length; place++) { // now simply loop through the array of words / quads to find a match
	
		if ((parseInt(allQuads[place][0]) >= parseInt(trim1[0]) && (parseInt(allQuads[place][1]) <= parseInt(trim1[1])) && (parseInt(allQuads[place][2]) <= parseInt(trim1[2])) && (parseInt(allQuads[place][3]) >= parseInt(trim1[3])))) { // the word is within the trim box
			
			word_list = word_list + allWords[place];
		}
	}
	var letters = word_list.split('');
	for (var letter = 0; letter < letters.length; letter++) {
		var x = numbers.indexOf(letters[letter]);
		if (x > -1) {
			nc = nc + 1;
		}
		if ((letters[letter] == ".") && (letters[letter-1] != ".")) {
			pc = pc + 1;
		}
	}
	
	annot_in_question.contents = word_list;
	
	
		
		
	x1 = up[0];
	x2 = up[0] - 150;
	y1 = up[1];
	y2 = up[1] - 30;
	var annot = this.addAnnot({
			page: this.pageNum, 
			type: "FreeText", 
			author: "python",
			fillColor: [ "G", 0.90 ],
			strokeColor: color.blue,
			rect: [up[0], up[1], x2, y2],
			contents: "???????????????????????????" + String(nc) + "????????????" + String(pc) + "??????????????????????????????"
		});
		var spans = new Array();
		spans[0] = new Object();
		spans[0].text = "???????????????????????????" + String(nc) + "????????????" + String(pc) + "??????????????????????????????";
		spans[0].textColor = color.blue;
		spans[0].textSize = 8;
		annot.richContents = spans;
		
	global.n = parseInt(global.n) + 1
	global.page = this.pageNum;
	
}







function OMD () {
	
	upper_left_x = this.mouseX
	upper_left_y = this.mouseY
	return [upper_left_x, upper_left_y];
}

app.alert("??????????????????????????????????????????????????????????????????????????????????????????????????????xy??????????????????????????????\n???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\n\n???????????????????????????????????????Ctrl + s ???????????????????????????", 3);
for (var page = 0; page < this.numPages; page++)
{	

	var aRect = this.getPageBox( {cBox: "Trim", nPage: page} );
	console.println(aRect);
	var f = this.addField("field", "button", page, aRect );
	f.display.hidden;
	f.setAction("MouseDown", "var up = OMD()");
	f.setAction("MouseUp", "OMU(up)");
}	
this.setAction("WillSave","this.removeField('field');");