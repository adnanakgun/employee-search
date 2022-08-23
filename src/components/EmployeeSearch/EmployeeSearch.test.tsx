import { fireEvent, render, screen } from '@testing-library/react';
import { Employee } from '../../domains/employee.interface';
import EmployeesService from '../../services/Employees.service';
import EmployeeSearch from './EmployeeSearch';

describe('EmployeeSearch', () => {

    let mockEmployeesService: jest.SpyInstance;

    const EMPLOYEE_DATA: Employee[] = [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@domain.com', department: 'Finance', tel: '11111', isActive: 'Y' },
        { id: 2, firstName: 'Bob', lastName: 'Simpson', email: 'bob.simpson@domain.com', department: 'IT', tel: '33333', isActive: 'Y' }
    ];

    beforeEach(()=> {
        mockEmployeesService = jest.spyOn(EmployeesService, 'getEmployees').mockReturnValue(EMPLOYEE_DATA);
    });

    it('should display results found, only those employees should be shown', () => {
        render(<EmployeeSearch/>);
        const employeeQueryInput = screen.getByLabelText('employee-query');
        fireEvent.change(employeeQueryInput, {target: {value: 'impson@domain'}});
        const bobSimpsonName = screen.getByText(/Bob Simpson/i);
        expect(bobSimpsonName).toBeInTheDocument();
        const johnDoeName = screen.queryByText(/John Doe/i);
        expect(johnDoeName).not.toBeInTheDocument();

        mockEmployeesService.mockRestore();
    });

    it('should log the currently visible employees', () => {
        const mockConsole = jest.spyOn(console, 'log');
        render(<EmployeeSearch/>);
        const employeeForm = screen.getByLabelText('employee-form');
        fireEvent.submit(employeeForm);
        expect(mockConsole).toHaveBeenCalledWith(EMPLOYEE_DATA);
        
        mockEmployeesService.mockRestore();
        mockConsole.mockRestore();
    });

});