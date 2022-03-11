import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';


export default makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#031d2e',
    borderRadius: 15,
    margin: '25px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 50px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  heading: {
    color: 'white',
    textDecoration: 'none',
    fontFamily:'Trebuchet MS',
    fontSize: '2em',
    fontWeight:'400',
  },
  subheading: {
    color: 'white',
    textDecoration: 'none',
    fontFamily:'Trebuchet MS',
    fontSize: '1em',
    fontWeight:'400',
  },
  image: {
    color:'#c6282e',
    fontSize: 50,
    marginLeft: '5px',
  },
  subimage: {
    color:'white',
    fontSize: 25,
    marginLeft: '5px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '270px',
    // [theme.breakpoints.down('sm')]: {
    //   width: 'auto',
    //   marginTop: 20,
    //   justifyContent: 'center',
    // },
  },
  userName: {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center'
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));