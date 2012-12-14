//Akul Kapoor (akulk) and Matt Powell-Palm (mpowellp)
var data1;
var data2;
var myPlayList;
var trackList = [];
var songs = {};
var name;
var bandExists;

//Checks whether the user has previously liked a band

//Set css for each page
css = function(page,big) {
	page.css("background-image","url(" + big + ")");
	page.css("background-size", "cover");
	page.css("background-position", "center");
	page.css("-webkit-background-size", "cover");
	page.css("-moz-background-size", "cover");
	page.css("-o-background-size", "cover");
	page.css("-o-background-size", "cover");	
}

//set css for content div of each page
infocss = function(page,likeButton,band) {
	page.empty();
	page.append("<div id = bandName>" + band + "</div>");
	page.append(likeButton);
	likeButton.button();
	likeButton.parent().css("width","95%");
	likeButton.parent().css("margin-left","2.5%");
}


/**********************************Clicks*******************************************/
//success call to see whether a band has been liked and update the like button
bandLike = function(data) {
	if(data==="1") {
		bandExists = true;
	}
	else {
		bandExists = false;
	}
}

	$('.content img').live("click",function(){
		
		var big = $(this.innerHTML).attr("data-big");
		var band = $(this.innerHTML).attr("band");

		$.ajax({
    		url:"/bbb",
    		data: JSON.stringify({'name':band}),
    		type: "POST",
    		success: bandLike,
    		async: false,
    		contentType: "application/json",
    		error: function(jqXHR, textStatus, errorThrown) {
        		console.log(jqXHR.status);
        		console.log(textStatus);
        		console.log(errorThrown);
    		}
		})

		$('#bandInfo').html('')

		$(".chSmall").attr("href","#Bio");
		$(".chSmall").html("Bio");

		if ($(this).attr("event")==="true"){

			$(".chSmall").attr("href","#eventPage");
			$(".chSmall").html("Event Information");
			var big = $(this).attr("data-big");
			var band = $(this).attr("band");
			var ticketSite = $(this).attr("ticketSite");
			var city = $(this).attr("city");
			var country = $(this).attr("country");
			var theatre = $(this).attr("theatre");
			var date = $(this).attr("date");

			css($('#eventPage'),big)
			
			if (bandExists) {
				var likeButton = $('<input type="button" value="Liked!" onclick="liked();" class="likeButton" type="button">');
			}
			else{
				var likeButton = $('<input type="button" value="Like" onclick="liked();" class="likeButton" type="button">');
			}
			infocss($('#eventInfo'),likeButton,band)
			
			$('#eventInfo').append("<div id = bandName>" + theatre + "</div>");
			$('#eventInfo').append("<div id = bandName>" + city + "</div>");
			$('#eventInfo').append("<div id = bandName>" + country + "</div>");
			$('#eventInfo').append("<div id = bandName>" + date + "</div>");

			if (ticketSite!==""){
				$('#eventInfo').append("<a href="+ticketSite+" id='ticketButton'>Visit Event Page</a>")
			}
		}

		



		if (bandExists) {
			var likeButton = $('<input type="button" value="Liked!" onclick="liked();" class="likeButton" type="button">');
		}
		else{
			var likeButton = $('<input type="button" value="Like" onclick="liked();" class="likeButton" type="button">');
		}
		
		var big = $(this).attr("data-big");
		css($('#Band'),big)
		var band = $(this).attr("band");
		infocss($('#bandInfo'),likeButton,band)
		
		var itunesLink = '<a id ="itunesLink" target="itunes_store"><img src="http://r.mzstatic.com/images/web/linkmaker/badge_itunes-lrg.gif" alt="Overexposed (Deluxe Version) - Maroon 5" style="border: 0;"/></a>'
		$('#bandInfo').append(itunesLink);
		$('#bandInfo').append(player);
		getSong(band);
		var object = $(this);
		setInfo(object,band);


		


		if (bandExists) {
			var likeButton = $('<input type="button" value="Liked!" onclick="liked();" class="likeButton" type="button">');
		}
		else{
			var likeButton = $('<input type="button" value="Like" onclick="liked();" class="likeButton" type="button">');
		}
		css($('#Bio'),big);
		infocss($('#bioInfo'),likeButton,band)
		var object = $(this);
		setInfo(object,band,"#bioInfo");

		


		if (bandExists) {
			var likeButton = $('<input type="button" value="Liked!" onclick="liked();" class="likeButton" type="button">');
		}
		else{
			var likeButton = $('<input type="button" value="Like" onclick="liked();" class="likeButton" type="button">');
		}
		css($('#Links'),big)
		infocss($('#linkInfo'),likeButton,band)
		getLinks(band);
		var object = $(this);

		var link = $(this).attr("link");
		if (link.slice(0,7) !== "http://") {
			$('#linkInfo').append("<div id = page><a href='http://" + link + 
				"'>" + "Last FM Page" + "</a>" + "</div>");
		}
		else {
			$('#linkInfo').append("<div id = page><a href='" + link + 
				"'>" + "Last FM Page" + "</a>" + "</div>");
		}



		if (bandExists) {
			var likeButton = $('<input type="button" value="Liked!" onclick="liked();" class="likeButton" type="button">');
		}
		else{
			var likeButton = $('<input type="button" value="Like" onclick="liked();" class="likeButton" type="button">');
		}
		css($('#Tickets'),big)
		infocss($('#ticketInfo'),likeButton,band)

	})




