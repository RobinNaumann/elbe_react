export type ElbeColor<
  T extends string,
  Data extends Dict<any>,
  Computed extends Dict<any>
> = {
  type: [T, ...string[]];
} & Data &
  Computed;

export function defineColor<
  Name extends string,
  Data extends Dict<any>,
  Computed extends Dict<any>,
  Parent extends Dict<any>,
  T extends ElbeColor<Name, Data, Omit<Computed & Parent, "type">>,
  Static extends Dict<any> = {}
>(p: {
  type: Name;
  static: Static;
  compute: (data: Data) => Computed;
  parent: (data: Data) => Parent;
}): {
  is: (v: any) => v is T;
  new: (data: Data) => T;
  _typeHint: { color: T; data: Data };
} & Static {
  function _new(data: Data): T {
    const comp = p.compute(data);
    const parent = p.parent(data);

    return {
      ...data,
      ...comp,
      ...parent,
      type: [p.type, ...(parent.type ?? [])],
    } as any as T;
  }

  function is(v: any): v is T {
    return (
      v &&
      typeof v === "object" &&
      v.type &&
      Array.isArray(v.type) &&
      (v.type as any[]).includes(p.type)
    );
  }

  return {
    is,
    new: _new,
    _typeHint: {
      color: undefined as unknown as T,
      data: undefined as unknown as Data,
    },
    ...p.static,
  };
}

export type ColorDataKeys<T extends { _typeHint: { data: Dict<any> } }> =
  keyof T["_typeHint"]["data"];

export function withoutType<T extends Dict<any>>(obj: T): Omit<T, "type"> {
  const { type, ...rest } = obj;
  return rest;
}
