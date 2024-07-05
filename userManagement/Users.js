class Users{
    static add(userName, passwordToSetTo){
        let u = User.INSTANCE;
        if(u == null || !u.hasPermission(Permission.USER_ADD)){
            alert("Du brauchst die Berechtigung user.add");
            return;
        }
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data: { method:"addUser", password: getCookie("password"), username: getCookie("username"), newUserName: userName, passwordToSetTo:passwordToSetTo},
            dataType: 'json',
            success: s=>{
                if(s["success"]){
                    let reload = confirm("User successfully added! You have to reload the page!");
                    if(reload){
                        location.reload();
                    }
                }else{
                    alert("Du brauchst die Berechtigung user.add");
                }
            },
            error: e=>alert("Du brauchst die Berechtigung user.add")
        });
    }

    static remove(userName){
        let u = User.INSTANCE;
        if(u == null || !u.hasPermission(Permission.USER_REMOVE)){
            alert("Du brauchst die Berechtigung user.remove");
            return;
        }
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data: { method:"removeUser", password: getCookie("password"), username: getCookie("username"), newUserName: userName},
            dataType: 'json',
            success: s=>{
                if(s["success"]){
                    let reload = confirm("User successfully removed! You have to reload the page!");
                    if(reload){
                        location.reload();
                    }
                }else{
                    alert("Du brauchst die Berechtigung user.remove");
                }
            },
            error: e=>alert("Du brauchst die Berechtigung user.remove")
        });
    }

    static getAll(suc){
        let u = User.INSTANCE;
        if(u == null || !u.hasPermission(Permission.USER_GET)){
            alert("Du brauchst die Berechtigung user.get");
            return;
        }
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data: { method:"getUsers", password: getCookie("password"), username: getCookie("username")},
            dataType: 'json',
            success: s=>{
                if(s["success"]){
                    suc(Users.parseAll(s["data"]));
                }else{
                    alert("Du brauchst die Berechtigung user.get");
                }
            },
            error: e=>alert("Du brauchst die Berechtigung user.get")
        });
    }

    static removePermission(user, perm){
        return new Promise((res, rej)=>{
            if(User.INSTANCE == null || !User.INSTANCE.hasPermission(Permission.USER_PERMISSION_REMOVE)){
                rej();
                return;
            }
            $.ajax({
                url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
                type: "POST",
                data: { method:"removePermission", password: getCookie("password"), username: getCookie("username"), changeUsername: user, permission:perm},
                dataType: 'json',
                success: s=>{
                    if(s["success"]){
                        res();
                    }else{
                        alert("Du brauchst die Berechtigung user.permission.remove");
                    }
                },
                error: e=>alert("Du brauchst die Berechtigung user.permission.remove")
            });
        });
    }

    static addPermission(user, perm){
        return new Promise((res, rej)=>{
            if(User.INSTANCE == null || !User.INSTANCE.hasPermission(Permission.USER_PERMISSION_ADD)){
                rej();
                return;
            }
            $.ajax({
                url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
                type: "POST",
                data: { method:"addPermission", password: getCookie("password"), username: getCookie("username"), changeUsername: user, permission:perm},
                dataType: 'json',
                success: s=>{
                    if(s["success"]){
                        res();
                    }else{
                        alert("Du brauchst die Berechtigung user.permission.add");
                    }
                },
                error: e=>alert("Du brauchst die Berechtigung user.permission.add")
            });
        });
    }

    static resetPassword(username){
        return new Promise((res, rej)=>{
            if(User.INSTANCE == null || !User.INSTANCE.hasPermission(Permission.USER_PASSWORD_SET)){
                rej();
                return;
            }
            $.ajax({
                url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
                type: "POST",
                data: { method:"changePassword", password: getCookie("password"), username: getCookie("username"), targetUserName: username},
                dataType: 'json',
                success: s=>{
                    if(s["success"]){
                        res();
                    }else{
                        alert("Du brauchst die Berechtigung user.password.set");
                    }
                },
                error: e=>alert("Du brauchst die Berechtigung user.password.set")
            });
        });
    }

    static changePasswordFromOwner(old, newPw){
        return new Promise((res, rej)=>{
            $.ajax({
                url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
                type: "POST",
                data: { method:"changePassword", password: old, username: getCookie("username"), new:newPw},
                dataType: 'json',
                success: s=>{
                    if(s["success"]){
                        res();
                    }else{
                        alert("Etwas ist schief gelaufen!");
                    }
                },
                error: e=>alert("Etwas ist schief gelaufen!")
            });
        });
    }

    static parseAll(arr){
        let users = [];
        for(let a of arr){
            users.push(new User(a["username"], a["permissions"], a["role"]));
        }
        return users;
    }

    static loadDefaultPermissions(){
        return new Promise((res, rej)=>{
            $.ajax({
                url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
                type: "POST",
                data: { method:"getDefaultPermissions", password: getCookie("password"), username: getCookie("username")},
                dataType: 'json',
                success: s=>{
                    if(s["success"]){
                        Users.DEFAULT_PERMISSIONS = s["data"];
                    }else{
                        alert("Etwas ist schief gelaufen!");
                    }
                },
                error: e=>alert("Etwas ist schief gelaufen!")
            });
        });
    }

    static upload(){
        if(!editor)return;
        return new Promise((res, rej)=>{
            $.ajax({
                url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
                type: "POST",
                data: { method:"setCustomStyle", password: getCookie("password"), username: getCookie("username"), style:editor.getSession().getValue()},
                dataType: 'json',
                success: s=>{
                    if(s["success"]){
                        res();
                    }else{
                        rej();
                    }
                },
                error: e=>rej()
            });
        });
    }

    static loadCustomStyle(){
        return new Promise((res, rej)=>{
            $.ajax({
                url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
                type: "POST",
                data: { method:"getCustomStyle", password: getCookie("password"), username: getCookie("username")},
                dataType: 'json',
                success: s=>{
                    if(s["success"]){
                        if(updateStyles){
                            updateStyles(s["data"]);
                        }
                        if(editor){
                            editor.getSession().setValue(s["data"]);
                        }
                        res();
                    }else{
                        alert("Etwas ist beim laden des Custom Styles schief gelaufen!");
                        rej();
                    }
                },
                error: e=>alert("Etwas ist beim laden des Custom Styles schief gelaufen!")
            });
        });
    }
}

Users.DEFAULT_PERMISSIONS = [];
Users.SELECTED = null;