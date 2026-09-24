
export const slsaLvl = function (lvl) {
    var salsas = {
        1: 'mild',
        2: 'medium',
        3: 'hot',
    };
    return salsas[lvl] || 'not found';
}

