import { useCallback, useState } from "react";

export default function useBool(initialValue) {
  const [value, setValue] = useState(initialValue);

  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((p) => !p), []);

  return [value, { on, off, toggle }];
}
