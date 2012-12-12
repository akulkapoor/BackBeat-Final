//Akul Kapoor (akulk) and Matt Powell-Palm (mpowellp)


//Makes the appropriate image for the results div
makeImage = function(item) {
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
	return img;
}

makePlaylist = function() {
	var bandsLiked = "";
	var min_dance, max_dance;
	var mood = $('#select-choice-0 option:selected').val();
	var genre = $('#select-choice-1 option:selected').val();
	var dance = parseInt($('#slider-1').val())/100;
	if (dance<0.2) {
		min_dance=0;
	}
	else {
		min_dance = dance-0.2;
	}
	if (dance>0.8) {
		max_dance=1;
	}
	else {
		max_dance = dance+0.2;
	}
	var decade = $('#select-choice-2 option:selected').val();
	$("#allBands :checkbox:checked").each(function(i,item) {
		if (bandsLiked==="") {
			bandsLiked += replaceAll($(item).val().toLowerCase()," ","+");
		}
		else {
			bandsLiked += "&artist=" + replaceAll($(item).val().toLowerCase()," ","+");
		}
	})
	console.log(bands)
	/*$.ajax({
			url: 'http://developer.echonest.com/api/v4/playlist/static',
			data: {
				api_key: "JGTFZFCZNOZDOWFED",
				style: genre,
				min_danceability: min_dance,
				artist: ['onerepublic','train'],
				max_danceability: max_dance,
				mood: mood,
				type: "artist-radio",
				format: "json"
			},
			success: seeWork
	})*/
	$.getJSON('http://developer.echonest.com/api/v4/playlist/static?api_key=JGTFZFCZNOZDOWFED&style=genre&min_danceability=' 
		+ min_dance.toString() 
		+ "&max_danceability=" + max_dance.toString() + 
		"&artist=" + bandsLiked 
		+"&mood=" + mood + "&type=artist-radio&format=json", seeWork)
}

seeWork = function(data) {
	console.log(data);
}

//Makes the appropriate link for the results div
makeLink = function(item) {
	var link = document.createElement("div");
	link.className = "link";
	link.innerHTML = "<a id='" + item.name  + "' data-big=" + 
	item.image[4]["#text"] + " band='" + item.name + "' link='"
	+item.url + "' href='#Band'>" + nameSeparate(item.name) + "</div>";
	return link;
}

