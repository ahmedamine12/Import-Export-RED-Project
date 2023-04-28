import React from "react";

/**
 *
 * @param severity, text, onClick
 * @returns {JSX.Element}
 * @constructor
 */

export const BaseButton = (props) => {

    return (
        <button className={`btn btn-${props.severity} mw-2`}
                onClick={props.onClick}>{props.text}</button>
    )


}