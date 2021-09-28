import React, { useRef, useEffect, useContext } from "react";

import { MapContext } from "react-map-components-core";
import { v4 as uuidv4 } from "uuid";

const MlComponentTemplate = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);

  const initializedRef = useRef(false);
  const mapRef = useRef(undefined);
  const componentId = useRef(
    (props.idPrefix ? props.idPrefix : "MlComponentTemplate-") + uuidv4()
  );

  useEffect(() => {
    let _componentId = componentId.current;

    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      // try to remove anything this component has added to the MapLibre-gl instance
      // e.g.: remove the layer
      // mapContext.getMap(props.mapId).removeLayer(layerRef.current);
      // check for the existence of map.style before calling getLayer or getSource

      mapRef.current.cleanup(_componentId);
      mapRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);

    mapRef.current.setCenter([7.132122000552613, 50.716405378037706]);
    console.log(componentId.current);
  }, [mapContext.mapIds, mapContext, props.mapId]);

  return <></>;
};

export default MlComponentTemplate;
