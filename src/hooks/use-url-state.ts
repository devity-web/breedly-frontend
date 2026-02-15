import {useNavigate, useSearch} from '@tanstack/react-router';

export function useUrlState<T = string>(
  key: string,
  defaultValue?: T,
): [T, (value: T) => void] {
  const search = useSearch({strict: false});
  const navigate = useNavigate();

  const value = (search[key] as T) ?? defaultValue;

  const setValue = (newValue: T) => {
    navigate({
      // @ts-expect-error
      search: old => ({
        ...old,
        [key]: newValue,
      }),
      replace: true,
    });
  };

  // @ts-expect-error
  return [value, setValue];
}
