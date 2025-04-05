export type PartialField<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type OnlyRequired<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;