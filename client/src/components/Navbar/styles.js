import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';


export default makeStyles((theme) => ({
  appBar: {
    width: '100%',
    backgroundColor: '#031d2e',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1px 30px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      padding: '4px 20px',
    },
  },
  heading: {
    color: 'white',
    textDecoration: 'none',
    fontFamily:'Trebuchet MS',
    fontSize: '1.9em',
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
    fontSize: 43,
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
    width: '1400px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
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
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'ease 0.2s',
  },
  navbarItems: {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'ease 0.1s',

    '&:hover': {
      transform: 'scale(1.07)',
      color:'#dd2767',
    }
  },
  logout: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '8px',
      paddingRight: '8px',
      minHeight: 0,
      minWidth: 0,
    },
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    transition: 'ease 0.1s',
    '&:hover': {
      transform: 'scale(1.04)',
    }
    
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));