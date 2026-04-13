const venueIcon = L.icon({
    iconUrl: "assets/img/horn.avif",
    iconSize: [50, 50],
    iconAnchor: [10, 40],
    popupAnchor: [0, -25]
});

const stationIcon = L.icon({
    iconUrl: "assets/img/mrt.avif",
    iconSize: [35, 35],
    iconAnchor: [15, 30],
    popupAnchor: [0, -25]
});

const airportIcon = L.icon({
    iconUrl: "assets/img/plane.avif",
    iconSize: [38, 38],
    iconAnchor: [19, 32],
    popupAnchor: [0, -25]
});

const trainIcon = L.icon({
    iconUrl: "assets/img/mrt.avif",
    iconSize: [38, 38],
    iconAnchor: [19, 32],
    popupAnchor: [0, -25]
});

const ubikeIcon = L.icon({
    iconUrl: "assets/img/mrt.avif",
    iconSize: [38, 38],
    iconAnchor: [19, 32],
    popupAnchor: [0, -25]
});

const busIcon = L.icon({
    iconUrl: "assets/img/mrt.avif",
    iconSize: [34, 34],
    iconAnchor: [17, 30],
    popupAnchor: [0, -25]
});

const icons = {
    venue: venueIcon,
    station: stationIcon,
    airport: airportIcon,
    train: trainIcon,
    bus: busIcon,
    ubike: ubikeIcon
};

