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