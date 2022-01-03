/* Distance Tool (Comment adder) */


// Dialog Definition 
var oDlg = { 
	vd: "",
	hd: "",
	rd: "",
	
	boxw: "",
	boxh: "",
	ul_r: "0",
	ur_r: "-----",
	ll_r: "-----",
	lr_r: "-----",
	rokt: true,
	
	initialize: function(dialog) { 

		dialog.load({"verd":this.vd});
		dialog.load({"hord":this.hd});
		dialog.load({"rsed":this.rd});
		dialog.load({"boxw":this.boxw});
		dialog.load({"boxh":this.boxh});
		dialog.load({"ul_r":this.ul_r});
		dialog.load({"ll_r":this.ll_r});
		dialog.load({"ur_r":this.ur_r});
		dialog.load({"lr_r":this.lr_r});
		dialog.load({"rokt":this.rokt});
		
		},
        
	commit: function(dialog) { 
		  this.vd = dialog.store()["verd"];
		  this.hd = dialog.store()["hord"];
		  this.rd = dialog.store()["rsed"];
		  this.bw = dialog.store()["boxw"];
		  this.bh = dialog.store()["boxh"];
		  this.ul_r = dialog.store()["ul_r"];
		  this.ur_r = dialog.store()["ur_r"];
		  this.ll_r = dialog.store()["ll_r"];
		  this.lr_r = dialog.store()["lr_r"];
		  this.rokt = dialog.store()["rokt"];
		  },
			  
	"rokt": function (dialog) {
		
		dialog.load({"ul_r":"0"});
		dialog.load({"ur_r":"-----"});
		dialog.load({"lr_r":"-----"});
		dialog.load({"ll_r":"-----"});
		},
			  
			  
			  
	description:
    {
        elements:
        [
            {
                type: "view",
                elements:
                [
                    {
                        item_id: "str1",
                        name: "部分的なものを作成します",
                        type: "static_text",
                        bold: true,
                        alignment: "align_center",
                        char_width: 30,
                        height: 20,
                    },
					{ name: "必要に応じて、単体の注釈を作成します。", type: "static_text", },
					{ name: "ページの真ん中に置かれます。", type: "static_text", font: "dialog",　bold: true },
						{
							type: "view",
							align_children: "align_row",
							elements:
							[
							
								{ name: "縦寸法 (mm):", type: "static_text", },
								{ item_id: "verd", type: "edit_text", char_width: 5 },

								{ name: "横寸法 (mm):", type: "static_text", },
								{ item_id: "hord", type: "edit_text", char_width: 5 },

								{ name: "R(mm):", type: "static_text", visible: false },
								{ item_id: "rsed", type: "edit_text", char_width: 5 },
							]
						},
					
					{
                        type: "gap",
                    },
					{
                        type: "gap",
                    },
					{
                        item_id: "str1",
                        name: "ボックスを作成します",
                        type: "static_text",
                        font: "dialog",
                        bold: true,
                        alignment: "align_center",
                        char_width: 30,
                        height: 20,
                    },
					{ name: "入力された横・縦・R寸法があるボックスを作成します", type: "static_text", },
					{ name: "ページの右上の隅に置かれます。", type: "static_text", font: "dialog",　bold: true },
					{
						type: "view",
						align_children: "align_row",
						elements:
						[
							{ name: "横幅 (mm):", type: "static_text", char_width: 5 },
							{ item_id: "boxw", type: "edit_text", char_width: 5 },
							{ name: "縦幅 (mm):", type: "static_text", char_width: 5 },
							{ item_id: "boxh", type: "edit_text", char_width: 5 },
						]
					},
					{
                        type: "gap",
                    },
					{ name: "R を固定する", type: "check_box", item_id: "rokt" },
					{ name: "R を固定する場合、数字入力が必要なところは下記の「左上」のところだけです。", type: "static_text", font: "dialog",　bold: true, },
					{
						type: "view",
						align_children: "align_row",
						elements:
						[
									{ name: "左上R (mm):", type: "static_text", char_width: 5 },
									{ item_id: "ul_r", type: "edit_text", char_width: 5 },
									
									{ name: "右上R (mm):", type: "static_text", char_width: 5 },
									{ item_id: "ur_r", type: "edit_text", char_width: 5 },
						]
					},
					{
						type: "view",
						align_children: "align_row",
						elements:
						[
									{ name: "左下R (mm):", type: "static_text", char_width: 5 },
									{ item_id: "ll_r", type: "edit_text", char_width: 5 },
									
									{ name: "右下R (mm):", type: "static_text", char_width: 5 },
									{ item_id: "lr_r", type: "edit_text", char_width: 5 },
						]
					},
					{
                        type: "gap",
                    },
					{
						type: "ok",
						ok_name: "Ok!",
						alignment: "align_right",
					}
                ]
            },

        ]
    }
};

