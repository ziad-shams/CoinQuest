const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000]; // XP needed per level

function getLevelFromXP(xp) { 
  return Math.floor(xp / 100) + 1;
}

module.exports = {
  LEVEL_THRESHOLDS,
  getLevelFromXP,
};