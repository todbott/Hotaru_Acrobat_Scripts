var t = app.thermometer; 
t.duration = this.numPages;
t.begin();

for (page = 0; page < this.numPages; page++)
{
	for (word = 0; word < this.getPageNumWords(page); word++)
	{
		t.value = page;
		t.text = "Processing page " + (page + 1);
		if (t.cancelled) break;
		var there = this.getPageNthWord(page, word, false).replace(/[\r\n]+/g, "")
		var gone = this.getPageNthWord(page, word, true).replace(/[\r\n]+/g, "")
		
		var there_letters = there.split('');
		there = there_letters.join("");
		
		var gone_letters = gone.split('');
		gone = gone_letters.join("");
	

		for (L = 0; L < there.length; L++)
		{
			try
			{
		
				if ((there[L] == "-") && (gone[L].match(/[a-zA-Z0-9]/)))
				{
					var annot = this.addAnnot({
							page: page, 
							type: "Highlight", 
							author: "Toddo",
							quads: this.getPageNthWordQuads(page, word),
							contents: "コピペー出来ないハイフンがありそう"
						});
				}
			} catch (e) {}
		}
	}
}
t.end();