/**********************************Link Clicks**************************************/
$('.link').live("click",function(){
		$('#bandInfo').html('')

		var big = $(this.innerHTML).attr("data-big");
		var band = $(this.innerHTML).attr("band");

		$.ajax({
    		url:"/bbb",
    		data: JSON.stringify({'name':band}),
    		type: "POST",
    		success: bandLike,
    		async: false,
    		contentType: "application/json",
    		error: function(jqXHR, textStatus, errorThrown) {
        		console.log(jqXHR.status);
        		console.log(textStatus);
        		console.log(errorThrown);
    		}
		})

		$(".chSmall").attr("href","#Bio");
		$(".chSmall").html("Bio");

		
		

		if ($(this).attr("event")==="true"){


			$(".chSmall").attr("href","#eventPage");
			$(".chSmall").html("Event Information");
			
			var city = $(this).attr("city");
			var country = $(this).attr("country");
			var theatre = $(this).attr("theatre");
			var date = $(this).attr("date");
			var ticketSite = $(this).attr("ticketSite");
			

			css($('#eventPage'),big);
			if (bandExists) {
				var likeButton = $('<input type="button" value="Liked!" onclick="liked();" class="likeButton" type="button">');
			}
			else{
				var likeButton = $('<input type="button" value="Like" onclick="liked();" class="likeButton" type="button">');
			}
			infocss($('#eventInfo'),likeButton,band)
			$('#eventInfo').append("<div>" + theatre + "</div>");
			$('#eventInfo').append("<div>" + city + "</div>");
			$('#eventInfo').append("<div>" + country + "</div>");
			$('#eventInfo').append("<div>" + date + "</div>");

			if (ticketSite!==""){
				$('#eventInfo').append("<a href="+ticketSite+" id='ticketButton'>Visit Event Page</a>")
			}

		}


		css($('#Band'),big)
		if (bandExists) {
			var likeButton = $('<input type="button" value="Liked!" onclick="liked();" class="likeButton" type="button">');
		}
		else{
			var likeButton = $('<input type="button" value="Like" onclick="liked();" class="likeButton" type="button">');
		}
		infocss($('#bandInfo'),likeButton,band)
		var itunesLink = '<a id ="itunesLink" target="itunes_store"><img src="http://r.mzstatic.com/images/web/linkmaker/badge_itunes-lrg.gif" alt="Overexposed (Deluxe Version) - Maroon 5" style="border: 0;"/></a>'
		$('#bandInfo').append(itunesLink);
		$('#bandInfo').append(player);
		getSong(band);
		var object = $(this.innerHTML);
		setInfo(object,band);


		

		if (bandExists) {
			var likeButton = $('<input type="button" value="Liked!" onclick="liked();" class="likeButton" type="button">');
		}
		else{
			var likeButton = $('<input type="button" value="Like" onclick="liked();" class="likeButton" type="button">');
		}
		css($('#Bio'),big)
		infocss($('#bioInfo'),likeButton,band)
		var object = $(this.innerHTML);
		setInfo(object,band,"#bioInfo");

		if (bandExists) {
			var likeButton = $('<input type="button" value="Liked!" onclick="liked();" class="likeButton" type="button">');
		}
		else{
			var likeButton = $('<input type="button" value="Like" onclick="liked();" class="likeButton" type="button">');
		}
		css($('#Links'),big)
		infocss($('#linkInfo'),likeButton,band)
		getLinks(band);
		var object = $(this.innerHTML);

		var link = $(this.innerHTML).attr("link");
		if (link.slice(0,7) !== "http://") {
			$('#linkInfo').append("<div id = page><a href='http://" + link + 
				"'>" + "Last FM Page" + "</a>" + "</div>");
		}
		else {
			$('#linkInfo').append("<div id = page><a href='" + link + 
				"'>" + "Last FM Page" + "</a>" + "</div>");
		}

		if (bandExists) {
			var likeButton = $('<input type="button" value="Liked!" onclick="liked();" class="likeButton" type="button">');
		}
		else{
			var likeButton = $('<input type="button" value="Like" onclick="liked();" class="likeButton" type="button">');
		}
		css($('#Tickets'),big)
		infocss($('#ticketInfo'),likeButton,band)
		var object = $(this.innerHTML);


});

