function i(a,b,c){try{var a1 = a.split(b);var a2 = a1[1].split(c);return a2[0];}catch(err){return '';}}
function finishkv(){
	var gd=d.createElement("div");
	gd.innerHTML = "<form method='post' action='http://keepvid.com/?url="+escape(document.location)+"&bm=y' id='kvdl'><input type='hidden' name='vid' value='"+video_id+"' /><input type='hidden' name='title' value='"+title+"' /><input type='hidden' name='fmt' value='"+fmt+"' /><input class='master-sprite-new yt-uix-button yt-uix-tooltip' type='submit' value='Download with KeepVid' /></form>";
	d.body.appendChild(gd);
	document.forms["kvdl"].submit();
}
var data;
var d=document;
if(d.location.href.match(/youtube.com/i)){
	var video_id=i(d.body.innerHTML,'"video_id": "','"');
	var title=unescape(i(d.body.innerHTML,'"title": "','", "').replace(/\\u00/g,"%").replace(/\\\"/g,"\""));
	
	var fmt=i(d.body.innerHTML,'url_encoded_fmt_stream_map=','&');
	var fmt='';
	if(fmt == ''){
		var kvajax=false;
		if (!kvajax && typeof XMLHttpRequest!='undefined'){kvajax = new XMLHttpRequest();}
		kvajax.open("GET", "http://www.youtube.com/get_video_info?video_id="+video_id+"&asv=3&el=detailpage&hl=en_US&sts=1588", true);
		kvajax.onreadystatechange=function() {
			if (kvajax.readyState==4) {
				title=i(kvajax.responseText,'&title=','&');
				if(title == '') title=i(kvajax.responseText,'title=','&');
				fmt=i(kvajax.responseText,'url_encoded_fmt_stream_map=','&');
				finishkv();
			}
		}
		kvajax.send();
	}else{
		finishkv();
	}
}else{
	document.location.href='http://keepvid.com/?url='+escape(window.location);
}
