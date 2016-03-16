$(window).load(function () {
    // Animate loader off screen
    //$(".preLoadScreen").fadeOut(7000, function() {
    //    $(this).remove();
    //});
    $(".preLoadScreen").animate({
        opacity: 0
    }, 10000, function() {
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

$(document).ready(function () {
    // Getting the list of most popular videos on YouTube Music Channel (Pop Music playlist)
    // and appending video players with the video items we have got using Google API key
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet',
            playlistId: 'PLDcnymzs18LVXfO_x0Ei0R24qDbVtyy66', //Id of YT Most Popular Music Videos Playlist
            maxResults: 6,
            orderBy: 'viewCount', //Ordering from the most viewed
            key: 'AIzaSyCNkKCSC7DqlTrL4CAUCVtCrhJelj6nhaE'
        },
        function (data) {
            $.each(data.items, function (i, item) {
                $("#mostPopularContent").append("<iframe id=\"playerMP" + i + " \" type=\"text/html\" width=\"640\" height=\"360\" class=\"col-lg-6 youtubePlayerWindow\" src=\"http://www.youtube.com/embed/" + item.id.videoId + "?enablejsapi=1?wmode=opaque\" frameborder=\"0\"></iframe>");
            });
        }
    );

    //// Getting playlistId depending on region UK (it is needed to check region by geolocation info later)
    //$.get(
    //    "https://www.googleapis.com/youtube/v3/videoCategories", {
    //        part: 'snippet',
    //        regionCode: 'UK',
    //        maxResults: 6,
    //        key: 'AIzaSyCNkKCSC7DqlTrL4CAUCVtCrhJelj6nhaE'
    //    },
    //    function (data) {
    //        localStorage.removeItem('localVideoCategories');
    //        localStorage.setItem('localVideoCategories', JSON.stringify(data));
    //    }
    //);
    //// Using JSON for saving received data locally
    //var localVideoCategoriesList = JSON.parse(localStorage.getItem('localVideoCategories'));
    //var localMusicPlaylist;

    //$.each(localVideoCategoriesList.items, function (i, item) {
    //    if (item.snippet.title == "Music") {
    //        localMusicPlaylist = item.snippet.channelId;
    //    }
    //});

    //// Getting the list of videos on YouTube Music Channel depending on region
    //$.get(
    //        "https://www.googleapis.com/youtube/v3/search", {
    //            part: 'snippet',
    //            playlistId: localMusicPlaylist,
    //            maxResults: 6,
    //            key: 'AIzaSyCNkKCSC7DqlTrL4CAUCVtCrhJelj6nhaE'
    //        },
    //        function (data) {
    //            $.each(data.items, function (i, item) {
    //                $("#popularInRegionContent").append("<iframe id=\"playerPIR" + i + " \" type=\"text/html\" width=\"640\" height=\"360\" class=\"col-lg-6 youtubePlayerWindow\" src=\"http://www.youtube.com/embed/" + item.id.videoId + "?enablejsapi=1?wmode=opaque\" frameborder=\"0\"></iframe>");
    //            });
    //        }
    //    );

    // Generating the list of most popular music videos
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet',
            playlistId: 'PLDcnymzs18LVXfO_x0Ei0R24qDbVtyy66', //Id of YT Most Popular Music Videos Playlist
            maxResults: 20,
            orderBy: 'viewCount', //Ordering from the most viewed
            key: 'AIzaSyCNkKCSC7DqlTrL4CAUCVtCrhJelj6nhaE'
        },
        function (data) {
            $.each(data.items, function (i, item) {
                $("#ratingsContent").append("<h6>" + (i + 1) + ". <a href=\"http://www.youtube.com/watch?v=" + item.id.videoId + "\" target=\"_blank\">" + item.snippet.title + "</a></h6>");
            });
        }
    );
});

// Google Maps Scripts
// When the window has finished loading create our google map below
// Get current coordinates via HTML5 feature or use initial coords of Lviv city
var lat = 49.8316;
var lon = 24.0394;

getLocation();
google.maps.event.addDomListener(window, 'load', init);

function getLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log("position is located!");
    });
}

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    console.log(lat + " " + lon);
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 14,

        // The latitude and longitude to center the map (always required), the coordinates of Lviv are used
        center: new google.maps.LatLng(lat, lon),

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
    var map = new google.maps.Map(mapElement, mapOptions);

    // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
    var image = 'img/map-marker.png';
    var myLatLng = new google.maps.LatLng(lat, lon);
    var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });
}