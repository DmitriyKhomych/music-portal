$(window).load(function () {
    // Animate loading screen
    $(".preLoadScreen").animate({
        opacity: 0
    }, 6000, 'linear', function () {
        $(this).remove();
    });
});

// jQuery to collapse the navbar on scroll
$(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature
$(function () {
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
    $('.navbar-toggle:visible').click();
});

// JS class for YouTube players
function YoutubePlayer(id, section, video) {
    this.playerId = id;
    this.sectionName = section;
    this.videoId = video;

    this.markup = function () {
        return "<div class=\"col-xs-12 col-sm-12 col-md-6 col-lg-6 embed-responsive embed-responsive-16by9\"><iframe id=\"player" + this.sectionName + this.playerId + "\" type=\"text/html\" class=\"embed-responsive-item youtubePlayerWindow\" src=\"http://www.youtube.com/embed/" + this.videoId + "?enablejsapi=1?wmode=opaque\" frameborder=\"0\"></iframe></div>";
    }
}

//JS class for "most viewed videos" rating items
function RatingItem(id, video, title) {
    this.itemId = id;
    this.videoId = video;
    this.videoTitle = title;

    this.markup = function () {
        return "<li>" + "<a href=\"http://www.youtube.com/watch?v=" + this.videoId + "\" target=\"_blank\">" + this.videoTitle + "</a><a href=\"\" class=\"infoButton\" data-toggle=\"modal\" data-target=\"#myModal\" data-videoId=\"" + this.videoId + "\"> <i class=\"fa fa-info-circle\"></i></a></li>";
    }
}

$(document).ready(function () {
    // Getting the list of most popular videos on YouTube Music Channel (Pop Music playlist)
    // and appending video players with the video items we have got using Google API key
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet',
            playlistId: 'PLgnDUQH42_TupeEMbPnruNBTljl2b1zrT', //Id of YT Most Popular Music Videos Playlist
            maxResults: 6,
            orderBy: 'viewCount', //Ordering from the most viewed
            key: 'AIzaSyCNkKCSC7DqlTrL4CAUCVtCrhJelj6nhaE'
        },
        function (data) {
            localStorage.setItem('mostPopularVideos', JSON.stringify(data));
        }
    );

    // Generating the list of most popular music videos
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet',
            playlistId: 'PLgnDUQH42_TupeEMbPnruNBTljl2b1zrT', //Id of YT Most Popular Music Videos Playlist
            maxResults: 20,
            orderBy: 'viewCount', //Ordering from the most viewed
            key: 'AIzaSyCNkKCSC7DqlTrL4CAUCVtCrhJelj6nhaE'
        },
        function (data) {
            localStorage.setItem('ratings', JSON.stringify(data));
        }
    );
    // Using JSON for saving received data locally
    var videos = JSON.parse(localStorage.getItem('mostPopularVideos'));
    var ratings = JSON.parse(localStorage.getItem('ratings'));

    // Generating markup for videos and ratings sections from JSON
    var player;
    var ratingItem;

    if (typeof (videos) == "undefined") window.location.reload();

    console.log(videos);
    console.log(ratings);

    $.each(videos.items, function (i, item) {
        player = new YoutubePlayer(i, "MP", item.id.videoId);
        $("#mostPopularContent").append(player.markup());
    });
    $.each(ratings.items, function (i, item) {
        ratingItem = new RatingItem(i, item.id.videoId, item.snippet.title);
        $("#ratingsContent").append(ratingItem.markup());
    });

    // Full modal with info
    $('.infoButton').click(function (event) {
        var ratingItem = $.grep(ratings.items, function (element, index) {
            console.log($(event.target).parent());
            console.log($(event.target).parent().attr('data-videoId'));
            return element.id.videoId == $(event.target).parent().attr('data-videoId');
        });
        console.log(ratingItem[0]);
        $('.modal-body').empty();
        $('.modal-body').append("<div class=\"embed-responsive embed-responsive-16by9\"><iframe id=\"playerPopup\" type=\"text/html\" class=\"embed-responsive-item youtubePlayerWindow\" src=\"http://www.youtube.com/embed/" + ratingItem[0].id.videoId + "?enablejsapi=1?wmode=opaque\" frameborder=\"0\"></iframe></div>");
        $('.modal-body').append("<a href=\"https://www.youtube.com/channel/" + ratingItem[0].snippet.channelId + "\" target=\"_blank\" class=\"channel-link\">Go to channel: " + ratingItem[0].snippet.channelTitle + "</a>");
        $('.modal-body').append("<h5 class=\"video-description\">Description:</h5>");
        $('.modal-body').append("<p class=\"description-content\">" + ratingItem[0].snippet.description + "</p>");
    });
});
function getLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
        localStorage.setItem("lat", position.coords.latitude);
        localStorage.setItem("lon", position.coords.longitude);
    });
}

// Google Maps Scripts
// When the window has finished loading create our google map below
// Get current coordinates via HTML5 feature or use initial coords of Lviv city
getLocation();
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 14,

        // The latitude and longitude to center the map (always required), the coordinates of Lviv are used
        center: new window.google.maps.LatLng(localStorage.getItem("lat"), localStorage.getItem("lon")),

        // Disables the default Google Maps UI components
        scrollwheel: false,
        draggable: true,

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 29
            }, {
                "weight": 0.2
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 18
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 21
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "saturation": 36
            }, {
                "color": "#000000"
            }, {
                "lightness": 40
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 19
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }, {
                "weight": 1.2
            }]
        }]
    };
    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new window.google.maps.Map(mapElement, mapOptions);

    // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
    var image = 'img/map-marker.png';
    var myLatLng = new window.google.maps.LatLng(localStorage.getItem("lat"), localStorage.getItem("lon"));
    var beachMarker = new window.google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });
}