//Akul Kapoor (akulk) and Matt Powell-Palm (mpowellp)
var data1;
var data2;
var player =
//html code for the jQuery Player
//not ours, copied from jPLayer site. 
'<div id="skin-loader"></div> \
		<div id="skin-wrapper" data-skin-name="premium-pixels"> \
			<div id="jquery_jplayer_1" class="jp-jplayer"></div> \
			<div id="jp_container_1" class="jp-audio"> \
				<div class="jp-type-playlist"> \
					<div class="jp-gui jp-interface"> \
						<ul class="jp-controls"> \
							<li><a href="javascript:;" class="jp-previous" tabindex="1">previous</a></li> \
							<li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li> \
							<li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li> \
							<li><a href="javascript:;" class="jp-next" tabindex="1">next</a></li> \
							<li><a href="javascript:;" class="jp-stop" tabindex="1">stop</a></li> \
							<li><a href="javascript:;" class="jp-mute" tabindex="1" title="mute">mute</a></li> \
							<li><a href="javascript:;" class="jp-unmute" tabindex="1" title="unmute">unmute</a></li> \
							<li><a href="javascript:;" class="jp-volume-max" tabindex="1" title="max volume">max volume</a></li> \
						</ul> \
						<div class="jp-progress"> \
							<div class="jp-seek-bar"> \
								<div class="jp-play-bar"></div> \
							</div> \
						</div> \
						<div class="jp-volume-bar"> \
							<div class="jp-volume-bar-value"></div> \
						</div> \
						<div class="jp-time-holder"> \
							<div class="jp-current-time"></div> \
							<div class="jp-duration"></div> \
						</div> \
						<ul class="jp-toggles"> \
							<li><a href="javascript:;" class="jp-shuffle" tabindex="1" title="shuffle">shuffle</a></li> \
							<li><a href="javascript:;" class="jp-shuffle-off" tabindex="1" title="shuffle off">shuffle off</a></li> \
							<li><a href="javascript:;" class="jp-repeat" tabindex="1" title="repeat">repeat</a></li> \
							<li><a href="javascript:;" class="jp-repeat-off" tabindex="1" title="repeat off">repeat off</a></li> \
						</ul> \
					</div> \
					<div class="jp-playlist"> \
						<ul> \
							<li></li> \
						</ul> \
					</div> \
					<div class="jp-no-solution"> \
					</div> \
				</div> \
			</div><!-- .jp-audio --> \
		</div><!-- .wrapper -->';

var text = new Object();
text.txt = "";
text.x = 300;
text.y = 20;
text.xVel = 0;
text.yVel = 0;
var name;
var bandExists;


function replaceAll(Source,stringToFind,stringToReplace){
  var temp = Source;
    var index = temp.indexOf(stringToFind);
        while(index != -1){
            temp = temp.replace(stringToFind,stringToReplace);
            index = temp.indexOf(stringToFind);
        }
        return temp;
}

