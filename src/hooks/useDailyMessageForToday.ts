import { useMemo } from "react";
import {
  DailyMessageId,
  ROLE_DAILY_MESSAGES
} from "../data/dailyMessages";

export const useDailyMessageForToday = (
  role: "investigator" | "member" | "missionary" = "investigator"
): DailyMessageId => {
  return useMemo(() => {
    const list = ROLE_DAILY_MESSAGES[role] ?? [];

    if (list.length === 0) {
      return "comfortBurdened";
    }

    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff =
      today.getTime() -
      startOfYear.getTime() +
      (startOfYear.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

    const index = dayOfYear % list.length;
    return list[index];
  }, [role]);
};

