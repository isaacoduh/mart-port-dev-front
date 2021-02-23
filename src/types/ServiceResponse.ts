export interface IServiceResponse<T> {
  isSuccess: boolean;
  message: true;
  time: Date;
  data: T;
}
