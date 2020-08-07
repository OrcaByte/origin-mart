import React from 'react';
import { makeStyles, useTheme, createStyles } from '@material-ui/core/styles';
import { useHistory, Switch, Route } from 'react-router-dom';
import {
  AppBar,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Avatar,
  Typography,
  Grid,
  Badge,
  ListItemSecondaryAction,
  ListItemText,
  Chip,
} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { NotificationsNoneOutlined } from '@material-ui/icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AppIcon from '../common/AppIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { getPersistStorageValue } from '../utils';
import MenuIcon from '@material-ui/icons/Menu';
import Dashboard from './Dashboard';

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      backgroundColor: 'rgb(238,241,246)',
      color: 'black',
      zIndex: '100',
      boxShadow: theme.shadows[1],
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    menuToolbar: {
      paddingLeft: '16px',
      paddingRight: '16px',
      textAlign: 'left',
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: 'var(--dark-blue)',
      color: 'white',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      backgroundColor: 'rgb(238,241,246)',
      height: '100vh',
      overflowY: 'auto',
    },
  })
);

export default function Homepage(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    if (!getPersistStorageValue('name')) {
      history.replace('/login');
    }
  }, [history]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/',
      component: Dashboard,
    },
  ];

  const drawer = (
    <>
      <div className={`${classes.toolbar} ${classes.menuToolbar}`}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
          <Typography style={{ paddingLeft: '30px' }} component="h5">
            Menu
          </Typography>
        </IconButton>
      </div>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.title}
            onClick={() => {
              history.push(item.path);
            }}
            selected={history.location.pathname === item.path}
            className={
              history.location.pathname === item.path ? 'bg-blue-700' : ''
            }
            button
          >
            <ListItemIcon style={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
            {item.count ? (
              <ListItemSecondaryAction>
                <div
                  style={{ minWidth: 30, height: 27 }}
                  className="rounded-full flex items-center justify-center bg-blue-600 border border-blue-400 px-1"
                >
                  {item.count}
                </div>
              </ListItemSecondaryAction>
            ) : null}
          </ListItem>
        ))}
      </List>
      <Divider />
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid container alignItems="center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <AppIcon width={80} height={57} />
            <IconButton className="ml-auto">
              <Badge
                children={<NotificationsNoneOutlined />}
                badgeContent={4}
                max={99}
                color="primary"
              />
            </IconButton>
            <div className="px-2" />
            <Chip
              avatar={<Avatar>M</Avatar>}
              label="Admin Global"
              clickable
              color="primary"
              onDelete={handleDelete}
              deleteIcon={<ArrowDropDownIcon />}
              variant="outlined"
            />
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="Menu Items">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className="py-8" />
        <Switch>
          {menuItems.map((item) => (
            <Route
              exact
              key={item.title}
              component={item.component}
              path={item.path}
            />
          ))}
        </Switch>
      </main>
    </div>
  );
}
