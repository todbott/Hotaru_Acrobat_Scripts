app.addToolButton({
cName: "complete_checker_tool_1",
cExec: "main_function ()",
cTooltext: "比較的な翻訳ができるように、テキストを抽出ツール",
cLabel: "「逆引ヘルパー」 抽出",
nPos: 0
});

function get_quads (which, page, word)  {
	
	q = which.getPageNthWordQuads(page, word);
	q = String(q);
	q = q.split(',');
	return q;	
}


function get_contents (which, trim_information, filename)  {
	
	var word = ""
	var word_list = ""
	
	for (var p = 0; p < which.numPages; p++)
	{
		first_word = which.getPageNthWord(p, 0, false)
		first_quads = get_quads(which, p, 0);
		if ((parseInt(first_quads[1]) < parseInt(trim_information[1])) && (parseInt(first_quads[5]) > parseInt(trim_information[3]))) {
			word_list = word_list + " " + first_word;
		}
		for (var w = 1; w < which.getPageNumWords(p); w++)
		{
			word = which.getPageNthWord(p, w, false);
			
			previous_quads = get_quads(which, p, w-1);
			quads = get_quads(which, p, w);
			
			if ((parseInt(quads[1]) < parseInt(trim_information[1])) && (parseInt(quads[5]) > parseInt(trim_information[3]))) { // the word is within the trim box
				
				font_height = (parseInt(quads[1]) - parseInt(quads[5]))
				previous_font_height = (parseInt(previous_quads[1]) - parseInt(previous_quads[5]))
				horizontal_gap = (parseInt(previous_quads[2]) - parseInt(quads[0]))
				if (((Math.abs(font_height - previous_font_height)) > 2) || ((horizontal_gap < 0) && ((Math.abs(horizontal_gap)) > 15))) { // if a jump or decrease in font size is detected, or a 
					
					word_list = word_list + "segment_enddd";
				
				}
				word_list = word_list + " " + word;
			}
		}
	}
	which.createDataObject(filename, word_list);
	which.exportDataObject(filename)
	
}


function main_function () {
	
	
	var one_ok = 0
	var two_ok = 0
	
	app.alert({cMsg: "原稿PDFファイルを選んでください",
		nIcon: 3,
		nType: 0,
		cTitle: "ファイルを開く",
	});
	app.beginPriv();
	var oRetn = app.browseForDoc();
	var original = app.openDoc({cPath: oRetn.cPath, bHidden: false});
	original_path = oRetn.cPath;
	var trim = original.getPageBox("Trim");
	trim = String(trim);
	trim1 = trim.split(',')
	if (parseInt(trim1[0]) > 0)
	{
		one_ok = 1
	}

	app.alert({cMsg: "対訳PDFファイルを選んでください",
		nIcon: 3,
		nType: 0,
		cTitle: "ファイルを開く",
	});
	var oRetn = app.browseForDoc();
	var other = app.openDoc({cPath: oRetn.cPath, bHidden: false});
	other_path = oRetn.cPath;
	trim = other.getPageBox("Trim");
	trim = String(trim);
	trim2 = trim.split(',')
	if (parseInt(trim2[0]) > 0)
	{
		two_ok = 1
	}
	
	if ((one_ok == 1) && (two_ok == 1))	 {
		
		original_words = get_contents(original, trim1, "original_words.txt")
		other_words = get_contents(other, trim2, "other_words.txt")
		app.alert("終わりました。これから、「逆引ヘルパー」 を起動して下さい。", 3, 0, "終わりました");
		original.closeDoc(bNoSave = true);
		other.closeDoc(bNoSave = true);
	}
	
	if (one_ok == 0) {
		app.alert({cMsg: "原稿PDFの Trim Box が設定されていません。\n" + 	"今の状態で、翻訳のためにテキストを取ると、ページのフチにあるファイル名\n" + "もしくは制作時間と日付も取られることになって\n" + "翻訳結果はおかしくなる可能性が高いです。\n" + "\n" + "自分で、Trim Box　を設定してから、このツールを再度に起動して下さい。",
			nIcon: 3,
			nType: 0,
			cTitle: "Trim Box 設定が必要",
		});
		original.closeDoc(bNoSave = true);
		other.closeDoc(bNoSave = true);
	}
	if (two_ok == 0) {
		app.alert({cMsg: "対訳PDFの Trim Box が設定されていません。\n" + 	"今の状態で、翻訳のためにテキストを取ると、ページのフチにあるファイル名\n" + "もしくは制作時間と日付も取られることになって\n" + "翻訳結果はおかしくなる可能性が高いです。\n" + "\n" + "自分で、Trim Box　を設定してから、このツールを再度に起動して下さい。",
			nIcon: 3,
			nType: 0,
			cTitle: "Trim Box 設定が必要",
		});
		original.closeDoc(bNoSave = true);
		other.closeDoc(bNoSave = true);
	}

	app.endPriv();
}
app.trustedFunction(main_function);
	
