// MapView.js
import React, { useEffect, useState, useRef } from "react";
import { Card, Container, Row, Col } from "reactstrap";
import LocationDropDown from "../components/common/locationDropDown";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevices, selectLocation } from "../redux/slices/locationSlice";
import { toast } from "react-toastify";
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

      data.forEach((markerData, index) => {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(markerData?.lat, markerData?.lng),
          map: map,
          animation: google.maps.Animation.DROP,
          title: markerData?.title,
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

const MapView = () => {
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);
  const [selectedZones, setSelectedZones] = useState([]);
  const [selectedDivisions, setSelectedDivisions] = useState([]);
  const [selectedStations, setSelectedStations] = useState([]);

  useEffect(() => {
    let paramObj = {};
    if (selectedZones.length > 0)
      paramObj.zone = selectedZones.map((item) => item.value).join(",");

    if (selectedDivisions.length > 0)
      paramObj.division = selectedDivisions.map((item) => item.value).join(",");

    if (selectedStations.length > 0)
      paramObj.station = selectedStations.map((item) => item.value).join(",");

    try {
      paramObj ? dispatch(fetchDevices(paramObj)) : dispatch(fetchDevices());
    } catch (error) {
      toast.error(
        error?.response?.data || error?.message || "Data fetch failed."
      );
    }
  }, [selectedZones, selectedDivisions, selectedStations]);

  return (
    <div className="main-contentview">
      <LocationDropDown
        getSelectedZones={(options) => setSelectedZones(options)}
        getSelectedDivisions={(options) => setSelectedDivisions(options)}
        getSelectedStations={(options) => setSelectedStations(options)}
      />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="shadow border-0">
              {(location?.devices?.length > 0 && (
                <MapWrapper
                  data={location.devices
                    .filter((marker) => marker.latitude && marker.longitude)
                    .map((marker) => {
                      if (marker.latitude && marker.longitude) {
                        return {
                          lat: marker.latitude,
                          lng: marker.longitude,
                          title: marker.station,
                          content: `<div class="info-window-content"><h2>${marker.station}</h2><p>Latitude: ${marker.latitude}</p><p>Longitude: ${marker.longitude}</p></div>`,
                        };
                      } else return;
                    })}
                />
              )) || (
                <div className="text-muted text-center">
                  Map can't be loaded
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MapView;
