function getRankDecimalFormat(rank: number): string {
  return new Intl.NumberFormat("ko-KR").format(rank);
}

function getRankPercentOfTopDecimalFormat(rankPercentOfTop: number): string {
  return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 }).format(
    rankPercentOfTop
  );
}

export default {
  getRankDecimalFormat,
  getRankPercentOfTopDecimalFormat,
};
