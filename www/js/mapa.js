var map;
var marker;
var watchID;
var latitude = null;
var longitude = null;


$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    //uncomment for testing in Chrome browser
 onDeviceReady();
});

function onDeviceReady() {

var onSuccess = function(position) {
    
    position.coords.latitude;
    
    document.getElementById("Vlongitude").value = position.coords.longitude;
    document.getElementById("Vlatitude").value = position.coords.latitude;
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);


    $(window).unbind();
    $(window).bind('pageshow resize orientationchange', function(e) {
        max_height();
    });
    max_height();
    google.load("maps", "3.8", {"callback": map, other_params: "sensor=true&language=pt"});
}

function max_height() {
    var h = $('div[data-role="header"]').outerHeight(true);
    var f = $('div[data-role="footer"]').outerHeight(true);
    var w = $(window).height();
    var c = $('div[data-role="content"]');
    var c_h = c.height();
    var c_oh = c.outerHeight(true);
    var c_new = w - h - f - c_oh + c_h;
    var total = h + f + c_oh;
    if (c_h < c.get(0).scrollHeight) {
        c.height(c.get(0).scrollHeight);
    } else {
        c.height(c_new);
    }
}

function map() {
    
    var latlng = new google.maps.LatLng(document.getElementById("Vlatitude").value, document.getElementById("Vlongitude").value);
    var myOptions = {
        zoom: 15,
        center: latlng,
        streetViewControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);

    google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
        watchID = navigator.geolocation.watchPosition(gotPosition, null, {maximumAge: 5000, timeout: 60000, enableHighAccuracy: true});
    });
    
    
    /****************************pontos***************************************************************************/
    
    //objeto com os pontos
    var markers = [
    {
        "title": 'érto de casa',
        "lat": '-23.286017',
        "lng": '-47.668083',
        "description": 'Bombay Hospital',
        "type": 'Papel'
    },
        {
            "title": 'centro da cidade',
            "lat": '-23.284027',
            "lng": '-47.672651',
            "description": 'Jaslok Hospital',
            "type": 'Plástico'
        },
    {
        "title": 'ifsp boituva',
        "lat": '-23.299770',
        "lng": '-47.649565',
        "description": 'Lilavati Hospital',
        "type": 'Metal'
    }, 
    ];
   
    var latitudeLongitudeUm = null;
    var markerOne = null;
    
    for(var i = 0; i < markers.length; i++) {
        var icon = "";
        switch (markers[i].type) {
            case "Papel":
                icon = "blue";
                break;
            case "Plástico":
                icon = "green";
                break;
            case "Metal":
                icon = "yellow";
                break;
            case "Vidro":
                icon = "green";
                break;
        }
        icon = "http://maps.google.com/mapfiles/ms/icons/" + icon + ".png";
        
        latitudeLongitudeUm = new google.maps.LatLng(markers[i].lat, markers[i].lng);
    
        markerOne = new google.maps.Marker({
            position: latitudeLongitudeUm,
            map: map,
            title: markers[i].title,
            animation:google.maps.Animation.DROP,
            icon: new google.maps.MarkerImage(icon)
        });
        
    } 
     /****************************************************************************/
}

// Method to open the About dialog
function showAbout() {
    showAlert("Google Maps", "Created with NetBeans 7.4");
}
;

function showAlert(message, title) {
    if (window.navigator.notification) {
        window.navigator.notification.alert(message, null, title, 'OK');
    } else {
        alert(title ? (title + ": " + message) : message);
    }
}

function gotPosition(position) {
    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));

    var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    if (!marker) {
        //create marker
        marker = new google.maps.Marker({
            position: point,
            map: map
        });
    } else {
        //move marker to new position
        marker.setPosition(point);
    }
}