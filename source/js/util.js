const ALERT_SHOW_TIME = 3000;

const showAlert = (message) => {
  const alertConteiner = document.createElement('div');
  alertConteiner.style.zIndex = 10;
  alertConteiner.style.position = 'absolute';
  alertConteiner.style.left = '20px';
  alertConteiner.style.top = '20px';
  alertConteiner.style.right = '20px';
  alertConteiner.style.padding = 0;
  alertConteiner.style.fontSize = '30px';
  alertConteiner.style.textAlign = 'center';
  alertConteiner.style.backgroundColor = 'green';
  alertConteiner.style.color = 'white';
  alertConteiner.textContent = message;

  document.body.append(alertConteiner);

  setTimeout(() => {
    alertConteiner.remove();
  }, ALERT_SHOW_TIME);
};

export { showAlert };
