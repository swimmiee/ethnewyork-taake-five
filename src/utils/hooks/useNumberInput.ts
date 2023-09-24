import { useState } from "react";

export const useNumberInput = (
  numberishValue: string,
  decimals: number = 18
) => {
  const numberishRegex = new RegExp(
    `^(?:\\d+(?:\\.\\d{0,${decimals}})?|\\.(?:\\d{1,${decimals}})?|)$`
  );
  const [value, _setValue] = useState(numberishValue);

  const setValue = (newValue: string) => {
    if (numberishRegex.test(newValue)) {
      _setValue(newValue);
    } else if (!isNaN(+newValue)) {
      const [num, floats] = newValue.split(".");
      _setValue(`${num}.${floats.slice(0, decimals)}`);
    }
  };

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (numberishRegex.test(newValue)) {
      setValue(newValue);
    }
  };
  return [value, onChangeValue, setValue] as const;
};
