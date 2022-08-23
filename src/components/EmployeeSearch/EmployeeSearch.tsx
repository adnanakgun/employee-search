import React from "react";
import { Employee } from "../../domains/employee.interface";
import EmployeesService from "../../services/Employees.service";
import EmployeeList from "../EmployeeList/EmployeeList";
import './EmployeeSearch.css';

class EmployeeSearch extends React.Component {

    state: {
        rawEmployeeList: [],
        filteredEmployeeList: []
    } = {
        rawEmployeeList: [],
        filteredEmployeeList: []
    };

    componentDidMount(){
        const employeeList: Employee[] = EmployeesService.getEmployees();
        this.setState({
            rawEmployeeList: employeeList,
            filteredEmployeeList: employeeList
        });
    }

    employeeQueryChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        const inputtedValue = event.currentTarget?.value;
    
        const filteredEmployeeList = this.state.rawEmployeeList.filter((employee: any) => 
            Object.keys(employee).filter((key) => 
                employee[key].toString().toLowerCase().includes(inputtedValue)
            ).length > 0
        );

        this.setState({filteredEmployeeList});

    };

    employeeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(this.state.filteredEmployeeList);
    };

    render() {
        return (
            <div className="ui container">
                <div className="ui relaxed divided list">
                    <h2>Employee Search App</h2>
                    <form className="ui fluid form employee-form" onSubmit={this.employeeSubmit} aria-label="employee-form">
                        <div  className="ui middle aligned content">
                            <input aria-label="employee-query" placeholder="Search for employee" type="text" onChange={this.employeeQueryChange}/>
                        </div>
                        <EmployeeList employeeList={this.state.filteredEmployeeList}/>
                        <button className="ui button" type="submit" value="Submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default EmployeeSearch;
