
export const useRoundMinutesAndAddSummerTime = (date, timeToAdd=0) => {
    let coeff = 1000 * 60 * 5;
    let rounded = new Date(Math.round(date.getTime() / coeff) * coeff);
    if(!timeToAdd){
        return rounded;
    }
    else if(timeToAdd === 1) {
        return new Date(rounded.setHours(rounded.getHours()+1));
    }
    else if(timeToAdd === -1){
        return new Date(rounded.setHours(rounded.getHours()-1));
    }
}
