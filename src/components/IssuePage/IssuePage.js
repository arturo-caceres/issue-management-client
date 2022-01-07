import { Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Messages from './Messages';
import IssueInfo from './IssueInfo';
import useStyles from './styles';
import { useParams } from 'react-router-dom';
import { getIssue } from '../../apiServices/IssueApi';
import IssueEditForm from './IssueEditForm';
import { useGlobalContext } from '../../contextReducer/Context';
import jwtdecode from 'jwt-decode';
import { getAllMessages } from '../../apiServices/MessageApi';
import Members from './Members';
import { Grid } from '@mui/material';
import { borderTop } from '@mui/system';

const IssuePage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { state, dispatch } = useGlobalContext();
  const { currentUser, assignedIssues } = state;
  const { token } = currentUser;
  const decodedToken = jwtdecode(token);

  const [issue, setIssue] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [issueMembers, setIssueMembers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getIssue(id)
      .then((response) => {
        setIssue(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [id, state.counter]);

  useEffect(() => {
    getAllMessages()
      .then((response) => {
        setMessages(response);
      })
      .catch((error) => console.log(error));
  }, [state.counter]);

  useEffect(() => {
    const currentAssignedIssues = assignedIssues.filter(
      (issue) => issue._id !== id
    );
    dispatch({ type: 'SET_ASSIGNED_ISSUES', data: currentAssignedIssues });
  }, [id]);

  useEffect(() => {
    if (issue.members && state.users.allUsers) {
      const members = state.users.allUsers.filter((user) =>
        issue.members.includes(`${user.firstName} ${user.lastName}`)
      );
      setIssueMembers(members);
    }
  }, [issue, state.users.allUsers]);

  // console.log(issueMembers);

  return (
    <Grid sx={{ marginTop: 14 }}>
      <Typography className={classes.header} variant="h4">
        {issue.title}
      </Typography>

      <Grid container className={classes.container} spacing={2}>
        <Grid item lg={7} md={7} xs={12}>
          <IssueInfo isLoading={isLoading} issue={issue} id={id} />
          <br></br>
          <Members
            issueMembers={issueMembers}
            issue={issue}
            id={id}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item lg={5} md={5} xs={12}>
          <Messages
            isLoading={isLoading}
            messages={messages}
            issueId={id}
            userName={`${currentUser.userDetails.firstName} ${currentUser.userDetails.lastName}`}
            userId={decodedToken.id}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IssuePage;
