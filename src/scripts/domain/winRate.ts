import rateFormatter from "@/scripts/rateFormatter";

export default {
  getTotalCount(winCount: number, loseCount: number) {
    return winCount + loseCount;
  },

  getWinRate(winCount: number, loseCount: number) {
    return winCount / this.getTotalCount(winCount, loseCount);
  },

  getWinRatePercent(winCount: number, loseCount: number) {
    return this.getWinRate(winCount, loseCount) * 100;
  },

  getWinRateFormatted(winCount: number, loseCount: number) {
    const winRatePercent = this.getWinRatePercent(winCount, loseCount);
    return rateFormatter.DecimalFormatMinMaxFractionZero(winRatePercent) + "%";
  },
};