var verd = ""
var hord = ""
var rsed = ""
var boxw = ""
var boxh = ""
var ul_r = "0"
var ur_r = "-----"
var ll_r = "-----"
var lr_r = "-----"
var rokt = true

// Dialog Activation 
function Dialog() {
	
	oDlg.boxw = boxw
	oDlg.boxh = boxh
	oDlg.ul_r = ul_r
	oDlg.ur_r = ur_r
	oDlg.ll_r = ll_r
	oDlg.lr_r = lr_r
	oDlg.verd = verd
	oDlg.hord = hord
	oDlg.rsed = rsed
	oDlg.rokt = rokt
	
	if( "ok" == app.execDialog(oDlg)) { 

		var aRect = this.getPageBox("Media");
		var width = ((aRect[2] - aRect[0]) / 2);
		var height = ((aRect[1] - aRect[3]) / 2);
		var thisPage = this.pageNum;


		var y1 = height;
		var y2 = height;
		var x1 = width;
		var x2 = x1 + (oDlg.hd * 2.83465)


		var label = oDlg.hd + " mm"


		if (oDlg.hd != "")
		{
			MakeBar(x1, x2, y1, y2, label, thisPage, "horizontal");
		}
			

		
		x1 = width;
		y2 = height;
		y1 = y2 + (oDlg.vd * 2.83465);
		x2 = width
		
		var label = oDlg.vd + " mm"

		if (oDlg.vd != "")
		{
			MakeBar(x1, x2, y1, y2, label, thisPage, "vertical");
		}
		
		var point_radius = oDlg.rd * 2.835
		var R_contents = "R = " + oDlg.rd + "mm";
	 
		if (oDlg.rd != "")
		{
			MakeRadii(point_radius, R_contents, width, height, thisPage, "radius");
		}
		
		
		if (oDlg.bw != "")
		{
			MakeBox(oDlg.ul_r, oDlg.ur_r, oDlg.ll_r, oDlg.lr_r, oDlg.bw, oDlg.bh, oDlg.rokt, "box", 0, 0);
		}

	}
	
	verd = oDlg.vd
	hord = oDlg.hd
	rsed = oDlg.rd
	
	boxw = oDlg.bw
	boxh = oDlg.bh
	ul_r = oDlg.ul_r
	ur_r = oDlg.ur_r
	ll_r = oDlg.ll_r
	lr_r = oDlg.lr_r
	rokt = oDlg.rokt
	
	// fix the values if the radius had been fixed
	if (oDlg.rokt == true)
	{
		ul_r = "0";
		ur_r = "-----";
		ll_r = "-----";
		lr_r = "-----";
	}
}


function fixZeroValue(r) 
{
	
	if ((r == 0) || (r == "") || (r == "-----"))
	{
		r = 0.05;
	}
	return r;
}


