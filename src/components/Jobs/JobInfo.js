import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import { InfoWindow } from "@react-google-maps/api";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DoneIcon from "@material-ui/icons/Done";

import { jobPosition } from "./Jobs";

const useStyles = makeStyles((theme) => ({
  root: {
    background: `white`,
    border: `1px solid #ccc`,
    padding: theme.spacing(2),
  },
  chip: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  description: {
    marginTop: theme.spacing(2),
  },
}));

const JobInfo = ({ job, handleCloseInfo }) => {
  const classes = useStyles();

  const statusIcon = (status) => {
    switch (status) {
      case "complete":
        return <DoneIcon />;
      case "in progress":
        return <MoreHorizIcon />;
      case "pending":
        return <ScheduleIcon />;
      default:
        return "";
    }
  };

  return (
    <InfoWindow position={jobPosition(job)} onCloseClick={handleCloseInfo}>
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography>{job.title}</Typography>
          </Grid>
          <Grid item>
            <Chip
              className={classes.chip}
              label={job.status}
              icon={statusIcon(job.status)}
            />
            <Chip className={classes.chip} label={job.date} />
          </Grid>
        </Grid>
        <div className={classes.description}>{job.description}</div>
      </div>
    </InfoWindow>
  );
};

export default JobInfo;
