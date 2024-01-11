// MapWrapper.js
import React, { useEffect, useRef } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const MapWrapper = ({ data }) => {
  const mapRef = useRef(null);
  useEffect(() => {
    const google = window.google;
    let map = mapRef.current;

    if (map) {
      const bounds = new google.maps.LatLngBounds();
      const myLatlng = new google.maps.LatLng(data[0]?.lat, data[0]?.lng); // Center the map on the first marker
      const mapOptions = {
        zoom: 12,
        center: myLatlng,
        scrollwheel: false,
        zoomControl: true,
        styles: [],
      };

      map = new google.maps.Map(map, mapOptions);

      const infoWindows = [];

      data.forEach((markerData) => {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(markerData?.lat, markerData?.lng),
          map: map,
          animation: google.maps.Animation.DROP,
          title: markerData?.title,
          content: markerData.content,
        });

        bounds.extend(marker.position);

        const infoWindow = new google.maps.InfoWindow({
          content: markerData?.content,
        });

        infoWindows.push(infoWindow);

        google.maps.event.addListener(marker, "click", () => {
          infoWindows.forEach((iw) => iw.close()); // Close any open info windows
          infoWindow.open(map, marker);
        });
      });

      map.fitBounds(bounds); // Zoom to fit all data

      const markerCluster = new MarkerClusterer(map, data, {
        imagePath:
          "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      });
    }
  }, [data]);

  return (
    <div
      style={{ height: "600px" }}
      className="map-canvas"
      id="map-canvas"
      ref={mapRef}
    />
  );
};

export default MapWrapper;
