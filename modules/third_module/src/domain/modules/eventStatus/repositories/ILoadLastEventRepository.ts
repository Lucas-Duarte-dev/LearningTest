export interface ILoadLastEventRepository {
  loadLastEvent: (input: { groupId: string }) => Promise<{endDate: Date, reviewDurationInHours: number} | undefined>;
}
