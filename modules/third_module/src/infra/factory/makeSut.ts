import { LoadLastEventRepositorySpy } from '../../domain/modules/eventStatus/repositories/spy/LoadLastEventRepositorySpy';
import { CheckLastEventStatus } from '../../domain/modules/eventStatus/useCase/CheckLastEventStatus';

type SutAttributes = {
  sut: CheckLastEventStatus,
  loadLastEventRepository: LoadLastEventRepositorySpy
}

export const makeSut = (): SutAttributes => {
  const loadLastEventRepository = new LoadLastEventRepositorySpy();
  const sut = new CheckLastEventStatus(loadLastEventRepository);

  return {sut, loadLastEventRepository}
}
