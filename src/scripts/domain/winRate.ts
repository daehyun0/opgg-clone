import rateFormatter from "@/scripts/rateFormatter";

export default {
  getTotalCount(winCount: number, loseCount: number) {
    return winCount + loseCount;
  },

  getWinRate(winCount: number, loseCount: number) {
    return winCount / this.getTotalCount(winCount, loseCount);
  },

  getWinRateFormatted(winCount: number, loseCount: number) {
    const winRatePercent = this.getWinRate(winCount, loseCount) * 100;
    return rateFormatter.DecimalFormatMinMaxFractionZero(winRatePercent) + "%";
  },
};
