// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-brown; icon-glyph: magic;
let MAX_SIZE = 7;
let SPACER_SIZE = null;
let rows = [];
var username = "/////********username********//////";
var password = "/////********password********//////";
if(config.runsInWidget){
    if(args.widgetParameter == "Homeworks"){
        let widget = new ListWidget();
        widget.refreshAfterDate = new Date((new Date()).getTime() + 60*60*1000);
        await createAllRows(widget);
        Script.setWidget(widget);
        
        widget.presentExtraLarge();
    }else{
        let widget = new ListWidget();
        widget.refreshAfterDate = new Date((new Date()).getTime() + 60*60*1000);
        await createAllExamRows(widget);
        Script.setWidget(widget);	
        
        widget.presentExtraLarge();
    }
}else{
    
    let table = new UITable();
    
	await loadAll(table);
    
    QuickLook.present(table, true);
}

Script.complete();

async function createAllExamRows(widget){
    let exams = await loadExams();
    let currentExams = [];
    const currentDate = new Date();

    for (let exam of exams) {
        if (!exam.written && exam.date) {
            const examDate = new Date(exam.date);
            
            if (examDate > currentDate) {
                const timeDifference = examDate.getTime() - currentDate.getTime();
                const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

                exam.remainingDays = remainingDays;
                currentExams.push(exam);
            }
        }
    }
	let size = currentExams.length;
    
    currentExams.sort(function(a, b){
       return a.remainingDays - b.remainingDays;
    });
    
    let mainStack = widget.addStack();
    
    mainStack.layoutHorizontally();
    
    let fachRow = mainStack.addStack();
    mainStack.addSpacer(null);
    let wannRow = mainStack.addStack();
    mainStack.addSpacer(null);
    let remainingDaysRow = mainStack.addStack();
    
    fachRow.layoutVertically();
    remainingDaysRow.layoutVertically();
    wannRow.layoutVertically();
    
    
    
    if(size > 0){
        createHeaderRow(fachRow, remainingDaysRow, wannRow);
        for(let i = 0; i < (size>3?3:size); i++){
            let exam = currentExams[i];
            createExamRow(fachRow, remainingDaysRow, wannRow, exam);
        }
    }else{
    	let text = widget.addText("Es gibt aktuell keine Arbeiten!");
        text.font = Font.systemFont(40);
        text.centerAlignText();
    }
    
    function createHeaderRow(fachRow, remDRow, wannRow){
        
        let fach = fachRow.addText("Fach");
        fachRow.addSpacer(SPACER_SIZE);
        
        let remDays = remDRow.addText("Verbleibende Tage");
        remDRow.addSpacer(SPACER_SIZE);
        
        let wann = wannRow.addText("Wann");
        wannRow.addSpacer(SPACER_SIZE);
        
        fach.textColor = Color.dynamic(new Color("#000000"), new Color("#FFFFFF"));
        wann.textColor = Color.dynamic(new Color("#000000"), new Color("#FFFFFF"));
        remDays.textColor = Color.dynamic(new Color("#000000"), new Color("#FFFFFF"));
        
        fach.lineLimit = 1;
        wann.lineLimit = 1;
        remDays.lineLimit = 1;
        
        fach.font = Font.systemFont(20);
        wann.font = Font.systemFont(20);
        remDays.font = Font.systemFont(20);
        
    }
    
    function createExamRow(fachRow, remainingDaysRow, wannRow, exam){
        
        
        let df = new DateFormatter();
        df.useNoTimeStyle();
        df.useLongDateStyle();
        let dateObj = new Date(exam.date);
        
        let fach = fachRow.addText(exam.fach);
        fachRow.addSpacer(SPACER_SIZE);
        
        
        let remainingDays = remainingDaysRow.addText(exam.remainingDays + "");
        remainingDaysRow.addSpacer(SPACER_SIZE);
        
        
        let date = wannRow.addText(df.string(dateObj));
        wannRow.addSpacer(SPACER_SIZE);
        
        fach.lineLimit = 1;
        remainingDays.lineLimit = 1;
        date.lineLimit = 1;
        
        
        
        fach.textColor = Color.dynamic(new Color("#686868"), new Color("#ADADAD"));
        date.textColor = Color.dynamic(new Color("#686868"), new Color("#ADADAD"));
        remainingDays.textColor = Color.dynamic(new Color("#686868"), new Color("#ADADAD"));

        
    }
}

