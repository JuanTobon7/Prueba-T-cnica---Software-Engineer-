import { SetMetadata } from '@nestjs/common';

export const StatusTask = (...args: string[]) => SetMetadata('status-task', args);

export enum StatusTaskEnum {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}