import { Priority } from '../../createTaskForm/enums/Priority';
import { Status } from '../../createTaskForm/enums/Status';

export interface ITaskApi {
  id: string;
  title: string;
  description: string;
  date: string;
  priority: `${Priority}`;
  status: `${Status}`;
}
