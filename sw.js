self.addEventListener("push", (event) => {
    const data = event.data.json();

    if(data.elements != undefined){
        let all = data.elements;

        for(let a of all){
            registration.showNotification(
                a.title,
                {
                    body: a.body,
                    icon: location.origin + "/favicon.ico"
                }
            )
        }
    }else{
        registration.showNotification(
            data.title,
            {
                body: data.body
            }
        )
    }

});


self.addEventListener("notificationclick", function(e){
    e.waitUntil(clients.openWindow("www.frobeen.com/tools/"));
});