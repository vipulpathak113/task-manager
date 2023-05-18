import {
  Box,
  Stack,
  Typography,
  Alert,
  LinearProgress,
  Button,
  AlertTitle,
} from '@mui/material';
import { FC, ReactElement, useState, useEffect, useContext } from 'react';

import { Priority } from './enums/Priority';
import { Status } from './enums/Status';
import { TaskDateField } from './_taskDateField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskSelectField } from './_taskSelectField';
import { TaskTitleField } from './_taskTitleField';
import { useMutation } from 'react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ICreateTask } from '../taskArea/interfaces/ICreateTask';
import { TaskStatusChangedContext } from '../../context';

export const CreateTaskForm: FC = (): ReactElement => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [status, setStatus] = useState<Status>(Status.todo);
  const [priority, setPriority] = useState<Priority>(Priority.normal);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const createTaskMutation = useMutation((data: ICreateTask) =>
    sendApiRequest('http://localhost:3300/tasks', 'POST', data),
  );

  const createTaskHandler = () => {
    if (!title || !description || !date) return;
    const task: ICreateTask = {
      title,
      description,
      date: date.toString(),
      status,
      priority,
    };
    createTaskMutation.mutate(task);
  };

  const updatedTask = useContext(TaskStatusChangedContext);

  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      setShowSuccess(true);
      updatedTask.toggle();
    }

    const successTimeout = setTimeout(() => {
      setShowSuccess(false);
    }, 7000);

    () => {
      clearTimeout(successTimeout);
    };
  }, [createTaskMutation.isSuccess]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      my={6}
    >
      {showSuccess && (
        <Alert severity="success" sx={{ width: '100%', marginBottom: '16px' }}>
          <AlertTitle>Success</AlertTitle>
          The task has been created successfully
        </Alert>
      )}
      <Typography mb={2} component="h2" variant="h6">
        Create A Task
      </Typography>

      <Stack sx={{ width: '100%' }} spacing={2}>
        <TaskTitleField onChange={(e) => setTitle(e.target.value)} />
        <TaskDescriptionField
          disabled={createTaskMutation.isLoading}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TaskDateField
          value={date}
          disabled={createTaskMutation.isLoading}
          onChange={(date) => setDate(date as Date)}
        />

        <Stack sx={{ width: '100%' }} direction="row" spacing={2}>
          <TaskSelectField
            label="Status"
            name="status"
            disabled={createTaskMutation.isLoading}
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            items={[
              {
                value: Status.todo,
                label: Status.todo.toUpperCase(),
              },
              {
                value: Status.inProgress,
                label: Status.inProgress.toUpperCase(),
              },
            ]}
          />
          <TaskSelectField
            label="Priority"
            disabled={createTaskMutation.isLoading}
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            items={[
              {
                value: Priority.low,
                label: Priority.low,
              },
              {
                value: Priority.normal,
                label: Priority.normal,
              },
              {
                value: Priority.high,
                label: Priority.high,
              },
            ]}
          />
        </Stack>
        {createTaskMutation.isLoading && <LinearProgress />}
        <Button
          disabled={!title || !description || !date || !priority || !status}
          onClick={createTaskHandler}
          variant="contained"
          size="large"
          fullWidth
        >
          CREATE A TASK
        </Button>
      </Stack>
    </Box>
  );
};
