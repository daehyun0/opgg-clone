export default {
  getSelectRate(selectCount: number, totalCount: number) {
    return selectCount / totalCount;
  },

  getSelectRatePercent(selectCount: number, totalCount: number): number {
    const selectRatePercent = this.getSelectRate(selectCount, totalCount) * 100;
    return Number.parseFloat(selectRatePercent.toFixed(2));
  },
};
