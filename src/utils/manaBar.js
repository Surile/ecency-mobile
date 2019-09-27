import { Client } from 'dsteem';
import parseToken from './parseToken';

const client = new Client();
// 432000 sec = 5 days
const PERIOD = 432000;

export const getVotingPower = account => {
  const totalShares = getTotalShares(account);
  console.log('client :', client);
  const calc = client.rc.calculateVPMana(account);
  console.log('calc :', calc);

  const { voting_manabar: manabar } = account;

  const elapsed = Math.floor(Date.now() / 1000) - manabar.last_update_time;

  const maxMana = totalShares * 1e6;

  let currentMana = Number(manabar.current_mana) + (elapsed * maxMana) / PERIOD;

  if (currentMana > maxMana) currentMana = maxMana;

  return currentMana;
};

export const getRcPower = account => {
  const totalShares = getTotalShares(account);

  const { rc_manabar: manabar } = account;

  const elapsed = Math.floor(Date.now() / 1000) - manabar.last_update_time;

  const maxMana = totalShares * 1e6;

  let currentMana = Number(manabar.current_mana) + (elapsed * maxMana) / PERIOD;

  if (currentMana > maxMana) currentMana = maxMana;

  return currentMana;
};

export const getRcPowerPercent = account => {
  const totalShares = getTotalShares(account);

  const maxMana = totalShares * 1e6;

  const currentMana = getRcPower(account);

  return (currentMana * 100) / maxMana;
};

export const getVotingPowerPercent = account => {
  const totalShares = getTotalShares(account);

  const maxMana = totalShares * 1e6;

  const currentMana = getVotingPower(account);

  return (currentMana * 100) / maxMana;
};

export const getTotalShares = account => {
  const totalShares =
    parseToken(account.vesting_shares) +
    (parseToken(account.received_vesting_shares) -
      parseToken(account.delegated_vesting_shares) -
      parseToken(account.vesting_withdraw_rate));
  return totalShares;
};
