import { RefObject, useCallback, useEffect, useState } from "react";

type EventType = MouseEvent | TouchEvent;

export const useClickOutside = (
  refContainer: RefObject<HTMLDivElement | null>
) => {
  const [isOpen, setIsopen] = useState(false);

  const handleClickOutside = useCallback(
    (events: EventType) => {
      if (
        refContainer.current &&
        !refContainer.current.contains(events.target as Node)
      ) {
        setIsopen(false);
      }
    },
    [refContainer]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [refContainer, isOpen, handleClickOutside]);

  return { isOpen, setIsopen };
};
