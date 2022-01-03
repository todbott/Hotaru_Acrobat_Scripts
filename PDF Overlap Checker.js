

app.beginPriv();
var myDoc = app.newDoc();
myDoc.importIcon("trados", "/THIIDASERVER/sd2/SD2_003_Hensyu-G/SD2_225_ueda/from_Todd/trados.jpg", 0);
myDoc.closeDoc(true);
app.endPriv();

var icon6 = util.iconStreamFromIcon(myDoc.getIcon("trados"));

app.addToolButton({
cName: "pdf_overlap",
oIcon: icon6,
cExec: "pdf_overlap_checker()",
cTooltext: "PDF にある全ての文書は、別のPDFに存在するかどうかの確認",
cLabel: "PDFとPDF・結束度",
cEnable: "event.rc = (event.target != null);",
nPos: 5
});

function pdf_overlap_checker() {

 // GET A WORD LIST FROM THE ----this---- FILE

	var v_figure = 1.2;
	var h_figure = .88;

	var word = "";
	var word_list_this = new Array();
	var this_name = this.documentFileName;
	var cleared_size_test = 0;
	var hashigo = 0;
	var quads;
	var index_page;
	var acceptable_distance_v;
	var acceptable_distance_h;
	var word_list;
	var word_list_array = new Array();
	var i = 0;

	var cRtn = app.response ({ cQuestion:"目次は何ページにありますか？ 無い場合には、あり得ない数字を入力してください（例えば　2000)", cTitle:"目次のページ", bPassword:false, cDefault: 1, cLabel:"page"}); 
	if(cRtn && cRtn.length) { 
    	index_page = cRtn; 
	} else app.alert("キャンセルされました"); 

	var therm1 = app.thermometer;
	therm1.duration = this.numPages;
	therm1.begin();
	for (var page_number = 0; page_number < this.numPages; page_number++ )
	{
		// going through all the pages for loop // 

		therm1.value = page_number;
		therm1.text = "ページ " + (page_number + 1) + " / " + this.numPages + " に番号を振っています";
		var numWords = this.getPageNumWords(page_number);
		var word_number_on_page = 0;
		var phrase_length = 0;
		while (word_number_on_page < numWords) 
		{
			page_word = this.getPageNthWord(page_number, word_number_on_page);
			if (page_number == (index_page - 1))
			{
				while ((!(/\S/.test(page_word))) || (!(isNaN(page_word))))
				{
					word_number_on_page++;
					page_word = this.getPageNthWord(page_number, word_number_on_page);
					if (word_number_on_page >= numWords)
					{
						break;
					}
				}
			}
			else
			{
				while (!(/\S/.test(page_word))) 
				{
					word_number_on_page++;
					page_word = this.getPageNthWord(page_number, word_number_on_page);
					if (word_number_on_page >= numWords)
					{
						break;
					}
				}
			}
			
			quads = this.getPageNthWordQuads(page_number, word_number_on_page);
			var indv_quads = String(quads);
			a = indv_quads.split(',');
			for (b = 0; b < 8; b++)
			{
				(a[b]) = parseInt(a[b]);
			}
			acceptable_distance_v = (a[1] - a[5]) * v_figure;
			acceptable_distance_h = (a[1] - a[5]) * h_figure;
			word_list = word_list + "|||" + page_word;
			phrase_length = phrase_length + 1;			

			// test the next word's position //
	
			word_number_on_page = word_number_on_page + 1;
			if (word_number_on_page >= numWords)
			{
				hashigo = 1;
			}
			page_word = this.getPageNthWord(page_number, word_number_on_page)
			if (page_number == (index_page - 1))
			{
				while ((!(/\S/.test(page_word))) || (!(isNaN(page_word))))
				{
					word_number_on_page++;
					page_word = this.getPageNthWord(page_number, word_number_on_page);
					if (word_number_on_page >= numWords)
					{
						break;
					}
				}
			}
			else
			{
				while (!(/\S/.test(page_word))) 
				{
					word_number_on_page++;
					page_word = this.getPageNthWord(page_number, word_number_on_page);
					if (word_number_on_page >= numWords)
					{
						break;
					}
				}
			}
			quads = this.getPageNthWordQuads(page_number, word_number_on_page);
			var indv_quads = String(quads);
			var b = indv_quads.split(',');
			for (c = 0; c < 8; c++)
			{
				(b[c]) = parseInt(b[c]);
			}	
			var h_distance = b[0] - a[2];
			var v_distance = b[5] - a[7];
			h_distance = Math.abs(h_distance);
			v_distance = Math.abs(v_distance);	
					
			if (((h_distance > acceptable_distance_h) && (v_distance > acceptable_distance_v)) || ((h_distance == 0) && (v_distance > acceptable_distance_v)) || ((v_distance == 0) && (h_distance > acceptable_distance_h)))
			{
				cleared_size_test = 1;
			}
			if ((cleared_size_test == 1) || (hashigo == 1))
			{
				var segment_in_question = word_list;
				word_list = "";
				var word_count_and_contents = segment_in_question.split("|||");
				word_list_this[i] = word_count_and_contents;
				cleared_size_test = 0;
				hashigo = 0;
				phrase_length = 0;
				i = i + 1;
			}
		}
	if (therm1.cancelled) break; 
	}
	therm1.end();




 // GET A WORD LIST FROM THE ----that---- FILE

	app.alert({cMsg: "Open the 2nd document",
	nIcon: 3,
	nType: 0,
	cTitle: "ファイルを開く",
	});
	app.beginPriv();
	var oRetn = app.browseForDoc();
	var that = app.openDoc(oRetn.cPath);
	app.endPriv();
	
	var word = "";
	var word_list_that = new Array();
	var that_name = that.documentFileName;


	var cleared_size_test = 0;
	var hashigo = 0;
	var quads;
	var index_page;
	var acceptable_distance_v;
	var acceptable_distance_h;
	var word_list;
	var word_list_array = new Array();
	var i = 0;

	var cRtn = app.response ({ cQuestion:"目次は何ページにありますか？ 無い場合には、あり得ない数字を入力してください（例えば　2000)", cTitle:"目次のページ", bPassword:false, cDefault: 1, cLabel:"page"}); 
	if(cRtn && cRtn.length) { 
    	index_page = cRtn; 
	} else app.alert("キャンセルされました"); 

	therm1.duration = that.numPages;
	therm1.begin();
	for (var page_number = 0; page_number < that.numPages; page_number++ )
	{
		// going through all the pages for loop // 

		therm1.value = page_number;
		therm1.text = "ページ " + (page_number + 1) + " / " + that.numPages + " に番号を振っています";
		var numWords = that.getPageNumWords(page_number);
		var word_number_on_page = 0;
		var phrase_length = 0;
		while (word_number_on_page < numWords) 
		{
			page_word = that.getPageNthWord(page_number, word_number_on_page);
			if (page_number == (index_page - 1))
			{
				while ((!(/\S/.test(page_word))) || (!(isNaN(page_word))))
				{
					word_number_on_page++;
					page_word = that.getPageNthWord(page_number, word_number_on_page);
					if (word_number_on_page >= numWords)
					{
						break;
					}
				}
			}
			else
			{
				while (!(/\S/.test(page_word))) 
				{
					word_number_on_page++;
					page_word = that.getPageNthWord(page_number, word_number_on_page);
					if (word_number_on_page >= numWords)
					{
						break;
					}
				}
			}
			
			quads = that.getPageNthWordQuads(page_number, word_number_on_page);
			var indv_quads = String(quads);
			a = indv_quads.split(',');
			for (b = 0; b < 8; b++)
			{
				(a[b]) = parseInt(a[b]);
			}
			acceptable_distance_v = (a[1] - a[5]) * v_figure;
			acceptable_distance_h = (a[1] - a[5]) * h_figure;
			word_list = word_list + "|||" + page_word;
			phrase_length = phrase_length + 1;			

			// test the next word's position //
	
			word_number_on_page = word_number_on_page + 1;
			if (word_number_on_page >= numWords)
			{
				hashigo = 1;
			}
			page_word = that.getPageNthWord(page_number, word_number_on_page)
			if (page_number == (index_page - 1))
			{
				while ((!(/\S/.test(page_word))) || (!(isNaN(page_word))))
				{
					word_number_on_page++;
					page_word = that.getPageNthWord(page_number, word_number_on_page);
					if (word_number_on_page >= numWords)
					{
						break;
					}
				}
			}
			else
			{
				while (!(/\S/.test(page_word))) 
				{
					word_number_on_page++;
					page_word = that.getPageNthWord(page_number, word_number_on_page);
					if (word_number_on_page >= numWords)
					{
						break;
					}
				}
			}
			quads = that.getPageNthWordQuads(page_number, word_number_on_page);
			var indv_quads = String(quads);
			var b = indv_quads.split(',');
			for (c = 0; c < 8; c++)
			{
				(b[c]) = parseInt(b[c]);
			}	
			var h_distance = b[0] - a[2];
			var v_distance = b[5] - a[7];
			h_distance = Math.abs(h_distance);
			v_distance = Math.abs(v_distance);	
					
			if (((h_distance > acceptable_distance_h) && (v_distance > acceptable_distance_v)) || ((h_distance == 0) && (v_distance > acceptable_distance_v)) || ((v_distance == 0) && (h_distance > acceptable_distance_h)))
			{
				cleared_size_test = 1;
			}
			if ((cleared_size_test == 1) || (hashigo == 1))
			{
				var segment_in_question = word_list;
				word_list = "";
				var word_count_and_contents = segment_in_question.split("|||");
				word_list_that[i] = word_count_and_contents;
				cleared_size_test = 0;
				hashigo = 0;
				phrase_length = 0;
				i = i + 1;
			}
		}
	if (therm1.cancelled) break; 
	}
	therm1.end();




	var therm = app.thermometer;
	therm.duration = word_list_that.length;
	var this_length = word_list_this.length;
	var that_length = word_list_that.length;
	therm.begin();
	if (this_length >= that_length)
	{
		for (i = 0; i < that_length; i++)
		{
			therm.value = i;
			therm.text = "Getting the " + i + " / " + that_length + " phrase";
			var that_word = word_list_that[i].toString();
			for (j = 0; j < this_length; j++)
			{
				var this_word = word_list_this[j].toString();
				if (that_word == this_word)
				{
					word_list_this[j] = "";
					word_list_that[i] = "";
					break;
				}
			}
		}
	
	}
	therm.end();

	var therm = app.thermometer;
	therm.duration = word_list_this.length;
	therm.begin();
	if (this_length < that_length)
	{
		for (i = 0; i < this_length; i++)
		{
			therm.value = i;
			therm.text = "Getting the " + i + " / " + this_length + " word";
			var this_word = word_list_this[i].toString();
			for (j = 0; j < that_length; j++)
			{
				var that_word = word_list_that[j].toString();
				if (this_word == that_word)
				{
					word_list_that[j] = "";
					word_list_this[i] = "";
					break;
				}
			}
		}
	
	}
	therm.end();

	console.println("Phrases only existing in " + this_name);
	for (p = 0; p < word_list_this.length; p++)
	{
		console.println(word_list_this[p]);
	}

	console.println("Phrases only existing in " + that_name);
	for (p = 0; p < word_list_that.length; p++)
	{
		console.println(word_list_that[p]);
	}



}
app.trustedFunction(pdf_overlap_checker);