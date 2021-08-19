import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import RestoreRoundedIcon from "@material-ui/icons/RestoreRounded";
import BuildRoundedIcon from "@material-ui/icons/BuildRounded";

const useStyles = makeStyles({
    root: {
        width: "100%",
        backgroundColor: "#4e73df",
        text: "white"
    },
});

export default function BottombarTest() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root + " pt-2"}
        >
            <BottomNavigationAction label="History" icon={<RestoreRoundedIcon />} />
            <BottomNavigationAction label="Activate" icon={<AddCircleRoundedIcon />} />
            <BottomNavigationAction label="Manage" icon={<BuildRoundedIcon />} />
        </BottomNavigation>
    );
}
