function checkPerms(){
    let user = User.INSTANCE;
    if(user.hasPermission(Permission.ALL))return;
    let perms = Object.values(Permission);

    for(let perm of perms){
        if(perm == Permission.STRING_PERMISSIONS)continue;
        if(!user.hasPermission(perm))perm.apply();
    }
}