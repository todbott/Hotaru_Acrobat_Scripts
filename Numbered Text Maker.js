app.addToolButton({
cName: "many_functions_for_making_and_processing_PDF_furibans",
cExec: "furiban_helper ()",
cTooltext: "Lots of furiban functions",
cLabel: "振番ヘルパー(2019.02)",
cEnable: "event.rc = (event.target != null);",
nPos: 3
}); 


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











 function OnMouseUp (up) {
	
	this.addAnnot({
			page: this.pageNum, 
			type: "Square", 
			author: "python",
			rect: [up[0], up[1], this.mouseX, this.mouseY],
			strokeColor: color.blue,
		});
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
	
}

function OnMouseDown () {
	
	upper_left_x = this.mouseX
	upper_left_y = this.mouseY
	return [upper_left_x, upper_left_y];
} 







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
            				item_id: "sub1",
            				group_id: "g1",
            				name: "テキストリストから振番を作ります（インデザインPDF・数ページのPDF）",
            				width: 200,
            				height: 25
        			},
        			{
            				type: "radio",
            				item_id: "sub6",
            				group_id: "g1",
            				name: "テキストリストから振番を作ります（イラレPDF・ぺらものPDF）",
            				width: 200,
            				height: 25
        			},
				{ 	name: "テキストリストからテキストを取って、マークする機能です。　（テキストリストを文字コード UTF-8 のテキストファイルとして保存される必要があります）", 
					type: "static_text", 
					multiline: "true",
					width: 300,
					height: 25,
				},
         			{
            				type: "radio",
            				item_id: "sub2",
            				group_id: "g1",
            				name: "Highlight a new PDF based on highlights from an old PDF",
            				width: 200,
            				height: 25
        			},
				{ 	name: "Get the contents of highlighted sections, and mark the same sections in a different PDF.", 
					type: "static_text", 
					multiline: "true",
					width: 300,
					height: 40
				},
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
 		if (choice == 1)  // user chose Text to Furiban, InDesign
		{
			var segment_array = new Array();
			var unaltered_segment_array = new Array();
			
			app.alert("始める前に、テキストリストは下記のフォーマットにしてください：\n\n\nセグメント\nセグメント\nセグメント\nなど...");
			
			var cRtn = app.response ({ cQuestion:"テキストリストファイルパスを入力してください （例えば　C:\\Users\\furiban.txt）", cTitle:"テキストファイル名前・パス", bPassword:false, cDefault: "C:\\Users\\furiban.txt", cLabel:"path&name"}); 
			if(cRtn && cRtn.length) { 
				var new_path = cRtn; 
			} else app.alert("キャンセルされました");
			
			this.importDataObject("furiban", new_path);  // puts the pdffuriban.txt file into the PDF and names it "furiban"
			var object_File = this.getDataObjectContents("furiban");
			var cFile = util.stringFromStream(object_File, "utf-8");
			
			
			cFile = String(cFile);
			segment_array = cFile.split("\n");
			unaltered_segment_array = cFile.split("\n"); // for the unfound.txt file
			
			for (var s = 0; s < segment_array.length; s++)
			{
				console.println(segment_array[s]);
				segment_array[s] = segment_array[s].replace(/,/g , "");  // replace commas
				segment_array[s] = segment_array[s].replace(/\./g, "");  // replace periods
				
				segment_array[s] = segment_array[s].replace(/[\r\n]+/g, "");  // replace linebreaks and returns
				unaltered_segment_array[s] = unaltered_segment_array[s].replace(/[\r\n]+/g, "");
				
				segment_array[s] = segment_array[s].replace(/\//g, ""); // replace forward slashes 
				segment_array[s] = segment_array[s].replace(/ /g, ""); // replace spaces
				segment_array[s] = segment_array[s].replace("..", "."); // replace double periods
			}

			var words = new Array();
			var quads = new Array();
			var page = new Array();
			var segment = new Array();
			var quads_for_annot = new Array();
			var mark_sumi_overlap = 0;
			var fw = 1; 
			var length = 0;
			var b = 0;
			var leftoff = 0;
			var data = "";
			var data2 = "";
			var rep = new Report();
			var cleared = 0;
			var mark_sumi = new Array();
			//var accents    = 'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeedCcDIIIIiiiiUUUUuuuuNn???yy??';
			//var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";

			for (var page_number = 0; page_number < this.numPages; page_number++)
			{
				for (var word_number = 0; word_number < this.getPageNumWords(page_number); word_number++)
				{
					words[b] = this.getPageNthWord(page_number, word_number, false);
					words[b] = words[b].replace(/,/g , "");  // replace commas
					words[b] = words[b].replace(/\./g, "");  // replace periods
					words[b] = words[b].replace(/[\r\n]+/g, "")  // replace linebreaks and returns
					words[b] = words[b].replace(/\//g, ""); // replace forward slashes
	 				var letters = words[b].split('');
					var x;
					for (var L = 0; L < letters.length; L++)
					{
						x = accents.indexOf(letters[L]);
						if (x > -1)
						{
							letters[L] = accentsOut[x];
						}
					}
					words[b] = letters.join(''); 
					words[b] = words[b].replace(/ /g, ""); // replace spaces
					quads[b] = this.getPageNthWordQuads(page_number, word_number, false);
					page[b] = page_number;
					b = b + 1;
				}
			}
			console.println(words.length);
			
			b = 0;
			

			for (var i = 0; i < (segment_array.length - 1); i++)
			{

				// getting the annotation for loop //


				var word_count_and_contents = segment_array[i];
				var phrase_length = (word_count_and_contents.length) - 1;
				fl = 0;
				
				for (var b = 0; b < words.length; b++)
				{
					quads_for_annot.push(quads[b]);
					for (var l = 0; l < words[b].length; l++)
					{
						var page_letter = words[b][l];
						var file_letter = word_count_and_contents[fl];
						// quads_for_annot.push(quads[b]);
						//console.println(page_letter + " is page letter and " + file_letter + " is file letter with phrase length of " + phrase_length);
						if (page_letter.indexOf(file_letter) > -1)
						{
							fl = fl + 1;
						}
						if (fl > phrase_length)
						{
							var qfb = quads_for_annot[0];
							qfb = String(qfb);
							qfb = qfb.split(',');
							x1 = (parseInt(qfb[0]) - 10); 
							if ( i > 8)
							{
								x1 = (parseInt(qfb[0]) - 15);
							}
							if (i > 98)
							{
								x1 = (parseInt(qfb[0]) - 20);
							}
							if (i > 998)
							{
								x1 = (parseInt(qfb[0]) - 25);
							}
							y1 = (parseInt(qfb[1]) - 6);
							x2 = (parseInt(qfb[0]) - 0);
							y2 = (parseInt(qfb[1]) + 6);
							var number = i + 1;
							for (var q = 0; q < quads_for_annot.length; q++)
							{
								for (var d = 0; d < mark_sumi.length; d++)
								{
									if (String(mark_sumi[d]) == String(quads_for_annot[q]))
									{
										//console.println("segment " + number + " was mark sumi, breaking");
										mark_sumi_overlap = 1;
										break;
									}
								} 
								if (mark_sumi_overlap == 0)
								{
									var annot = this.addAnnot({
										page: page[b], 
										type: "Highlight", 
										quads: quads_for_annot[q], 
										author: "python", 
										contents: String(number),
										popupOpen: false
									});
									if (q == 0)
									{
										var annot = this.addAnnot({
											page: page[b],
											type: "FreeText",
											rect: [x1,y1,x2,y2],
											author: "python",
											contents: String(number),
										});
										var spans = new Array ();
										spans[0] = new Object();
										spans[0].text = String(number);
										spans[0].textSize = 8;
										spans[0].fontStyle = "regular";
										annot.richContents = spans;
									}
									mark_sumi.push(quads_for_annot[q]);
									if (q == ((quads_for_annot.length) - 1))
									{
										cleared = 1;
										fl = 0;
										quads_for_annot = [];
										console.println("marked the " + number + "segment");
									}
								}
								else
								{
									break;
								}
							}
							fl = 0;
						}
						if (page_letter.indexOf(file_letter) < 0)
						{
							quads_for_annot = [];
							fl = 0;
						}
						if (cleared == 1)
						{
							break;
						}
					}
					mark_sumi_overlap = 0;
					if (cleared == 1)
					{
						break;
					}
				}
				if (cleared == 0)
				{
					data = data + (i+1) + " --- " + unaltered_segment_array[i] + '\r\n';
					data2 = data2 + (i+1) + ",";
				}
				cleared = 0;
				mark_sumi_overlap = 0;
			}
			for (var p = 0; p < this.numPages; p++)
			{
				var annots = this.getAnnots(p);
				if (annots != null)
				{
					for (var a = 0; a < annots.length; a++) 
					{
						if (annots[a].type == "Highlight")
						{
							annots[a].contents = ""
						}
					}
				}
			}
			if (/\S/.test(data))
			{
				this.createDataObject("unfound.txt", data);
				app.alert("終了です。数セグメントが見つけられなくて、マークされなかったです。\nマークされなかったセグメントはこのPDFに埋め込まれている 'unfound.txt' ファイルに載ってあります。");			
			}
			else
			{
				app.alert("終了です。");
			}
		}
			
		
		if (choice == 6) // user chose text to Furiban, one-page or Illustrator
		{
			
			var segment_array = new Array();
			var unaltered_segment_array = new Array();
			
			app.alert("始める前に、テキストリストは下記のフォーマットにしてください：\n\n\nセグメント\nセグメント\nセグメント\nなど...");					
			
			var cRtn = app.response ({ cQuestion:"テキストリストファイルパスを入力してください （例えば　C:\\Users\\furiban.txt）", cTitle:"テキストファイル名前・パス", bPassword:false, cDefault: "C:\\Users\\furiban.txt", cLabel:"path&name"}); 
			
			if(cRtn && cRtn.length) { 
				var new_path = cRtn; 
			} else app.alert("キャンセルされました");
			
			this.importDataObject("furiban", new_path);  // puts the pdffuriban.txt file into the PDF and names it "furiban"
			var object_File = this.getDataObjectContents("furiban");
			var cFile = util.stringFromStream(object_File, "utf-8");
			
			var segment_array = new Array();
			var page_word_array = new Array();
			var page_quad_array = new Array();

			cFile = String(cFile);
			cFile = cFile.replace(/[^A-Za-z0-9\n]+/g, " ")
			s_array = cFile.split("\n");
			
			// put the numbers PLUS segments in the segment array before sorting by length
			for (var s = 1; s < s_array.length; s = s + 2) {
				var num = s-1
				var number = s_array[num]
				var compiled = s_array[s] + "|||||" + number
				segment_array.push(compiled)
			}
			
			// sort the array from the longest to the shortest segments
			segment_array.sort(function(a, b){return b.length - a.length});
			console.println(segment_array);

			for (var page_number = 0; page_number < this.numPages; page_number++)
			{
				for (var word_number = 0; word_number < this.getPageNumWords(page_number); word_number++)
				{
					var word = this.getPageNthWord(page_number, word_number, false);
					var quad = this.getPageNthWordQuads(page_number, word_number);
					page_word_array.push(word)
					page_quad_array.push(quad)
				}
			}

			for (var s = 0; s < segment_array.length; s++) {
				
				var segment_and_number = segment_array[s]
				var raw_segment = segment_and_number.split("|||||")[0]
				var number = segment_and_number.split("|||||")[1]

				var segment = raw_segment.split("")
				var segment_for_annot = raw_segment

				for (var c = 0; c < page_word_array.length; c ++) {
				
					var quad_base = page_quad_array[c]

					var splice_begin = c
					
					var page_letters = new Array();
					var word_in_question = c
					
					while ((page_letters.length < segment.length) && (word_in_question < page_word_array.length)) {
						
						for (var chopping = 0; chopping < page_word_array[word_in_question].length; chopping++) {
							page_letters.push(page_word_array[word_in_question][chopping])
						}
						
						word_in_question += 1
					}
					
					var splice_length = word_in_question - c
					
					var compiled_page_letters = page_letters.join("").replace(/[\r\n\s()R?"-]+/g, "")              // CHANGE TO (R) and (TM)
					var compiled_segment_letters =   segment.join("").replace(/[\r\n\s()R?"-]+/g, "")				// CHANGE TO (R) and (TM)
					
					
					if (compiled_page_letters == compiled_segment_letters) {
						console.println("found a match for segment " + number + ", so spliced " + splice_length + " words after the word " + page_word_array[splice_begin])

						page_word_array.splice(splice_begin, splice_length)
						page_quad_array.splice(splice_begin, splice_length)
						
						var x_zero = parseInt(String(quad_base).split(",")[0])
						var x_one = parseInt(String(quad_base).split(",")[1])
						
						var annot = this.addAnnot({
							page: 0, 
							type: "Highlight", 
							author: "python",
							quads: quad_base,
							contents: segment_for_annot
						});
						
						var one = x_zero
						var two = x_one
						var three = x_zero - 10
						var four = x_one - 10
						
						if (number > 9)
						{
							three = x_zero - 15;  
						}
						if (number > 99)
						{
							three = x_zero - 20;
						}
						if (global.n > 999)
						{
							three = x_zero - 25;
						}
						
						var annot = this.addAnnot({
							page: 0, 
							type: "FreeText", 
							author: "python",
							fillColor: [ "G", 0.90 ],
							strokeColor: color.blue,
							rect: [one, two, three, four],
							subject: segment_for_annot
						});
						var spans = new Array();
						spans[0] = new Object();
						spans[0].text = number;
						spans[0].textColor = color.blue;
						spans[0].textSize = 8;
						annot.richContents = spans;

						break;
					}
					
				}
			}
		} */

 		if (choice == 2) // user chose highlight to highlight
		{

			var quads = new Array();
			var rect = new Array();
			var segment_number_array = new Array();
			var qx = new Array();
			var qy = new Array();
			var wx = new Array();
			var wy = new Array();
			var r = new Array();
			var w = new Array();
			var word_list = new Array();
			var word_list_array = new Array();
			var word;
			var language = "";
			var annots_archive = new Array();
			var serial_number = 0;
		
			var main = event.target;
		
			var cRtn = app.response ({ cQuestion:"Enter an abbreviated language, for example EN for English of FR for French", cTitle:"Abbreviation", bPassword:false, cDefault: "EN", cLabel:"Language"}); 
			if(cRtn && cRtn.length) { 
				language = cRtn; 
			} else app.alert("Cancelled");
			
			main.syncAnnotScan();
			var page_number = 0; 
			do
			{
				var annots = main.getAnnots(page_number);
				if (annots !== null)
				{
					for (var q = 0; q < annots.length; q++)
					{
						annots[q].contents = language + "_" + (page_number + 1) + "_" + String(serial_number);
						annots_archive.push(annots[q]);
						serial_number = serial_number + 1;
					}
				}
				page_number++
				serial_number = 0;
			}
			while (page_number < main.numPages);
			
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
				var b = 0;
				var a = 0;
				while (b < rect.length)
				{
					qx[a] = parseInt(rect[b]);
					b = b + 1;
					qy[a] = parseInt(rect[b]);            
					b = b + 1;
					a = a + 1;
				}
				var max_x = Math.ceil(Math.max.apply(null, qx));
				var max_y = Math.ceil(Math.max.apply(null, qy));
				var min_x = Math.floor(Math.min.apply(null, qx));
				var min_y = Math.floor(Math.min.apply(null, qy));
				for (var word_on_page = 0; word_on_page < main.getPageNumWords(annots_archive[i].page); word_on_page++)
				{
					quads = main.getPageNthWordQuads(annots_archive[i].page, word_on_page);
					word = main.getPageNthWord(annots_archive[i].page, word_on_page);
					quads = String(quads);
					quads = quads.split(',');
					a = 0;
					b = 0;
					while (b < 8)
					{
						wx[a] = parseInt(quads[b]);
						b = b + 1;
						wy[a] = parseInt(quads[b]);
						b = b + 1;
						a = a + 1;
					}
					var w_max_x = Math.ceil(Math.max.apply(null, wx));
					var w_max_y = Math.ceil(Math.max.apply(null, wy));
					var w_min_x = Math.floor(Math.min.apply(null, wx));
					var w_min_y = Math.floor(Math.min.apply(null, wy));
					if ((w_min_x >= min_x && w_max_y <= max_y) && (w_max_x <= max_x && w_min_y >= min_y))
					{
							if (/\S/.test(word))
							{
								word_list = word_list + "|||" + word; 
							}
							
					}
					quads.length = 0;
				}
				word_list_array[i] = word_list;
				word_list = "";	
				r.length = 0;
				qx.length = 0;
				qy.length = 0;
				wx.length = 0;
				wy.length = 0;
				rect = 0;
				var segment_in_question = word_list_array[i];
				var word_count_and_contents = segment_in_question.split("|||");
				var phrase_length = (word_count_and_contents.length - 1);
				word_list_array[i] = phrase_length + segment_in_question;
				segment_number_array[i] = annots_archive[i].contents;
				console.println(word_list_array[i]);
				if (therm2.cancelled) break; 
			}
			therm2.end();

			app.alert({cMsg: "Now, open the PDF you want to mark",
			nIcon: 3,
			nType: 0,
			cTitle: "Open File",
			});
			app.beginPriv();
			var oRetn = app.browseForDoc();
			var that = app.openDoc(oRetn.cPath);
			app.endPriv();


			var words = new Array();
			var quads = new Array();
			var page = new Array();
			var quads_storage = [];
			var L_range = new Array();
			var R_range = new Array();
			var T_range = new Array();
			var B_range = new Array();
			var fw = 1; 
			var b = 0;
			var cleared = 0;
			var unfound = "";
			var mark_sumi = new Array();
		
			for (var page_number = 0; page_number < that.numPages; page_number++)
			{
				for (var word_number = 0; word_number < that.getPageNumWords(page_number); word_number++)
				{
					words[b] = that.getPageNthWord(page_number, word_number, false);
					quads[b] = that.getPageNthWordQuads(page_number, word_number, false);
					page[b] = page_number;
					b = b + 1;
				}
			}

			for (var i = 0; i < word_list_array.length; i++)
			{
		
				// getting the annotation for loop //
		
		
				var word_count_and_contents = word_list_array[i].split('|||');
				phrase_length = parseInt(word_count_and_contents[0]);
				fw = 1;
		
				for (var b = 0; b < words.length; b++)
				{
					var page_word = words[b];
					var file_word = word_count_and_contents[fw];
					quads_storage.push(quads[b]);
					if (page_word.indexOf(file_word) > -1)
					{
						fw = fw + 1;
						console.println("found the word " + file_word + " on page " + page[b]);
					}
					console.println(page_word + " " + file_word);
					if (fw > phrase_length)
					{
						// testing the previous & next places and putting in the annotation, preparation //
		
						var last_word = b + 1;
						quads_storage.push(quads[(last_word)]);
						var dist_quads = String(quads[(last_word)]);
						dist_quads = dist_quads.split(',');
						var ad = ((parseInt(dist_quads[1]) - parseInt(dist_quads[5])) * .36);
						var previous_place = quads[(last_word-phrase_length-1)];
						var next_place = quads[(last_word)]
						if ((last_word-phrase_length-1) < 0)
						{
							previous_place = [0,200000,0,200000,0,200000,0,200000];
							console.println("found a non-number in previous place");
						}
						if ((last_word + 1) > (that.getPageNumWords(page[b])))
						{
							next_place = [200000,0,200000,0,200000,0,200000,0];
							console.println("found a non-number in next place");
						}
						previous_place = String(previous_place);
						previous_place = previous_place.split(',');
						next_place = String(next_place);
						next_place = next_place.split(',');
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
						console.println("LRTB bounds are " + L + " " + R + " " + T + " " + B);
						var hhd = Math.abs(L - previous_place[0]);
						var hvd = Math.abs(T - previous_place[1]);
						var hd = Math.abs(R - next_place[2]);
						var vd = Math.abs(T - next_place[1]);
				
						var vd = Math.abs(T - next_place[1]);
						if (((hd > ad) && (vd > ad)) || ((hd < ad) && (vd > ad)) || ((vd < ad) && (hd > ad)))
						{
							if (((hhd > ad) && (hvd > ad)) || ((hhd < ad) && (hvd > ad)) || ((hvd < ad) && (hhd > ad)))
							{
								cleared = 1;
							}
							else console.println("problem with the head distances");
							}
						else console.println("problem with the next distances");
						var holder = L + "" + R + "" + T + "" + B;
						if (mark_sumi.indexOf(holder) > -1)
						{
							console.println("breaking coz of mark sumi");
							cleared = 0;
							fw = 1;
							quads_storage = [];
						}
						if (cleared == 1)
						{
							var annot = that.addAnnot({
								page: page[b], 
								type: "Square", 
								rect: [R,B,L,T], 
								author: "python", 
								contents: segment_number_array[i],
								fillColor: color.yellow,
								strokeColor: color.yellow,
								opacity: 0.4
							});
							mark_sumi[i] = String(holder);
							fw = 1;
							quads_storage = [];
							console.println("seem to have gotten through a marking");
							break;
						}
					}
					if (page_word.indexOf(file_word) < 0)
					{
						quads_storage = [];
						fw = 1;
						console.println("reset");
					}
				}
				if (cleared == 0)
				{
					unfound = unfound + " " + segment_number_array[i] + ","
				}
				cleared = 0;
			}
		
			if (/\S/.test(unfound))
			{
				app.alert("Finished!  The following segments could not be found:  " + unfound);
			}
			else
			{
				app.alert("Finished!");
			}


		}

		if (choice == 3) // user chose numbers beside existing highlights
		{
		
			var rect = new Array();
			var annots_archive = new Array();
			var serial_number = 1;
			var box_width = 15;
			var box_height = 10;
			var numbersAndContents = new Array();
			var serialNumberArchive = new Array();
		
			this.syncAnnotScan();
			var page_number = 0; 
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
			while (page_number < this.numPages);
		

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
		
			for (var page_number = 0; page_number < this.numPages; page_number++)
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
			

			
			global.n = app.response ({ cQuestion:"What number do you want to start from?", cTitle:"Start number", bPassword:false, cDefault: "1", cLabel:"number"});
			for (var page = 0; page < this.numPages; page++)
			{	
				var b = this.addField("button", "button", (this.numPages-1), [0, 40, 40, 0]);
				b.setAction("MouseDown","this.removeField('field');");
				b.fillColor=color.gray;
				b.buttonSetCaption("End");

				var aRect = this.getPageBox( {cBox: "Trim", nPage: page} );
				console.println(aRect);
				var f = this.addField("field", "button", page, aRect );
				f.display.hidden;
				f.setAction("MouseDown", "var up = OnMouseDown()");
				f.setAction("MouseUp", "OnMouseUp(up)");
			}	
			this.setAction("WillSave","this.removeField('button');");
			this.setAction("WillSave","this.removeField('field');");
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