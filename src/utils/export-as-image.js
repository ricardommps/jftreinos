import html2canvas from 'html2canvas';

const exportAsImage = async (element, imageFileName, setLoading, onSuccess) => {
  const html = document.getElementsByTagName('html')[0];
  const body = document.getElementsByTagName('body')[0];
  let htmlWidth = html.clientWidth;
  let bodyWidth = body.clientWidth;

  const newWidth = element.scrollWidth - element.clientWidth;

  if (newWidth > element.clientWidth) {
    htmlWidth += newWidth;
    bodyWidth += newWidth;
  }

  html.style.width = htmlWidth + 'px';
  body.style.width = bodyWidth + 'px';

  const canvas = await html2canvas(element);
  const image = canvas.toDataURL('image/png', 1.0);
  downloadImage(image, imageFileName, setLoading, onSuccess);
  html.style.width = null;
  body.style.width = null;
};

const downloadImage = (blob, fileName, setLoading, onSuccess) => {
  const fakeLink = window.document.createElement('a');
  fakeLink.style = 'display:none;';
  fakeLink.download = fileName;

  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);
  setLoading(false);
  onSuccess();
  fakeLink.remove();
};

export default exportAsImage;
