function checkUserInformation(){
    return new Promise((res, rej)=>{
        if(getCookie("password") == undefined || getCookie("password") == null || getCookie("password") == "" || 
        getCookie("username") == undefined || getCookie("username") == null || getCookie("username") == ""){
            rej();
            return;
        }
        setTimeout(()=>rej(), 1000*10);
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data: { method:"checkPassword", password: getCookie("password"), username: getCookie("username")},
            dataType: 'json',
            timeout: 1000*10,
            success: r=>{
                if(r["success"]==true)res();
                else rej();
            },
            error: e=>rej(e)
            
        });
    });
}