import { defineStore } from "pinia";
import opggSummonerAPI from "@/scripts/api/opgg-summnoer";

export const useSummonerDetailPageStore = defineStore("summonerDetailPage", {
  state: () => {
    return {
      previousTiers: [],
      profile: {
        profileBorderImageUrl: "",
        profileImageUrl: "",
        nickname: "",
        level: 1,
        rank: 0,
        rankPercentOfTop: 0,
      },
      leagues: [],
      matchSummary: {
        summary: {
          wins: 0,
          losses: 0,
          kills: 0,
          deaths: 0,
          assists: 0,
        },
        champions: [],
        positions: [],
      },
      matches: [],
      champions: [],
      recentWinRates: [],
    };
  },
  actions: {
    async fetchSummoners(summonerName: string) {
      const { data } = await opggSummonerAPI.getSummoner(summonerName);
      this.previousTiers = data.summoner.previousTiers
        .map((previousTier: any) => {
          return {
            season: previousTier.season,
            tier: previousTier.tier,
          };
        })
        .sort((a: any, b: any) => {
          return a.season - b.season;
        });

      this.profile = {
        nickname: data.summoner.name,
        level: data.summoner.level,
        profileBorderImageUrl: data.summoner.profileBorderImageUrl,
        profileImageUrl: data.summoner.profileImageUrl,
        rank: data.summoner.ladderRank.rank,
        rankPercentOfTop: data.summoner.ladderRank.rankPercentOfTop,
      };

      this.leagues = data.summoner.leagues.map((league: any) => {
        return {
          hasResults: league?.hasResults,
          tierImageUrl: league?.tierRank?.imageUrl,
          rankType: league?.tierRank?.name,
          tier: league?.tierRank?.tier,
          division: league?.tierRank?.division,
          tierRankPoint: league?.tierRank?.tierRankPoint,
          winCount: league?.wins,
          loseCount: league?.losses,
        };
      });
    },

    async fetchMatches(summonerName: string) {
      const { data } = await opggSummonerAPI.getMatches(summonerName);
      this.matchSummary = data;

      const matchDetailPromises = data.games.map((game: any) => {
        return opggSummonerAPI.getMatchDetail(summonerName, game.gameId);
      });
      const matchDetails = await Promise.all(matchDetailPromises);
      this.matches = data.games.map((game: any) => {
        return {
          ...game,
          users: matchDetails
            .find(({ data: matchDetail }) => matchDetail.gameId === game.gameId)
            .data.teams.reduce(
              (
                acc: Array<{
                  summonerName: string;
                  championImageUrl: string;
                }>,
                team: any
              ) => {
                return acc.concat(
                  team.players.map((player: any) => {
                    return {
                      summonerName: player.summonerName,
                      championImageUrl: player.champion.imageUrl,
                    };
                  })
                );
              },
              []
            ),
        };
      });
    },

    async fetchMostInfo(summonerName: string) {
      opggSummonerAPI.getMostInfo(summonerName).then(({ data }) => {
        this.champions = data.champions.map((champion: any) => {
          return {
            championName: champion.name,
            cs: champion.cs,
            csPerMinute: champion.cs,
            winCount: champion.wins,
            loseCount: champion.losses,
            kill: champion.kills,
            death: champion.deaths,
            assist: champion.assists,
            championImageUrl: champion.imageUrl,
          };
        });
        this.recentWinRates = data.recentWinRate.map(
          (recentWinRateChampion: any) => {
            return {
              championName: recentWinRateChampion.name,
              championImageUrl: recentWinRateChampion.imageUrl,
              winCount: recentWinRateChampion.wins,
              loseCount: recentWinRateChampion.losses,
            };
          }
        );
      });
    },
  },
});
