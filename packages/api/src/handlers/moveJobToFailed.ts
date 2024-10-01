import {
  BullBoardRequest,
  ControllerHandlerReturnType,
  QueueJob,
} from '../../typings/app';
import { jobProvider } from '../providers/job';
import { queueProvider } from '../providers/queue';

async function moveJobToFailed(
  _req: BullBoardRequest,
  job: QueueJob
): Promise<ControllerHandlerReturnType> {
  await job.discard();
  await job.moveToFailed({ message: 'Manually moved to failed' });

  return {
    status: 204,
    body: {},
  };
}

export const moveJobToFailedHandler = queueProvider(jobProvider(moveJobToFailed));
