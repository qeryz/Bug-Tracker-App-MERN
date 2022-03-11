import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
  media: {
    borderRadius: '10px',
    objectFit: 'cover',
    width: '80%',
    maxHeight: '600px',

  },
  card: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    width: '90%',
  },

  imageSection: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    padding: '20px',
  },
  loadingPaper: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '20px', 
    borderRadius: '15px', 
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex', 
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  commentsInnerContainer: {
    height: '250px',
    width: '100%',
    overflowY: 'auto',
    marginRight: '30px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));