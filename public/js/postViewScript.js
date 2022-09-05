const bt_show_answer = document.getElementById('answer_button');
bt_show_answer.onclick = () => {
  if (bt_show_answer.textContent === 'Ответить в тред') {
    bt_show_answer.textContent = 'Закрыть форму постинга';
    const form = document.getElementById('answer_to_thread');
    form.style = 'display: block';
    form.scrollIntoView();
  } else {
    bt_show_answer.textContent = 'Ответить в тред';
    document.getElementById('answer_to_thread').style = 'display: none';
  }
};

async function reportPost(threadId, postId) {
  const reason = prompt('Reason:');
  if (!reason) return;
  const report = {
    threadId,
    postId,
    reason,
  };
  const response = await fetch('/reports', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(report),
  });
}

const replyToPostShowForm = (postId) => {
  document.getElementById('answer_button').textContent = 'Закрыть форму постинга';
  const form = document.getElementById('answer_to_thread');
  form.style = 'display: block';
  form.scrollIntoView();
  document.getElementById('reply_to_input').value = postId;
};
