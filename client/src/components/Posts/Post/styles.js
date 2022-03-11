import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
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
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    backgroundColor: '#f7f8fc',
    display: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    minHeight: '60%',
    width: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '260px',
    right: '10px',
    color: 'black',
    maxWidth: '180px',
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      top: 'auto',
    },
  },
  overlay2: {
    position: 'absolute',
    top: '10px',
    right: '1px',
    color: 'white',
  },
  overlay3: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: 'black',
    maxWidth: '180px',
    [theme.breakpoints.down('md')]: {
      maxWidth: '140px',
    },
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '10px',
    maxWidth: '130px',
  },
  title: {
    padding: '10px 15px 0px 15px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));