//Lists shows by location using the last.fm API
allShows=function(){
var currentLocation;
$("#shows").html(""); 

if ($.mobile.activePage.attr("id") == "simArtists"){
			currentLocation = $("#locationSearch").val();
		}
else if ($.mobile.activePage.attr("id") == "simLocArtists"){
			currentLocation = $("#locationSearch1").val();
		}
else if ($.mobile.activePage.attr("id") == "Shows"){
			currentLocation = $("#locationSearch2").val();
		}

var data1;

if (currentLocation !== "") {
	$.getJSON('http://ws.audioscrobbler.com/2.0/',
	{
		method: "geo.getEvents",
		api_key: "8319d81dde2f49bad5c65a0ce2361a31",
		format: "json",
		location: currentLocation,
		limit: 100
	},

	function(data) {
		data1 = data;
		
		if ($("#artistSearch2").val()===""){
					

			$.each(data1.events.event, function(i, item) {	
				var artist = document.createElement("div");
				artist.className = "artist";
				artist.id = item.artists.artist;
				var img = $("<div>");
				img.addClass("img");
				var imgTag = $("<img>");
				imgTag.attr("ticketSite",item.website)
				imgTag.attr("src",item.image[2]["#text"]);
				imgTag.attr("event","true");
				imgTag.attr("data-big",item.image[3]["#text"]);
				imgTag.attr("band", artist.id);
				imgTag.attr("link",item.url); 
				imgTag.attr("city",item.venue.location.city); 
				imgTag.attr("country",item.venue.location.country);
				imgTag.attr("theatre",item.venue.name);
				imgTag.attr("date",item.startDate);
				var picLink = $("<a>");
				picLink.attr("href","#eventPage");
				picLink.append(imgTag);
				img.append(picLink);


				var link = document.createElement("div");
				link.className = "link";
				link.innerHTML = "<a id='" + item.name  + "' data-big=" + 
						item.image[3]["#text"] + " band='" + artist.id + "' link='"
						 +item.url + "' href='#eventPage'>" + nameSeparate(artist.id) + "</div>";
							imgTag.attr("src",item.image[2]["#text"]);
				$(link).attr("event","true");
				$(link).attr("ticketSite",item.website);
				$(link).attr("data-big",item.image[3]["#text"]);
				$(link).attr("band", artist.id);
				$(link).attr("link",item.url); 
				$(link).attr("city",item.venue.location.city); 
				$(link).attr("country",item.venue.location.country);
				$(link).attr("theatre",item.venue.name);
				$(link).attr("date",item.startDate);
				var css = document.createElement("div");
				css.className = "space";
				artist.appendChild(css);
				artist.appendChild(link);
				$(artist).append(img);
				artist.innerHTML += "<br>"
				
				$("#shows").append(artist);
					
				});
				
			}

		else if ($("#artistSearch2").val()!==""){

		

		$.each(data1.events.event, function(i, item) {
	

		

		var genreInput = $("#artistSearch2").val();

		var bandTerms=[];
	
		$("#shows").html("");

			$.getJSON('http://developer.echonest.com/api/v4/artist/terms',
			{
				api_key: "JGTFZFCZNOZDOWFED",
				name: item.artists.headliner,
				format: "json"
			},

			function(data) {
				data3 = data;
				bandTerms = [];
				//console.log(data3)
				
				
				$.each(data3.response.terms, function(i, item2) {
				//console.log(item);
				//console.log(item.name);
				bandTerms.push(item2.name);

				});
				//console.log(item,bandTerms);
				console.log(bandTerms.indexOf(genreInput)!==-1)
				//return bandTerms;


			if (bandTerms.indexOf(genreInput)!==-1){

			console.log("HEY",item);

			var artist = document.createElement("div");
			artist.className = "artist";
			artist.id = item.artists.artist;
			var img = $("<div>");
			img.addClass("img");
			var imgTag = $("<img>");
			imgTag.attr("ticketSite",item.website)
			imgTag.attr("src",item.image[2]["#text"]);
			imgTag.attr("event","true");
			imgTag.attr("data-big",item.image[3]["#text"]);
			imgTag.attr("band", artist.id);
			imgTag.attr("link",item.url); 
			imgTag.attr("city",item.venue.location.city); 
			imgTag.attr("country",item.venue.location.country);
			imgTag.attr("theatre",item.venue.name);
			imgTag.attr("date",item.startDate);
			var picLink = $("<a>");
			picLink.attr("href","#eventPage");
			picLink.append(imgTag);
			img.append(picLink);


			var link = document.createElement("div");
			link.className = "link";
			link.innerHTML = "<a id='" + item.name  + "' data-big=" + 
					item.image[3]["#text"] + " band='" + artist.id + "' link='"
					 +item.url + "' href='#eventPage'>" + nameSeparate(artist.id) + "</div>";
						imgTag.attr("src",item.image[2]["#text"]);
			$(link).attr("event","true");
			$(link).attr("ticketSite",item.website);
			$(link).attr("data-big",item.image[3]["#text"]);
			$(link).attr("band", artist.id);
			$(link).attr("link",item.url); 
			$(link).attr("city",item.venue.location.city); 
			$(link).attr("country",item.venue.location.country);
			$(link).attr("theatre",item.venue.name);
			$(link).attr("date",item.startDate);
			var css = document.createElement("div");
			css.className = "space";
			artist.appendChild(css);
			artist.appendChild(link);
			$(artist).append(img);
			artist.innerHTML += "<br>"
			
			$("#shows").append(artist);
		};
			})

			});


		
			console.log("GENRE TIME");
			
			}
		});
	}
}

