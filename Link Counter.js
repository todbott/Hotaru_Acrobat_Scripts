var link_count = this.documentFileName + "のリンク情報\r\n\r\n";

var numLinks=0;
for ( var p = 0; p < this.numPages; p++)
{
	var b = this.getPageBox("Crop", p);
	var l = this.getLinks(p, b);
	var ap = p+1;
	link_count = link_count + "ページ " + ap +" のリンク数： " + l.length + "\r\n";
	numLinks += l.length;
}
link_count = link_count + "\r\n総合リンク数： " + numLinks;

this.createDataObject("link-count.txt", link_count);
app.alert("終わりました。  \n各ページのリンク数・総合リンク数は link-count.txt として保存され、このPDFに埋め込まれました。", 3);	