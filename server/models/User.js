class User {
    constructor(email, login, password, firstName, lastName, birthYear) {
        this.email = email;
        this.login = login;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthYear = birthYear;
    }

    //getters

    getEmail() {
        return this.email;
    }

    getLogin() {
        return this.login;
    }

    getPassword() {
        return this.password;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getBirthYear() {
        return this.birthYear;
    }

    //setters

    setEmail(email) {
        this.email = email;
    }

    setLogin(login) {
        this.login = login;
    }

    setPassword(password) {
        this.password = password;
    }

    setFirstName(firstName) {
        this.firstName = firstName;
    }

    setLastName(lastName) {
        this.lastName = lastName;
    }

    setBirthYear(birthYear) {
        this.birthYear = birthYear;
    }
  }
  
export default User;