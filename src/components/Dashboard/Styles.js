import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },

  border: (props) => ({
    border: '3px solid',
    borderColor: props.borderColor,
    height: props.height,
    cursor: props.cursor,
  }),
  modalContiner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
}));