async function loadAll(table){
    let allHomeworks = await getAllCurrentHomeworks();
    let i = 0;
    for(let h of allHomeworks){
        createRow(table, h.fach, h.aufgabe, h.bisWann, h.id, i%2==0);
        i++;
    }
}

function createRow(table, fach, aufgabe, bisWann, id, isSecond){
    let row = new UITableRow();
    row.id = id;
    let fachText = row.addText(fach);
    let aufgabeText = row.addText(aufgabe);
    let bisWannText = row.addText(bisWann);
    let markAsRed = row.addButton("Erledigt");
    
    fachText.leftAligned();
    aufgabeText.centerAligned();
    bisWannText.rightAligned();
    markAsRed.rightAligned();
    
    markAsRed.onTap = function(){
       	markAsRead(id);
        table.removeRow(row);
        for(let i = 0; i < rows.length; i++){
            if(rows[i] === row){
                rows.splice(i, 1);
                break;
            }
        }
        let s = 0;
        for(let r of rows){
            if(s%2==0)r.backgroundColor = Color.dynamic(new Color("#B5B5B5", 50), new Color("#262626", 255));
            else r.backgroundColor = null;
            s++;
        }
        table.reload();
    };
        
    if(isSecond)row.backgroundColor = Color.dynamic(new Color("#B5B5B5", 50), new Color("#262626", 255));
        
    table.addRow(row);
    rows.push(row);
    return row;
}

function markAsRead(id){
    let homeworkFeed = new Request("https://tools.frobeen.com/serverCodeForTransferToJava/main.php");
	homeworkFeed.body = "username=" + username + "&password=" + password + "&method=markAsRead&id=" + id;
	homeworkFeed.method = "POST";
	homeworkFeed.timeoutInterval = 60;
    try{
        let result = homeworkFeed.loadJSON();
    }catch(ex){
        let alert = new Alert();
        alert.message = "Es gab einen fehler beim als Erledigt makrieren!";
        alert.title = "Es gab einen Fehler";
        alert.present();
    }
}


async function createAllRows(widget){
    let currentExercises = await getAllCurrentHomeworks();
    
    let mainStack = widget.addStack();
    
    mainStack.layoutHorizontally();
    
    let fachRow = mainStack.addStack()
    mainStack.addSpacer(null);
    let aufgabenRow = mainStack.addStack();
    mainStack.addSpacer(null);
    let bisWannRow = mainStack.addStack();
    
    fachRow.layoutVertically();
    aufgabenRow.layoutVertically();
    bisWannRow.layoutVertically();
    
	let size = currentExercises.length;
    
    if(size > 0){
        createHeaderRow(fachRow, aufgabenRow, bisWannRow);
    }
    
    if(size >= MAX_SIZE){
    	for(let i = 0; i < MAX_SIZE; i++){
            let ex = currentExercises[i];
            createRow(fachRow, aufgabenRow, bisWannRow, ex.fach, ex.aufgabe, ex.bisWann);
     	}
        createOverflowRow(fachRow, aufgabenRow, bisWannRow);
    }else if(size > 0){
    	for(let ex of currentExercises){
            createRow(fachRow, aufgabenRow, bisWannRow, ex.fach, ex.aufgabe, ex.bisWann);
     	}
    }else{
        let text = widget.addText("Es gibt aktuell keine Hausaufgaben!");
        text.font = Font.systemFont(40);
        text.centerAlignText();
    }

    function createOverflowRow(fachRow, aufgabenRow, bisWannRow){
    	let others = createRow(fachRow, aufgabenRow, bisWannRow, "", "Weitere...", "");
    	others.url = "scriptable:///run/WidgetsForHomeworkAndExams?openEditor=false";
    }
    
    function createHeaderRow(fachRow, aufgabenRow, bisWannRow){
        let rowStack = widget.addStack();
        rowStack.setPadding(10, 0, 10, 0);
        rowStack.layoutHorizontally();
        
        let fach = fachRow.addText("Fach");
        fachRow.addSpacer(SPACER_SIZE);
        let aufgabe = aufgabenRow.addText("Aufgabe");
        aufgabenRow.addSpacer(SPACER_SIZE);
        let bisWann = bisWannRow.addText("Bis Wann");
        bisWannRow.addSpacer(SPACER_SIZE);
        
        fach.lineLimit = 1;
        aufgabe.lineLimit = 1;
        bisWann.lineLimit = 1;
        
        fach.textColor = Color.dynamic(new Color("#000000"), new Color("#FFFFFF"));
        aufgabe.textColor = Color.dynamic(new Color("#000000"), new Color("#FFFFFF"));
        bisWann.textColor = Color.dynamic(new Color("#000000"), new Color("#FFFFFF"));
        
        return rowStack;
    }
    
    function createRow(fachRow, aufgabenRow, bisWannRow, fachString, aufgabeString, bisWannString){
        
        
        let fach = fachRow.addText(fachString);
        fachRow.addSpacer(SPACER_SIZE);
        let aufgabe = aufgabenRow.addText(aufgabeString);
        aufgabenRow.addSpacer(SPACER_SIZE);
        let bisWann = bisWannRow.addText(bisWannString);
        bisWannRow.addSpacer(SPACER_SIZE);
        
        fach.lineLimit = 1;
        aufgabe.lineLimit = 1;
        bisWann.lineLimit = 1;
        
        fach.textColor = Color.dynamic(new Color("#686868"), new Color("#ADADAD"));
        aufgabe.textColor = Color.dynamic(new Color("#686868"), new Color("#ADADAD"));
        bisWann.textColor = Color.dynamic(new Color("#686868"), new Color("#ADADAD"));
        
        
    }
}

    
function nextDay(aktuellesDatum, zielWochentag) {
  const wochentage = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const aktuellerWochentag = wochentage[new Date(aktuellesDatum).getDay()];
  const tageBisZiel = (zielWochentag + 7 - wochentage.indexOf(aktuellerWochentag)) % 7;
  const nexterDatum = new Date(aktuellesDatum);
  nexterDatum.setDate(nexterDatum.getDate() + tageBisZiel);
  return nexterDatum;
}
    
