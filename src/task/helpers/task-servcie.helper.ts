import { TaskStatus } from '../enums/task-status.enum';

export const isValidStatusUpdate = (
  currentStatus: TaskStatus,
  updateStatus: TaskStatus,
) => {
  const taskStatusOrder = [
    TaskStatus.PENDING,
    TaskStatus.IN_PROGRESS,
    TaskStatus.COMPLETED,
  ];
  return (
    taskStatusOrder.indexOf(currentStatus) <=
    taskStatusOrder.indexOf(updateStatus)
  );
};
