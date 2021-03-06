export default {
  getKdaSingleFormatted(value: number): string {
    return value.toFixed(1);
  },

  getKdaAverage(kill: number, assist: number, death: number): string {
    return ((kill + assist) / death).toFixed(2);
  },
};
