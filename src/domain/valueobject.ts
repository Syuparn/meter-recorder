export function toValueObject<TPrimitive, TVO extends TPrimitive>(
  primitive: TPrimitive,
): TVO {
  let vo: TVO;
  vo = primitive as any;
  return vo;
}

export function fromValueObject<TVO extends TPrimitive, TPrimitive>(
  vo: TVO,
): TPrimitive {
  return vo;
}
