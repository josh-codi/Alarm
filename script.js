const selectMenu = document.querySelectorAll("select"),
    content = document.querySelectorAll(".content"),
    currentTime = document.querySelectorAll("h1"),
    setAlarmBtn = document.querySelectorAll("button");

let alarmTime = '',
    isAlarmSet = false,
    ringtone = new Audio("./audio.mp3");


for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = document.createElement("option");
    option.setAttribute("value", `${i}`);
    option.innerHTML = i;
    selectMenu[0].firstElementChild.insertAdjacentElement("afterend", option)
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = document.createElement("option");
    option.setAttribute("value", `${i}`);
    option.innerHTML = i;
    selectMenu[1].firstElementChild.insertAdjacentElement("afterend", option)
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? 'AM' : 'PM';
    let option = document.createElement("option");
    option.setAttribute("value", `${ampm}`);
    option.innerHTML = ampm;
    selectMenu[2].firstElementChild.insertAdjacentElement("afterend", option)
}

setInterval(() => {
    let date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = "AM";

    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }

    h = h == 0 ? h = 12 : h;

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime[0].innerText = `${h}:${m}:${s} ${ampm}`;
    

    if (alarmTime === `${h}:${m} ${ampm}`) {
        content[0].classList.add("disable");
        ringtone.play();
        ringtone.loop = true;
    }

}, 1000);

function setAlarm() {
    // ringtone.play();
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content[0].classList.remove("disable");
        setAlarmBtn[0].innerText = "Set Alarm";
        return isAlarmSet = false;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!")
    }
    isAlarmSet = true;
    alarmTime = time;
    content[0].classList.add("disable");
    setAlarmBtn[0].innerText = 'Clear Alarm'
}

setAlarmBtn[0].addEventListener("click", setAlarm)