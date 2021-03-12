const FILE_TYPES = ['jpg', 'jpeg', 'png', 'svg'];
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const avatarChooser = document.querySelector('.ad-form-header__input');
const adPhotoPreview = document.querySelector('.ad-form__photo');
const adPhotoChooser = document.querySelector('#images');

avatarChooser.onchange = () => {
  const avatarFile = avatarChooser.files[0];
  const avatarName = avatarFile.name.toLowerCase();

  const avatarMatches = FILE_TYPES.some((it) => {
    return avatarName.endsWith(it);
  });

  if (avatarMatches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(avatarFile);
  }
};

adPhotoChooser.onchange = () => {
  const adPhotoFile = adPhotoChooser.files[0];
  const adPhotoName = adPhotoFile.name.toLowerCase();

  const adPhotoMatches = FILE_TYPES.some((it) => {
    return adPhotoName.endsWith(it);
  });

  if (adPhotoMatches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      adPhotoPreview.innerHTML = '';
      const newAdPhoto = document.createElement('img');
      newAdPhoto.src = reader.result;
      newAdPhoto.width = 60;
      newAdPhoto.height = 60;
      newAdPhoto.style.marginLeft = '5px';
      newAdPhoto.style.marginTop = '5px';
      adPhotoPreview.appendChild(newAdPhoto);
    });

    reader.readAsDataURL(adPhotoFile);
  }
};