bandLike = function(data) {
	if(data==="1") {
		bandExists = true;
	}
	else {
		bandExists = false;
	}
}

	var info = document.createElement("div");
	info.setAttribute("id","info");
	$('#picture').append(player);
	var windowWidth = $(window).width();
	$("#picture").css("width",windowWidth/2.3);
	


	//Picture Clicks
	$('.content img').live("click",function(){

		

		$('#bandInfo').html('')

		var likeButton = $('<input type="button" value="Like" onclick="liked();" class="likeButton">');
		var big = $(this).attr("data-big");
		$('#Band').css("background-image","url(" + big + ")");
		$('#Band').css("background-size", "cover");
		$('#Band').css("background-position", "center");
		$('#Band').css("-webkit-background-size", "cover");
		$('#Band').css("-moz-background-size", "cover");
		$('#Band').css("-o-background-size", "cover");
		$('#Band').css("-o-background-size", "cover");
		var band = $(this).attr("band");
		$('#bandInfo').append(band);
		$('#bandInfo').append(likeButton);
		likeButton.button();
		$('#bandInfo').append(player);
		getSong(band);
		var object = $(this);
		setInfo(object,band);

		likeButton = $('<input type="button" value="Like" onclick="liked();" class="likeButton">');
		$('#Bio').css("background-image","url(" + big + ")");
		$('#Bio').css("background-size", "cover");
		$('#Bio').css("background-position", "center");
		$('#Bio').css("-webkit-background-size", "cover");
		$('#Bio').css("-moz-background-size", "cover");
		$('#Bio').css("-o-background-size", "cover");
		$('#Bio').css("-o-background-size", "cover");
		$('#bioInfo').empty();
		$('#bioInfo').append(band);
		$('#bioInfo').append(likeButton);
		likeButton.button();
		var object = $(this);
		setInfo(object,band,"#bioInfo");

		likeButton = $('<input type="button" value="Like" onclick="liked();" class="likeButton">');
		$('#Links').css("background-image","url(" + big + ")");
		$('#Links').css("background-size", "cover");
		$('#Links').css("background-position", "center");
		$('#Links').css("-webkit-background-size", "cover");
		$('#Links').css("-moz-background-size", "cover");
		$('#Links').css("-o-background-size", "cover");
		$('#Links').css("-o-background-size", "cover");
		$('#linkInfo').empty();
		$('#linkInfo').append(band);
		$('#linkInfo').append(likeButton);
		likeButton.button();
		var object = $(this);
		//setInfo(object,band);

		var link = $(this).attr("link");
		if (link.slice(0,7) !== "http://") {
			$('#linkInfo').append("<div id = page><a href='http://" + link + 
				"'>" + "Last FM Page" + "</a>" + "</div>");
		}
		else {
			$('#linkInfo').append("<div id = page><a href='" + link + 
				"'>" + "Last FM Page" + "</a>" + "</div>");
		}
		likeButton = $('<input type="button" value="Like" onclick="liked();" class="likeButton">');
		$('#Tickets').css("background-image","url(" + big + ")");
		$('#Tickets').css("background-size", "cover");
		$('#Tickets').css("background-position", "center");
		$('#Tickets').css("-webkit-background-size", "cover");
		$('#Tickets').css("-moz-background-size", "cover");
		$('#Tickets').css("-o-background-size", "cover");
		$('#Tickets').css("-o-background-size", "cover");
		$('#ticketInfo').empty();
		$('#ticketInfo').append(band);
		$('#ticketInfo').append(likeButton);
		likeButton.button();
		var object = $(this);


/*		
		var big = $(this).attr("data-big");
		var band = $(this).attr("band");
		name = $(this).attr("band");
		var object = $(this);
		var small = $(this).attr("src");
		var link = $(this).attr("link");
		setInfo(object,band);
		var startLeft = $(this).offset().left;
		var startTop = $(this).offset().top;
		var startWidth = $(this).width();
		var startHeight = $(this).height();
		$('#picture').append(band +"<br>");
		$('#picture').append("<img id=bigPic" + ">" + "<br>");
		if (link.slice(0,7) !== "http://") {
			$('#picture').append("<div id = page><a href='http://" + link + 
				"'>" + "Last FM Page" + "</a>" + "</div>");
		}
		else {
			$('#picture').append("<div id = page><a href='" + link + 
				"'>" + "Last FM Page" + "</a>" + "</div>");
		}
		$('#picture').append(player);
		$("#bigPic").css("opacity",0);
		$('#bigPic').attr("src", big);
		$("#picture").attr('class', 'show');
		getSong(band);
		

		$("#bigPic").load(function() {

		var endLeft = $("#bigPic").offset().left;
		var endTop = $("#bigPic").offset().top;
		var finalwidth = $('#bigPic').width();
		var finalheight = $('#bigPic').height();

		var a = document.createElement("div");
		a = "<img src = '" + small + "' id=transitionPic" + ">";
		$('body').append(a);
		//Animation
		$("#transitionPic").css("position","absolute");
		$("#transitionPic").css("left",startLeft)
		$("#transitionPic").css("top",startTop)
		$("#transitionPic").css("width",startWidth)
		$("#transitionPic").css("height",startHeight)
		$("#transitionPic").animate({
			left: endLeft,
			top: endTop,
			width: finalwidth,
			height: finalheight},500,function() {
		$("#bigPic").css("opacity",1);
		$('#transitionPic').remove();
		});
		});*/

	});


	//Link Clicks
	$('.link').live("click",function(){
		$('#bandInfo').html('')

		var big = $(this.innerHTML).attr("data-big");
		$('#Band').css("background-image","url(" + big + ")");
		$('#Band').css("background-size", "cover");
		$('#Band').css("background-position", "center");
		$('#Band').css("-webkit-background-size", "cover");
		$('#Band').css("-moz-background-size", "cover");
		$('#Band').css("-o-background-size", "cover");
		$('#Band').css("-o-background-size", "cover");
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
		if (bandExists) {
			var likeButton = $('<input type="button" value="Liked!" onclick="liked();" class="likeButton" type="button">');
		}
		else{
			var likeButton = $('<input type="button" value="Like" onclick="liked();" class="likeButton" type="button">');
		}
		$('#bandInfo').append("<div id = bandName>" + band + "</div>");
		$('#bandInfo').append(likeButton);
		likeButton.button();
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
		$('#Bio').css("background-image","url(" + big + ")");
		$('#Bio').css("background-size", "cover");
		$('#Bio').css("background-position", "center");
		$('#Bio').css("-webkit-background-size", "cover");
		$('#Bio').css("-moz-background-size", "cover");
		$('#Bio').css("-o-background-size", "cover");
		$('#Bio').css("-o-background-size", "cover");
		$('#bioInfo').empty();
		$('#bioInfo').append("<div id = bandName>" + band + "</div>");
		$('#bioInfo').append(likeButton);
		likeButton.button();
		var object = $(this.innerHTML);
		setInfo(object,band,"#bioInfo");

		if (bandExists) {
			var likeButton = $('<input type="button" value="Liked!" onclick="liked();" class="likeButton" type="button">');
		}
		else{
			var likeButton = $('<input type="button" value="Like" onclick="liked();" class="likeButton" type="button">');
		}
		$('#Links').css("background-image","url(" + big + ")");
		$('#Links').css("background-size", "cover");
		$('#Links').css("background-position", "center");
		$('#Links').css("-webkit-background-size", "cover");
		$('#Links').css("-moz-background-size", "cover");
		$('#Links').css("-o-background-size", "cover");
		$('#Links').css("-o-background-size", "cover");
		$('#linkInfo').empty();
		$('#linkInfo').append("<div id = bandName>" + band + "</div>");
		$('#linkInfo').append(likeButton);
		likeButton.button();
		var object = $(this.innerHTML);
		//setInfo(object,band);

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
		$('#Tickets').css("background-image","url(" + big + ")");
		$('#Tickets').css("background-size", "cover");
		$('#Tickets').css("background-position", "center");
		$('#Tickets').css("-webkit-background-size", "cover");
		$('#Tickets').css("-moz-background-size", "cover");
		$('#Tickets').css("-o-background-size", "cover");
		$('#Tickets').css("-o-background-size", "cover");
		$('#ticketInfo').empty();
		$('#ticketInfo').append("<div id = bandName>" + band + "</div>");
		$('#ticketInfo').append(likeButton);
		likeButton.button();
		var object = $(this.innerHTML);
		//setInfo(object,band);
	});

