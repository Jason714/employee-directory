import React, { useEffect, useState } from 'react';
import API from '../utils/API';
import Search from './Search.js';
import Employee from './Employee.js';

class Directory extends React.Component {

    state = {
        employees: [],
        sortType: 'nosort',
        name: '',
    };

    componentDidMount() {
        this.getEmployees();
    };

    getEmployees = () => {
        API.getEmployees()
            .then((res) => {
                this.setState({
                    employees: res.data.results,
                });
            })
            .catch((err) => console.log(err));
    };

    handleSortState = () => {
        const selectElement = document.querySelector("#sortSelection");
        const output = selectElement.value;
        if (output === "firstName") {
            this.setState({ sortType: "firstNameame" });
            const sortedEmployees = this.state.employees;
            sortedEmployees.sort((a, b) => a.name.first.localeCompare(b.name.first));
            this.setState({ employees: sortedEmployees });
        }
        if (output === "lastName") {
            this.setState({ sortType: "lastName" });
            const sortedEmployees = this.state.employees;
            sortedEmployees.sort((a, b) => a.name.last.localeCompare(b.name.last));
            this.setState({ employees: sortedEmployees });
        }
    };

    filterEmp = () => {
        let { employees, search } = this.state;
        let empFilter = employees.filter(filtered => {
            return (
                filtered.name.first.toLowerCase().includes(search.toLowerCase()) ||
                filtered.name.last.toLowerCase().includes(search.toLowerCase())
            )
        })
        this.setState({ empFilter })
    };

    startFilter = e => {
        this.setState({ search: e.target.value }, () => {
            this.filterEmp();
            this.setState({ filtered: true });
        });
    };

    sortEmp = ({ employees, sortType }) => {
        console.log(employees);
        if (sortType === 'asc') {
            employees.sort((a, b) => (a.login.password > b.login.password) ? -1 : 1);
            this.setState({ sortType: 'desc' });
        } else if (sortType === 'desc') {
            employees.sort((a, b) => (a.login.password > b.login.password) ? -1 : 1);
            this.setState({ sortType: 'asc' });
        }
        this.setState({ sortedEmp: 'sortedEmp' });
    };

    render = () => {

        const aboutStyle = {
            height: '50vh',
            backgroundImage: 'url("https://i.imgur.com/NXskfGq.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }
        return (
            <div>
                <div className="jumbotron jumbotron-fluid" style={aboutStyle}>
                    <div className="container text-center text-white">
                        <h1 className="display-4">Employee Directory</h1>
                        <p className="lead">You can sort by ID and filter by name.</p>
                    </div>
                    <Search
                        name="search"
                        startFilter={this.startFilter}
                        label="Search"
                    />
                    <div id="sortContainer" className="d-flex justify-content-center mx-auto">
                        <select id="sortSelection" onChange={this.handleSortState}>
                            <option value="nosort">No Sort</option>
                            <option value="firstName">Sort by First Name</option>
                            <option value="lastName">Sory by Last Name</option>
                        </select>
                    </div>
                </div>

                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!this.state.filtered ? this.state.employees.map(employee => (
                            < Employee
                                key={employee.id.value}
                                firstName={employee.name.first}
                                lastName={employee.name.last}
                                phone={employee.phone}
                                email={employee.email}
                                icon={employee.picture.thumbnail}
                            />

                        ))
                            // otherwise map the sorted employees
                            : this.state.empFilter.map(employee => (

                                <Employee
                                    key={employee.id.value}
                                    firstName={employee.name.first}
                                    lastName={employee.name.last}
                                    phone={employee.phone}
                                    email={employee.email}
                                    icon={employee.picture.thumbnail}
                                    login={employee.login.password}
                                />

                            ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Directory;