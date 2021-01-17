import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useSnackbar } from "notistack";

import { getJobs } from "../../api";
import JobList from "./JobList";
import Map from "./Map";

export const jobPosition = (job) => ({
  lat: parseFloat(job.latitude),
  lng: parseFloat(job.longitude),
});

const center = {
  lat: -27.3962288,
  lng: -55.9595353,
};

const jobsInitialState = {
  data: [],
};

const Jobs = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentPosition, setCurrentPosition] = useState(center);
  const [jobs, setJobs] = useState(jobsInitialState);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await getJobs();
        setJobs(jobs);
      } catch (e) {
        const message = "Ups! something went wrong.";
        enqueueSnackbar(message, { variant: "error" });
      }
    };
    fetchJobs();
  }, [enqueueSnackbar]);

  const handleClick = (job) => {
    return () => {
      setSelectedJobId(job.id);
      setCurrentPosition(jobPosition(job));
    };
  };

  const handleCloseInfo = () => {
    setSelectedJobId(null);
  };

  const handleClickMark = (jobId) => {
    return () => {
      setSelectedJobId(jobId);
    };
  };

  let selectedJob = null;
  if (selectedJobId) {
    selectedJob = jobs.byId[selectedJobId];
  }

  const mapProps = {
    jobs: jobs.data,
    currentPosition,
    jobPosition,
    selectedJob,
    handleCloseInfo,
    handleClickMark,
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={3}>
          <JobList
            jobs={jobs.data}
            selectedJobId={selectedJobId}
            handleClick={handleClick}
          />
        </Grid>
        <Grid item sm={9}>
          <Map {...mapProps} />
        </Grid>
      </Grid>
    </>
  );
};

export default Jobs;
