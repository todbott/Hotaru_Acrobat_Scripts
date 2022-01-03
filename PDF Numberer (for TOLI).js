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
	app.beginPriv();
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
	
	annot_in_question.contents = word_list;
	
	thisPair = [String(global.n), word_list]
	global.forSegments.push(thisPair)
		
		
	x1 = up[0];
	x2 = up[0] - 10;
	y1 = up[1];
	y2 = up[1] - 10;
	if (global.n > 9)
	{
		x2 = up[0] - 15;  // y and 1 for rotated files
	}
	if (global.n > 99)
	{
		x2 = up[0] - 20;
	}
	if (global.n > 999)
	{
		x2 = up[0] - 25;
	}
	var annot = this.addAnnot({
			page: this.pageNum, 
			type: "FreeText", 
			author: "python",
			fillColor: [ "G", 0.90 ],
			strokeColor: color.blue,
			rect: [up[0], up[1], x2, y2],
			contents: String(global.n)
		});
		var spans = new Array();
		spans[0] = new Object();
		spans[0].text = String(global.n);
		spans[0].textColor = color.blue;
		spans[0].textSize = 8;
		annot.richContents = spans;
		
	global.n = parseInt(global.n) + 1
	global.page = this.pageNum;
	app.endPriv();
	
}
app.trustedFunction(OMU);







function OMD () {
	
	upper_left_x = this.mouseX
	upper_left_y = this.mouseY
	return [upper_left_x, upper_left_y];
}
app.trustedFunction(OMD);