const leafletConfigs = {
    location: {
        mapId: "eventMap",
        center: [25.07730, 121.48605],
        zoom: 14,

        markers: [
            {
                name: "活動會場",
                coords: [25.07730, 121.48605],
                icon: "venue",
                minZoom: 1,
                popup: `
                    <b>Taiwan BronyCon 台灣馬聚</b><br>
                    Asi Space Rental 阿斯生活空間<br>
                    241 新北市三重區三和路四段111號10樓<br>
                    <a href="https://maps.app.goo.gl/h4Tm98vdDjTCFZjC6" target="_blank">
                        📍 Google 導航
                    </a>
                `
            },
            {
                name: "捷運三和國中站 2 號出口",
                coords: [25.07696, 121.48652],
                icon: "station",
                minZoom: 15.5,
                popup: `
                    <b>北捷 三和國中站 2 號出口</b><br>
                    步行約 100 公尺即可抵達會場
                `
            },
            {
                name: "桃園國際機場",
                coords: [25.07768, 121.23282],
                icon: "airport",
                minZoom: 7.5,
                popup: `
                    <b>桃園國際機場</b><br>
                    適合國際旅客抵達後轉乘進入台北市區。
                `
            },
            {
                name: "台北松山機場",
                coords: [25.06500, 121.55200],
                icon: "airport",
                minZoom: 9.5,
                popup: `
                    <b>台北松山機場</b><br>
                    適合國內線與部分區域航線旅客，距離市區較近。
                `
            },
            {
                name: "台北火車站",
                coords: [25.047750, 121.517100],
                icon: "train",
                minZoom: 10,
                popup: `
                    <b>台北火車站（台鐵 / 高鐵 / 捷運）</b><br>
                    建議外縣市旅客先到這裡，再轉捷運或公車
                `
            },
            {
                name: "台北公車捷運三和國中站",
                coords: [25.077026, 121.486023],
                icon: "bus",
                minZoom: 17,
                popup: `
                    <b>台北公車捷運三和國中站</b><br>
                    適合國內線與部分區域航線旅客，距離市區較近。
                `
            },
            {
                name: "台北公車三和國中站",
                coords: [25.076320, 121.487502],
                icon: "bus",
                minZoom: 14.5,
                popup: `
                    <b>台北公車三和國中站</b><br>
                    適合國內線與部分區域航線旅客，距離市區較近。
                `
            },
            {
                name: "台北公車建和新村站",
                coords: [25.078042, 121.484412],
                icon: "bus",
                minZoom: 14.5,
                popup: `
                    <b>台北公車建和新村站</b><br>
                    適合國內線與部分區域航線旅客，距離市區較近。
                `
            },
            {
                name: "YouBike捷運三和國中",
                coords: [25.077027, 121.486347],
                icon: "ubike",
                minZoom: 16.5,
                popup: `
                    <b>YouBike捷運三和國中站(2號出口)</b><br>
                    適合國內線與部分區域航線旅客，距離市區較近。
                `
            }
        ],

        routes: [
            {
                name: "捷運步行路線",
                coords: [
                    [25.07696, 121.48652],
                    [25.07695, 121.48631],
                    [25.07723, 121.48583],
                    [25.07730, 121.48605]
                ],
                color: "#a64dff",
                minZoom: 16.5
            },
            {
                name: "桃園機場路線",
                coords: [
                    [25.07768, 121.23282],
                    [25.063655, 121.215068],
                    [25.061383, 121.213491],
                    [25.058023, 121.213464],
                    [25.044117, 121.219829],
                    [25.040122, 121.222817],
                    [25.037977, 121.226716],
                    [25.034543, 121.239286],
                    [25.028700, 121.250764],
                    [25.027709, 121.253606],
                    [25.027478, 121.255938],
                    [25.027577, 121.262423],
                    [25.026719, 121.266687],
                    [25.022130, 121.271496],
                    [25.020710, 121.273573],
                    [25.021998, 121.277217],
                    [25.036680, 121.295067],
                    [25.046755, 121.316840],
                    [25.050716, 121.324565],
                    [25.057582, 121.329666],
                    [25.063184, 121.336719],
                    [25.065758, 121.347285],
                    [25.065824, 121.376216],
                    [25.065117, 121.389370],
                    [25.058963, 121.397358],
                    [25.055386, 121.402500],
                    [25.057133, 121.408651],
                    [25.068111, 121.428208],
                    [25.069850, 121.442635],
                    [25.075430, 121.462454],
                    [25.075834, 121.468393],
                    [25.073472, 121.478559],
                    [25.073777, 121.486411],
                    [25.075016, 121.492515],
                    [25.075100, 121.493425],
                    [25.074885, 121.493959],
                    [25.074482, 121.494233],
                    [25.073724, 121.494243],
                    [25.073523, 121.494164],
                    [25.073297, 121.494107],
                    [25.072899, 121.493788],
                    [25.072813, 121.493579],
                    [25.072877, 121.493307],
                    [25.074737, 121.490159],
                    [25.077191, 121.485890],
                    [25.07730, 121.48605]
                ],
                color: "#ff9f1c",
                minZoom: 9
            },
            {
                name: "松山機場路線",
                coords: [
                    [25.06500, 121.55200],
                    [25.063533, 121.552475],
                    [25.063435, 121.550856],
                    [25.062997, 121.550757],
                    [25.062451, 121.550867],
                    [25.062354, 121.551205],
                    [25.062363, 121.552939],
                    [25.062446, 121.553111],
                    [25.062632, 121.553188],//離開航廈
                    [25.062580, 121.554478],
                    [25.061978, 121.554574],
                    [25.061593, 121.551295],
                    [25.061727, 121.549929],
                    [25.062044, 121.549986],
                    [25.068114, 121.541764],
                    [25.068228, 121.538134],
                    [25.069265, 121.538114],
                    [25.069674, 121.538463],
                    [25.072630, 121.538522],
                    [25.072585, 121.535878],
                    [25.073174, 121.535571],
                    [25.073217, 121.534434],
                    [25.073054, 121.534409],//上匝道
                    [25.072961, 121.533922],
                    [25.073114, 121.533488],
                    [25.073692, 121.532754],
                    [25.073981, 121.532031],
                    [25.073926, 121.531207],
                    [25.073779, 121.530165],
                    [25.073915, 121.529051],
                    [25.074063, 121.528533],//匯入國道1號
                    [25.076428, 121.522304],
                    [25.077596, 121.516995],
                    [25.078228, 121.509682],
                    [25.077939, 121.504297],//過淡水河
                    [25.077218, 121.499963],
                    [25.076921, 121.497897],//下匝道
                    [25.076916, 121.497114],
                    [25.077085, 121.496524],
                    [25.077259, 121.495621],
                    [25.076932, 121.494875],
                    [25.076245, 121.494441],
                    [25.075231, 121.494321],
                    [25.073913, 121.494323],
                    [25.073523, 121.494164],
                    [25.073297, 121.494107],
                    [25.072899, 121.493788],
                    [25.072813, 121.493579],
                    [25.072877, 121.493307],
                    [25.074737, 121.490159],
                    [25.077191, 121.485890],
                    [25.07730, 121.48605]
                ],
                color: "#2ec4b6",
                minZoom: 11
            },
            {
                name: "火車站路線",
                coords: [
                    [25.04775, 121.51710],
                    [25.046388, 121.516743],//出站
                    [25.047593, 121.512200],
                    [25.048124, 121.511363],
                    [25.048262, 121.509516],
                    [25.049090, 121.506049],//上橋
                    [25.054488, 121.496439],//過淡水河
                    [25.055547, 121.493772],//右轉108縣道
                    [25.058048, 121.494324],
                    [25.058784, 121.494348],
                    [25.059656, 121.494098],
                    [25.060178, 121.493797],
                    [25.061935, 121.492318],
                    [25.062567, 121.491449],
                    [25.062863, 121.490677],
                    [25.063349, 121.488965],
                    [25.064015, 121.487565],//右轉104縣道
                    [25.066315, 121.488965],
                    [25.068617, 121.490639],//左轉自強路二段
                    [25.069931, 121.488738],
                    [25.070549, 121.488011],
                    [25.071530, 121.487334],
                    [25.072511, 121.486963],
                    [25.073610, 121.486973],
                    [25.074433, 121.487138],
                    [25.075877, 121.488191],//左轉三合路四段
                    [25.077190, 121.485895],
                    [25.07730, 121.48605]
                ],
                color: "#e63946",
                minZoom: 11
            },
            {
                name: "公車站路線",
                coords: [
                    [25.077026, 121.486023],
                    [25.077186, 121.485821],
                    [25.07730, 121.48605]
                ],
                color: "#06d6a0",
                minZoom: 15
            }
        ]
    }
};