liked = function(){

	awesome = function() {
		console.log("we did it!")
	}
	
	$.ajax({
    url:"/aaa",
    data: JSON.stringify({'name':$("#bandName").html()}),
    type: "POST",
    success: awesome,
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

//Sets the info of the artist in the picture div
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
					//$(info).append(head);
					$(info).append("<br>");
					$(info).append(body);
					//$(info).css({"width":"90%","margin-left":"5%","margin-right":"5%"})
					//}

					$(container).append(info);
				}	
	})
}

//Executes a Search and calls particle explosion
doSearch = function() {
	text.txt = $("#artistSearch").val();
	$('#picture').html('')
	simArts();
	simLocArts();
	allShows();
	$('#similarArtists').scrollTop(-5);
	$('#similarLocalArtists').scrollTop(-5);
	$('#shows').scrollTop(-5);
	$("#picture").attr('class', 'hidden');
}

//Gets mp3 urls for music player from EchoNest API
getSong = function(name){
	if (name.indexOf(",") > 0) {
		name = name.slice(0,name.indexOf(","));
	}
	$.ajax({
		url: 'https://itunes.apple.com/search?term=' + replaceAll(name.toLowerCase(),' ','+'),
		media: 'music',
		kind: 'song',
		dataType: "jsonp",
		entity: "allArtist",
		success: callBack2
	});
	/*$.ajax({
		url: 'http://hkr.me:8001/?url=' + 
		encodeURIComponent('http://developer.echonest.com/api/v4/song/search?api_key=JGTFZFCZNOZDOWFED&format=json&results=5&artist=' + 
			name + '&bucket=id:7digital-US&bucket=audio_summary&bucket=tracks') 
		+ "&jsonp=?",
		dataType: "json",
		success: callBack

	});*/

}


