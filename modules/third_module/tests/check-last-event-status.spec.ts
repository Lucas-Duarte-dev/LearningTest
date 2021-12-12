import {set, reset} from 'mockdate';
import { CheckLastEventStatus } from '../src/domain/modules/eventStatus/useCase/CheckLastEventStatus';
import { makeSut } from '../src/infra/factory/makeSut';

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