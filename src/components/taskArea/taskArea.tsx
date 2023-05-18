import { Box, Grid, Alert, LinearProgress } from '@mui/material';
import { FC, ReactElement, useEffect, useContext } from 'react';

import { Task } from '../task/task';
import { TaskCounter } from '../taskCounter/taskCounter';
import { format } from 'date-fns';
import { useMutation, useQuery } from 'react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ITaskApi } from './interfaces/ItaskApi';
import { Status } from '../createTaskForm/enums/Status';
import { IUpdateTask } from './interfaces/IUpdateTask';
import { countTasks } from './helpers/countTasks';
import { TaskStatusChangedContext } from '../../context';

export const TaskArea: FC = (): ReactElement => {
  const { isError, isLoading, data, refetch } = useQuery('tasks', async () => {
    return await sendApiRequest<ITaskApi[]>(
      'http://localhost:3300/tasks',
      'GET',
    );
  });

  const updatedContext = useContext(TaskStatusChangedContext);

  const updateMutation = useMutation((data: IUpdateTask) =>
    sendApiRequest('http://localhost:3300/tasks', 'PUT', data),
  );

  const onStatusChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    updateMutation.mutate({
      id,
      status: e.target.checked ? Status.inProgress : Status.todo,
    });
  };

  const markCompleteHandler = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    updateMutation.mutate({
      id,
      status: Status.completed,
    });
  };

  useEffect(() => {
    refetch();
  }, [updatedContext.updated]);

  useEffect(() => {
    if (updateMutation.isSuccess) {
      updatedContext.toggle();
    }
  }, [updateMutation.isSuccess]);

  return (
    <Grid item md={8} px={4}>
      <Box mb={8} px={4}>
        <h2>Status Of Your Tasks As On {format(new Date(), 'PPPP')}</h2>
      </Box>
      <Grid container display="flex" justifyContent="center">
        <Grid
          item
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          md={10}
          xs={12}
          mb={8}
        >
          <TaskCounter
            status={Status.todo}
            count={data ? countTasks(data, Status.todo) : undefined}
          />
          <TaskCounter
            status={Status.inProgress}
            count={data ? countTasks(data, Status.inProgress) : undefined}
          />
          <TaskCounter
            status={Status.completed}
            count={data ? countTasks(data, Status.completed) : undefined}
          />
        </Grid>
        <Grid item display="flex" flexDirection="column" xs={10} md={8}>
          <>
            {isError && (
              <Alert severity="error">
                There was an error fetching the tasks
              </Alert>
            )}
            {!isError && Array.isArray(data) && data.length === 0 && (
              <Alert severity="warning">No tasks to show</Alert>
            )}
            {isLoading ? (
              <LinearProgress />
            ) : (
              Array.isArray(data) &&
              data.length > 0 &&
              data.map((task, index) => {
                return task.status === Status.todo ||
                  task.status === Status.inProgress ? (
                  <Task
                    key={index + task.priority}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    date={new Date(task.date)}
                    priority={task.priority}
                    status={task.status}
                    onStatusChange={onStatusChangeHandler}
                    onClick={markCompleteHandler}
                  />
                ) : (
                  false
                );
              })
            )}
          </>
        </Grid>
      </Grid>
    </Grid>
  );
};
