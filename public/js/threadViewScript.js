let add_thread_bt = document.getElementById("add_thread_bt");
add_thread_bt.onclick = () => {
    if (add_thread_bt.textContent === "Создать тред") {
        add_thread_bt.textContent = "Закрыть форму постинга";
        let form = document.getElementById('add_thread_form')
        form.style='display: block';
        let header = document.getElementById('main_header')
        header.scrollIntoView();
    } else {
        add_thread_bt.textContent = "Создать тред";
        document.getElementById('add_thread_form').style='display: none';
    }
}