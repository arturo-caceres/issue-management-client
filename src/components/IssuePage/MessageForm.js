import { Button, TextField, Grid } from '@mui/material';
import React, { useState } from 'react';
import useStyles from './styles';
import SendIcon from '@mui/icons-material/Send';
import { createMessage } from '../../apiServices/MessageApi';
import { useGlobalContext } from '../../contextReducer/Context';

export const MessageFormView = ({ issueId, userName, userId, createMessage }) => {
  const { dispatch } = useGlobalContext();
  const data = {
    messageBody: '',
    issueId: issueId,
    userName: userName,
    userId: userId,
  };
  const classes = useStyles();
  const [formData, setFormData] = useState(data);

  const handleSubmit = (event) => {
    event.preventDefault();

    createMessage(formData)
      .then(dispatch({ type: 'INCREASE_COUNTER' }))
      .catch((error) => console.log(error));

    setFormData({ ...formData, messageBody: '' });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Grid>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth={true}
          placeholder="Enter Message"
          multiline
          rows={1}
          name="messageBody"
          label="messageBody"
          hiddenLabel
          value={formData.messageBody}
          onChange={handleChange}
        ></TextField>
        <Button
          size="medium"
          className={classes.sendButton}
          variant="contained"
          type="submit"
          fullWidth
          sx={{ marginTop: 1 }}
        >
          Send Message
          <SendIcon fontSize="small" className={classes.sendIcon} />
        </Button>
      </form>
    </Grid>
  );
};

const MessageForm = (props) => <MessageFormView createMessage={createMessage} {...props}></MessageFormView>
export default MessageForm;
