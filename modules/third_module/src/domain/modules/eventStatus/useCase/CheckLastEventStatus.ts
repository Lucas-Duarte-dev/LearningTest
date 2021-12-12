import { EventStatus } from './EventStatus';
import { ILoadLastEventRepository } from '../repositories/ILoadLastEventRepository';

class CheckLastEventStatus {
  constructor(private loadLastEventRepository: ILoadLastEventRepository) {

  }

  async perform({ groupId }: { groupId: string }): Promise<EventStatus> {
    const event = await this.loadLastEventRepository.loadLastEvent({ groupId });
    return new EventStatus(event);
  }
}

export {CheckLastEventStatus};