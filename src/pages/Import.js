import React, { Component } from 'react';
import ImportFileCard from "../components/Cards/importFileCard";

/**
 * "web page" import data. It displays the different methods of importing user's data
 */
class Import extends Component {
    render() {
        return (
            <div className="container-fluid">
                <ImportFileCard/>
            </div>
        )
    }
}

export default Import;
