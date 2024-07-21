export type ControllerReturn<T> = { data: T; error?: undefined } | { data?: undefined; error: string };
