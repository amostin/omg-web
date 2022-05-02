import {useState} from "react";

export const useHasMore = (rcount, rhistory) => {
    // const count = useState(rangesHistoryCount);
    // const history = useState(rangesHistory);
    let ret = true;
    if (rcount) {
        if (rcount <= rhistory.length) {
            ret = false;
        }
    }
    return ret;
}
