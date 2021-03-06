app.addToolButton({
cName: "complete_checker_tool_1",
cExec: "m_function ()",
cTooltext: "比較的な翻訳ができるように、テキストを抽出ツール",
cLabel: "「逆引ヘルパー」 抽出",
cEnable: "event.rc = (event.target != null);",
nPos: 0
});

function get_max(array) {
	
	var answer = array.reduce(function(a, b) {
	return Math.max(a, b);
	});
	
	return answer
}

function get_min(array) {
	
	var answer = array.reduce(function(a, b) {
	return Math.min(a, b);
	});
	
	return answer
}


function make_furiban(which, list, page) {
	
	var segment_array = new Array();
	var page_word_array = new Array();
	var page_quad_array = new Array();
	var page_ref_array = new Array();
	
	// arrays for keeping the annot data until all the analysis is finished
	var quad_bases = new Array();
	var pages = new Array();
	var segments_for_annot = new Array();
	var numbers = new Array();

	s_array = list
	
	// put the numbers PLUS segments in the segment array before sorting by length
	for (var s = 1; s < s_array.length; s = s + 2) {
		var num = s-1
		var number = s_array[num]
		var compiled = s_array[s] + "|||||" + number
		segment_array.push(compiled)
	}
	
	// sort the array from the longest to the shortest segments
	segment_array.sort(function(a, b){return b.length - a.length});

	for (var word_number = 0; word_number < which.getPageNumWords(page); word_number++) {
		var word = which.getPageNthWord(page, word_number, false);
		var quad = which.getPageNthWordQuads(page, word_number);
		page_word_array.push(word)
		page_quad_array.push(quad)
	}

	for (var s = 0; s < segment_array.length; s++) {
		
		var segment_and_number = segment_array[s]
		var raw_segment = segment_and_number.split("|||||")[0]
		
		var number = segment_and_number.split("|||||")[1]
		

		var segment = raw_segment.split("")
		var segment_for_annot = raw_segment
		
		var check_the_segment = segment_for_annot.replace(/[\s\u0001]+/g, "")
		
		if (check_the_segment.length > 0) {

			for (var c = 0; c < page_word_array.length; c ++) {
				
				var vertical_values = new Array();
				var horizontal_values = new Array();
				
				var splice_begin = c
				
				var page_letters = new Array();
				var word_in_question = c
				
				while ((page_letters.length < segment.length) && (word_in_question < page_word_array.length)) {
					
					vertical_values.push(String(page_quad_array[word_in_question]).split(",")[1])
					vertical_values.push(String(page_quad_array[word_in_question]).split(",")[5])
					horizontal_values.push(String(page_quad_array[word_in_question]).split(",")[0])
					horizontal_values.push(String(page_quad_array[word_in_question]).split(",")[2])
					
					for (var chopping = 0; chopping < page_word_array[word_in_question].length; chopping++) {
						page_letters.push(page_word_array[word_in_question][chopping])
					}
					
					word_in_question += 1
									
				}
				
				var splice_length = word_in_question - c
				
				var compiled_page_letters = page_letters.join("")        
				var compiled_segment_letters =   segment.join("")
				
				if (compiled_page_letters == compiled_segment_letters) {

					page_word_array.splice(splice_begin, splice_length)
					page_quad_array.splice(splice_begin, splice_length)
					
					var vertical_max = get_max(vertical_values)
					var vertical_min = get_min(vertical_values)
					var horizontal_max = get_max(horizontal_values)
					var horizontal_min = get_min(horizontal_values)
					
					var quad_base = new Array();
					quad_base.push(horizontal_min)
					quad_base.push(vertical_min)
					quad_base.push(horizontal_max)
					quad_base.push(vertical_max)
					
					
					
					
					quad_bases.push(quad_base)
					segments_for_annot.push(segment_for_annot)
					numbers.push(number)
					
					break;
				}
			}
		}
	}
	
	//now, add all the annots, so that the numbers in the annot boxes don't themselves get tagged by annot searches that come after them
	var cycling_color = new Array(   color.red,    color.dkGray, color.blue,    color.cyan,  color.ltGray, color.magenta, color.yellow, color.gray)
	var background_color = new Array(color.ltGray, color.white,  color.ltGray,  color.black, color.dkGray, color.white,   color.black,  color.black)
	var c = 0
	
	for (var a = 0; a < segments_for_annot.length; a++) {
				
		var x_zero = parseInt(String(quad_bases[a]).split(",")[0])
		var x_one = parseInt(String(quad_bases[a]).split(",")[3])
		
		
		
		var annot = which.addAnnot({
			page: page, 
			type: "Square", 
			author: "python",
			rect: quad_bases[a],
			contents: segments_for_annot[a],
			strokeColor: cycling_color[c]
		});
		
		var one = x_zero
		var two = x_one
		var three = x_zero - 10
		var four = x_one - 10
		
		if (numbers[a] > 9)
		{
			three = x_zero - 15;  
		}
		if (numbers[a] > 99)
		{
			three = x_zero - 20;
		}
		if (numbers[a] > 999)
		{
			three = x_zero - 25;
		}
		
		var annot = which.addAnnot({
			page: page, 
			type: "FreeText", 
			author: "python",
			fillColor: background_color[c],
			strokeColor: cycling_color[c],
			rect: [one, two, three, four],
			subject: segments_for_annot[a]
		});
		var spans = new Array();
		spans[0] = new Object();
		spans[0].text = numbers[a];
		spans[0].textColor = cycling_color[c];
		spans[0].textSize = 8;
		annot.richContents = spans;
		
		c += 1
		
		if (c > 7) {
			c = 0
		}
	}
}


