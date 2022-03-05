import axios, { AxiosInstance } from "axios";
import url from "@/scripts/api/url";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${url.OPGG_SUMMONER_API_BASEURL}/api/summoner`,
});

const getSummoner = (summonerName: String) => {
  return axiosInstance.get(`/${summonerName}`);
};

const getMatches = (summonerName: string) => {
  return axiosInstance.get(`/${summonerName}/matches`);
};

const getMatchDetail = (summonerName: String, gameId: string) => {
  return axiosInstance.get(`/${summonerName}/matchDetail/${gameId}`);
};

const getMostInfo = (summonerName: string): Promise<any> => {
  return axiosInstance.get(`/${summonerName}/mostInfo`);
};

export default {
  getSummoner,
  getMatches,
  getMatchDetail,
  getMostInfo,
};
