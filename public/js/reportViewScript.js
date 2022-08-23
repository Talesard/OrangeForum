async function verdictReportedPost(reportId, postId, verdict) {
  if (!verdict) return;
  const verdictData = {
    reportId,
    postId,
    verdict,
  };
  console.log(verdictData);
  const response = await fetch('/reports', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(verdictData),
  });
  const respJson = await response.json();
  return respJson;
}

async function deleteReportedPost(reportId, postId) {
  if (!postId || !reportId) return;
  await verdictReportedPost(reportId, postId, 'delete');
  if (resp.status === 'fail') {
    alert('failed');
  } else if (resp.status === 'ok') {
    location.reload();
  }
}

async function passReportedPost(reportId, postId) {
  if (!postId || !reportId) return;
  const resp = await verdictReportedPost(reportId, postId, 'pass');
  if (resp.status === 'fail') {
    alert('failed');
  } else if (resp.status === 'ok') {
    location.reload();
  }
}
