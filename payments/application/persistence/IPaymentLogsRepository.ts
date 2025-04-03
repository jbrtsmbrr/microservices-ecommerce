export default interface IPaymentLogsRepository {
  save(): Promise<void>;
}