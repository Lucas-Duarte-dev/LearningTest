import {set, reset} from 'mockdate';

type EventStatus = {
  status: string
}

class CheckLastEventStatus {
  constructor(private loadLastEventRepository: ILoadLastEventRepository) {
  }

  async perform({ groupId }: { groupId: string }): Promise<EventStatus> {
    const event = await this.loadLastEventRepository.loadLastEvent({ groupId });

    if(event === undefined) return { status: 'done' };

    const now = new Date();

     if (event.endDate >= now) return { status: 'active' };

     const reviewDurationInMs = event.reviewDurationInHours * 60 * 60 * 1000;

     const reviewDate = new Date(event.endDate.getTime() + reviewDurationInMs);

     return reviewDate >= now ? { status: 'inReview' } : { status: 'done' };
  }
}

interface ILoadLastEventRepository {
  loadLastEvent: (input: { groupId: string }) => Promise<{endDate: Date, reviewDurationInHours: number} | undefined>;
}


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

type SutAttributes = {
  sut: CheckLastEventStatus,
  loadLastEventRepository: LoadLastEventRepositorySpy
}

const makeSut = (): SutAttributes => {
  const loadLastEventRepository = new LoadLastEventRepositorySpy();
  const sut = new CheckLastEventStatus(loadLastEventRepository);

  return {sut, loadLastEventRepository}
}

describe('CheckLastEventStatus', () => {
  const groupId = 'any_group_id';

  beforeAll(() => {
    set(new Date())
  });

  afterAll(() => {
    reset()
  })

  it('should get last event data', async () => {
    const { sut, loadLastEventRepository } = makeSut()

    await sut.perform({ groupId });

    expect(loadLastEventRepository.groupId).toEqual('any_group_id');
    expect(loadLastEventRepository.callsCount).toBe(1);
  });

  it('should return status done when group has no event', async () => {
    const { sut, loadLastEventRepository } = makeSut()

    loadLastEventRepository.output = undefined;

    const { status } = await sut.perform({ groupId });

    expect(status).toEqual('done');
  });

  it('should return status active when now is before event end time', async () => {
    const { sut, loadLastEventRepository } = makeSut()

    loadLastEventRepository.setEndDateAfterNow();

    const { status } = await sut.perform({ groupId });

    expect(status).toEqual('active');
  });

  it('should return status inReview when now is before review time', async () => {
    const { sut, loadLastEventRepository } = makeSut()

    loadLastEventRepository.setEndDateAfterNow();

    const { status } = await sut.perform({ groupId });

    expect(status).toEqual('active');
  });

  it('should return status active when now is equal event end time', async () => {
    const { sut, loadLastEventRepository } = makeSut()

    loadLastEventRepository.setEndDateEqualToNow();

    const { status } = await sut.perform({ groupId });

    expect(status).toEqual('active');
  });

  it('should return status inReview when now is after event end time', async () => {


    const { sut, loadLastEventRepository } = makeSut()

    loadLastEventRepository.setEndDateBeforeReviewDate();

    const { status } = await sut.perform({ groupId });

    expect(status).toEqual('inReview');
  });

  it('should return status inReview when now is equal to review time', async () => {
    const { sut, loadLastEventRepository } = makeSut()

    loadLastEventRepository.setEndDateBeforeReviewDate();

    const { status } = await sut.perform({ groupId });

    expect(status).toEqual('inReview');
  });

  it('should return status done when now is after review time', async () => {
    const { sut, loadLastEventRepository } = makeSut()

    loadLastEventRepository.setEndDateAfterReviewDate();

    const { status } = await sut.perform({ groupId });

    expect(status).toEqual('done');
  });
});