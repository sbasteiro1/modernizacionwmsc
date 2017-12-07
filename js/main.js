function printDiv(divName)
{
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

$(document).ready(function () {
    
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FicmluYWJhc3RlaXJvIiwiYSI6ImNqOGFhbG1iejBkazkyd3B1dDd0dXhnbm4ifQ.Y8klPMWA-4uwpqiMZgv9vw'; 
    var map = new mapboxgl.Map({
            container :'mapid',
            center: [-60.50, -40.30],
            zoom: 3,
            style:'js/lib/osm-liberty.json'}); 
    var credits = L.control.attribution().addTo(map);
    credits.addAttribution('Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>');
    

    $('.checkbox_options').change(function () {
        map.eachLayer(function (layer) {
            map.removeLayer(layer);
            $(".item").fadeOut();
            $(".item").fadeOut("fast");
            $(".item").fadeOut(3000);
        });
        var layers = [];
        var urlbase = "";
        if ($('#calles').is(":checked")) {
            urlbase = 'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2FicmluYWJhc3RlaXJvIiwiYSI6ImNqOGFhbG1iejBkazkyd3B1dDd0dXhnbm4ifQ.Y8klPMWA-4uwpqiMZgv9vw';
            //layers.push('');
        }

        if ($('#satelite').is(":checked")) {
            urlbase = 'https://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2FicmluYWJhc3RlaXJvIiwiYSI6ImNqOGFhbG1iejBkazkyd3B1dDd0dXhnbm4ifQ.Y8klPMWA-4uwpqiMZgv9vw';
            //layers.push('');
        }
        if ($('#dark').is(":checked")) {
            urlbase = 'https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2FicmluYWJhc3RlaXJvIiwiYSI6ImNqOGFhbG1iejBkazkyd3B1dDd0dXhnbm4ifQ.Y8klPMWA-4uwpqiMZgv9vw';
            //layers.push('');
        }
        /*
         if ($('#gcalles').is(":checked")) {
         var ggl = new L.Google('ROADMAP');
         map.addLayer(ggl);
         }
         if ($('#gsatelite').is(":checked")) {
         var ggl = new L.Google('SATELLITE');
         map.addLayer(ggl);
         }
         if ($('#ghibrido').is(":checked")) {
         var ggl = new L.Google('HYBRID');
         map.addLayer(ggl);
         }       
         */
        var url = 'http://192.168.150.101:8080/geoserver/gwc/service/wms?TILED=true';
        

        if ($('#ejidos').is(":checked")) {
            layers.push('PaisDigital:Ejidos municipales - Censo 2010 - 4326');
            $(".itemsEjidos").fadeIn();
            $(".itemsEjidos").fadeIn("slow");
            $(".itemsEjidos").fadeIn(3000);
        }
        if ($('#puntosDigitales').is(":checked")) {
            layers.push('PaisDigital:Puntos digitales - 4326');
            $(".itemsPuntos").fadeIn();
            $(".itemsPuntos").fadeIn("slow");
            $(".itemsPuntos").fadeIn(3000);
        }
        if ($('#transmisionDatos').is(":checked")) {
            layers.push('PaisDigital:Centro transmision datos - 4326');
            $(".itemsTransmision").fadeIn();
            $(".itemsTransmision").fadeIn("slow");
            $(".itemsTransmision").fadeIn(3000);
        }
        if ($('#sucursalesCorreo').is(":checked")) {
            layers.push('PaisDigital:Sucursales correo - 4326');
            $(".itemsCorreo").fadeIn();
            $(".itemsCorreo").fadeIn("slow");
            $(".itemsCorreo").fadeIn(3000);
        }
        if ($('#antenasSatelitales').is(":checked")) {
            layers.push('PaisDigital:Antenas satelitales - 4326');
            $(".itemsAntena").fadeIn();
            $(".itemsAntena").fadeIn("slow");
            $(".itemsAntena").fadeIn(3000);
        }
        if ($('#establecimientosEducativos').is(":checked")) {
            layers.push('PaisDigital:Nombre establecimientos educativos - 3857');
            $(".itemsEstablecimiento").fadeIn();
            $(".itemsEstablecimiento").fadeIn("slow");
            $(".itemsEstablecimiento").fadeIn(3000);
        } else {
            $('#estadoInternet,#InstalacionElectrica').attr('checked', false);
        }
        if ($('#estadoInternet').is(":checked")) {
            layers.push('PaisDigital:Establecimientos educativos - Estado internet - 4326');
            $(".itemsInternet").fadeIn();
            $(".itemsInternet").fadeIn("slow");
            $(".itemsInternet").fadeIn(3000);
        }
        if ($('#InstalacionElectrica').is(":checked")) {
            layers.push('PaisDigital:Establecimientos educativos - Tipo instalación eléctrica - 3857');
            $(".itemsElectrica").fadeIn();
            $(".itemsElectrica").fadeIn("slow");
            $(".itemsElectrica").fadeIn(3000);
        }
        if ($('#wmsign').is(":checked")) {
            url= 'http://wms.ign.gob.ar/geoserver/wms?';
            layers.push('ideign:LIMITE_POLITICO_ADMINISTRATIVO');            
            $(".itemsLimites").fadeIn();
            $(".itemsLimites").fadeIn("slow");
            $(".itemsLimites").fadeIn(3000);
        }
        var wmsbase = L.tileLayer(urlbase).addTo(map);  
        var wms = new L.tileLayer.wms(url, {
            layers: layers,
            zIndex: 1000,
            format: 'image/png',
            transparent: true,
        }).addTo(map);  //Desarrollo
        
        
                
    });
    $('.checkbox_options').change();    
});