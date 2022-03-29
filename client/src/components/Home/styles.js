import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
  homeContainer: {
    paddingTop: '1.3rem',
    [theme.breakpoints.down('md')]: {
      paddingTop: '1rem',
    },
  },
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '2rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    backgroundColor: '#f7f8fc',
    borderRadius: 4,
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '8px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '0rem',
    },
    "& .MuiPaginationItem-root": {
      borderColor: "#3F51B5",
      color: '#3F51B5'
    },
    "& .MuiButtonBase-root": {
      backgroundColor: "rgba(63,81,181,0)",
    }
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
}));
