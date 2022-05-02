
export const useHasMore = (rcount, rhistory) => {
    let ret = true;
    if (rcount) {
        if (rcount <= rhistory.length) {
            ret = false;
        }
    }
    return ret;
}
