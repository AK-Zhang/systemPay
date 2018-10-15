export function getBusniessType(cardCondition) {
  let busniessType = null;
  if(cardCondition === 'DEBIT') {
    busniessType = 'WithDrawAndRechargeCard';
  } else if(cardCondition === 'CREDIT') {
    busniessType = 'Credit';
  }
  return busniessType;
}
