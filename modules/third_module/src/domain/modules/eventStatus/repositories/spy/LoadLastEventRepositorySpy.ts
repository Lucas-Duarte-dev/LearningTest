import { ILoadLastEventRepository } from '../ILoadLastEventRepository';

class LoadLastEventRepositorySpy implements ILoadLastEventRepository{
  groupId?: string;
  callsCount = 0;
  output?: {endDate: Date, reviewDurationInHours: number};

  setEndDateAfterNow(): void {
    this.output = {
      endDate: new Date(new Date().getTime() + 1),
      reviewDurationInHours: 1
    };
  }

  setEndDateEqualToNow(): void {
    this.output = {
      endDate: new Date(),
      reviewDurationInHours: 1
    };
  }

  setEndDateBeforeNow(): void {
    this.output = {
      endDate: new Date(new Date().getTime() - 1),
      reviewDurationInHours: 1
    };
  }

  setEndDateBeforeReviewDate(): void {
    const reviewDurationInHours = 1;
    const reviewDurationInMs = reviewDurationInHours * 60 * 60  * 1000;

    this.output = {
      endDate: new Date(new Date().getTime() - reviewDurationInMs + 1),
      reviewDurationInHours
    };
  }

  setEndDateAfterReviewDate(): void {
    const reviewDurationInHours = 1;
    const reviewDurationInMs = reviewDurationInHours * 60 * 60  * 1000;

    this.output = {
      endDate: new Date(new Date().getTime() - reviewDurationInMs - 1),
      reviewDurationInHours
    };
  }

  async loadLastEvent({ groupId }: { groupId: string }): Promise<{endDate: Date, reviewDurationInHours: number} | undefined> {
    this.groupId = groupId;
    this.callsCount++;

    return this.output;
  }
}

export {LoadLastEventRepositorySpy};