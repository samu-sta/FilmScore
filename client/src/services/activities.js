class Activity {
    constructor(title, description, date = new Date()) {
        this.title = title;
        this.description = description;
        this.date = date;
    }
}

class UpdatedProfile extends Activity {
    constructor(date) {
        super("Updated Profile", "Changed profile details", date);
    }
}

class LoggedOut extends Activity {
    constructor(date) {
        super("Logged Out", "Logged out from the system", date);
    }
}

class LoggedIn extends Activity {
    constructor(date) {
        super("Logged In", "Logged in to the system", date);
    }
}

class PutReview extends Activity {
    constructor(date) {
        super("Put Review", "Put a review on a content", date);
    }
}

export const activities = {
    UpdatedProfile,
    LoggedOut,
    LoggedIn,
    PutReview
};
