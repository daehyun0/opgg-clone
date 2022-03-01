import rateFormatter from "@/scripts/rateFormatter";

export default {
  getWinRate(winCount: number, loseCount: number) {
    return winCount / (winCount + loseCount);
  },

  getWinRateFormatted(winCount: number, loseCount: number) {
    const winRate = this.getWinRate(winCount, loseCount);
    return rateFormatter.DecimalFormatMinMaxFractionOne(winRate) + "%";
  },
};
