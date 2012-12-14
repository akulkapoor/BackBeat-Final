//Get the relevant links for each artist
getLinks=function(band){

	var data2;

	$.getJSON('http://developer.echonest.com/api/v4/artist/urls',
	{
		api_key: "JGTFZFCZNOZDOWFED",
		name: band,
		format: "json"
	},

	function(data) {
		data2 = data;
		var linkNames = ["Amazon Music","Last FM","Musicbrainz Page","MySpace","Wikipedia"];
		var count = 0
		$.each(data2.response.urls, function(i, item) {
			console.log(item);
			var link = $("<a>");
			link.addClass("echoLink");
			link.attr("href",item);
			link.html(linkNames[count]);
			$("#linkInfo").append(link);
			count++;
		})
	})
}


//Populate the bands on the my bands page
populateBands = function() {
	$.ajax({
    	url:'/lalala',
    	type: 'POST',
    	data: JSON.stringify({'name':'a'}),
    	success: bandAdd,
    	contentType: "application/json",
    	error: function(jqXHR, textStatus, errorThrown) {
        	console.log(jqXHR.status);
        	console.log(textStatus);
        	console.log(errorThrown);
    	}
	})
}

$('#bandButton').on('click',populateBands)

//Adds checkboxes for user to select up to 5 bands for playlist
bandAdd = function(data) {
	var a;
	$('#allBands').html('');
	for (var x = 0; x<data.length;x++) {
		a = $('<label><input type="checkbox" name="checkbox-0" value="' + data[x] + '" />' + data[x] + '</label>')
		$('#allBands').prepend(a);
	}

	$("input[type='checkbox']").checkboxradio();
	


	$("#allBands :checkbox").on("click", function() {
	    if($("#allBands :checkbox:checked").length >= 5) {
	        $("#allBands :checkbox:not(:checked)").checkboxradio("disable");
	    } 
	    else {
	        $("#allBands :checkbox").checkboxradio("enable");
	    }
	});
}

//Copies data in search bars to new page
function onPageChange(event,data) {
	var a = data.toPage.toString()
	if (a[0] !== "[" && data.options.fromPage != undefined) {
		a = a.split("#")[1];
		var b = data.options.fromPage.attr('id');
		if (a === "simArtists" || a === "simLocArtists" || a === "Shows") {
			if (b === 'simArtists') {
				if(a === 'simLocArtists') {
					$("#artistSearch1").val($("#artistSearch").val())
					$("#locationSearch1").val($("#locationSearch").val())
				}
				if(a === 'Shows') {
					$("#locationSearch2").val($("#locationSearch").val())
				}
			}
			if (b === 'simLocArtists') {
				if(a === 'simArtists') {
					$("#artistSearch").val($("#artistSearch1").val())
					$("#locationSearch").val($("#locationSearch1").val())
				}
				if(a === 'Shows') {
					$("#locationSearch2").val($("#locationSearch1").val())
				}
			}
			if (b === 'Shows') {
				if(a === 'simArtists') {
					$("#locationSearch").val($("#locationSearch2").val())
				}
				if(a === 'simLocArtists') {
					$("#locationSearch1").val($("#locationSearch2").val())
				}
			}
		}
	}
}

$(document).bind("pagebeforechange",onPageChange)