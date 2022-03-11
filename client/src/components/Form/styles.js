
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
    margin: '15px 0px ',
    display:'flex',
    justifyContent: 'left',
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