function FBH () {


	var goon = 1;
	var choice = "1"

	var dialog = {

		commit:function (dialog) {
		var results = dialog.store();
		if (results["sub1"]) 
		{
			choice = 1;
		}
		else if (results["sub6"]) 
		{
			choice = 6;
		}		
		else if (results["sub2"])
		{
			choice = 2;
		}
		else if (results["sub3"])
		{
			choice = 3;
		}
		else if (results["sub4"])
		{
			choice = 4;
		}
		else if (results["sub5"])
		{
			choice = 5;
		}
		},

		cancel: function(dialog) { 
		console.println("Cancel!");
		goon = 0;
		},
 	
		description:
  		{
    		name: "振番機能",    // Dialog box title
    		elements:
    		[
      			{
        		type: "view",
        		elements:
        		[
        			{
            				type: "radio",
            				item_id: "sub3",
            				group_id: "g1",
            				name: "ハイライトの横に番号を振ります",
            				width: 200,
            				height: 25
        			},
				{ 	name: "マーキング済みのPDFに振番番号を振ります。内容は「segments.txt」として保存されます（翻訳依頼を作るためのファイル）。", 
					type: "static_text", 
					multiline: "true",
					width: 300,
					height: 25,
				}, 
 	       			{
            				type: "radio",
            				item_id: "sub4",
            				group_id: "g1",
            				name: "ゼロから振番（自動）",
            				width: 200,
            				height: 25
        			},
 				{ 	name: "PDFの内容を自動的に区切られ、振番番号を振る機能です。内容は「segments.txt」として保存されます（翻訳依頼を作るためのファイル）。", 
					type: "static_text", 
					multiline: "true",
					width: 300,
					height: 25,
				}, 
					{
							type: "radio",
							item_id: "sub5",
							group_id: "g1",
							name: "ゼロから振り番（手動）",
							width: 200,
							height: 25
					}, 
				{ 	name: "振番を作成します（手動）。内容は「segments.txt」として保存されます（翻訳依頼を作るためのファイル）。",
					type: "static_text",
					multiline: "true",
					width: 300,
					height: 25,
				},
         			{
   	         			type: "ok_cancel",
       		     			ok_name: "ok",
       		     			cancel_name: "cancel"
       	   			},
       		 	]
      			},
    		]
  		}
	}

	app.execDialog(dialog);
	console.println(choice)
	
	if (goon == 1)
	{
		if (choice == 3) // user chose numbers beside existing highlights
		{
		
			var rect = new Array();
			var annots_archive = new Array();
			var serial_number = 1;
			var box_width = 15;
			var box_height = 10;
			var numbersAndContents = new Array();
			var serialNumberArchive = new Array();
			
			var serial_number = app.response ({ cQuestion:"何番から始まりたいですか？", cTitle:"スタート番号", bPassword:false, cDefault: "1", cLabel:"number"});
			var doThisPage = app.response ({ cQuestion:"対象ページを入力してください。", cTitle:"ページ番号", bPassword:false, cDefault: "1", cLabel:"number"});
		
			this.syncAnnotScan();
			var page_number = doThisPage; 
			do
			{
				var annots = this.getAnnots(page_number);
				
				if (annots !== null)
				{
					console.println("There are " + annots.length + " annotations on page " + page_number);
					for (var q = 0; q < annots.length; q++)
					{
						if (annots[q].type == "Highlight")
						{
							console.println("found a highlight");
							numberAndContent = [String(serial_number), annots[q].contents]
							numbersAndContents.push(numberAndContent)
							serialNumberArchive.push(String(serial_number))
							
							annots_archive.push(annots[q]);
							serial_number = serial_number + 1;
						}
						else
						{
							break
						}
					}
				}
				page_number++
			}
			while (page_number < doThisPage+1);
		

			var therm2 = app.thermometer;
			therm2.duration = annots_archive.length;
			therm2.begin();
			for (var i = 0; i < annots_archive.length; i++)
			{
				therm2.value = i;
				therm2.text = "Getting the contents of marked segment " + (i + 1) + " / " + annots_archive.length;
				rect = annots_archive[i].quads;
				rect = String(rect);
				rect = rect.split(',');
				if (parseInt(annots_archive[i].contents) > 99)
				{
					var x1 = (parseInt(rect[0]) - (parseInt(box_width) + 3));
				}
				else 
				{
					var x1 = (parseInt(rect[0]) - box_width);
				}
				var y1 = (parseInt(rect[1]) - 8);
				var x2 = (parseInt(rect[0]) + 0);
				var y2 = ((parseInt(rect[1]) + (parseInt(box_height)))-8);
				console.println(y2);
				console.println(box_height);
				var annot = this.addAnnot({
					page: annots_archive[i].page, 
					type: "FreeText", 
					fillColor: ["CMYK", 0,0,1,0],
					rect: [x1,y1,x2,y2],
					author: "ボックス",
				});
				var spans = new Array ();
				spans[0] = new Object();
				spans[0].text = serialNumberArchive[i];
				spans[0].textSize = 6;
				spans[0].fontStyle = "regular";
				annot.richContents = spans;
				
			}
			therm2.end();
		
			console.println("done");
			
			var data = "";

			for (var i = 0; i < numbersAndContents.length; i++)
			{
				data = data + numbersAndContents[i][0] + "	" + numbersAndContents[i][1] + '\r\n';
			}
			this.createDataObject("Segments.txt", data);
			app.alert("終わっています。振り番番号と内容が入っている Segments.txt ファイルはこのPDFに埋め込まれています（添付ファイルとして）。")
			
			return;
		
		} 


 		if (choice == 4) // user chose Furiban from Zero
		{

			var words = new Array();
			var quads = new Array();
			var page = new Array();
			var page_number = new Array();
			var quads_storage = [];
			var L_range = new Array();
			var R_range = new Array();
			var T_range = new Array();
			var B_range = new Array();
			var B1 = 0;
			var B2 = 0;
			var B3 = 0;
			var B4 = 0;
			var b = 0;
			var cleared = 0;
			var unfound = "";
			var standard = 2;
			var serial_number = 1;
			var phrase_length = 0;
			var ideal = 0;
			var i = 0;
			var word_list = new Array();
			var segment_number = new Array();

			var cRtn = app.response ({ cQuestion:"内容を区切りに付くための数字を入れてください （たいてい、２は適切です）。出来上がったPDFに区切りの問題がもしあれば、より高い数字（例えば４か５）を入力する上に、もう一回起動してください。", cTitle:"距離", bPassword:false, cDefault: 2, cLabel:"距離"}); 
			if(cRtn && cRtn.length) { 
				standard = cRtn; 
			} else app.alert("キャンセルされました");
			
			var serial_number = app.response ({ cQuestion:"何番から始まりたいですか？", cTitle:"スタート番号", bPassword:false, cDefault: "1", cLabel:"number"});
			var doThisPage = app.response ({ cQuestion:"対象ページを入力してください。", cTitle:"ページ番号", bPassword:false, cDefault: "1", cLabel:"number"});
		
			for (var page_number = doThisPage; page_number < doThisPage+1; page_number++)
			{
				for (var word_number = 0; word_number < this.getPageNumWords(page_number); word_number++)
				{
					words[b] = this.getPageNthWord(page_number, word_number, false);
					quads[b] = this.getPageNthWordQuads(page_number, word_number, false);
					page[b] = page_number;
					page_number[b] = this.getPageNumWords(page_number);
					b = b + 1;
				}
			}
			
			word_list[i] = "";

			for (var b = 0; b < words.length; b++)
			{
				quads_storage.push(quads[b]);
				var dist_quads = String(quads[(b)]);
				dist_quads = dist_quads.split(',');
				var adv = ((parseInt(dist_quads[1]) - parseInt(dist_quads[5])) * standard);	
				var adh = ((parseInt(dist_quads[2]) - parseInt(dist_quads[0])) * standard);		
				var this_place = quads[b];
				var this_word = words[b];
				this_place = String(this_place);
				this_place = this_place.split(',');
				var next_place = quads[(b + 1)];
				if ((b + 1) > page_number[b])
				{
					next_place = [200000,0,200000,0,200000,0,200000,0];
					console.println("found a non-number in next place");
				}
				next_place = String(next_place);
				next_place = next_place.split(',');

				var hd = Math.abs(this_place[2] - next_place[0]);
				var vd = Math.abs(this_place[1] - next_place[1]);
				phrase_length = phrase_length + 1;
				word_list[i] = word_list[i] + this_word;
				
			
				if (((hd > adh) && (vd > adv)) || ((hd < adh) && (vd > adv)) || ((vd < adv) && (hd > adh)))
				{
					quads_storage = String(quads_storage);
					quads_storage = quads_storage.split(',');
					var step = 0;
					for (var p = 0; p < (phrase_length * 8); p++)
					{
						L_range[step] = quads_storage[p]
						p = p + 1;
						T_range[step] = quads_storage[p]
						p = p + 1;
						R_range[step] = quads_storage[p]
						p = p + 3;
						B_range[step] = quads_storage[p]
						p = p + 2;
						step = step + 1;
					}
					var L = Math.ceil(Math.min.apply(Math,L_range));
					var R = Math.floor(Math.max.apply(Math,R_range));
					var T = Math.ceil(Math.max.apply(Math,T_range));
					var B = Math.floor(Math.min.apply(Math,B_range));
					L_range = [];
					T_range = [];
					R_range = [];
					B_range = [];
					var seg_number_for_annot = parseInt(serial_number);
					var annot = this.addAnnot({
						page: page[b], 
						type: "Square", 
						rect: [R,B,L,T], 
						author: "python", 
						contents: String(seg_number_for_annot),
						fillColor: color.yellow,
						strokeColor: color.yellow,
						opacity: 0.4
					});
					B1 = L
					B3 = L-15
					if (serial_number > 99)
					{
						B3 = L-20;
					}
					if (serial_number > 999)
					{
						B3 = L-25;
					}
					ideal = Math.ceil((8 - (T - B)) / 2);
					ideal = ideal + 1;
					B2 = B - ideal;
					B4 = T + ideal;	
					var annot = this.addAnnot({
						page: page[b], 
						type: "FreeText", 
						fillColor: ["CMYK", 0,0,1,0],
						rect: [B1,B2,B3,B4],
						author: "ボックス",
					});
					var spans = new Array ();
					spans[0] = new Object();
					spans[0].text = String(seg_number_for_annot);
					spans[0].textSize = 6;
					spans[0].fontStyle = "regular";
					annot.richContents = spans;
					serial_number = serial_number + 1;
					quads_storage = [];
					phrase_length = 0;
					segment_number[i] = String(seg_number_for_annot);
					i =  i + 1;
					word_list[i] = "";
				}
			}
			var data = "";

			for (var i = 0; i < word_list.length; i++)
			{
				data = data + segment_number[i] + "	" + word_list[i] + '\r\n';
			}
			this.createDataObject("Segments.txt", data);
			app.alert("終わっています。振り番番号と内容が入っている Segments.txt ファイルはこのPDFに埋め込まれています（添付ファイルとして）。")
		}
		if (choice == 5) // user chose furiban from scanned image
		{
			
			/* ゼロから振番 */

			global.forSegments = new Array()

			global.n = app.response ({ cQuestion:"何番から始まりたいですか？", cTitle:"スタート番号", bPassword:false, cDefault: "1", cLabel:"number"});
			app.alert("ページごとに、最初の注釈が付けられる前に、ページ全体の言葉と各言葉のxy座標を分析されます。\nですので、ページが変わる度に、クリックしてから最初の注釈が現れるまで、時間が掛かる場合があります。\n\n注釈作業が終わったら、Ctrl + s を押してください。", 3);
			for (var page = 0; page < this.numPages; page++)
			{	
				
				var aRect = this.getPageBox( {cBox: "Trim", nPage: page} );
				console.println(aRect);
				var f = this.addField("field", "button", page, aRect );
				f.display.hidden;
				f.setAction("MouseDown", "var up = OMD()");
				f.setAction("MouseUp", "OMU(up)");
			}	
			this.setAction("WillSave","moveTheContents()");
			
		}
	}
}
app.trustedFunction(FBH);

function moveTheContents()
{
	this.removeField('field');
	var data = "";

	for (var i = 0; i < global.forSegments.length; i++)
	{
		data = data + global.forSegments[i][0] + "	" + global.forSegments[i][1] + '\r\n';
	}
	this.createDataObject("Segments.txt", data);
	app.alert("終わっています。振り番番号と内容が入っている Segments.txt ファイルはこのPDFに埋め込まれています（添付ファイルとして）。")
}

FBH();