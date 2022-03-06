<script setup lang="ts">
import Colors from "@/scripts/colors";
import Card from "@/components/Card.vue";
import { computed } from "vue";
import Divider from "@/components/Divider.vue";
import time from "@/scripts/utils/time";
import getWinString from "@/scripts/domain/getWinString";
import SpellImage from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchDetail/MatchDetailCardSpellImage.vue";
import PerkImage from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchDetail/MatchDetailPerkImage.vue";
import ItemImage from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchDetail/MatchDetailItemImage.vue";
import WinWardImage from "@/assets/images/icon-ward-blue.png";
import LoseWardImage from "@/assets/images/icon-ward-red.png";
import KillMessageTag from "@/pages/SummonerDetailPage/components/RankAndMatchSection/MatchSection/MatchDetail/KillMessageTag.vue";
import WinExpandImage from "@/assets/images/icon-viewdetail-blue.png";
import LoseExpandImage from "@/assets/images/icon-viewdetail-red.png";
import SquareImage from "@/components/SquareImage.vue";
import CircleImage from "@/components/CircleImage.vue";

const props = withDefaults(
  defineProps<{
    gameType: string;
    matchCreatedTime: number;
    isWin: boolean;
    gameLength: number;
    championImageUrl: string;
    spellImageUrls: string[];
    perkImageUrls: string[];
    championName: string;
    kill: number;
    death: number;
    assist: number;
    largestMultiKillString: string;
    opScoreBadge: string;
    level: number;
    cs: number;
    csPerMinute: number;
    contributionForKillRateString: string;
    items: any[];
    users: any[];
    kdaRatioString: string;
    visionWardBought: string;
  }>(),
  {
    items: () => {
      return [];
    },
    users: () => {
      return [];
    },
  }
);

const emit = defineEmits<{
  (
    e: "MouseOverItem",
    event: { target: HTMLInputElement },
    itemId: string
  ): void;
  (e: "MouseOutItem"): void;
}>();

const gameLengthString = computed(() => {
  return time.getDurationFromSecond(props.gameLength);
});

const gameResultString = computed(() => {
  return getWinString(props.isWin);
});

const gamePlayedTimeString = computed(() => {
  return time.getAgoString(props.matchCreatedTime);
});

const itemsWithEmptySlot = computed((): any[] => {
  const getItemIdFromUrl = (url: string): string => {
    if (!url) {
      return "";
    }

    const imageFilename = url.split("/").slice(-1)[0];
    return imageFilename.split(".")[0];
  };

  const lastSlotIdx = 7;
  return props.items
    .concat([{}, {}, {}, {}, {}, {}, {}, {}])
    .slice(0, 8)
    .map((slot: any, idx: number) => {
      if (idx === lastSlotIdx) {
        return {
          ...slot,
          isDisabled: true,
          id: getItemIdFromUrl(slot.imageUrl),
        };
      }
      return {
        ...slot,
        id: getItemIdFromUrl(slot.imageUrl),
      };
    });
});

const winClassName = computed(() => {
  return props.isWin ? "win" : "lose";
});

const wardImage = computed(() => {
  return props.isWin ? WinWardImage : LoseWardImage;
});

const ExpandImage = computed(() => {
  return props.isWin ? WinExpandImage : LoseExpandImage;
});

const handleMouseOverImage = (
  event: { target: HTMLInputElement },
  itemId: string
) => {
  emit("MouseOverItem", event, itemId);
};

const handleMouseOutImage = () => {
  emit("MouseOutItem");
};
</script>

