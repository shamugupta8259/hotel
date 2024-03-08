const welcomePage = (req, res) => {
    try {
        res.send("Welcome to the hotel management API");
    }

    catch(err) {
        console.log(err);
    }
}

const aboutPage = (req, res) => {
    try {
        res.send("Welcome to the about page. This hotel management API has been created by Priyanshu Gupta.");
    }

    catch(err) {
        console.log(err)
    }
}

module.exports = {welcomePage, aboutPage}