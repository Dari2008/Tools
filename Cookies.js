function getCookie(cname) {
    cname = encodeURIComponent(cname);
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        
        if (c.indexOf(name) == 0) {
            // Entschlüsseln des Cookie-Werts unter Verwendung von CryptoJS
            let decryptedValue = CryptoJS.AES.decrypt(decodeURIComponent(c.substring(name.length, c.length)), navigator.userAgent);
            return decryptedValue.toString(CryptoJS.enc.Utf8);
        }
    }
    
    return ""; // Rückgabe eines leeren Strings, wenn das Cookie nicht gefunden wird
}

function setCookie(cname, cvalue, exdays) {
    // Verschlüsseln des Cookie-Werts unter Verwendung von CryptoJS
    let encryptedValue = CryptoJS.AES.encrypt(cvalue, navigator.userAgent).toString();
    cvalue = encodeURIComponent(encryptedValue);
    
    cname = encodeURIComponent(cname);
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    
    let expires = "expires=" + d.toUTCString();
    
    // Hinzufügen des Cookies zum Dokument
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=None;Secure=true";
}


function deleteCookie(cname){
    cname = encodeURIComponent(cname);
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;SameSite=None;Secure=true";
}