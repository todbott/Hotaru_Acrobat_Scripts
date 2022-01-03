var annotation_number = 1;
var counter = 1;

function OnMouseClick () {
	
	x1 = this.mouseX;
	x2 = this.mouseX - 15;
	if (global.annotation_number > 9)
	{
		x2 = this.mouseX - 20;
	}
	if (global.annotation_number > 99)
	{
		x2 = this.mouseX - 25;
	}
	if (global.annotation_number > 999)
	{
		x2 = this.mouseX - 30;
	}
	y1 = this.mouseY;
	y2 = this.mouseY - 15;
	this.addAnnot({
			page: this.pageNum, 
			type: "FreeText", 
			author: "python",
			fillColor: color.transparent,
			rect: [this.mouseX, this.mouseY, x2, y2],
			contents: String(annotation_number),
		});
	counter = counter + 1
}

function OnMouseUp (up) {

	this.addAnnot({
			page: this.pageNum, 
			type: "Square", 
			author: "python",
			rect: [up[0], up[1], this.mouseX, this.mouseY],
		});
	
}

function OnMouseDown () {
	
	upper_left_x = this.mouseX
	upper_left_y = this.mouseY
	console.println(upper_left_x);
	return [upper_left_x, upper_left_y];
}



	
function furiban_function () {

	app.alert("ワンクリックずつで振り番を制作して下さい。 \n\n" + "終わったら、最後のページの左下にある 「終わり」 ボタンを押してください。", 3, 0, "始まり");

		
		
	for (var page = 0; page < this.numPages; page++)
	{	
		var b = this.addField("button", "button", (this.numPages-1), [0, 40, 40, 0]);
		b.setAction("MouseDown","this.removeField('field');");
		b.fillColor=color.gray;
		b.buttonSetCaption("終わり");

		var aRect = this.getPageBox( {cBox: "Trim", nPage: page} );
		console.println(aRect);
		var f = this.addField("field", "button", page, aRect );
		f.display.hidden;
		f.setAction("MouseDown", "var up = OnMouseDown()");
		f.setAction("MouseUp", "OnMouseUp(up)");
	}	
	this.setAction("WillSave","this.removeField('button');");

}