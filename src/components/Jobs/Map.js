import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import JobInfo from "./JobInfo";

const gmap_key = process.env.REACT_APP_GMAPS_KEY;

const containerStyle = {
  width: "100%",
  height: "100%",
  position: "unset",
};

function MyComponent({
  jobs,
  currentPosition,
  jobPosition,
  selectedJob,
  handleCloseInfo,
  handleClickMark,
}) {
  return (
    <LoadScript googleMapsApiKey={gmap_key}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={10}
      >
        {jobs.map((job) => (
          <Marker
            key={job.id}
            position={jobPosition(job)}
            onClick={handleClickMark(job.id)}
          />
        ))}

        {selectedJob && (
          <JobInfo job={selectedJob} handleCloseInfo={handleCloseInfo} />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyComponent);