function MakeBar(x1, x2, y1, y2, label, thisPage, direction)
{
	var a = this.addAnnot({
				arrowBegin : "ClosedArrow",
				arrowEnd : "ClosedArrow",
				author : "距離ツール",
				borderEffectIntensity : 0,
				borderEffectStyle : "S",
				capOffsetH : 0,
				capOffsetV : 0,
				captionStyle : "Inline",
				contents : label,
				delay : false,
				doCaption : true,
				exdata : undefined,
				fillColor : ["RGB",1,0,0],
				hidden : false,
				intent : "LineDimension",
				leaderExtend : 5,
				leaderLength : 15,
				leaderOffset : 0,
				lock : false,
				lockContents : true,
				noView : false,
				opacity : 1,
				page : thisPage,
				points : [[x1,y1],[x2,y2]],
				popupOpen : false,
				print : true,
				readOnly : false,
				refType : "R",
				rotate : 0,
				seqNum : 1,
				strokeColor : ["RGB",1,0,0],
				style : "S",
				subject : direction,
				toggleNoView : false,
				type : "Line",
				width : 0.5,
			});
}


function MakeRadii(point_radius, R_contents, width, height, thisPage, direction)
{
	var pointsq1 = new Array();
	var pointsq2 = new Array();
	var pointsq3 = new Array();
	var pointsq4 = new Array();
	var x_counter = 0;
	for (var x = 0; x <= point_radius; x=x+.001) 
	{
		var y = Math.sqrt((Math.pow(point_radius, 2) - Math.pow(x, 2)))
		pointsq1[x_counter] = [x+width, y+height];
		pointsq2[x_counter] = [-x+width, y+height];
		pointsq3[x_counter] = [x+width, -y+height];
		pointsq4[x_counter] = [-x+width, -y+height];
		x_counter++
	}

	var annot = this.addAnnot({
		type: "Ink",
		page: thisPage,
		gestures: [pointsq1],
		strokeColor: color.red,
		width: 0.5,
		contents: R_contents,
		subject: direction,
	});		
	var annot = this.addAnnot({
		type: "Ink",
		page: thisPage,
		gestures: [pointsq2],
		strokeColor: color.red,
		width: 0.5,
		contents: R_contents,
		subject: direction,
	});
	var annot = this.addAnnot({
		type: "Ink",
		page: thisPage,
		gestures: [pointsq3],
		strokeColor: color.red,
		width: 0.5,
		contents: R_contents,
		subject: direction,
	});
	var annot = this.addAnnot({
		type: "Ink",
		page: thisPage,
		gestures: [pointsq4],
		strokeColor: color.red,
		width: 0.5, 
		contents: R_contents,
		subject: direction,
	}); 
}


