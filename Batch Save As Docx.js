app.addToolButton({
cName: "temp",
cExec: "saw ()",
cTooltext: "save as docx",
cLabel: "batch_save_as_docx",
cEnable: "event.rc = (event.target != null);",
nPos: 0
});

function saw ()  {
	app.beginPriv()
	var doc_list = app.activeDocs;
	for (var d = 0; d < doc_list.length; d++) {
		this_doc = doc_list[d]
		this_doc.saveAs(this_doc.path + ".docx", "com.adobe.acrobat.docx")
		}
	app.endPriv()
}
app.trustedFunction(saw);