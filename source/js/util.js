const ALERT_SHOW_TIME = 3000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '10';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '20px';
  alertContainer.style.top = '20px';
  alertContainer.style.right = '20px';
  alertContainer.style.padding = '0';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'green';
  alertContainer.style.color = 'white';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { showAlert };
