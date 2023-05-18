import { ITaskApi } from '../interfaces/ItaskApi';
import { TaskCounterStatusType } from '../../taskCounter/interfaces/ITaskCounter';

export function countTasks(tasks: ITaskApi[], status: TaskCounterStatusType) {
  if (!Array.isArray(tasks)) return 0;

  return tasks.filter((task) => task.status === status).length;
}
