function recalculateValues() {
    let vals = Object.values(TimeType);
    let timeType = TimeType[document.getElementById("timeType").options[document.getElementById("timeType").selectedIndex].text.toUpperCase()];
    let value = document.getElementById("input").value.replace(/\D/g, "");
    for(let a of vals){
        let r = TimeType.convert(value, timeType, a);
        document.getElementById(a.getDisplayName()).value = r;
    }
    
    document.getElementById("input").value = value;
}