function g_quads (which, page, word)  {
	
	q = which.getPageNthWordQuads(page, word);
	q = String(q);
	q = q.split(',');
	return q;	
}


function g_contents (which, trim_information, page, western_characters)  {
	
	var word = ""
	var word_list = ""
	
	first_word = which.getPageNthWord(page, 0, false)
	first_quads = g_quads(which, page, 0);
	if ((parseInt(first_quads[1]) < parseInt(trim_information[1])) && (parseInt(first_quads[5]) > parseInt(trim_information[3]))) {
		word_list = word_list + " " + first_word;
	}
	
	for (var w = 1; w < which.getPageNumWords(page); w++)
	{
		previous_word = which.getPageNthWord(page, w-1, false);
		word = which.getPageNthWord(page, w, false);
		
		previous_quads = g_quads(which, page, w-1);
		quads = g_quads(which, page, w);
		
		// do the character checks that were previously carried out in python
		var A = false;
		var B = false;
		var C = false;
		previous_word = previous_word.replace(/ /g, "");
		this_word = word.replace(/ /g, "");
		

		try {
			if (western_characters == true) {
				var aa = previous_word[previous_word.length-2]
				var compare1 = aa.replace(/[a-z.!;:?]+/g, "")
				if (aa == compare1) {
					A = false;
				} else { A = true};

				var bb = previous_word[previous_word.length-1]
				var compare2 = bb.replace(/[.。:!?]+/g, "")
				if (bb == compare2) {
					B = false;				
				} else { B = true};

				var cc = this_word[0]
				var compare3 = cc.replace(/[0-9A-Z"(]+/g, "")
				if (cc == compare3) {
					C = false;			
				} else { C = true};
			}
			else {
				var aa = previous_word[previous_word.length-2]
				var compare1 = aa.replace(/[。!;:?]+/g, "")
				if (aa == compare1) {
					A = false;
				} else { A = true};

				var bb = previous_word[previous_word.length-1]
				var compare2 = bb.replace(/[。:!?]+/g, "")
				if (bb == compare2) {
					B = false;				
				} else { B = true};

				var cc = this_word[0]
				var compare3 = cc.replace(/[0-9"(]+/g, "")
				if (cc == compare3) {
					C = false;			
				} else { C = true};
			}
				
		} catch (e){}
		// ---------- end character checks ------------------------------------------------
		
		finally {
		
		
			if ((parseInt(quads[1]) < parseInt(trim_information[1])) && (parseInt(quads[5]) > parseInt(trim_information[3]))) { // the word is within the trim box
				
				font_height = (parseInt(quads[1]) - parseInt(quads[5]))
				previous_font_height = (parseInt(previous_quads[1]) - parseInt(previous_quads[5]))
				horizontal_gap = (parseInt(previous_quads[2]) - parseInt(quads[0]))
				if ((((Math.abs(font_height - previous_font_height)) > 2) || ((horizontal_gap < 0) && ((Math.abs(horizontal_gap)) > 15))) || ((A == true) && (B == true) && (C == true))) { // if a jump or decrease in font size is detected, or a 
				
						word_list = word_list + "|||||" + parseInt(previous_quads[0]) + "|||||" + parseInt(previous_quads[1]) + "|||||segment_enddd|||splitter|||";		
				}
				word_list = word_list + word;
				
			}
		}
	}
	
	return word_list

}








function m_function () {
	
	var western_characters = true;
	
	var dialog = {

		commit:function (dialog) {
		western_characters = true;
		},

		cancel: function(dialog) { 
		western_characters = false;
		},
 	
		description:
  		{
    		name: "Language Check",    // Dialog box title
    		elements:
    		[
      			{
        		type: "view",
        		elements:
					[
						{ 	name: "このPDFの言語は、日本語・中国語・韓国語ですか？", 
							type: "static_text", 
							multiline: "false",
							width: 300,
							height: 80,
						},
						{
							type: "ok_cancel",
								ok_name: "はい",
								cancel_name: "いいえ"
						},
					]
      			},
    		]
  		}
	}

	app.execDialog(dialog);
	
	
	var found_a_box = false
	var final_word_list = ""
	var check_naiyo = ""
	
	for (var p = 0; p < this.numPages; p++) {
		try { var annots = this.getAnnots(p);
			for (var a = 0; a < annots.length; a++) {

				if (annots[a].type == "Square") {
					var trim = (annots[a].rect);
					trim = String(trim);
					trim_shuffle_yo = trim.split(',');
					var trim1 = new Array();
					trim1.push(trim_shuffle_yo[0]);
					trim1.push(trim_shuffle_yo[3]);
					trim1.push(trim_shuffle_yo[2]);
					trim1.push(trim_shuffle_yo[1]);
					found_a_box = true
					var page_words = g_contents(this, trim1, p, western_characters);
					final_word_list = final_word_list + " segment_enddd "  + page_words
					}
			}
			
		}
		catch (err) { }
		}
	
	if (!found_a_box) {
		var offset = 0
		var trim = this.getPageBox("Trim");
		trim = String(trim);
		trim1 = trim.split(',')
		for (var page = 0; page < this.numPages; page++) {
			final_word_list = g_contents(this, trim1, page, western_characters)
			
			//the final word list now contains segment|||||quad0|||||quad1|||||segment_endd|||splitter|||
			//so, we will break it up and order it by quad value before writing it to a text file
			
			final_word_list = final_word_list.split("|||splitter|||")
			
			//final_word_list.sort(function(a, b){return parseInt(b.split("|||||")[1]) - parseInt(a.split("|||||")[1])});  // sort by x values in a decreasing manner
			final_word_list.sort(function(a, b){return parseInt(b.split("|||||")[2]) - parseInt(a.split("|||||")[2])});  // sort by y values in an INCREASING manner
			
			var fwl_for_furiban = new Array();
			
			for (var segment = 0; segment < final_word_list.length; segment ++) {
				var segment_and_marker = final_word_list[segment].split("|||||")[0] + final_word_list[segment].split("|||||")[3]
				var segment_only = final_word_list[segment].split("|||||")[0]
				
				final_word_list[segment] = segment_and_marker
				
				fwl_for_furiban.push(segment + offset)
				fwl_for_furiban.push(segment_only)
			}
			offset = (offset + final_word_list.length - 1)
			
			final_word_list.join("");

			make_furiban(this, fwl_for_furiban, page)
			
			check_naiyo = check_naiyo + final_word_list
			
		}
	}
	
	this.createDataObject("check_naiyo.txt", check_naiyo)
	
	this.exportDataObject("check_naiyo.txt")

	app.alert("終わりました。これから、「逆引ヘルパー」 を起動してください。", 3, 0, "終わりました");
}	
	
