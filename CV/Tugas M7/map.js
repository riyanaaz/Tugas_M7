// Inisialisasi Peta
var map = L.map('map', {
    center: [-7.79558, 110.36949],
    zoom: 15
});

// Tambahkan Layer Peta
var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

var carto = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CartoDB',
    subdomains: 'abcd',
    maxZoom: 19
});

var OpenStreetMap_Mapnik = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
});

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap'
});

var baseMaps = {
    "Citra Satelit": esri,
    "Peta Carto": carto,
    "Peta OSM": OpenStreetMap_Mapnik,
    "Peta Topo": OpenTopoMap
};

// Marker Lokasi
var markers = [
    [-7.76528, 110.37227],
    [-7.75980, 110.39898],
    [-7.75340, 110.36047],
    [-7.78256, 110.37893],
    [-7.78392, 110.39057],
    [-7.78232, 110.40123],
    [-7.79324, 110.36611]
];

var bounds = L.latLngBounds(markers);
map.fitBounds(bounds, { maxZoom: 16 });

// Routing
L.Routing.control({
    waypoints: [
        L.latLng(markers[0]),  // Fakultas Teknik UGM
        L.latLng(markers[1])   // Pakuwon Mall Jogja
    ],
    lineOptions: {
        styles: [{ color: 'green', opacity: 1, weight: 4 }]
    },
    collapsible: true,
    show: false
}).addTo(map);

var markerInfo = [
    { title: "Fakultas Teknik UGM", img: "FTUGM.jpg", desc: "Fakultas Teknik UGM memiliki berbagai program studi di bidang teknik, termasuk Teknik Geodesi, Sipil, Mesin, dan lainnya." },
    { title: "Pakuwon Mall Jogja", img: "PakuwonMall.jpeg", desc: "Pakuwon Mall Jogja adalah salah satu mall terbesar di Jogja dengan banyak pilihan brand ternama." },
    { title: "Jogja City Mall", img: "JogjaCityMall.jpeg", desc: "Jogja City Mall menawarkan pengalaman belanja unik dengan konsep arsitektur klasik dan berbagai toko terkenal." },
    { title: "Galeria Mall", img: "GaleriaMall.jpeg", desc: "Galeria Mall adalah salah satu pusat perbelanjaan tertua di Yogyakarta dengan berbagai pilihan kuliner dan fashion." },
    { title: "Lippo Plaza Jogja", img: "LippoPlaza.jpg", desc: "Lippo Plaza Jogja memiliki berbagai tenant menarik, termasuk bioskop, food court, dan supermarket besar." },
    { title: "Ambarukmo Plaza", img: "AmbarukmoPlaza.jpg", desc: "Ambarukmo Plaza, atau Amplaz, adalah pusat perbelanjaan modern dengan berbagai tenant internasional dan area hiburan." },
    { title: "Malioboro Mall", img: "MalioboroMall.jpg", desc: "Malioboro Mall terletak di pusat wisata Malioboro dan menawarkan berbagai pilihan belanja serta kuliner khas." }
];

for (var i = 0; i < markers.length; i++) {
    L.marker(markers[i], { title: markerInfo[i].title })
        .addTo(map)
        .bindPopup(
            `<h6><b>${markerInfo[i].title}</b></h6>
            <p>${markerInfo[i].desc}</p>
            <img src="./foto/${markerInfo[i].img}" style="width:150px">`
        );
}

// Layer Control
L.control.layers(baseMaps).addTo(map);

// Geocoder
L.Control.geocoder().addTo(map);

// Easy Print
L.easyPrint({
    title: 'Cetak Peta',
    position: 'topright',
    sizeModes: ['A4Portrait', 'A4Landscape']
}).addTo(map);

// Scale Bar
L.control.scale({
    position: 'bottomleft',
    metric: true,
    imperial: false
}).addTo(map);

// Fungsi Pencarian Lokasi
function cari() {
    alert('Tombol ditekan!');
    map.locate({ setView: true, maxZoom: 16 });
    map.on('locationfound', function(e) {
        var radius = e.accuracy / 2;
        L.marker(e.latlng).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();
        L.circle(e.latlng, radius).addTo(map);
    });
}