<template>
  <Card class="match-detail-card-root">
    <div class="match-summary" :class="winClassName">
      <div class="game-result">
        <div class="game-type">{{ gameType }}</div>
        <div class="game-created-time">{{ gamePlayedTimeString }}</div>
        <divider class="divider" :class="winClassName"></divider>
        <div class="result">{{ gameResultString }}</div>
        <div class="game-length">{{ gameLengthString }}</div>
      </div>
      <div class="champion-and-spell-rune">
        <div class="graphic">
          <CircleImage
            class="champion"
            :image-url="championImageUrl"
            :size="46"
          />
          <div class="spell">
            <SpellImage
              v-for="spellImageUrl in spellImageUrls"
              :key="spellImageUrl.imageUrl"
              :image-url="spellImageUrl.imageUrl"
            />
          </div>
          <div class="perk">
            <PerkImage
              :image-url="perkImageUrl"
              v-for="perkImageUrl in perkImageUrls"
              :key="perkImageUrl"
              :width="22"
              :height="22"
            ></PerkImage>
          </div>
        </div>
        <div class="champion-name">{{ championName }}</div>
      </div>
      <div class="game-kda">
        <div class="kda">
          <span class="kill">{{ kill }}</span>
          <span> / </span>
          <span class="death">{{ death }}</span>
          <span> / </span>
          <span class="assist">{{ assist }}</span>
        </div>

        <div class="kda-average">
          <span class="value">{{ kdaRatioString }}</span>
          <span> 평점</span>
        </div>

        <div class="badge">
          <KillMessageTag
            class="multikill-tag"
            v-if="largestMultiKillString"
            type="multikill"
            :title="largestMultiKillString"
          />
          <KillMessageTag
            class="annihilation-tag"
            v-if="opScoreBadge"
            :title="opScoreBadge"
            type="annihilation"
          />
        </div>
      </div>
      <div class="level-and-cs">
        <div class="level">레벨{{ level }}</div>
        <div class="cs">
          <span class="cs">{{ cs }}</span>
          <span class="cs-per-minute"> ({{ csPerMinute }})</span>
          <span> CS</span>
        </div>
        <div class="contribution-for-kill-rate">
          킬관여 {{ contributionForKillRateString }}
        </div>
      </div>
      <div class="items-and-ward">
        <ul class="items">
          <li
            class="item"
            v-for="item in itemsWithEmptySlot"
            :class="winClassName"
          >
            <ItemImage
              :item-id="item.id"
              :image-url="item.imageUrl"
              :is-win="isWin"
              :is-disabled="item.isDisabled"
              :size="22"
              @MouseOverItem="handleMouseOverImage"
              @MouseOutItem="handleMouseOutImage"
            />
          </li>
        </ul>
        <div class="ward">
          <img class="symbol" :src="wardImage" />
          <span class="vision-ward-count"
            >제어 와드 {{ visionWardBought }}</span
          >
        </div>
      </div>
      <div class="with-player">
        <ul class="users">
          <li class="user" v-for="user in users">
            <SquareImage :image-url="user.championImageUrl" :size="16" />
            <span>{{ user.summonerName }}</span>
          </li>
        </ul>
      </div>
    </div>
    <button class="btn-show-detail" :class="winClassName">
      <img :src="ExpandImage" />
    </button>
  </Card>
