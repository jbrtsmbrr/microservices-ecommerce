import IPaymentLogsRepository from "../../application/persistence/IPaymentLogsRepository";

export default class PaymentLogsRepository implements IPaymentLogsRepository {
  save(): Promise<void> {
    return Promise.resolve();
  }
}