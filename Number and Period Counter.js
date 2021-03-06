

function c(which) {
	
	var already_lit = new Array()
	var numbers = "0123456789";
	var letters = new Array();
	var already_lit = new Array();
	var number_count = 0;
	var period_count = 0;
	var nc = 0;
	var pc = 0;
	
	var x = 0
	do {
		try {
			var annots = which.getAnnots(x)
		} catch (error){}
		x = x + 1
	} while (!annots)
	
	var first_annot_page = x
	contents = annots[0].contents
	contents = contents.split("\r")
	annots[0].destroy()

	for (var m = 0; m < contents.length; m++) {
		segs = contents[m].split(" ")
		segs[0] = segs[0].replace(/[^a-zA-Z//0-9À-ž\s]/g, "")
		if ((numbers.indexOf(segs[0][0]) == -1) && (segs[0][0] != null))　{// If the line is not blank and begins with a letter...
			mokuji_text = segs[0] // ...the mokuji_text is the first word...
		}
		else mokuji_text = segs[1] // ...or else the mokuji text is the 2nd word.
		mt = mokuji_text.split("/")
		mokuji_text = mt[0]
		
		last = (segs.length - 1)
		segs[last] = segs[last].replace(/\./g, "")
		if (numbers.indexOf(segs[last][0]) == -1) { // if the line ends with a letter...
			do {
				m = m + 1
				rinji_segs = contents[m].split(" ")
				rinji_last = (rinji_segs.length - 1)
				peji = rinji_segs[rinji_last]
			peji = peji.replace(/\./g, "")} while (numbers.indexOf(peji[0]) < 0)
		}
		else peji = segs[last] // ...or else the page number is the last word on the current line
		
		console.println(mokuji_text + " " + peji)
		if (peji == 1) {
			var word = 20
		} else word = 0
		for (word; word < which.getPageNumWords(peji-1); word++) {
			check_word = which.getPageNthWord(peji-1, word, true)
			check_word = check_word.replace(/[^a-zA-Z//0-9À-ž\s]/g, "")
			check_quads = which.getPageNthWordQuads(peji-1, word)
			if ((check_word == mokuji_text) && (String(already_lit).indexOf(String(check_quads)) < 0)) {
				var annot = which.addAnnot({
					page: peji-1, 
					type: "Highlight", 
					quads: which.getPageNthWordQuads(peji-1, word), 
					author: "自動", 
					contents: "",
					popupOpen: false
				});
				already_lit.push(annot.quads)
				break;
			}
		}
	}
	var last_page = which.numPages - 1
	for (var w = which.getPageNumWords(last_page); w > 0; w--) {
		var word = which.getPageNthWord(last_page, w)
		quads = which.getPageNthWordQuads(last_page, w);
		quads = String(quads);
		quadss = quads.split(',');
		if (((parseInt(quadss[1]) < parseInt(trim1[1])) && (parseInt(quadss[5]) > parseInt(trim1[3]))) && (word != null)) {
			var annot = which.addAnnot({
				page: last_page, 
				type: "Highlight", 
				quads: which.getPageNthWordQuads(last_page, w), 
				author: "自動", 
				contents: "",
				popupOpen: false
			});
			break;
		}
	}
		
	for (var page = 0; page < which.numPages; page++) {
		var annots = which.getAnnots(page)
		var this_annot = 0;
		for (var word = 0; word < which.getPageNumWords(page); word++) {
			page_word = which.getPageNthWord(page, word, false);
			quads = which.getPageNthWordQuads(page, word);
			quads = String(quads);
			quadss = quads.split(',');
			if ((parseInt(quadss[1]) < parseInt(trim1[1])) && (parseInt(quadss[5]) > parseInt(trim1[3]))) {
				letters = page_word.split('');
				for (var letter = 0; letter < letters.length; letter++) {
					var x = numbers.indexOf(letters[letter]);
					if (x > -1) {
						number_count = number_count + 1;
						nc = nc + 1;
					}
					if ((letters[letter] == ".") && (letters[letter-1] != ".")) {
						period_count = period_count + 1;
						pc = pc + 1;
					}
				}
				if (annots!=null && annots.length!=0 && this_annot < annots.length) {
					var q = annots[this_annot].quads
					q = String(q)
					q = q.split(',')
					for (var qq = 0; qq < q.length; qq++) {
						q[qq] = parseInt(q[qq])
					}
					var w = which.getPageNthWordQuads(page, word)
					w = String(w)
					w = w.split(',')
					for (var ww = 0; ww < w.length; ww++) {
						w[ww] = parseInt(w[ww])
					}
					if (String(q) == String(w)) {
						x1 = (parseInt(q[0]) - 0); 
						y1 = (parseInt(q[1]) - 15);
						x2 = (parseInt(q[0]) + 80);
						y2 = (parseInt(q[1]) + 45);
						if (page == first_annot_page) {
							var annot = which.addAnnot({
								page: page, 
								type: "FreeText", 
								rect: [x1, y1, x2, y2], 
								author: "自動", 
								contents: "この注釈と始まりの間に\n" + nc + "数字\n" + pc + "ピリオド"
							});
						} else {
							var annot = which.addAnnot({
								page: page, 
								type: "FreeText", 
								rect: [x1, y1, x2, y2], 
								author: "自動", 
								contents: "この注釈と前の注釈の間に\n" + nc + "数字\n" + pc + "ピリオド",
								hidden: "true"
							});
						}
						this_annot = this_annot + 1
						nc = 0
						pc = 0
					}
				}
			}
		}
	}
	
	for (var page = 0; page < which.numPages; page++) {
		var annots = which.getAnnots(page)
		if (annots!=null && annots.length!=0) {
			for (var an = 0; an < annots.length; an++) {
				annots[an].hidden = "false"
			}
		}
	}
	return [period_count, number_count];
}


var one_period_count = 0
var one_number_count　= 0
var two_period_count = 0
var two_number_count = 0

var nRslt = app.alert ("このツールを起動する前に、ＰＤＦ上の目次をハイライトする必要があります。\n\n起動しますか？", 2, 2, "目次をハイライトしましたか？");
if(nRslt == 4) {

	original_name = this.documentFileName;
	var trim = this.getPageBox("Trim");

	trim = String(trim);
	trim1 = trim.split(',')

	if (parseInt(trim1[1]) > 0) {
		var original_OK = 1
	} else {
		app.alert({cMsg: "このファイルの Trim Box が設定されていません。\n" + 	"今の状態で、翻訳のためにテキストを取ると、ページのフチにあるファイル名\n" + "もしくは制作時間と日付も取られることになって\n" + "数字とピリオドの数値の的確さが落ちます。\n" + "\n" + "自分で、Trim Box　を設定してから、このツールを再度に起動して下さい。",
			nIcon: 3,
			nType: 0,
			cTitle: "Trim Box 設定が必要",
		});
	}

	app.alert("ページ数によって、５～１０　分でもかかる場合もありますので少々お待ち下さい")
	
	if (original_OK == 1){
		var p_and_n = c(this)
		one_period_count = p_and_n[0]
		one_number_count = p_and_n[1]
	}	
	app.alert({cMsg: "お待たせしました。\n-------------------\n\n" + original_name + "\nPDF のピリオド数は　" + one_period_count + " でした。\n数字数は　" + one_number_count　+ "　でした。",
		nIcon: 3,
		nType: 0,
		cTitle: "結果",
	});

	app.endPriv();

}　else {console.println("キャンセルされました")}


