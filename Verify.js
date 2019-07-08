onCreation= function () {
    console.log("hi");
    let email = document.getElementById("loginForm").email;
    let username = document.getElementById("loginForm").username.value;
    let psw = document.getElementById("loginForm").psw.value;
    let pswRepeat = document.getElementById("loginForm").pswrepeat.value;
    if(psw !== pswRepeat){
        //reprompt password
        alert("Passwords Don't Match.");
        document.getElementById("loginForm").psw= "";
        document.getElementById("loginForm").pswrepeat= "";
    }
    else if(users.has(username)){
        alert("Someone Already Has That Username.")
    }
    else{
        alert("Your Account Has Been Created!");
        let newUser = {
            R: 1500,
            RD: 350,
            password: psw
        };
        users.set(username, newUser);
        console.log(users);
    }
};
onLogin = function () {
    console.log(users);
    let username = document.getElementById("loginForm").username.value;
    let psw = document.getElementById("loginForm").psw.value;
    if(users.has(username) && users.get(username).password === psw){
        alert("Login Successful!")
    }
    else{
        alert("Login Failed")
    }

}