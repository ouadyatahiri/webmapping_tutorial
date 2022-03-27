//To initilize our map we are going to creat a map object using 'L.'followed by the method map()
/*map() method contains two parameters :
1-The first one refer to the div ot the container's Id
2-Is a set of additional option for rxample if we want to inistialize our map focusing and zooming to a specific area,
always we wtite those additional option within brackets 
==>For example we are going to use the 'center' and the 'zoom' , n the center we are going to set the initiale coordinate 
system , and the zoom will set the level of zoom on the coordinate that we have choose.
[Y,X] in the coordinate system array , we add first the latitude Y then the longitude Y :
[Latitude,longitude]
*/
//Step 1: Initialize the map :
// var map=L.map('map',{center:[31.262191,34.801511],zoom:17});
var map=L.map('map').setView([34.042694,-6.800292],10);
//In the line above we used an alternative way setView([coordinate system of the initial point],Zoom level)
//Step 2:Add a tile layer (basemap)
//But before that we have to understand how a raster tile work :
/*
It works depending in 3 parameters : z which means the zoom level (0 to 18),x is the column number , and 
y is the row number , each zoom level refer to a diffrent collection of tiles 
when the z=0 we have 1 tile , when we have a z=1 we have 2*2=4 tiles ,when the z=2
we have 2^2*2^2=16 tiles .and based on this how the 
*/
//So to add a tile layer we will use that one provided by openmapstreet and use the L.tilelayer function
//It has two parameters : URL of the tile server and the second is a set of additional options .
//Here is the URL that we will use https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
// L.tileLayer(
//     'https://{s}.freemap.sk/T/{z}/{x}/{y}.jpeg',
//     {attribution:"&copy; <a href='https://www.openstreetmap.org/#map=3/51.51/9.14'>OpenStreetMap</a> By wadietahiri"}
//     //The attribution option allows us to add for example the map source , a link ...using '&copy;' 
// ).addTo(map);
// var i=0;
// L.tileLayer(
//     tiles[i].url,
//     {attribution:tiles[i].options.attribution,
//         maxZoom:tiles[i].options.maxZoom,
//         minZoom:tiles[i].options.minZoom
//     }
// ).addTo(map);
/*There is many other tile providers depending on the organization , we have used the default one :
https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
But there are many other tile layer provider we can find it all in :
https://leaflet-extras.github.io/leaflet-providers/preview/
*/

//Let's create a mini app that display diffrent tiles layer provided from diffrent servers :

var tiles=[
    {   
        title:'Default openstreetmap tiles',
        url:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        options:{
            attribution :'&copy; openstreetmap by wadie tahiri',
            subdomains:'',
            minZoom:0,
            maxZoom:18,
            ext:'png',
            subdomains:'abc'
        }
    },
   { 
        title:'The stamen tiles',
        url:'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}',
        options: {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 18,
        ext: 'png'
   }
}
   ,{
    title:'The arcgis online tiles',
    url:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
    options:{
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
}},
{   title:'The opentopmap tiles',
    url:'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    options: {
	maxZoom: 17,
    minZoom:0,
    ext:'png',
    subdomains:'abc',
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}},
    {    
        title:'The ESRI world basemap',
        url:'https://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}',
        options:{
            attribution: 'Tiles &copy; Esri &mdash; Copyright: &copy;2012 DeLorme',
	        minZoom: 1,
	        maxZoom: 17,
            ext:'png',
            subdomains:'abcd'
        }
    }
];
var i=0;
$(function(){
    var next =$('#next');
    var previous=$('#previous');
    next.click(()=>{
        if(i<tiles.length-1){
            i+=1;
            addtile();
        }
        else{
            i=0;
            addtile();
        }
    });
    previous.click(
        ()=>{
            if(i>0){
                i-=1;
                addtile();
            }else {
                i=tiles.length-1;
                addtile();
            }
        }
    );

});

function addtile(){
    $('p').text(tiles[i].title);
    L.tileLayer(
        tiles[i].url,
        {attribution:tiles[i].options.attribution,
            maxZoom:tiles[i].options.maxZoom,
            minZoom:tiles[i].options.minZoom,
            ext:tiles[i].options.ext,
            subdomains:tiles[i].options.subdomains
        }
    ).addTo(map);
}
addtile();
