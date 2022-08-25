import { render, screen } from '@testing-library/react';
import { Employee } from '../../domains/employee.interface';
import EmployeeList from './EmployeeList';
import { within } from '@testing-library/dom'

describe('EmployeeList', () => {

    const EMPLOYEE_DATA: Employee[] = [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@domain.com', department: 'Finance', tel: '11111', isActive: 'Y' },
        { id: 2, firstName: 'Bob', lastName: 'Simpson', email: 'bob.simpson@domain.com', department: 'IT', tel: '33333', isActive: 'N' }
    ];

    const EMPTY_EMPLOYEE_DATA: Employee[] = [];

    it('should render a list of employees if there are any available', () => {

        render(<EmployeeList employeeList={EMPLOYEE_DATA}/>);
        const johnDoeName = screen.getByText(/John Doe/i);
        expect(johnDoeName).toBeInTheDocument();
    });

    it('should display appropriate error message if there is no list of employees available', () => {
        render(<EmployeeList employeeList={EMPTY_EMPLOYEE_DATA}/>);
        const johnDoeName = screen.queryByText(/John Doe/i);
        expect(johnDoeName).not.toBeInTheDocument();
        const noEmployeeDataAvailableMessage = screen.queryByText(/Error: No employee data available!/i);
        expect(noEmployeeDataAvailableMessage).toBeInTheDocument();
    });

    it('should render only email for finance employees and not tel', ()=> {

        render(<EmployeeList employeeList={EMPLOYEE_DATA}/>);
        const johnDoeEmail = screen.getByText(/john.doe@domain.com/i);
        const johnDoeTel = screen.queryByText(/11111/i);
        expect(johnDoeEmail).toBeInTheDocument();
        expect(johnDoeTel).not.toBeInTheDocument();
    });

    it('should render only tel for IT employees and not email', ()=> {

        render(<EmployeeList employeeList={EMPLOYEE_DATA}/>);
        const bobSimpsonTel = screen.getByText(/33333/i);
        const bobSimpsonEmail = screen.queryByText(/bob.simpson@domain.com/i);
        expect(bobSimpsonTel).toBeInTheDocument();
        expect(bobSimpsonEmail).not.toBeInTheDocument();
    });

    it('should show the employee as "active" if isActive is Y', ()=> {

        render(<EmployeeList employeeList={EMPLOYEE_DATA}/>);   
        const { getByText } = within(screen.getByTestId('employee-1-status')); // 1 comes from EMPLOYEE_DATA
        expect(getByText('Active')).toBeInTheDocument();
    });

    it('should show the employee as "inactive" if isActive is N', ()=> {

        render(<EmployeeList employeeList={EMPLOYEE_DATA}/>);   
        const { getByText } = within(screen.getByTestId('employee-2-status')); // 2 comes from EMPLOYEE_DATA
        expect(getByText('Inactive')).toBeInTheDocument();
    });
});
