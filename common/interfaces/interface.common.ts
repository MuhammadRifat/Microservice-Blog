export interface IApiResponse<T> {
    success: boolean,
    page?: object,
    data: T
}