const storageKey: string = "history";
const separator = ",";

const getHistoryString = (): string => {
  const historyString = localStorage.getItem(storageKey);
  console.log(historyString);
  if (historyString === null) {
    return "";
  }
  return historyString;
};

const getHistories = (): string[] => {
  const historyString = getHistoryString();
  if (!historyString) {
    return [];
  }
  return JSON.parse(historyString);
};

const addHistory = (nickname: string): void => {
  let histories = getHistories();

  const findHistoryIdx = (
    findNickname: string
  ): { isInclude: boolean; idx: number } => {
    const idx = histories.findIndex(
      (history: string) => history === findNickname
    );
    const isInclude = idx !== -1;
    return {
      isInclude,
      idx,
    };
  };

  const { isInclude, idx: historyIdx } = findHistoryIdx(nickname);

  const newHistory = isInclude ? histories[historyIdx] : nickname;
  const newHistories = isInclude
    ? [
        newHistory,
        ...histories.slice(0, historyIdx),
        ...histories.slice(historyIdx + 1, 0),
      ]
    : [newHistory, ...histories];

  localStorage.setItem(storageKey, JSON.stringify(newHistories));
};

const removeHistory = (nickname: string): void => {
  let newHistories = getHistories().filter(
    (history: string) => history !== nickname
  );
  localStorage.setItem(storageKey, JSON.stringify(newHistories));
};

export default {
  getHistories,
  addHistory,
  removeHistory,
};
