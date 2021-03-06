import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Grid, Typography, Button, makeStyles,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import HistoryList from './HistoryList.jsx';

const useStyles = makeStyles(() => ({
  parent: {
    border: 'solid 1px #4e71cc',
    borderRadius: '3px',
  },
  container: {
    margin: '5px 0 0 0',
  },
  backBtn: {
    opacity: '60%',
  },
  entry: {
    width: '200px',
    borderTop: 'solid 1px #4e71cc',
    borderBottom: 'solid 1px #4e71cc',
  },
}));

const History = ({ setView, customerId }) => {
  const classes = useStyles();
  const [list, setList] = useState(null);
  const getData = () => {
    fetch(`/db/cb/history/${customerId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((res) => {
        setList(res);
      })
      .catch((error) => {
        console.warn('Error:', error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        column="center"
      >
        <Typography variant="h4">
          Bar History
        </Typography>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {list && (list.map((bar, key) => (
          <div key={key}>
            <Grid
              item
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.entry}
              />
              <HistoryList
                key={key}
                list={bar}
                customerId={customerId}
              />
              <hr key={`0${key}`} />
            </Grid>
          </div>
        )))}
      </Grid>
      <Button
        size="small"
        color="primary"
        className={classes.backBtn}
        onClick={() => setView('Home')}
      >
        Back
      </Button>
    </Grid>
  );
};

export default History;
