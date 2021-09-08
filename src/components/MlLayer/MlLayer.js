import React, { useRef, useEffect, useContext } from "react";

import { MapContext } from "react-map-components-core";

const MlLayer = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);
  const layerInitializedRef = useRef(false);
  const idSuffixRef = useRef(props.idSuffix || new Date().getTime());
  const layerId = (props.layerId || "MlLayer-") + idSuffixRef.current;

  useEffect(() => {
    return () => {
      let mapObj = mapContext.getMap(props.mapId);
      if (mapObj) {
        // This is the cleanup function, it is called when this react component is removed from react-dom
        if (mapObj.style && mapObj.getLayer(layerId)) {
          mapObj.removeLayer(layerId);
        }
        if (mapObj.style && mapObj.getSource(layerId)) {
          mapObj.removeSource(layerId);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (
      !mapContext.mapExists(props.mapId) ||
      !mapContext.getMap(props.mapId).getLayer(layerId) ||
      !props.options
    )
      return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    if (props.options.layout) {
      for (var key in props.options.layout) {
        mapContext
          .getMap(props.mapId)
          .setLayoutProperty(layerId, key, props.options.layout[key]);
      }
    }
    if (props.options.paint) {
      for (var key in props.options.paint) {
        mapContext
          .getMap(props.mapId)
          .setPaintProperty(layerId, key, props.options.paint[key]);
      }
    }
  }, [props.options]);

  useEffect(() => {
    if (
      !props.options ||
      !mapContext.mapExists(props.mapId) ||
      layerInitializedRef.current
    )
      return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    console.log(props.options);
    if (!mapContext.getMap(props.mapId).getLayer(layerId)) {
      layerInitializedRef.current = true;
      console.log(layerId);
      mapContext.getMap(props.mapId).addLayer({ id: layerId, ...props.options });
    }
  }, [mapContext.mapIds, mapContext, props, layerId]);

  return <></>;
};

export default MlLayer;
