# react-employee-poc

React-Redux POC for Employee CRUD operations.


## POC Requirements:

1. Create **React** application using **CLI** with **TypeScript**
2. Configure any CSS library ex. **React Bootstrap**, Styled component or any other
3. Create **Redux store**/Context API and configure it
4. UseGraphQL Apolo Client or **REST API**
5. Application will start with Home Screen ( Display any welcome message )
6. After login redirect user to Employee list page
	- Without login user should not able to access it (use Auth Guards/**HOC**)
	- Without logged in it should redirect it to Login Screen
7. Employee List page will have an option to add, edit or delete employee.
	- Do form validation (**React Hooks form** or  cutom Hooks) 
	- After deletion ask Confirmation
	- After insert/update/delete display notification


## Folder Structure:

1. **public**
    - Static content like images.
2. **server**
    - NodeJS application for REST APIs of employee CRUD operations
    - MongoDB to store employee details
3. **src**
    - **_actions:** Contains all possible actions for Login, Employee and Notifications.
    - **_reducers:** Reducers for Login, Employee and Notifications.
    - **components:** Create/Referer commanly used commponents to implement different interactive web pages.
    - **helper:** helper/constants for repeatedly used functions.
    - **pages:** Create user facing web pages by using different components.
    - **services:** Service files to interact with REST APIs.
4. **.env** files:
    - **.env.development:** Refer for "npm start"
    - **.env.production:** Refer for "npm build"
    - **.env.test** Refer for "npm test"
5. **generate-react-cli.json**
    - Configure command which will help you to created compenents from terminal/command line. [Click here](https://www.npmjs.com/package/generate-react-cli) for more details.


## Scripts to Run/Test/Build application

1. **Run**
    > npm start
2. **Build**
    > npm run build
3. **Test Run**
    > npm test  
    > npm run test-cv // To get coverage report
4. **Generate component/pages**
    > npm run gc "[component-name]" // To generate component in component folder  
    > npm run gp "[page-name]" // To generate page in pages folder


## Libraries:

* typescript
* generate-react-cli
* react-redux
* axios
* node-sass
* react-bootstrap
* react-hook-form
* moment
* enzyme

