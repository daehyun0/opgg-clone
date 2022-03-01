function getRankDecimalFormat(rank: number) {
  return new Intl.NumberFormat("ko-KR").format(rank);
}

function getRankPercentOfTopDecimalFormat(rankPercentOfTop: number) {
  return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 }).format(
    rankPercentOfTop
  );
}

export default {
  getRankDecimalFormat,
  getRankPercentOfTopDecimalFormat,
};
