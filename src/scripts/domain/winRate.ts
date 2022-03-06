import rateFormatter from "@/scripts/utils/rateFormatter";

export default {
  getTotalCount(winCount: number, loseCount: number): number {
    return winCount + loseCount;
  },

  getWinRate(winCount: number, loseCount: number): number {
    return winCount / this.getTotalCount(winCount, loseCount);
  },

  getWinRatePercent(winCount: number, loseCount: number): string {
    if (winCount + loseCount === 0) {
      return "0";
    }
    const winRate = this.getWinRate(winCount, loseCount) * 100;
    return rateFormatter.DecimalFormatMinMaxFractionZero(winRate);
  },

  getWinRateFormatted(winCount: number, loseCount: number): string {
    const winRatePercent = this.getWinRatePercent(winCount, loseCount);
    const winRatePercentNumber = Number(winRatePercent);
    return (
      rateFormatter.DecimalFormatMinMaxFractionZero(winRatePercentNumber) + "%"
    );
  },
};
