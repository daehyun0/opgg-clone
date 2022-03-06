export default {
  DecimalFormatMaxFractionOne(number: number): string {
    return new Intl.NumberFormat("ko-KR", {
      maximumFractionDigits: 1,
    }).format(number);
  },

  DecimalFormatMinMaxFractionOne(number: number): string {
    return new Intl.NumberFormat("ko-KR", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(number);
  },

  DecimalFormatMinMaxFractionZero(number: number): string {
    return new Intl.NumberFormat("ko-KR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  },
};
