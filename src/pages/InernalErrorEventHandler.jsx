import React from 'react';
import { listenInternalEvent, clearStorage } from '../utils';
import { Subscription } from 'rxjs';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);
// it it supposed to place inside
// BrowserRouter from 'react-router-dom';
export default function InernalErrorEventHandler(props) {
  const classes = useStyles();
  const subscription = new Subscription();
  const history = useHistory();
  const [showCircularProgressBar, setShowCircularProgressBar] = React.useState(
    false
  );
  React.useEffect(() => {
    subscription.add(
      listenInternalEvent('Invalid SessionId', (value) => {
        clearStorage();
        history.replace('/login');
        toast.error('Invalid SessionId');
      })
    );
    subscription.add(
      listenInternalEvent('alert_toast', (value) => {
        toast.error(value);
      })
    );

    // add show progressBar
    subscription.add(
      listenInternalEvent('circularProgressBar', setShowCircularProgressBar)
    );

    return () => subscription.unsubscribe();
  }, []);
  return (
    <>
      <Backdrop
        className={classes.backdrop}
        open={showCircularProgressBar}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer limit={3} pauseOnHover />
    </>
  );
}
