import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import StackedAreaChart from './StackedAreaChart';
export default function RevenueCard() {
  return (
    <Paper className="p-4">
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={4}>
          <Typography>Revenue</Typography>
        </Grid>

        <Grid item xs={8}>
          <StackedAreaChart />
        </Grid>
      </Grid>
    </Paper>
  );
}
