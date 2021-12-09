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

     return event.endDate >= now ? { status: 'active' } : { status: 'inReview' };
  }
}

interface ILoadLastEventRepository {
  loadLastEvent: (input: { groupId: string }) => Promise<{endDate: Date} | undefined>;
}


class LoadLastEventRepositorySpy implements ILoadLastEventRepository{
  groupId?: string;
  callsCount = 0;
  output?: {endDate: Date};

  async loadLastEvent({ groupId }: { groupId: string }): Promise<{endDate: Date} | undefined> {
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

    loadLastEventRepository.output = {
      endDate: new Date(new Date().getTime() + 1),
    };

    const { status } = await sut.perform({ groupId });

    expect(status).toEqual('active');
  });

  it('should return status active when now is equal event end time', async () => {
    const { sut, loadLastEventRepository } = makeSut()

    loadLastEventRepository.output = {
      endDate: new Date(),
    };

    const { status } = await sut.perform({ groupId });

    expect(status).toEqual('active');
  });

  it('should return status active when now is after event end time', async () => {
    const { sut, loadLastEventRepository } = makeSut()

    loadLastEventRepository.output = {
      endDate: new Date(new Date().getTime() - 1),
    };

    const { status } = await sut.perform({ groupId });

    expect(status).toEqual('inReview');
  });
})