//Populates Similar artists tab - Last FM API
simArts=function(){
	var data1;
	var data2;
	var currentArtist;
	if ($.mobile.activePage.attr("id") == "simArtists"){
		currentArtist = $("#artistSearch").val();
	}
	else if ($.mobile.activePage.attr("id") == "simLocArtists"){
		currentArtist = $("#artistSearch1").val();
	}
	else if ($.mobile.activePage.attr("id") == "Shows"){
		currentArtist = $("#artistSearch2").val();
	}
			

	$.getJSON('http://ws.audioscrobbler.com/2.0/',
	{
		method: "artist.getInfo",
		api_key: "8319d81dde2f49bad5c65a0ce2361a31",
		format: "json",
		artist: currentArtist,
	},
	function(data) {
		data2 = data;
		var musician = document.createElement("div");
		musician.className = "artist";
		musician.id = data2.artist.name;

		var img = $("<div>");
		img.addClass("img");
		var imgTag = $("<img>");
		imgTag.attr("src",data2.artist.image[2]["#text"]);
		imgTag.attr("data-big",data2.artist.image[4]["#text"]);
		imgTag.attr("band", data2.artist.name);
		imgTag.attr("link",data2.artist.url); 
		var picLink = $("<a>");
		picLink.attr("href","#Band");
		picLink.append(imgTag);
		img.append(picLink);


		var link = document.createElement("div");
		link.className = "link";
		link.innerHTML = "<a id='" + data2.artist.name  + "' data-big=" + 
		data2.artist.image[4]["#text"] + " band='" + data2.artist.name + "' link='"
		+data2.artist.url + "' href='#Band'>" + nameSeparate(data2.artist.name) + "</div>";
		var css = document.createElement("div");
		css.className = "space";
		musician.appendChild(css);
		musician.appendChild(link);
		$(musician).append(img);
		musician.innerHTML += "<br>"
		$("#similarArtists").html("");
		$("#similarArtists").append(musician);
		$.getJSON('http://ws.audioscrobbler.com/2.0/',
		{
			method: "artist.getSimilar",
			api_key: "8319d81dde2f49bad5c65a0ce2361a31",
			format: "json",
			artist: currentArtist,
			limit: 50
		},
		function(data) {
			data1 = data;
			$.each(data1.similarartists.artist, function(i, item) {
				
				var artist1 = document.createElement("div");
				artist1.className = "artist";
				artist1.id = item.name;

				var img = makeImage(item);
				var link = makeLink(item);

				var css = document.createElement("div");
				css.className = "space";
				artist1.appendChild(css);
				artist1.appendChild(link);
				$(artist1).append(img);
				artist1.innerHTML += "<br>"	
				$("#similarArtists").append(artist1)
				
			});
					$("#similarArtists").css('height','100%')
		});
	})
		}

//Populates similar artists and cross-references by location - Last FM API
simLocArts=function(){
var data1;
var data2;
var currentArtist;
	if ($.mobile.activePage.attr("id") == "simArtists"){
			currentArtist = $("#artistSearch").val();
		}
	else if ($.mobile.activePage.attr("id") == "simLocArtists"){
			currentArtist = $("#artistSearch1").val();
		}
	else if ($.mobile.activePage.attr("id") == "Shows"){
			currentArtist = $("#artistSearch2").val();
		}
		$.getJSON('http://ws.audioscrobbler.com/2.0/',
		{
			method: "artist.getSimilar",
			api_key: "8319d81dde2f49bad5c65a0ce2361a31",
			format: "json",
			artist: currentArtist,
			limit: 250
		},

		function(data) {
			data1 = data;
			var currentLocation;
			if ($.mobile.activePage.attr("id") == "simArtists"){
				currentLocation = $("#locationSearch").val();
			}
			else if ($.mobile.activePage.attr("id") == "simLocArtists"){
				currentLocation = $("#locationSearch1").val();
			}
			else if ($.mobile.activePage.attr("id") == "Shows"){
				currentLocation = $("#locationSearch2").val();
			}
			if (currentLocation !== "") {
			$.getJSON('http://ws.audioscrobbler.com/2.0/',
			{
				method: "tag.getTopArtists",
				api_key: "8319d81dde2f49bad5c65a0ce2361a31",
				format: "json",
				tag: currentLocation,
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

						var img = makeImage(item);

						var link = makeLink(item);
						var css = document.createElement("div");
						css.className = "space";
						artist.appendChild(css);
						artist.appendChild(link);
						$(artist).append(img);
						artist.innerHTML += "<br>"
						$("#similarLocalArtists").append($(artist))
					}
				});
			})
		}
	})
}