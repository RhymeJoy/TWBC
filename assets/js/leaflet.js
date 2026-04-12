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
    bus: busIcon
};

const leafletConfigs = {
    location: {
        mapId: "eventMap",
        center: [25.07730, 121.48605],
        zoom: 12,

        markers: [
            {
                name: "活動會場",
                coords: [25.07730, 121.48605],
                icon: "venue",
                minZoom: 8,
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
                minZoom: 15,
                popup: `
                    <b>北捷 三和國中站 2 號出口</b><br>
                    步行約 100 公尺即可抵達會場
                `
            },
            {
                name: "桃園國際機場",
                coords: [25.07768, 121.23282],
                icon: "airport",
                minZoom: 7,
                popup: `
                    <b>桃園國際機場</b><br>
                    適合國際旅客抵達後轉乘進入台北市區。
                `
            },
            {
                name: "台北松山機場",
                coords: [25.06972, 121.55222],
                icon: "airport",
                minZoom: 10,
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
                name: "台北公車徐匯中學站",
                coords: [25.079480, 121.481360],
                icon: "bus",
                minZoom: 14,
                popup: `
                    <b>台北公車徐匯中學站</b><br>
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
                    [25.05488, 121.30055],
                    [25.04776, 121.51706],
                    [25.06318, 121.50098],
                    [25.07696, 121.48652],
                    [25.07730, 121.48605]
                ],
                color: "#ff9f1c",
                minZoom: 9
            },
            {
                name: "松山機場路線",
                coords: [
                    [25.06972, 121.55222],
                    [25.06291, 121.55153],
                    [25.05267, 121.52219],
                    [25.06318, 121.50098],
                    [25.07696, 121.48652],
                    [25.07730, 121.48605]
                ],
                color: "#2ec4b6",
                minZoom: 11
            },
            {
                name: "火車站路線",
                coords: [
                    [25.04775, 121.51710],
                    [25.05020, 121.52000],
                    [25.05750, 121.51000],
                    [25.06318, 121.50098],
                    [25.07696, 121.48652],
                    [25.07730, 121.48605]
                ],
                color: "#e63946",
                minZoom: 11
            },
            {
                name: "公車站路線",
                coords: [
                    [25.07948, 121.48136],
                    [25.07880, 121.48250],
                    [25.07820, 121.48380],
                    [25.07760, 121.48490],
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
        minZoom: 7,
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
