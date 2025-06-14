const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000]; // XP needed per level

function getLevelFromXP(xp) {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
    else break;
  }
  return level;
}

module.exports = {
  LEVEL_THRESHOLDS,
  getLevelFromXP,
};