export type ActionReturn<T> = { success: boolean; errors: T } | { success: true, errors?: undefined };
