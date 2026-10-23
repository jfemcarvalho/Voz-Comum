/*
 * Voz Comum — máscara do concelho sobre o mapa Leaflet (MapFlow\Leaflet, Forge).
 *
 * Corre uma única vez, no evento OnMapRender do bloco do mapa.
 * Não ligar a eventos de movimento/zoom: acrescentaria camadas repetidas.
 *
 * - A instância do Leaflet está em window.PracaMap._map
 *   (o campo LeafletMapName do bloco aponta para o TileLayer: "window.PracaMap").
 * - limiteGeoJson vem de Municipio.LimiteGeoJson (Polygon simples; um MultiPolygon
 *   precisa de um anel de máscara por cada parte).
 */
function aplicarMascara(limiteGeoJson) {
    var map = window.PracaMap && window.PracaMap._map;
    if (!map) { console.error("Mapa ainda não disponível"); return; }

    var geo = typeof limiteGeoJson === "string" ? JSON.parse(limiteGeoJson) : limiteGeoJson;

    // GeoJSON vem em [lng, lat]; o Leaflet quer [lat, lng]
    var ring = geo.features[0].geometry.coordinates[0].map(function (c) { return [c[1], c[0]]; });
    var world = [[-90, -180], [-90, 180], [90, 180], [90, -180], [-90, -180]];
    var canvas = L.canvas();

    // Máscara opaca com um buraco com a forma do concelho
    L.polygon([world, ring], {
        renderer: canvas, stroke: false, fillColor: '#d6d9ce', fillOpacity: 1,
        interactive: false, smoothFactor: 3
    }).addTo(map);

    // Borda: halo e linha nítida
    L.polygon(ring, { renderer: canvas, color: '#849324', weight: 8, opacity: 0.3, fill: false, interactive: false, smoothFactor: 3 }).addTo(map);
    L.polygon(ring, { renderer: canvas, color: '#849324', weight: 2, opacity: 1, fill: false, interactive: false, smoothFactor: 3 }).addTo(map);

    // Prende o mapa ao concelho
    var bounds = L.polygon(ring).getBounds();
    map.setMaxBounds(bounds.pad(0.05));
    map.setMinZoom(12);
    map.fitBounds(bounds);
    map.options.maxBoundsViscosity = 1.0;
}
