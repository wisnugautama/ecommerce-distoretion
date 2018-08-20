window.fbAsyncInit = function () {
    FB.init({
        appId: '234972423873948',
        cookie: true,  // enable cookies to allow the server to access 
        // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
    });
};

// Load the SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        if (response.status == 'connected') {
            console.log(response.authResponse);
            axios.post('http://localhost:3000/users/loginfb', response.authResponse)
                .then((result) => {
                    swal("login sukses", "press the button", "success")
                    localStorage.setItem('token', result.data.token)
                    setInterval(function(){
                        window.location.href = "http://localhost:8080/index.html"
                    },2000)                    
                })
                
                .catch((err) => {
                    swal(err.message)
                });
        }
    });
}