function MakeBox(dUpperLeftRadius, dUpperRightRadius, dLowerLeftRadius, dLowerRightRadius, dBoxWidth, dBoxHeight, dKotei, direction, startingX, startingY)
{
	var aRect = this.getPageBox("Media");
	var width = ((aRect[2] - aRect[0]) / 2);
	var height = ((aRect[1] - aRect[3]) / 2);
	var thisPage = this.pageNum;
	console.println(startingX);
	
	// if the user input NO RADIUS information, we just make a simple box and call it good
	if ((dUpperLeftRadius == "") && (dUpperRightRadius == "") && (dLowerLeftRadius == "") && (dLowerRightRadius == ""))
	{
		var label_contents = "W: " + String(dBoxWidth) + "mm H: " + String(dBoxHeight) + "mm";
		
		var annot = this.addAnnot({
			type: "Square",
			page: thisPage,
			rect: [aRect[2]-(dBoxWidth * 2.83465), aRect[1]-(dBoxHeight * 2.83465), aRect[2], aRect[1]],
			strokeColor: color.red,
			width: 0.5,
			contents: label_contents,
			intent: "Square",
			subject: direction
		});	
	}
	else
	{
		if (dKotei == true)
		{
			console.println("kotei was true");
			var label_contents = "W: " + String(dBoxWidth) + "mm H: " + String(dBoxHeight) + "mm R: " + String(dUpperLeftRadius) + "mm";
			
			//assign the empty radius boxes the same value as the upper left one, and while
			//we're at it, fix the zero value, if there is one
			var ul_point_radius = fixZeroValue(dUpperLeftRadius)* 2.835
			var ur_point_radius = ul_point_radius
			var ll_point_radius = ul_point_radius
			var lr_point_radius = ul_point_radius
			
			dUpperRightRadius = fixZeroValue(dUpperLeftRadius)
			dLowerLeftRadius = fixZeroValue(dUpperLeftRadius)
			dLowerRightRadius = fixZeroValue(dUpperLeftRadius)
		}
		else
		{
			var label_contents = "W: "+String(dBoxWidth) +"mm H: "+String(dBoxHeight)+"mm 左上R: "+String(dUpperLeftRadius)+"mm 右上R: "+String(dUpperRightRadius)+"mm 左下R: "+String(dLowerLeftRadius)+"mm 右下R: "+String(dLowerRightRadius)+"mm";

			var ul_point_radius = fixZeroValue(dUpperLeftRadius)* 2.835
			var ur_point_radius = fixZeroValue(dUpperRightRadius)* 2.835
			var ll_point_radius = fixZeroValue(dLowerLeftRadius)* 2.835
			var lr_point_radius = fixZeroValue(dLowerRightRadius)* 2.835
		}
		
		var points = new Array();
		var x_counter = 0;
		var total_horizontal_radiiTOP = parseInt(dUpperLeftRadius) + parseInt(dUpperRightRadius)
		var total_horizontal_radiiBOTTOM = parseInt(dLowerLeftRadius) + parseInt(dLowerRightRadius)
		var total_vertical_radiiLEFT = parseInt(dLowerLeftRadius) + parseInt(dUpperLeftRadius)
		var total_vertical_radiiRIGHT = parseInt(dLowerRightRadius) + parseInt(dUpperRightRadius)
		

		

		//12 to 3 o'clock		
		for (var x = 0; x < ur_point_radius; x=x+.001) 
		{
			var y = Math.sqrt((Math.pow(ur_point_radius, 2) - Math.pow(x, 2)))
			if (startingX != 0)
			{
				points[x_counter] = [x+startingX, y+startingY];
			}
			else
			{
				points[x_counter] = [x+aRect[2], y+aRect[1]];
			}
			x_counter++
		}
		var last_x = (points[x_counter-1][0])
		var last_y = (points[x_counter-1][1] - ((dBoxHeight - total_vertical_radiiRIGHT) * 2.83465))
		

		points.push([last_x, last_y]); // make a vertical line down 
		x_counter++
		
		//3 to 6 o'clock
		for (var x = lr_point_radius; x > 0; x=x-.001)
		{
			var y = Math.sqrt((Math.pow(lr_point_radius, 2) - Math.pow(x, 2)))
			points[x_counter] = [x+last_x-lr_point_radius, -y+last_y];
			x_counter++
		}
		var last_x = (points[x_counter-1][0] - ((dBoxWidth - total_horizontal_radiiBOTTOM) * 2.83465))
		var last_y = points[x_counter-1][1]
		points.push([last_x, last_y]); // make a horizontal line across
		x_counter++
		
		
		//6 to 9 o'clock
		for (var x = 0; x < ll_point_radius; x=x+.001)
		{
			var y = Math.sqrt((Math.pow(ll_point_radius, 2) - Math.pow(x, 2)))
			points[x_counter] = [-x+last_x, -y+last_y+ll_point_radius];
			x_counter++
		}
		var last_x = (points[x_counter-1][0])
		var last_y = (points[x_counter-1][1] + ((dBoxHeight - total_vertical_radiiLEFT) * 2.83465))
		points.push([last_x, last_y]);  // make a vertical line up
		x_counter++
		
		
		// by the time the "pen" has come full circle, there is a bit of misalignment (vertically), so we have to go through
		// the loop once to figure out 1) the final y-coordinate of the 9 to 12 o'clock quarter and 2) how much that y-coordinate differs from the
		// 1st y-coordinate of the whole box.  Then, when we draw the REAL quarter circle, we add that value to the y value
		// to bring the whole thing into alignment vertically
		//9 to 12 o'clock TEST
		var candidate_ys = new Array();
		var ys_counter = 0;
		for (var x = ul_point_radius; x > 0; x=x-.001)
		{
			var y = Math.sqrt((Math.pow(ul_point_radius, 2) - Math.pow(x, 2)))
			candidate_ys[ys_counter] = [y+last_y];
			ys_counter++
		}
		var vertical_offset = points[0][1] - (candidate_ys[ys_counter-1]);
		
		
		
		//9 to 12 o'clock
		for (var x = ul_point_radius; x > 0; x=x-.001)
		{
			var y = Math.sqrt((Math.pow(ul_point_radius, 2) - Math.pow(x, 2)))
			points[x_counter] = [-(x-last_x-ul_point_radius), y+last_y+vertical_offset];
			x_counter++
		}
		var last_x = (points[x_counter-1][0] + ((dBoxWidth - total_horizontal_radiiTOP) * 2.83465))
		points.push([points[0][0], points[0][1]]); // make a horizontal line over

		if (startingX == 0)
		{
			for (var p = 0; p < points.length; p++)
			{
				points[p][0] = points[p][0] - width
				points[p][1] = points[p][1] - height
			} 
		}

		var annot = this.addAnnot({
			type: "Ink",
			page: thisPage,
			gestures: [points],
			strokeColor: color.red,
			width: 0.5,
			contents: label_contents,
			intent: "Ink",
			subject: direction
		});	
	}
}

