import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './EventFilterBar.css';

const EventsFilterBar = (props) => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  return (
    <div className="eventFilterBar__container" style={{}}>
      <FormControl className={classes.formControl}>
        <InputLabel id="Order_by_select_dropdown">Order by:</InputLabel>
        <Select
          MenuProps={{
            disableScrollLock: true,
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.orderByFilterValue}
          onChange={(event) => props.changeOrderByFilter(event)}
          style={{ paddingTop: '10px' }}
        >
          <MenuItem value={'eventDate'}>Event Date</MenuItem>
          <MenuItem value={'timestamp'}>Recently Created</MenuItem>
          {/* <MenuItem value={'popularity'}>Popular Events</MenuItem> */}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="Event_Type_select_dropdown">Event Type:</InputLabel>
        <Select
          MenuProps={{
            disableScrollLock: true,
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.eventTypeFilterValue}
          onChange={(event) => props.changeEventTypeFilter(event)}
          style={{ paddingTop: '10px' }}
        >
          <MenuItem value={''}>All</MenuItem>
          <MenuItem value={'fest'}>Festival</MenuItem>
          <MenuItem value={'club'}>Club</MenuItem>
          <MenuItem value={'live'}>Live Music</MenuItem>
          <MenuItem value={'other'}>Other</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default EventsFilterBar;
