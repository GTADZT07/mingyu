// 私信区功能
const pmApi = 'http://66.112.211.213:5000/pm'; // 改成你的实际地址
let isAdmin = false; // 管理员登录后设为true

async function loadPMs() {
  const res = await fetch(pmApi);
  const data = await res.json();
  const box = document.getElementById('pmList');
  box.innerHTML = '';
  data.forEach(msg => {
    let html = `<div class=\"pm-msg${msg.deleted ? ' pm-deleted' : ''}\">` +
      `<div class=\"pm-meta\">${msg.from} | ${msg.timestamp}</div>` +
      `<div>${msg.deleted ? '（已删除）' : msg.content}</div>`;
    if (msg.reply_to) html += `<div style=\"color:var(--primary-color);font-size:0.95em;\">↪ 回复 #${msg.reply_to}</div>`;
    if (!msg.deleted) {
      html += `<div class=\"pm-actions\">`;
      if (msg.from === (localStorage.getItem('pmName') || '匿名')) {
        html += `<button class=\"pm-delete\" onclick=\"deletePM(${msg.id})\">删除</button>`;
      }
      if (isAdmin) {
        html += `<button class=\"pm-reply\" onclick=\"replyPM(${msg.id})\">回复</button>`;
      }
      html += `</div>`;
    }
    html += `</div>`;
    box.innerHTML += html;
  });
}
async function submitPM() {
  const content = document.getElementById('pmInput').value.trim();
  const from = document.getElementById('pmName').value.trim() || '匿名';
  const password = document.getElementById('pmPwd').value.trim();
  if (!content) return alert('内容不能为空');
  if (!password) return alert('请设置密保');
  localStorage.setItem('pmName', from);
  localStorage.setItem('pmPwd', password);
  await fetch(pmApi, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({content, from, password})
  });
  document.getElementById('pmInput').value = '';
  loadPMs();
}
async function deletePM(id) {
  const password = localStorage.getItem('pmPwd') || prompt('请输入密保');
  if (!password) return;
  await fetch(pmApi + '/delete', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id, password})
  });
  loadPMs();
}
async function replyPM(reply_to) {
  const content = prompt('输入回复内容');
  if (!content) return;
  await fetch(pmApi + '/reply', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({content, reply_to})
  });
  loadPMs();
}
document.addEventListener('DOMContentLoaded', loadPMs); 