function Update()
{

	var aRect = this.getPageBox("Media");
	var width = ((aRect[2] - aRect[0]) / 2);
	var height = ((aRect[1] - aRect[3]) / 2);
	var thisPage = this.pageNum;

	var annots = this.getAnnots(thisPage);
	for (var a = 0; a < annots.length; a++)
	{
		if (annots[a].subject == "horizontal")
		{
			var y1 = annots[a].points[0][1];
			var y2 = annots[a].points[0][1];
			var x1 = annots[a].points[0][0];
			var x2 = x1 + (annots[a].contents.replace(" mm", "") * 2.83465)
			MakeBar(x1, x2, y1, y2, annots[a].contents, thisPage, "horizontal")
			annots[a].destroy();
			continue;
		}
		
		else if (annots[a].subject == "vertical")
		{
			var x1 = annots[a].points[0][0];
			var x2 = annots[a].points[0][0];
			var y1 = annots[a].points[0][1];
			var y2 = y1 + (annots[a].contents.replace(" mm", "") * 2.83465);
			MakeBar(x1, x2, y1, y2, annots[a].contents, thisPage, "vertical")
			annots[a].destroy();
			continue;
		}
		
		else if (annots[a].subject == "box")
		{
			var splitContents = annots[a].contents.split(":")
			if (splitContents.length == 4)
			{
				var BoxWidth = splitContents[1].replace(" ", "").replace("mm", "").replace(" H", "");
				var BoxHeight = splitContents[2].replace(" ", "").replace("mm", "").replace(" R", "");
				var BoxRadius = splitContents[3].replace(" ", "").replace("mm", "");
				console.println(annots[a].gestures[0][0][0])
				console.println(annots[a].gestures[0][0][1])
				MakeBox(BoxRadius, BoxRadius, BoxRadius, BoxRadius, BoxWidth, BoxHeight, true, "box", annots[a].gestures[0][0][0], annots[a].gestures[0][0][1]);
				annots[a].destroy();
				continue;
			}
			else
			{
				var BoxWidth = splitContents[1].replace(" ", "").replace("mm", "").replace(" H", "");
				var BoxHeight = splitContents[2].replace(" ", "").replace("mm", "").replace(" 左上R", "");
				var ULRadius = splitContents[3].replace(" ", "").replace("mm", "").replace(" 右上R", "");
				var URRadius = splitContents[4].replace(" ", "").replace("mm", "").replace(" 左下R", "");
				var LLRadius = splitContents[5].replace(" ", "").replace("mm", "").replace(" 右下R", "");
				var LRRadius = splitContents[6].replace(" ", "").replace("mm", "");
				MakeBox(ULRadius, URRadius, LLRadius, LRRadius, BoxWidth, BoxHeight, false, "box", annots[a].gestures[0][0][0], annots[a].gestures[0][0][1]);
				annots[a].destroy();
				continue;
			}
		}
	}
}


