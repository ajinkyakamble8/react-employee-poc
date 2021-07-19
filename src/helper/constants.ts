// Athurised user credentials
const userAccess = {
    username: 'test',
    password: 'test1'
};

// Form a REST API url as per evn
const baseAPI = `${process.env.REACT_APP_API_URI}/api/`; 

// All REST API routes
const apiURLs = {
    EMPLOYEE: 'employee'
}

// All URL routs to access different pages
const urlRoutes = {
    LOGIN: '/',
    HOME: '/home',
    EMPLOYEES: '/employees'
}

// List of available employee designations.
const employeeDesignations = [
    {value: 'Trainee', text: 'Trainee'},
    {value: 'Jr Software Engg', text: 'Jr Software Engg'},
    {value: 'Software Engg', text: 'Software Engg'},
    {value: 'Sr Software Engg', text: 'Sr Software Engg'},
    {value: 'Lead Software Engg', text: 'Lead Software Engg'},
    {value: 'Manager', text: 'Manager'}
]

export {
    userAccess,
    baseAPI,
    apiURLs,
    urlRoutes,
    employeeDesignations
}