import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import {putOneTag} from "../../services/omgServer";

export default function EditTagDialog(props) {

    const roundTo5Minutes = (date) => {
        let coeff = 1000 * 60 * 5;
        return new Date(Math.round(date.getTime() / coeff) * coeff);
    }

    const getDatePickerFormat = (date) => {
        let initDate = roundTo5Minutes(date);
        initDate.setUTCHours(initDate.getUTCHours() - initDate.getTimezoneOffset() / 60);
        return initDate.toISOString().substr(0, 16);
    }

    const [open, setOpen] = React.useState(false);
    const [tagName, setTagName] = useState(props.tagName);
    const [tagDatetime, setTagDatetime] = useState(getDatePickerFormat(new Date(props.tagDatetime)));
    const [tagId] = useState(props.tagId);

    const editTagNameInputChange = (event) => {
        setTagName(event.target.value);
    }

    const editTagDatetimeChange = (event) => {
        setTagDatetime(getDatePickerFormat(new Date(event.target.value)));
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        document.getElementById("editTagResultRequestTag").innerText = '';
        refreshPage();
    };

    const applyChanges = () => {
        console.log(tagName + "  " + tagId + "  " + new Date(tagDatetime));
        putOneTag(tagName, tagId, tagDatetime).then((res) => {
            document.getElementById("editTagResultRequestTag").innerText = res;
        })
    }

    const refreshPage = () => {
        window.location.reload(false);
    }


    return (
        <div>
            <button type={"button"} className={"btn btn-warning"} onClick={handleClickOpen}>
                <span className={"icon text-white mr-2"}>
                    <i className={"fas fa-edit"}/>
                </span>
                <span className={"text"}>
                    Edit
                </span>
            </button>
            {/*<button className={"btn btn-warning"} onClick={handleClickOpen}>*/}
            {/*    Edit*/}
            {/*</button>*/}
            <Dialog open={open} onClose={handleClose} aria-labelledby="editTag-dialog-title">
                <DialogTitle id="editTagDialogTitle" className={"text-warning pb-0"}>Edit Tag</DialogTitle>
                <DialogContent className={"ml-2 mr-2"}>
                    <div className="row form-group mt-2">
                        <label className={"form-check-label"} htmlFor="editTagNameInput">Name</label>
                        <input type="text" className={"form-control"} id="editTagNameInput" value={tagName} onChange={editTagNameInputChange}/>
                        <div className={"invalid-feedback"}>You have to enter a tag name</div>
                    </div>
                    <div className="row form-group mt-2">
                        <label className={"form-check-label"} htmlFor="editTagDatetime">Activation datetime</label>
                        <TextField
                            value={tagDatetime}
                            onChange={editTagDatetimeChange}
                            id="editTagDatetime"
                            type="datetime-local"
                            className={"w-100 rounded"}
                        />
                    </div>
                    <div className="d-flex row form-group mt-2">
                        <div id={"editTagResultRequestTag"} className={"text-center text-info"}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button id={"editTagApplyButton"} onClick={applyChanges} className={"btn text-warning ml-0"}>
                        Apply
                    </button>
                    <button onClick={handleClose} className={"btn text-primary"}>
                        Close
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
