function FBH () {


	var goon = 1;
	var color = "";

	var dialog = {

		commit:function (dialog) {
		var results = dialog.store();
		if (results["red"]) 
		{
			color = "red";
		}
		else if (results["orange"]) 
		{
			color = "orange";
		}		
		else if (results["yellow"])
		{
			color = "yellow";
		}
		else if (results["green"])
		{
			color = "green";
		}
		else if (results["blue"])
		{
			choice = "blue";
		}
		else if (results["purple"])
		{
			choice = "purple";
		}
		},

		cancel: function(dialog) { 
		console.println("Cancel!");
		goon = 0;
		},
 	
		description:
  		{
    		name: "数字チェックツール",    // Dialog box title
    		elements:
    		[
      			{
        		type: "view",
        		elements:
        		[
				{ 	name: "ハイライトカラーを選んでください", 
					type: "static_text", 
					multiline: "true",
					width: 300,
					height: 25,
				},
        			{
            				type: "radio",
            				item_id: "red",
            				group_id: "g1",
            				name: "赤",
            				width: 200,
            				height: 25
        			},
        			{
            				type: "radio",
            				item_id: "orange",
            				group_id: "g1",
            				name: "オレンジ",
            				width: 200,
            				height: 25
        			},
         			{
            				type: "radio",
            				item_id: "yellow",
            				group_id: "g1",
            				name: "黄色",
            				width: 200,
            				height: 25
        			},
         			{
            				type: "radio",
            				item_id: "green",
            				group_id: "g1",
            				name: "緑",
            				width: 200,
            				height: 25
        			},
					         			{
            				type: "radio",
            				item_id: "blue",
            				group_id: "g1",
            				name: "青",
            				width: 200,
            				height: 25
        			},
					         			{
            				type: "radio",
            				item_id: "purple",
            				group_id: "g1",
            				name: "紫",
            				width: 200,
            				height: 25
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
	
	if (goon == 1)
	{
		numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
		words = [];
		page = [];
		quads = [];
		b = 0;
		
		for (var page_number = 0; page_number < this.numPages; page_number++)
		{
			for (var word_number = 0; word_number < this.getPageNumWords(page_number); word_number++)
			{
				words[b] = this.getPageNthWord(page_number, word_number, false);
				quads[b] = this.getPageNthWordQuads(page_number, word_number, false);
				page[b] = page_number;
				b = b + 1;
			}
		}
		console.println(b)
		for (var a = 0; a < b; a++)
		{
			for (var n = 0; n < numbers.length; n++)
			{
				if (words[a].indexOf(numbers[n]) > -1)
				{
					var annot = this.addAnnot({
							page: page[a],
							type: "Highlight",
							quads: quads[a],
							author: "python",
							strokeColor: color.red
					});
				}
			} 
		}
	}
}
FBH()
		

	