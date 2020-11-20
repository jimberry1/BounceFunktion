import { useState, useEffect } from 'react';
import './PostFilter.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const PostFilter = (props) => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const [filter, setFilter] = useState('');
  const classes = useStyles();

  // This is where my logic should sit. To start I just want a bit that says Filter by: on the left and then a set of <p>'s and drop downs which I can render as filterComponent subcategories

  return (
    <div>
      <div className="postFilter__title">
        <p>Filter</p>
      </div>
      <div className="postFilter__container">
        <div className="postFilter__rowFlex">
          <div className="postFilter__filterType">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Genre</InputLabel>
              <Select
                MenuProps={{
                  disableScrollLock: true,
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.filterValue}
                onChange={(event) => props.filterChanged(event)}
              >
                <MenuItem value={''}>All</MenuItem>
                <MenuItem value={'Techno'}>Techno</MenuItem>
                <MenuItem value={'House'}>House</MenuItem>
                <MenuItem value={'Disco'}>Disco</MenuItem>
                <MenuItem value={'Funk'}>Funk</MenuItem>
                <MenuItem value={'DnB'}>DnB</MenuItem>
                <MenuItem value={'Meme'}>Meme</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {/* <div className="postFilter__rowFlex">
          <div className="postFilter__filterType">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Post Date</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.postDateFilterValue}
                onChange={(event) => props.postDateFilterChanged(event)}
              >
                <MenuItem value={''}>All Posts</MenuItem>
                <MenuItem value={'day'}>Today</MenuItem>
                <MenuItem value={'week'}>Last 7 days</MenuItem>
                <MenuItem value={'month'}>This Month</MenuItem>
                <MenuItem value={'year'}>This Year</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PostFilter;