/**********************************Clicks End***************************************/


//Call when user likes a band - updates user profile on the server side
liked = function(){
	
	$.ajax({
    url:"/aaa",
    data: JSON.stringify({'name':$("#bandName").html()}),
    type: "POST",

    contentType: "application/json",
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.status);
        console.log(textStatus);
        console.log(errorThrown);
    	}
	})

	if ($(".likeButton").val()==="Like") {
		$(".likeButton").val("Liked!");
		$(".likeButton").button("refresh");
	}
	else {
		$(".likeButton").val("Like");
		$(".likeButton").button("refresh");
	}

}

//Sets the info of the artist in the given div
setInfo = function(object,band,container) {
//
	$.getJSON('http://ws.audioscrobbler.com/2.0/',
		{
			method: "artist.getInfo",
			api_key: "8319d81dde2f49bad5c65a0ce2361a31",
			format: "json",
			artist: band,
			limit: 250
		},
		function(data) {
			var info = document.createElement("div");
			info.className = "info";
			if (object.attr("city")  !== undefined) {
				info.innerHTML = "<br>" + object.attr("city") + 
				"<br>" + object.attr("country") + "<br>" + 
				object.attr("theatre") + "<br>" + object.attr("date");
			}
				
			else {
				var head = document.createElement("div");
				var body = document.createElement("div");
				head.innerHTML = "Bio";
				head.setAttribute("id", "head");
				body.setAttribute("id", "body");
				body.innerHTML = data.artist.bio.content;
				$(info).append("<br>");
				$(info).append(body);
				$(container).append(info);
			}	
	})
}

//Executes a Search and calls particle explosion
doSearch = function() {
	simArts();
	simLocArts();
	if ($.mobile.activePage.attr("id") === "Shows") {
		allShows();
	}
	$('#similarArtists').scrollTop(-5);
	$('#similarLocalArtists').scrollTop(-5);
	$('#shows').scrollTop(-5);
}

//Gets mp3 urls for music player from iTunes API
getSong = function(name){
	if (name.indexOf(",") > 0) {
		name = name.slice(0,name.indexOf(","));
	}
	name = name.toLowerCase();
	name = replaceAll(name," ","+");
	$.ajax({
		url: 'https://itunes.apple.com/search',
		data:{ 
		term: replaceAll(name.toLowerCase(),' ','+'),
		media: 'music',
		entity: "song",
		attribute: "artistTerm"},
		dataType: "jsonp",
		success: callBack2
	});
}

//Creates a playlist for jPlayer
callBack2 = function(data) {
	trackList = [];
	$.each(data.results, function(i, item) {
		var trackName = item.trackName;
		if (item.previewUrl != null && trackList.length<5 && trackName != undefined && item.previewUrl){
			trackList.push({title:trackName,mp3:item.previewUrl,itunes:item.trackViewUrl})
		}
	});
	$("#itunesLink").attr("href",trackList[0].itunes + '&partnerId=30&siteID=QNFg4WWuF*o')
	//Code from jPlayer
	myPlaylist = new jPlayerPlaylist({
		jPlayer: "#jquery_jplayer_1",
		cssSelectorAncestor: "#jp_container_1"
		}, trackList, {
		swfPath: "js",
 		solution: 'html, flash',
		supplied: 'mp3',
		preload: 'metadata',
		volume: 0.8,
		muted: false,
		backgroundColor: '#000000',
		cssSelectorAncestor: '#jp_container_1',
		cssSelector: {
		videoPlay: '.jp-video-play',
		play: '.jp-play',
		pause: '.jp-pause',
		stop: '.jp-stop',
		seekBar: '.jp-seek-bar',
		playBar: '.jp-play-bar',
		mute: '.jp-mute',
		unmute: '.jp-unmute',
		volumeBar: '.jp-volume-bar',
		volumeBarValue: '.jp-volume-bar-value',
		volumeMax: '.jp-volume-max',
		currentTime: '.jp-current-time',
		duration: '.jp-duration',
		fullScreen: '.jp-full-screen',
		restoreScreen: '.jp-restore-screen',
		repeat: '.jp-repeat',
		repeatOff: '.jp-repeat-off',
		gui: '.jp-gui',
		noSolution: '.jp-no-solution'
		},
		errorAlerts: false,
		warningAlerts: false
		});

	$("#jquery_jplayer_1").bind($.jPlayer.event.play,updateLink);
}

//Updates "Download on iTunes" button
updateLink = function() {
	$("#itunesLink").attr("href",trackList[myPlaylist.current].itunes + '&partnerId=30&siteID=QNFg4WWuF*o')
}