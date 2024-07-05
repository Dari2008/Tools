class Permission{
    constructor(value, apply = ()=>{}, options=[]){
        this.value = value;
        this.options = options;
        this.apply = apply;
    }

    getValue(){
        return this.value;
    }

    getOptions(){
        return this.options;
    }

    apply(){

    }
}

// User Permissions
Permission.USER_ADD = new Permission("user.add", () => removeElements(["addUser"]));
Permission.USER_REMOVE = new Permission("user.remove", () => removeElements(["removeUser"]));
Permission.USER_PERMISSION_ADD = new Permission("user.permission.add", () => removeElements(["add"]));
Permission.USER_PERMISSION_SET = new Permission("user.permission.set", () => removeElements(["set"]));
Permission.USER_PERMISSION_REMOVE = new Permission("user.permission.remove", () => removeElements(["remove"]));
Permission.USER_PERMISSION_RESET = new Permission("user.permission.reset", () => removeClass(["resetPermissionBtn"]));
Permission.USER_ROLE_SET = new Permission("user.role.set", () => removeElements(["roleSet"]));
Permission.USER_PASSWORD_SET = new Permission("user.password.set", () => removeElements(["passwordSettings", "editPassword"]));
Permission.USER_GET = new Permission("user.get", () => removeElements(["userEditor", "usersDiv"]));
Permission.USER_SOME = new Permission("user", () => removeElements(["users"]));

Permission.ALL = new Permission("*", ()=>{});

// Tab Permissions
Permission.TAB_NOTIFICATIONS = new Permission("tab.notifications", () => removeElements([]));

Permission.TAB_MATHEMATICS = new Permission("tab.mathematics", () => removeElements(["mathematics", "btnMathematics"]), { divName: "mathematics" });
Permission.TAB_CHEMISTRY = new Permission("tab.chemistry", () => removeElements(["chemistry", "btnChemistry"]), { divName: "chemistry" });
Permission.TAB_CONVERTER = new Permission("tab.converter", () => removeElements(["converter", "btnConverter"]), { divName: "converter" });
Permission.TAB_FORMCREATOR = new Permission("tab.formCreator", () => removeElements(["formCreator", "btnFormCreator"]), { divName: "formCreator" });
Permission.TAB_GRADECALCULATOR = new Permission("tab.gradeCalculator", () => removeElements(["gradeCalculator", "gradeCalculatorBtn"]), { divName: "gradeCalculator" });
Permission.TAB_ADMINAGTIMING = new Permission("tab.adminAgTiming", () => removeElements(["adminAg", "btnAdminAg"]), { divName: "adminAg" });

Permission.TAB_HOMEWORK = new Permission("tab.homework", () => removeElements(["homework", "btnHomework"]), { divName: "homework" });
Permission.TAB_HOMEWORK_SETTINGS = new Permission("tab.homework.settings", () => removeElements(["homeworkSettings"]), { divName: "homeworkSettings" });

Permission.TAB_EXAMS = new Permission("tab.exams", () => removeElements(["exams", "btnExams"]), { divName: "exams" });
Permission.TAB_EXAMS_SETTINGS = new Permission("tab.exams.settings", () => removeElements(["examSettings"]), { divName: "examSettings" });

Permission.STRING_PERMISSIONS = []

let all = Object.values(Permission);

for(let a of all){
    if(a == Permission.STRING_PERMISSIONS)continue;
    Permission.STRING_PERMISSIONS.push(a.getValue());
}

// Funktion zum Entfernen von Elementen basierend auf IDs
function removeElements(ids) {
    ids.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.remove();
        }
    });
}

function removeClass(cls){
    cls.forEach(className => {
        const elements = document.getElementsByClassName(className);
        if (elements) {
            for(let e of elements){
                if(!e)continue;
                e.remove();
            }
        }
    });
}