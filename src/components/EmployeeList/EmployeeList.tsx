import { Employee } from "../../domains/employee.interface";

const getContactDetails = (employee: Employee): string => {
    return employee.department === 'Finance' ? employee.email : employee.tel;
}

const setActiveStatus = (status: string): string => {
    return status === 'Y' ? 'Active' : 'Inactive';
}

const renderList = (employeeList: Employee[]) => {
    return employeeList.length > 0 ? employeeList.map((employee: Employee, index: number) => {
        return (
            <tr key={index}>
                <td>{`${employee.firstName} ${employee.lastName}`}</td>
                <td>{getContactDetails(employee)}</td>
                <td><span data-testid={"employee-"+employee.id+"-status"}>{setActiveStatus(employee.isActive)}</span></td>
            </tr>
        );
    }) : (
        <tr>
            <td colSpan={3}>
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
                    <th>Active Status</th>
                </tr>
            </thead>
            <tbody>
                {renderList(props.employeeList)}
            </tbody>
        </table>
    );
}

export default EmployeeList;
