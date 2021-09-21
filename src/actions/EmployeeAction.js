import HttpClient from '../services/HttpClient'

export const saveEmployee = async (employee) => {
    const endPointEmployee = '/Employee';
    const promiseEmployee = HttpClient.post(endPointEmployee, employee);
    return await Promise.all([promiseEmployee]);;
}

export const updateEmployee = async (employee) => {
    debugger
    const endPointEmployee = '/Employee/' + employee.id;
    const promiseEmployee = HttpClient.put(endPointEmployee, employee);
    return await Promise.all([promiseEmployee]);;
}

export const paginationEmployee = () => {
    return new Promise((resolve, eject) => {
        HttpClient.get('/Employee').then(response => {
            resolve(response);
        })
    })
}

export const paginationEmployeeByDepartment = (departmentId) => {
    return new Promise((resolve, eject) => {
        HttpClient.get('/Employee/department/' + departmentId).then(response => {
            resolve(response);
        })
    })
}

export const getEmployeeById = (id) => {
    return new Promise((resolve, eject) => {
        HttpClient.get('/Employee/' + id).then(response => {
            resolve(response);
        })
    })
}