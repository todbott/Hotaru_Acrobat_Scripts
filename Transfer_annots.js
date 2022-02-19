var  annotQuads = []
var annotPages = []

app.alert({cMsg: "原稿PDFファイルを選んでください",
	nIcon: 3,
	nType: 0,
	cTitle: "ファイルを開く",
});
app.beginPriv();
var oRetn = app.browseForDoc();
var original = app.openDoc({cPath: oRetn.cPath, bHidden: false});

app.alert({cMsg: "対訳PDFファイルを選んでください",
	nIcon: 3,
	nType: 0,
	cTitle: "ファイルを開く",
});
var oRetn = app.browseForDoc();
var other = app.openDoc({cPath: oRetn.cPath, bHidden: false});

for (var p=original.numPages; p>0; p--) {
	var theseAnnots = original.getAnnots(p);
	if (theseAnnots == null) {
		continue
	} else {
		for (var a=0; a<theseAnnots.length; a++) {
			console.println(theseAnnots[a].type)
			if (theseAnnots[a].type === "Square") {
				annotQuads.push(theseAnnots[a].rect)
				annotPages.push(p)
			}
		}
		
	}
}

console.println(annotQuads.length)
console.println(annotPages)

for (var r=0; r<annotQuads.length; r++) {
	other.addAnnot({
		page: annotPages[r], 
		type: "Square", 
		author: "python",
		rect: [annotQuads[r][0], annotQuads[r][1], annotQuads[r][2], annotQuads[r][3]],
	});
}

for (var p=other.numPages-1; p>-1; p--) {
	if (annotPages.indexOf(p) < 0) {
		other.deletePages(p)
	}
}


for (var p=original.numPages-1; p>-1; p--) {
	if (annotPages.indexOf(p) < 0) {
		original.deletePages(p)
	}
}


original.insertPages
	({
	nPage: original.numPages-1,
	cPath: other.path,
	});
	
for (var i=0; i<other.numPages; i = i+1) 
{
	original.movePage(0, i+other.numPages)
}

