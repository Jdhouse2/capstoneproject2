const constants = {
    nav: {
        'Home': 'home.html',
        'About': 'about.html',
        'All': 'feed.html',
        'Finance': 'feed.html?tag=Finance',
        'IT': 'feed.html?tag=IT',
        'Marketing': 'feed.html?tag=Marketing',
        'Log In': 'EATLogon.html',
        'Log Out': 'logout.html',
        // 'Sign Up': 'signup.html',
        'Add Post': 'AddAnItem.html',
        'My Account' : 'AccountPage.html'
    },
    navElementClasses: [
        'nav-item',
    ]
}

// Function to Check Local Storage for Authentification
function checkAuth() {
    // No authentification
    if (localStorage.getItem('ownerid') == null) {
        console.log("not signed in");
        // hide feed, log out, add an item, my account
        document.querySelectorAll("a[href='feed.html']")[0].style.display = "none";
        document.querySelectorAll("a[href='logout.html']")[0].style.display = "none";
        document.querySelectorAll("a[href='AddAnItem.html']")[0].style.display = "none";
        document.querySelectorAll("a[href='myaccount.html']")[0].style.display = "none";
        document.querySelectorAll("a[href='feed.html?tag=Finance']")[0].style.display = "none";
        document.querySelectorAll("a[href='feed.html?tag=Marketing']")[0].style.display = "none";
        document.querySelectorAll("a[href='feed.html?tag=IT']")[0].style.display = "none";

        // No not display log out or add items buttons
    } else {
        console.log(localStorage.getItem("ownerid") + " is signed in");
        console.log(localStorage.getItem("modDist") + " is mod status");
        // hide irrelevant nav links
        document.querySelectorAll("a[href='EATLogon.html']")[0].style.display = "none";
        // document.querySelectorAll("a[href='signup.html']")[0].style.display = "none";
    }
}

// Function to add points to employee database
function addEmployeePoints(points, id) {
    let pointObj = {}
    pointObj.points = points
    pointObj.id = id

    try {
        $.ajax({
            type: "GET",
            url: '/api/add-points',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: pointObj,
            success: function (msg) {
                console.log('success')
                console.log(msg)
                updateView()
            },
            error: function (e) {
                console.log('failure')
                console.log(e)
            }
        })
    }
    catch (e) {
        console.log(e)
        console.log("Upvote failed.")
    }

}


function generateFlexbox(){
    let outerBox = document.createElement('div')
        outerBox.classList.add('flex')
        outerBox.classList.add('flex-row')
    
    return outerBox;
}

function generateDiv(content, classListArray){
    let element = document.createElement('div')
    classListArray.forEach((c) => element.classList.add(c))
    element.innerHTML = content
    return element
}

function generateLink(content, href, classListArray){
    let element = document.createElement('a')
    classListArray.forEach((c) => element.classList.add(c))
    element.innerHTML = content
    element.href = href
    return element
}

// Generates Navigation Bar
function generateNavigationBar(){
    let navBar = document.getElementById('nav')
        navBar.classList.add('navbar')
        navBar.classList.add('header-font')

    if(constants.nav){
        let nav = generateFlexbox()
            nav.classList.add('flex-right')
        for(let key in constants.nav){
            nav.appendChild(generateLink(key, `${constants.nav[key]}`, constants.navElementClasses))
        }

        navBar.appendChild(nav)
    }
}


function attachEventHandlers(){
    function _attachRedirectEvents(){
        let allButtons = document.querySelectorAll('.redirectButton')

        Array.from(allButtons).forEach((button) => {
            button.addEventListener('click', () => {
                window.location.replace(`./${button.id}.html`)
            })
        })
    }

    _attachRedirectEvents()
}

function init(){
    generateNavigationBar()
    attachEventHandlers()
    checkAuth();
}
