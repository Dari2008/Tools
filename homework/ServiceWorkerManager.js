class ServiceWorkerManager{
    static registerServiceWorker(){
        navigator.serviceWorker.register("./sw.js");
    }

    static requestNotificationPermission(success=()=>{}){
        ServiceWorkerManager.registerServiceWorker();

        Notification.requestPermission().then(e=>{
            if(e === "granted"){
                navigator.serviceWorker.ready.then(function(e){
                    e.pushManager.getSubscription().then(function(s){
                        if(s === undefined){

                        }else{
                            navigator.serviceWorker.getRegistration().then(function(e){
                                e.pushManager.subscribe({

                                    userVisibleOnly:true,
                                    applicationServerKey: "BLWKe9pIQa2mHgqh2eI4b_a-XgZFbFyvLqRA3-eUtKehdXtRGuqjIVKfkBmhm8ZtcMF_q0oEPKBVjZyqF9KzTdg"
                                
                                }).then(function(ee){
                                    ServiceWorkerManager.addAuth(ee.toJSON());
                                });
                            });
                        }
                    });
                });
                success();
            }
        });
    }

    static addAuth(sub){
        $.ajax({
            url: Variables.MAIN_PHP_HOMEWORK_EXAMS,
            type: "POST",
            data: { method:"addAuthData", password: getCookie("password"), username: getCookie("username"), data:JSON.stringify(sub), info:JSON.stringify(navigator.userAgent.toString())},
            dataType: 'json',
            success: s=>{
                if(s["success"]){
                    getAllDevicesAndAdd();
                }else{
                    alert("Es gab einen fehler beim hinzufügen eines Devices!", AlertType.ERROR, 2500, 250);
                }
            },
            error: e=>console.log(e)
        });
    }
}

ServiceWorkerManager.MAIN_PHP = Variables.MAIN_PHP_HOMEWORK_EXAMS;
//http://localhost:2356/test/web-push/main.php