function recalculateValues() {
    let vals = Object.values(FileSize);
    let weightType = FileSize[document.getElementById("size").options[document.getElementById("size").selectedIndex].text.toUpperCase()];
    let value = document.getElementById("inputS").value.replace(/\D/g, "");
    for(let a of vals){
        let r = FileSize.convert(value, weightType, a);
        document.getElementById(a.getDisplayName()).value = r;
    }
    document.getElementById("inputS").value = value;
}