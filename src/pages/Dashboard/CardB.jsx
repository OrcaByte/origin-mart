import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import PieChartPaddedAngle from './PieChartPaddedAngle';


export default function CardB() {
  return (
    <Paper className="p-4">
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <PieChartPaddedAngle />
        </Grid>
      </Grid>
    </Paper>
  );
}