function loadExercises(){
    let homeworkFeed = new Request("https://tools.frobeen.com/serverCodeForTransferToJava/main.php");
	homeworkFeed.body = "username=" + username + "&password=" + password + "&method=getExercises";
	homeworkFeed.method = "POST";
	homeworkFeed.timeoutInterval = 120;
	return homeworkFeed.loadJSON();
}
    
function loadExams(){
    let homeworkFeed = new Request("https://tools.frobeen.com/serverCodeForTransferToJava/main.php");
	homeworkFeed.body = "username=" + username + "&password=" + password + "&method=getExams";
	homeworkFeed.method = "POST";
	homeworkFeed.timeoutInterval = 120;
	return homeworkFeed.loadJSON();
}

async function getAllCurrentHomeworks(){
    let exercises = await loadExercises();
    
    if(exercises == null){
        let alert = new Alert();
        alert.title = "Es gab einen Fehler!";
        alert.message = error;
        alert.present();
    }else{
        let currentExercises = [];
        for (let exercise of exercises) {
            if (exercise.erledigt === true) continue;
    
            // Überprüfen, ob bisWann gesetzt ist und in der Zukunft liegt
            if (exercise.bisWann) {
                let w = exercise.bisWann;
                if(w == "Mo" || w == "Di" || w == "Mi" || w == "Do" || w == "Fr" || w == "Sa" || w == "So"){
                    let currentDate = new Date();
                    let date = nextDay(currentDate, w);
        
                    if (date > currentDate) {
                        // Berechnen der verbleibenden Tage
                        let timeDifference = date.getTime() - currentDate.getTime();
                        let remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
        
                        // Hinzufügen der verbleibenden Tage zur exercise-Instanz
                        exercise.remainingDays = remainingDays;
                    }
                }else{
                    // Formatierung des Datums
                    let dateParts = exercise.bisWann.split(".");
                    let formattedDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        				
                    let currentDate = new Date();
        
                    if (formattedDate > currentDate) {
                        // Berechnen der verbleibenden Tage
                        let timeDifference = formattedDate.getTime() - currentDate.getTime();
                        let remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
        
                        // Hinzufügen der verbleibenden Tage zur exercise-Instanz
                        exercise.remainingDays = remainingDays;
                    }else{
                        continue;
                    }
                }
            }
            
    
            currentExercises.push(exercise);
        }
        return currentExercises;
    }
    return [];
}