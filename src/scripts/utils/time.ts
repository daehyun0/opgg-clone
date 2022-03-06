import { DateTime, Duration } from "luxon";

export default {
  getAgoString(seconds: number): string {
    return (
      DateTime.fromSeconds(seconds).toRelative() ||
      `Wrong Parameter-seconds: ${seconds}`
    );
  },
  getDurationFromSecond(gameLength: number): string {
    return Duration.fromDurationLike(gameLength * 1000).toFormat("m분 ss초");
  },
};
