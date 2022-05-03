
export const useDayToAddDayInArray = (day, selected) => {
    let find = selected.indexOf(day);

    if(find > -1) {
        selected.splice(find, 1);
    } else {
        selected.push(day);
    }
    return selected;
}
