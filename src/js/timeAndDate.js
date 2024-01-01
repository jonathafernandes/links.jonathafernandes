function updateDateTime() {
    const currentDateTime = new Date();
    
    let day = currentDateTime.getDate();
    let month = currentDateTime.getMonth() + 1;
    let year = currentDateTime.getFullYear();

    let hours = currentDateTime.getHours();
    let minutes = currentDateTime.getMinutes();
    let seconds = currentDateTime.getSeconds();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const formattedDate = month + '/' + day + '/' + year;
    const formattedTime = hours + ':' + minutes + ':' + seconds;

    const date = document.getElementById('date');
    date.innerHTML = formattedDate;

    const time = document.getElementById('time');
    time.innerHTML = formattedTime;
}

setInterval(updateDateTime, 1000);

updateDateTime();