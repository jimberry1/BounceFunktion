import { useState } from 'react';
import BlueButton from '../../../UI/Modal/Buttons/BlueButton/BlueButton';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const EventsFilterBar = (props) => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(1),
    },
  }));
  const [filter, setFilter] = useState('Event Date');
  const classes = useStyles();

  return (
    <div
      style={{
        display: 'flex',
        width: '90%',
        border: '1px solid black',
        justifyContent: 'space-between',
        margin: 'auto',
      }}
    >
      <BlueButton>Test 1</BlueButton>
      <BlueButton>Test 2</BlueButton>
      <BlueButton>Test 3</BlueButton>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Order by:</InputLabel>
        <Select
          MenuProps={{
            disableScrollLock: true,
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          style={{ paddingTop: '10px' }}
        >
          <MenuItem value={'Event Date'}>Event Date</MenuItem>
          <MenuItem value={'timestamp'}>Recently Created</MenuItem>
          <MenuItem value={'popularity'}>Popular Events</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default EventsFilterBar;
