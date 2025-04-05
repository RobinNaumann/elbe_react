/**
 * @see https://stackoverflow.com/questions/53953814/typescript-check-if-a-type-is-a-union/53955431
 */
type IsSingleton<T> = [T] extends [UnionToIntersection<T>] ? true : false;

/**
 * @author https://stackoverflow.com/users/2887218/jcalz
 * @see https://stackoverflow.com/a/50375286/10325032
 */
type UnionToIntersection<Union> = (
  Union extends any ? (argument: Union) => void : never
) extends (argument: infer Intersection) => void
  ? Intersection
  : never;

export type SingletonOnly<T> = IsSingleton<T> extends true ? T : never;
