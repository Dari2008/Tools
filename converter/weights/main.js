function recalculateValues() {
    let vals = Object.values(Weights);
    let weightType = Weights[document.getElementById("weight").options[document.getElementById("weight").selectedIndex].text.toUpperCase()];
    let value = document.getElementById("inputW").value.replace(/\D/g, "");
    for(let a of vals){
        let r = Weights.convert(value, weightType, a);
        document.getElementById(a.getDisplayName()).value = r;
    }
    document.getElementById("inputW").value = value;
}