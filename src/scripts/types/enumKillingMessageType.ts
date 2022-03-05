const KillMessage = {
  ANNIHILATION: "annihilation",
  MULTIKILL: "multikill",
};

type EnumKillingMessageType = typeof KillMessage[keyof typeof KillMessage];

export { KillMessage };
export default EnumKillingMessageType;
