export default {
  getKdaAverage(kill: number, assist: number, death: number) {
    return ((kill + assist) / death).toFixed(2);
  },
};
