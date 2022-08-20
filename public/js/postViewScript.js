let bt_show_answer = document.getElementById("answer_button");
bt_show_answer.onclick = () => {
    if (bt_show_answer.textContent === "Ответить в тред") {
        bt_show_answer.textContent = "Закрыть форму постинга";
        let form = document.getElementById('answer_to_thread')
        form.style='display: block';
        form.scrollIntoView();
    } else {
        bt_show_answer.textContent = "Ответить в тред";
        document.getElementById('answer_to_thread').style='display: none';
    }
}
