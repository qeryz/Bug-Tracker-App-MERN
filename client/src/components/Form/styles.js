
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '95%',
    margin: '10px 0px 10px 0px',
    display:'flex',
    justifyContent: 'space-between',
  },
  [theme.breakpoints.down('sm')]: {
    display:'flex',
    flexDirection: 'column',
  },
  priority: {
    width: '40%',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '65%',
    },
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));