</template>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.match-detail-card-root {
  height: 96px;
  box-sizing: border-box;
  border-radius: 0;
  border: none;
  @include flexRow(flex-start, stretch);

  & > .match-summary {
    flex: 1 1 100%;
    padding: 3px 0 3px;
    @include flexRow(flex-start, center);

    & > .game-result {
      font-size: 11px;
      font-weight: bold;
      text-align: center;
      flex: 0 0 70px;
      color: v-bind("Colors.greyishBrown");

      & > .game-created-time {
        font-weight: normal;
      }

      & > .game-type + .game-created-time {
        margin-top: 4px;
      }

      & > .game-created-time + .divider {
        margin-top: 3px;
      }

      & > .divider {
        width: 27px;
        margin: 0 auto;
      }

      & > .divider.win {
        background-color: v-bind("Colors.lightGreyBlueTwo");
      }

      & > .divider.lose {
        background-color: v-bind("Colors.pinkishGreyThree");
      }

      & > .divider + .result {
        margin-top: 3px;
      }

      & > .game-length {
        font-size: 12px;
      }

      & > .result + .game-length {
        margin-top: 4px;
      }
    }

    & > .champion-and-spell-rune {
      flex: 0 0 100px;

      & > .graphic {
        @include flexRow(flex-start, center);

        & > .spell {
          @include flexCol(flex-start, flex-start);

          & > img + img {
            margin-top: 2px;
          }
        }

        & > .champion + .spell {
          margin-left: 6px;
        }

        & > .perk {
          @include flexCol(flex-start, flex-start);
        }

        & > .spell + .perk {
          margin-left: 4px;
        }
      }

      & > .champion-name {
        font-size: 11px;
        letter-spacing: -0.42px;
        color: v-bind("Colors.greyishBrown");
        text-align: center;
        margin-top: 9px;
      }
    }

    & > .game-kda {
      text-align: center;
      flex: 0 0 100px;

      & > .kda {
        font-size: 15px;
        font-weight: bold;
        letter-spacing: -0.58px;
        color: v-bind("Colors.warmGrey");

        & > .kill,
        & > .assist {
          color: v-bind("Colors.gunMetal");
        }

        & > .death {
          color: v-bind("Colors.scarlet");
        }
      }

      & > .kda-average {
        font-size: 11px;
        font-weight: bold;
        letter-spacing: -0.42px;
        color: v-bind("Colors.gunMetal");

        & > .value {
          color: v-bind("Colors.black");
        }
      }

      & > .kda + .kda-average {
        margin-top: 6px;
      }

      & > .badge {
        @include flexRow(center, center);

        & > .multikill-tag + .annihilation-tag {
          margin-left: 4px;
        }
      }

      & > .kda-average + .badge {
        margin-top: 7px;
      }
    }

    & > .level-and-cs {
      flex: 0 0 70px;

      font-size: 11px;
      letter-spacing: -0.42px;
      text-align: center;

      & > .level,
      & > .cs {
        color: v-bind("Colors.gunMetal");
      }

      & .level + .cs {
        margin-top: 6px;
      }

      & > .contribution-for-kill-rate {
        color: v-bind("Colors.scarlet");
      }

      & > .cs + .contribution-for-kill-rate {
        margin-top: 6px;
      }
    }

    & > .items-and-ward {
      flex: 0 0 95px;
      @include flexCol(flex-start, center);

      & > .items {
        @include flexRow(flex-start, flex-start);
        flex-wrap: wrap;

        & > .item {
          margin-left: 2px;
        }

        & > .item:nth-child(n + 5) {
          margin-top: 2px;
        }

        & > .item:nth-child(4n + 1) {
          margin-left: 0;
        }
      }

      & > .ward {
        @include flexRow(flex-start, center);

        & > .symbol {
          width: 16px;
          height: 16px;
        }

        & > .vision-ward-count {
          font-size: 11px;
          letter-spacing: -0.42px;
          color: v-bind("Colors.blackTwo");
        }

        & > .symbol + .vision-ward-count {
          margin-left: 4px;
        }
      }

      & > .items + .ward {
        margin-top: 7px;
      }
    }

    & > .with-player {
      flex: 1 1 100%;
      height: 100%;

      & > .users {
        @include flexCol(flex-start, flex-start);
        flex-wrap: wrap;
        height: 100%;

        & > .user {
          font-size: 11px;
          letter-spacing: -0.42px;
          color: v-bind("Colors.greyishBrown");
          flex: 0 0 16px;
          @include flexRow(flex-start, center);
          width: 85px;
          margin-left: 11px;

          & > span {
            margin-left: 3px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        & > .user + .user {
          margin-top: 2px;
        }

        & > .user:nth-child(6n) {
          margin-top: 0;
        }

        & > .user:nth-child(n + 6) {
          margin-left: 19px;
        }
      }
    }
  }

  & > .match-summary.win {
    background-color: v-bind("Colors.lightBlueGrey");
    @include border-solid-1(v-bind("Colors.lightGreyBlue"));
    border-right: none;
  }

  & > .match-summary.lose {
    background-color: v-bind("Colors.pinkishGrey");
    @include border-solid-1(v-bind("Colors.pinkishGreyTwo"));
    border-right: none;
  }

  & > .btn-show-detail {
    flex: 0 0 30px;
    @include flexRow(center, flex-end);

    & > img {
      flex: 0 0 13px;
      height: 10px;
      margin-bottom: 12px;
    }
  }

  & > .btn-show-detail.win {
    background-color: v-bind("Colors.perryWinkle");
    @include border-solid-1(v-bind("Colors.coolBlue"));
  }

  & > .btn-show-detail.lose {
    background-color: v-bind("Colors.pinkishTan");
    @include border-solid-1(v-bind("Colors.brownishPink"));
  }
}

.match-detail-card-root {
}
</style>
