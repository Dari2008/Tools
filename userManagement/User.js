class User{
    
    constructor(username, permission=null, role=null, onload=(usr)=>{}) {
        if(permission == null || role == null){
            this.username = username;
            this.permissions = [];
            this.role = "User";
            this.getUserData().then(function(data){
                this.permissions = data["permissions"];
                this.role = data["role"];
                onload(this);
            }.bind(this));
        }else{
            this.username = username;
            this.permissions = permission;
            this.role = role;

            this.component = document.createElement("tr");
            this.component.classList.add("userRow");
            this.component.setAttribute("role", this.role);
            this.component.onclick = function(){
                Users.SELECTED = this;
                let nodes = document.getElementById("usersBody").childNodes;
                for(let n of nodes){
                    if(n.removeAttribute){
                        n.removeAttribute("selected");
                    }
                }
                this.component.setAttribute("selected", "");
            }.bind(this);

            this.us = document.createElement("th");
            this.usernameField = document.createElement("span");
            this.usernameField.innerHTML = this.username;
            this.usernameField.classList.add("usernameClass");
            this.us.appendChild(this.usernameField);
            this.component.appendChild(this.us);

            this.rol = document.createElement("th");
            this.roleField = document.createElement("span");
            this.roleField.classList.add("roleClass");
            this.roleField.textContent = this.role;
            this.rol.appendChild(this.roleField);
            this.component.appendChild(this.rol);


            this.perms = document.createElement("th");
            this.perms.setAttribute("name", "perms");
            this.permissionCell = document.createElement("div");
            this.permissionCell.classList.add("permissionCell");

            this.permissionsField = document.createElement("span");
            
            this.permissionsField.classList.add("permissionField");
            this.permissionsField.textContent = this.permissionsToString(this.permissions);
            this.permissionCell.appendChild(this.permissionsField);

            this.resetPermission = document.createElement("button");
            this.resetPermission.classList.add("resetPermissionBtn");
            this.resetPermission.textContent = "Reset";
            this.resetPermission.onclick = function(e){
                this.resetPerms();
            }.bind(this);
            this.perms.appendChild(this.resetPermission);
            

            this.perms.appendChild(this.permissionCell);
            this.component.appendChild(this.perms);


            this.editBtnRow = document.createElement("th");
            this.editBtn = document.createElement("button");
            this.editBtn.classList.add("editBtns");
            this.editBtn.textContent = "Edit";
            this.editBtnRow.appendChild(this.editBtn);
            this.component.appendChild(this.editBtnRow);
            this.editBtn.onclick = function(){
                this.initEditor();
            }.bind(this);
        }
    }

    initEditor(){
        document.getElementById("userEditor").editing = this.getUsername();
        document.getElementById("userEditor").resetPassword = function(){
            Users.resetPassword(this.getUsername());
        }.bind(this);
        document.getElementById("userEditor").add = function(){
            document.getElementById("enterPermisionName").style.display = "block";
            
            let offsets = this.getPos();
            let width = $("#permissionValue").width();
            let height = $("#permissionValue").height();
            offsets.top += $("#permissionValue").position().top;
            offsets.left += $("#permissionValue").position().left;

            document.getElementById("autocompleteForpermissionValue").style.setProperty("--top", offsets.top + "px");
            document.getElementById("autocompleteForpermissionValue").style.setProperty("--left", offsets.left + "px");
            document.getElementById("autocompleteForpermissionValue").style.setProperty("--width", width + "px");
            document.getElementById("autocompleteForpermissionValue").style.setProperty("--height", height + "px");

            document.getElementById("enterPermisionName").onEnter = function(e){
                if(e == null)return;
                this.addPermission(e);
            }.bind(this);
        }.bind(this);
        document.getElementById("userEditor").remove = this.remove.bind(this);

        this.updateList();

        document.getElementById("userEditor").style.display = "block";

    }

    getPos(){
        var parent = $("#permissionValue");
        let top = 0;
        let left = 0;
        while (parent?.length > 0) {
            if(parent[0] == document.getElementsByTagName("html")[0])break;
            if(parent.parent() == null || parent.parent() == undefined)break;
            if(parent.parent().position() == null ||  parent.parent().position() == undefined)break;
            const position = parent.parent().position();
            if (!position) {
                break;
            }
            top += position.top;
            left += position.left;
            parent = parent.parent();
        }
      return {top: top, left: left};
    }

    resetPerms(){
        if(User.INSTANCE == null || !User.INSTANCE.hasPermission(Permission.USER_PERMISSION_RESET)){
            alert("Du brauchst die Berechtigung user.permission.reset");
            return;
        }
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data: { method:"resetPermission", password: getCookie("password"), username: getCookie("username"), targetUserName: this.username},
            dataType: 'json',
            success: s=>{
                if(s["success"]){
                    this.permissions = [...Users.DEFAULT_PERMISSIONS];
                    this.updatePermsField();
                }else{
                    alert("Etwas ist schief gelaufen!");
                }
            },
            error: e=>console.log(e)
        });
    }

    remove(){
        let selected = this.getSelectedPermission();
        if(selected == null)return;
        this.removePermission(selected);
    }

    updateList(){
        if(document.getElementById("userEditor").editing != this.getUsername())return;

        document.getElementById("permissionsList").innerHTML = "";

        this.permissionsElements = [];

        for(let perm of this.permissions){
            let htmlEl = document.createElement("li");
            htmlEl.textContent = perm;
            htmlEl.classList.add("permissionItem");
            htmlEl.onclick = ()=>{
                for(let e of this.permissionsElements)e.removeAttribute("selected");
                htmlEl.setAttribute("selected", "");
            }
            document.getElementById("permissionsList").appendChild(htmlEl);
            this.permissionsElements.push(htmlEl);
        }

        this.permissionsField.textContent = this.permissionsToString(this.permissions);
        this.usernameField.textContent = this.username;
        this.roleField.textContent = this.role;
    }

    updatePermsField(){
        this.permissionsField.textContent = this.permissionsToString(this.permissions);
    }

    getSelectedPermission(){
        if(this.permissionsElements == undefined || this.permissionsElements == null)return null;
        for(let e of this.permissionsElements){
            if(e.hasAttribute("selected")){
                return e.textContent;
            }
        }
        return null;
    }

    getComponent(){
        return this.component;
    }

    permissionsToString(perms){
        let str = "";
        for(let perm of perms){
            str += perm + "; ";
        }
        str = str.substring(0, str.length==0?0:(str.length - 2));
        return str;
    }

    getUserData(){
        return new Promise((res, rej)=>{
            $.ajax({
                url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
                type: "POST",
                data: { method:"getUserdata", password: getCookie("password"), username: getCookie("username"), usernameToGet: this.username},
                dataType: 'json',
                success: s=>{
                    if(s["success"]){
                        res(s["data"]);
                    }else{
                        rej(e);
                    }
                },
                error: e=>rej(e)
            });
        });
    }

    getUsername() {
        return this.username;
    }

    getPermissions(){
        return this.permissions;
    }

    setRole(role){
        if(User.INSTANCE == null || !User.INSTANCE.hasPermission(Permission.USER_ROLE_SET)){
            alert("Du brauchst die Berechtigung user.role.set");
            return;
        }
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data: { method:"setPermissions", password: getCookie("password"), username: getCookie("username"), role:role, changeUsername: this.username},
            dataType: 'json',
            success: s=>{
                if(s["success"]){
                    this.role = role;
                    this.roleField.textContent = role;
                }else{
                    alert("Etwas ist schief gelaufen!");
                }
            },
            error: e=>alert("Du brauchst die Berechtigung user.role.set")
        });
    }

    setPermissions(perms){
        if(User.INSTANCE == null || !User.INSTANCE.hasPermission(Permission.USER_PERMISSION_SET)){
            alert("Du brauchst die Berechtigung user.permission.set");
            return;
        }
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data: { method:"setPermissions", password: getCookie("password"), username: getCookie("username"), permissions:JSON.stringify(perms), changeUsername: this.username},
            dataType: 'json',
            success: s=>{
                if(s["success"]){
                    this.permissions = perms;
                    this.updatePermsField();
                }else{
                    alert("Etwas ist schief gelaufen!");
                }
            },
            error: e=>alert("Du brauchst die Berechtigung user.permission.set")
        });
    }

    addPermission(perm){
        if(User.INSTANCE == null || !User.INSTANCE.hasPermission(Permission.USER_PERMISSION_ADD)){
            alert("Du brauchst die Berechtigung user.permission.add");
            return;
        }
        if(this.hasPermission(perm))return;
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data: { method:"addPermission", password: getCookie("password"), username: getCookie("username"), permission:perm, changeUsername: this.username},
            dataType: 'json',
            success: s=>{
                if(s["success"]){
                    this.permissions.push(perm);
                    this.updateList();
                }else{
                    alert("Etwas ist schief gelaufen!");
                }
            },
            error: e=>alert("Du brauchst die Berechtigung user.permission.add")
        });
    }

    removePermission(perm){
        if(User.INSTANCE == null || !User.INSTANCE.hasPermission(Permission.USER_PERMISSION_REMOVE)){
            alert("Du brauchst die Berechtigung user.permission.remove");
            return;
        }
        if(!this.hasPermission(perm))return;
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data: { method:"removePermission", password: getCookie("password"), username: getCookie("username"), permission:perm, changeUsername: this.username},
            dataType: 'json',
            success: s=>{
                if(s["success"]){
                    for(let i = 0; i < this.permissions.length; i++){
                        if(this.permissions[i] == perm){
                            this.permissions.splice(i, 1);
                            this.updateList();
                        }
                    }
                }else{
                    alert("Etwas ist schief gelaufen!");
                }
            },
            error: e=>alert("Du brauchst die Berechtigung user.permission.remove")
        });
    }

    setPassword(old, newP){
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data: { method:"changePassword", password: getCookie("password"), username: getCookie("username"), new:newP, old:old, targetUserName: this.username},
            dataType: 'json',
            success: s=>{
                if(s["success"]){
                    alert("Password Successfully changed!");
                }else{
                    alert("Etwas ist schief gelaufen!");
                }
            },
            error: e=>alert("Es gab einen fehler!")
        });
    }

    overridePassword(newP){
        if(User.INSTANCE == null || !User.INSTANCE.hasPermission(Permission.USER_PASSWORD_SET)){
            alert("Du brauchst die Berechtigung user.password.set");
            return;
        }
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data: { method:"changePassword", password: getCookie("password"), username: getCookie("username"), new:newP, targetUserName: this.username},
            dataType: 'json',
            success: s=>{
                if(s["success"]){
                    alert("Password Successfully changed!");
                }else{
                    alert("Etwas ist schief gelaufen!");
                }
            },
            error: e=>alert("Du brauchst die Berechtigung user.password.set")
        });
    }

    hasPermission(perm){
        let val = "";
        if(perm instanceof Permission){
            val = perm.getValue()
        }else{
            val = perm;
        }
        if(this.permissions.includes("*"))return true;

        if(val == "user"){
            for(let p of this.permissions){
                if(p.includes("user"))return true;
            }
            return false;
        }

        return this.permissions.includes(val);
    }

    removeUser() {
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data: { method:"removeUser", password: getCookie("password"), username: getCookie("username"), newUserName: this.username},
            dataType: 'json',
            success: s=>{
                if(s["success"]){
                    let reload = confirm("User successfully removed! You have to reload the page!");
                    if(reload){
                        location.reload();
                    }
                }else{
                    alert("Etwas ist schief gelaufen!");
                }
            },
            error: e=>alert("Etwas ist schief gelaufen!")
        });
    }

}

User.INSTANCE = null;