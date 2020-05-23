let roleSpans = document.querySelectorAll(".role");
roleSpans.forEach(e => e.innerText = sessionStorage.user);

let tableNameElement = document.querySelectorAll(".tableName");
tableNameElement.forEach(e => {
  e.onclick = () => {
    console.log(e.innerText.replace(/\s+/g,''));
  };
});