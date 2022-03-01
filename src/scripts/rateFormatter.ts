export default {
  DecimalFormatMaxFractionOne(number: number) {
    return new Intl.NumberFormat("ko-KR", {
      maximumFractionDigits: 1,
    }).format(number);
  },

  DecimalFormatMinMaxFractionOne(number: number) {
    return new Intl.NumberFormat("ko-KR", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(number);
  },
};
