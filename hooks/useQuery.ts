import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const setParam = useCallback(
    (name: string, value: string) => {
      router.push(`?${createQueryString(name, value)}`);
    },
    [createQueryString, router]
  );

  const getParam = useCallback(
    (name: string) => {
      return searchParams.get(name);
    },
    [searchParams]
  );

  const removeParam = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams);
      params.delete(name);
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return { setParam, getParam, removeParam };
};
