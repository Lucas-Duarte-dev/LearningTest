
class CheckLastEventStatus {
  constructor(private loadLastEventRepository: ILoadLastEventRepository) {
  }

  async perform(groupId: string): Promise<string> {
    await this.loadLastEventRepository.loadLastEvent(groupId);
    return 'done';
  }
}

interface ILoadLastEventRepository {
  loadLastEvent: (groupId: string) => Promise<undefined>;
}


class LoadLastEventRepositorySpy implements ILoadLastEventRepository{
  groupId?: string;
  callsCount = 0;
  output: undefined

  async loadLastEvent(groupId: string): Promise<undefined> {
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
  it('should get last event data', async () => {
    const { sut, loadLastEventRepository } = makeSut()

    await sut.perform('any_group_id');

    expect(loadLastEventRepository.groupId).toEqual('any_group_id');
    expect(loadLastEventRepository.callsCount).toBe(1);
  });

  it('should return status done when group has no event', async () => {
    const { sut, loadLastEventRepository } = makeSut()

    loadLastEventRepository.output = undefined;

    const status = await sut.perform('any_group_id');

    expect(status).toEqual('done');
  });
})