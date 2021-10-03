import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  bar: {
    width: "50%",
    margin: "auto",
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const handleLoginButton = () => {
    props.handleLoginDialogState(true);
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.bar}>
        <Typography variant="h6" className={classes.title}>
          JS testing site
        </Typography>
        {!props.userName ? (
          <Button color="inherit" onClick={handleLoginButton}>
            Login
          </Button>
        ) : (
          <Typography> Logged as {props.userName} </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
