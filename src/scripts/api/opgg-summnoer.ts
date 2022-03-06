import axios, { AxiosInstance, AxiosResponse } from "axios";
import url from "@/scripts/api/url";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${url.OPGG_SUMMONER_API_BASEURL}/api/summoner`,
});

const getSummoner = (summonerName: String): Promise<AxiosResponse> => {
  return axiosInstance.get(`/${summonerName}`);
};

const getMatches = (summonerName: string): Promise<AxiosResponse> => {
  return axiosInstance.get(`/${summonerName}/matches`);
};

const getMatchDetail = (
  summonerName: String,
  gameId: string
): Promise<AxiosResponse> => {
  return axiosInstance.get(`/${summonerName}/matchDetail/${gameId}`);
};

const getMostInfo = (summonerName: string): Promise<AxiosResponse> => {
  return axiosInstance.get(`/${summonerName}/mostInfo`);
};

export default {
  getSummoner,
  getMatches,
  getMatchDetail,
  getMostInfo,
};
