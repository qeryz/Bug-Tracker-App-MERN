import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
  postContainer: {
    width: '100%',
    paddingTop: '5.1rem',
  },
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
    padding: '160px', 
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
    marginTop: '0.5rem',
    height: '250px',
    width: '100%',
    overflowY: 'auto',
    marginRight: '30px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  greenOutline: {
    borderColor: '#66bb6a',
    color: '#66bb6a',
  },
  redOutline: {
    borderColor: '#f44336',
    color: '#f44336',
  },
  orangeOutline: {
    borderColor: '#ffa726',
    color: '#ffa726',
  },
  redFilled: {
    borderColor: '#d32f2f',
    backgroundColor: '#d32f2f',
    color: '#f7f8fc',
  },
  orangeFilled: {
    borderColor: '#ffa726',
    backgroundColor: '#ffa726',
    color: '#f7f8fc',
  },
  greenFilled: {
    borderColor: '#66bb6a',
    backgroundColor: '#66bb6a',
    color: '#f7f8fc',
  },
  blueFilled: {
    borderColor: '#29b6f6',
    backgroundColor: '#29b6f6',
    color: '#f7f8fc',
  },
  lightBlueFilled: {
    borderColor: '#90caf9',
    backgroundColor: '#90caf9',
    color: '#f7f8fc',
  },
}));