import rateFormatter from "@/scripts/utils/rateFormatter";

export default {
  getTotalCount(winCount: number, loseCount: number) {
    return winCount + loseCount;
  },

  getWinRate(winCount: number, loseCount: number) {
    return winCount / this.getTotalCount(winCount, loseCount);
  },

  getWinRatePercent(winCount: number, loseCount: number) {
    if (winCount + loseCount === 0) {
      return 0;
    }
    const winRate = this.getWinRate(winCount, loseCount) * 100;
    return rateFormatter.DecimalFormatMinMaxFractionZero(winRate);
  },

  getWinRateFormatted(winCount: number, loseCount: number) {
    const winRatePercent = this.getWinRatePercent(winCount, loseCount);
    return rateFormatter.DecimalFormatMinMaxFractionZero(winRatePercent) + "%";
  },
};
