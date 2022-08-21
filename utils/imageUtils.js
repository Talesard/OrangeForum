const crypto = require('crypto');

const isImageFile = (image) => {
  const imageExtensions = ['png', 'jpg', 'jpeg', 'webp', 'gif'];
  const ext = image.mimetype.split('/')[1];
  return imageExtensions.indexOf(ext) !== -1;
};

const uniqueImageName = (image) => {
  const hash = crypto.createHash('md5').update(image.data).digest('hex');
  const ext = image.mimetype.split('/')[1];
  const time = Math.floor(Date.now() / 1000);
  return `${hash}${time}.${ext}`;
};

module.exports = { isImageFile, uniqueImageName };