function Flip()
{
	var a = this.selectedAnnots
	if (a[0].type == "Line")
	{
		var Xs = a[0].points[0][0]
		var Xe = a[0].points[1][0]
		var Ys = a[0].points[0][1]
		var Ye = a[0].points[1][1]
		var xDistance = Math.abs(Xs - Xe)
		var yDistance = Math.abs(Ys - Ye)
		if (xDistance == 0)
		{
			a[0].points = [[Xs, Ys], [Xs+yDistance, Ys]]
			a[0].subject = "horizontal"
		}
		else
		{
			a[0].points = [[Xs, Ys], [Xs, Ys+xDistance]]
			a[0].subject = "vertical"
		}
	}
	if (a[0].subject == "box")
	{	
		var splitContents = a[0].contents.split(":")
		if (splitContents.length == 4)
		{
			var BoxWidth = splitContents[1].replace(" ", "").replace("mm", "").replace(" H", "");
			var BoxHeight = splitContents[2].replace(" ", "").replace("mm", "").replace(" R", "");
			var BoxRadius = splitContents[3].replace(" ", "").replace("mm", "");
			console.println(a[0].gestures[0][0][0])
			console.println(a[0].gestures[0][0][1])
			// these should be like this
			// but we're flipping the box
			// so they are changed                              BoxWidth,  BoxHeight
			MakeBox(BoxRadius, BoxRadius, BoxRadius, BoxRadius, BoxHeight, BoxWidth, true, "box", a[0].gestures[0][0][0], a[0].gestures[0][0][1]);
			a[0].destroy();
			
		}
		else
		{
			app.alert("角のRが統一していない枠の回転ができません。");
			// var BoxWidth = splitContents[1].replace(" ", "").replace("mm", "").replace(" H", "");
			// var BoxHeight = splitContents[2].replace(" ", "").replace("mm", "").replace(" 左上R", "");
			// var ULRadius = splitContents[3].replace(" ", "").replace("mm", "").replace(" 右上R", "");
			// var URRadius = splitContents[4].replace(" ", "").replace("mm", "").replace(" 左下R", "");
			// var LLRadius = splitContents[5].replace(" ", "").replace("mm", "").replace(" 右下R", "");
			// var LRRadius = splitContents[6].replace(" ", "").replace("mm", "");
			// MakeBox(ULRadius, LRRadius, URRadius, LLRadius, BoxHeight, BoxWidth, false, "box", a[0].gestures[0][0][0], a[0].gestures[0][0][1]);
			// a[0].destroy();
			
		}
		
		
		
	}
	
}



var EButton = this.getField("Execute");
if (EButton == null)
{
	
	app.alert("PDF の左下に、操作ボタンがあります。PDFを保存すると、ボタンが消えます。");
	
	var EButton = this.addField("Execute", "button", 0, [0,0,40,9]);
	EButton.fillColor = color.ltGray;
	EButton.buttonSetCaption("新しい注釈を作成");
	EButton.setAction("MouseUp", "Dialog()");
	
	var UButton = this.addField("Update", "button", 0, [41,0,81,9]);
	UButton.fillColor = color.ltGray;
	UButton.buttonSetCaption("既存注釈を更新");
	UButton.setAction("MouseUp", "Update()");
	
	var FButton = this.addField("Flip", "button", 0, [82,0,140,9]);
	FButton.fillColor = color.ltGray;
	FButton.buttonSetCaption("選択した注釈を回転させる");
	FButton.setAction("MouseUp", "Flip()");

}

this.setAction("WillSave","this.removeField('Execute'); this.removeField('Update'); this.removeField('Flip'); this.removeField('Message');");







