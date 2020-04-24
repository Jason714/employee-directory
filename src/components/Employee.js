import React from "react";


const Employee = (props) => {


    return (
        <tr>
            <td><img alt={props.firstName} src={props.icon} /></td>
            <td>{props.firstName} {props.lastName}</td>
            <td>{props.email}</td>
            <td>{props.phone} </td>
        </tr>
    )
}

export default Employee;