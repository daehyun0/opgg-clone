import axios, { AxiosInstance } from "axios";
import url from "@/scripts/api/url";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${url.OPGG_SUMMONER_API_BASEURL}/api/summoner`,
});

const getSummoner = (summonerName: String) => {
  return axiosInstance.get(`/${summonerName}`);
};

export default {
  getSummoner,
};