const leafletMaps = {};
const leafletResizeBound = {};

function initLeafletSection(sectionId) {
    const config = leafletConfigs[sectionId];
    if (!config) return null;

    const mapElement = document.getElementById(config.mapId);
    if (!mapElement) return null;

    if (leafletMaps[sectionId]) {
        const existingMap = leafletMaps[sectionId];
        const existingContainer = existingMap.getContainer();

        // 舊地圖綁的 DOM 已經被 innerHTML 換掉了，就整個重建
        if (!existingContainer || !document.body.contains(existingContainer) || existingContainer !== mapElement) {
            existingMap.remove();
            delete leafletMaps[sectionId];
        } else {
            setTimeout(() => {
                const center = existingMap.getCenter();
                const zoom = existingMap.getZoom();

                existingMap.invalidateSize({ pan: false, animate: false });
                existingMap.setView(center, zoom, { animate: false });
            }, 100);

            return existingMap;
        }
    }

    const initialCenter = L.latLng(config.center[0], config.center[1]);
    const initialZoom = config.zoom;

    const map = L.map(config.mapId, {
        maxZoom: 20,
        minZoom: 6.5,
        zoomSnap: 0.5,
        zoomDelta: 0.5
    }).setView(initialCenter, initialZoom);
// https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg?api_key=b2bf2bf9-ed0b-4ea8-893e-24dafb9f49fa   &copy; <a target="_blank" href="https://maps.stamen.com/">Stamen Design</a>
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:'&copy; OpenStreetMap contributors',
        maxZoom: 20,
        maxNativeZoom: 19
    }).addTo(map);

    L.control.scale({
        position: "bottomright",
        metric: true,
        imperial: false
    }).addTo(map);

    const markerLayers = [];
    const routeLayers = [];
    let activeRouteName = null;

    config.markers.forEach(marker => {
        const m = L.marker(marker.coords, {
            icon: icons[marker.icon] || undefined
        }).bindPopup(marker.popup);

        m._minZoom = marker.minZoom || 0;
        m._name = marker.name || "";
        m.addTo(map);
        markerLayers.push(m);
    });

    config.routes.forEach(route => {
        const line = L.polyline(route.coords, {
            color: route.color || "#ffcc00",
            weight: 6,
            opacity: 0.9
        });

        line._minZoom = route.minZoom || 0;
        line._name = route.name || "";
        line._coords = route.coords || [];

        routeLayers.push(line);
    });

    function updateLayerVisibility() {
        const zoom = map.getZoom();

        markerLayers.forEach(layer => {
            if (zoom < layer._minZoom) {
                if (map.hasLayer(layer)) map.removeLayer(layer);
            } else {
                if (!map.hasLayer(layer)) layer.addTo(map);
            }
        });

        routeLayers.forEach(layer => {
            if (activeRouteName) {
                if (layer._name === activeRouteName) {
                    if (!map.hasLayer(layer)) layer.addTo(map);
                } else {
                    if (map.hasLayer(layer)) map.removeLayer(layer);
                }
            } else {
                if (map.hasLayer(layer)) map.removeLayer(layer);
            }
        });
    }

    function flashRoute(layer, times = 3) {
        if (!layer) return;

        const baseStyle = {
            opacity: 0.9,
            weight: 6
        };

        const flashStyle = {
            opacity: 0.2,
            weight: 10
        };

        let count = 0;
        let visible = true;

        layer.setStyle(baseStyle);

        const timer = setInterval(() => {
            layer.setStyle(visible ? flashStyle : baseStyle);
            visible = !visible;
            count++;

            if (count >= times * 2) {
                clearInterval(timer);
                layer.setStyle(baseStyle);
            }
        }, 180);
    }

    function showOnlyRoute(routeName, zoomLevel = 18) {
        activeRouteName = routeName;
        updateLayerVisibility();

        const targetRoute = routeLayers.find(layer => layer._name === routeName);
        if (!targetRoute) return;

        const bounds = targetRoute.getBounds();

        map.invalidateSize({ pan: false, animate: false });

        if (bounds.isValid()) {
            map.once("moveend", () => {
                flashRoute(targetRoute, 3);
            });

            map.flyToBounds(bounds, {
                padding: [40, 40],
                maxZoom: zoomLevel,
                duration: 0.6
            });
        } else {
            map.setView(initialCenter, zoomLevel, { animate: false });
            flashRoute(targetRoute, 3);
        }
    }

    function clearRouteFilter() {
        activeRouteName = null;
        updateLayerVisibility();
    }

    function resetView() {
    const currentCenter = map.getCenter();
    const currentZoom = map.getZoom();

    // 判斷是否已經在初始位置（容許極小誤差）
    const isSameCenter =
        Math.abs(currentCenter.lat - initialCenter.lat) < 0.0001 &&
        Math.abs(currentCenter.lng - initialCenter.lng) < 0.0001;

    const isSameZoom = currentZoom === initialZoom;

    if (isSameCenter && isSameZoom) {
        showResetToast("📍 已在初始位置");
        return;
    }

    activeRouteName = null;
    updateLayerVisibility();

    map.invalidateSize({ pan: false, animate: false });

    requestAnimationFrame(() => {
        map.flyTo(initialCenter, initialZoom, {
            duration: 0.6,
            animate: true
        });

        map.once("moveend", () => {
            map.invalidateSize({ pan: false, animate: false });
            map.setView(initialCenter, initialZoom, { animate: false });

            showResetToast("📍 已回初始位置");
        });
    });
}

    map.showOnlyRoute = showOnlyRoute;
    map.clearRouteFilter = clearRouteFilter;
    map.updateLayerVisibility = updateLayerVisibility;
    map.resetView = resetView;

    updateLayerVisibility();
    map.on("zoomend", updateLayerVisibility);

    leafletMaps[sectionId] = map;

    setTimeout(() => {
        map.invalidateSize({ pan: false, animate: false });
        map.setView(initialCenter, initialZoom, { animate: false });
    }, 100);

    if (!leafletResizeBound[sectionId]) {
        let resizeTimer = null;

        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (!map.getContainer() || !document.body.contains(map.getContainer())) return;

                const currentCenter = map.getCenter();
                const currentZoom = map.getZoom();

                map.invalidateSize({ pan: false, animate: false });
                map.setView(currentCenter, currentZoom, { animate: false });
            }, 120);
        });

        leafletResizeBound[sectionId] = true;
    }

    return map;
}

function showResetToast(text) {
    let toast = document.getElementById("mapToast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "mapToast";
        document.body.appendChild(toast);
    }

    toast.textContent = text;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}