callBack2 = function(data) {
	var trackList = []
	$.each(data.results, function(i, item) {
		var trackName = item.trackName;
		if (item.previewUrl != null && trackList.length<5 && trackName != undefined){
			trackList.push({title:trackName,mp3:item.previewUrl})
		}
	});
	console.log(trackList);
	
	//Code from jPlayer
	new jPlayerPlaylist({
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
}

//Callback for AJAX
callBack = function(data) {
	if (data.response.status.message !== "Success") {
				getSong(name);
			}
	else {
	var trackList = []

	$.each(data.response.songs, function(i, item) {
		var trackName = item.title;

		if (item.tracks.length > 0){
			var preview = item.tracks[0].preview_url
			trackList.push({title:trackName,mp3:preview})
		}
	});
	

	//Code from jPlayer
	new jPlayerPlaylist({
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
	}
}



//Display Upcoming Shows - Last.fm API
allShows=function(){

var data1;
if ($("#locationSearch").val() !== "") {
	$.getJSON('http://ws.audioscrobbler.com/2.0/',
	{
		method: "geo.getEvents",
		api_key: "8319d81dde2f49bad5c65a0ce2361a31",
		format: "json",
		location: $("#locationSearch").val(),
		limit: 50
	},

	function(data) {
		data1 = data;
		$("#shows").html("");
		$.each(data1.events.event, function(i, item) {		
			var artist = document.createElement("div");
			artist.className = "artist";
			artist.id = item.artists.artist;

			var img = $("<div>");
			img.addClass("img");
			var imgTag = $("<img>");
			imgTag.attr("src",item.image[2]["#text"]);
			imgTag.attr("data-big",item.image[2]["#text"]);
			imgTag.attr("band", item.name);
			imgTag.attr("link",item.url); 
			imgTag.attr("city",item.venue.location.city); 
			imgTag.attr("country",item.venue.location.country);
			imgTag.attr("theatre",item.venue.name);
			imgTag.attr("date",item.startDate);
			var picLink = $("<a>");
			picLink.attr("href","#Band");
			picLink.append(imgTag);
			img.append(picLink);




			var link = document.createElement("div");
			link.className = "link";
			if (item.url.slice(0,7) !== "http://") {
				link.innerHTML = "<a href='" + "http://" + item.url + 
				"'>" + item.artists.artist + "</a>";
							
			}
			else {
				link.innerHTML = "<a href='" + item.url + "'>" + 
				item.artists.artist + "</a>";
			}
			link.innerHTML = "<div id='" + item.artists.artist  + 
			"' data-big=" + item.image[2]["#text"] + " band='" + 
			item.artists.artist + "' city='" + item.venue.location.city + 
			"'" + " country='" + item.venue.location.country + "'" + 
			" theatre='" + item.venue.name+ "' link='" + item.url + 
			"' date='" + item.startDate + "'>" + item.artists.artist 
			+ "</div>";
			var css = document.createElement("div");
			css.className = "space";
			artist.appendChild(css);
			artist.appendChild(link);
			$(artist).append(img);
			artist.innerHTML += "<br>"
						
			$("#shows").append(artist)
					
				
			});
		});
	}
}

//Populates Similar artists tab - Last FM API
simArts=function(){

var data1;

			$.getJSON('http://ws.audioscrobbler.com/2.0/',
			{
				method: "artist.getSimilar",
				api_key: "8319d81dde2f49bad5c65a0ce2361a31",
				format: "json",
				artist: $("#artistSearch").val(),
				limit: 50
			},

			function(data) {
				data1 = data;
				$("#similarArtists").html("");


				$.each(data1.similarartists.artist, function(i, item) {
				
					
					var artist = document.createElement("div");
					artist.className = "artist";
					artist.id = item.name;

					var img = $("<div>");
					img.addClass("img");
					var imgTag = $("<img>");
					imgTag.attr("src",item.image[2]["#text"]);
					imgTag.attr("data-big",item.image[4]["#text"]);
					imgTag.attr("band", item.name);
					imgTag.attr("link",item.url); 
					var picLink = $("<a>");
					picLink.attr("href","#Band");
					picLink.append(imgTag);
					img.append(picLink);



					var link = document.createElement("div");
					link.className = "link";
					link.innerHTML = "<a id='" + item.name  + "' data-big=" + 
					item.image[4]["#text"] + " band='" + item.name + "' link='"
					 +item.url + "' href='#Band'>" + item.name + "</div>";
					var css = document.createElement("div");
					css.className = "space";
					artist.appendChild(css);
					artist.appendChild(link);
					$(artist).append(img);
					artist.innerHTML += "<br>"
						
					$("#similarArtists").append(artist)
					
				
			});
		});
}

//Populates similar artists and cross-references by location - Last FM API
simLocArts=function(){
if ($("#locationSearch").val() !== "") {
var data1;
var data2;
			$.getJSON('http://ws.audioscrobbler.com/2.0/',
			{
				method: "artist.getSimilar",
				api_key: "8319d81dde2f49bad5c65a0ce2361a31",
				format: "json",
				artist: $("#artistSearch").val(),
				limit: 250
			},

			function(data) {
				data1 = data;
				$.getJSON('http://ws.audioscrobbler.com/2.0/',
				{
					method: "tag.getTopArtists",
					api_key: "8319d81dde2f49bad5c65a0ce2361a31",
					format: "json",
					tag: $("#locationSearch").val(),
					limit: 9000
				},

				function(data) {
					data2 = data;
					$("#similarLocalArtists").html("");
					var names = [];
					$.each(data2.topartists.artist, function(i, item) {
						names.push(item.name);
					});	




				$.each(data1.similarartists.artist, function(i, item) {
				
					if ($.inArray(item.name,names) !== -1) {
						var artist = document.createElement("div");
						artist.className = "artist";
						artist.id = item.name;

					var img = $("<div>");
					img.addClass("img");
					var imgTag = $("<img>");
					imgTag.attr("src",item.image[2]["#text"]);
					imgTag.attr("data-big",item.image[4]["#text"]);
					imgTag.attr("band", item.name);
					imgTag.attr("link",item.url); 
					var picLink = $("<a>");
					picLink.attr("href","#Band");
					picLink.append(imgTag);
					img.append(picLink);


						var link = document.createElement("div");
						link.className = "link";
						link.innerHTML = link.innerHTML = "<div id='" + 
						item.name  + "' data-big=" + item.image[4]["#text"] + 
						" band='" + item.name + "' link='" +item.url + "'>" + 
						item.name + "</div>";

						var css = document.createElement("div");
						css.className = "space";
						artist.appendChild(css);
						artist.appendChild(link);
						$(artist).append(img);
						artist.innerHTML += "<br>"
						
						$("#similarLocalArtists").append($(artist))
					}
				});
			});
		});
	}
}





		/* STUFF THAT USED TO BE IN THE CLICK FUNCTION

		var small = $(this.innerHTML).attr("src");
		var parent = this.parentNode;
		var small = $(parent).find("img").attr("src");
		var link = $(this.innerHTML).attr("link");
		var startLeft = $(parent).find("img").offset().left;
		var startTop = $(parent).find("img").offset().top;
		var startWidth = $(parent).find("img").width();
		var startHeight = $(parent).find("img").height();
		$('#picture').append(band +"<br>");
		$('#bandInfo').append("<img id=bigPic" + ">" + "<br>");
		if (link.slice(0,7) !== "http://") {
			$('#picture').append("<div id = page><a href='http://" + link + 
				"'>" + "Last FM Page" + "</a>" + "</div>");
		}
		else {
			$('#picture').append("<div id = page><a href='" + link + 
				"'>" + "Last FM Page" + "</a>" + "</div>");
		}
		$('#picture').append(player);
		$("#bigPic").css("opacity",0);
		$('#bigPic').attr("src", big);
		$("#picture").attr('class', 'show');
		setInfo(object,band);
		getSong(band);
		$("#bigPic").load(function() {
		var endLeft = $("#bigPic").offset().left;
		var endTop = $("#bigPic").offset().top;
		var finalwidth = $('#bigPic').width();
		var finalheight = $('#bigPic').height();
		var a = document.createElement("div");
		//$(a).attr("id","transitionPic");
		a = "<img src = '" + small + "' id=transitionPic" + ">";
		$('body').append(a);
		//Animation
		$("#transitionPic").css("position","absolute");
		$("#transitionPic").css("left",startLeft)
		$("#transitionPic").css("top",startTop)
		$("#transitionPic").css("width",startWidth)
		$("#transitionPic").css("height",startHeight)
		$("#transitionPic").animate({
			left: endLeft,
			top: endTop,
			width: finalwidth,
			height: finalheight},500,function() {
		$("#bigPic").css("opacity",1);
				$('#transitionPic').remove();
		});
		});*/