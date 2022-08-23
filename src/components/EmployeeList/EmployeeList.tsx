import { Employee } from "../../domains/employee.interface";

const getContactDetails = (employee: Employee): string => {
    return employee.department === 'Finance' ? employee.email : employee.tel;
}

const renderList = (employeeList: Employee[]) => {
    return employeeList.length > 0 ? employeeList.map((employee: Employee, index: number) => {
        return (
            <tr key={index}>
                <td>{`${employee.firstName} ${employee.lastName}`}</td>
                <td>{getContactDetails(employee)}</td>
            </tr>
        );
    }) : (
        <tr>
            <td colSpan={2}>
                Error: No employee data available!
            </td>
        </tr>
    )
    ;
}

function EmployeeList(props: {employeeList: Employee[]}){

    return (
        <table className="ui celled table">
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Contact Details</th>
                </tr>
            </thead>
            <tbody>
                {renderList(props.employeeList)}
            </tbody>
        </table>
    );
}

export default EmployeeList;
