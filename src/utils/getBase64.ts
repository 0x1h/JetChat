type callbackType = string | ArrayBuffer | null

export const getBase64 = async (url: string, callback: (dataUrl: callbackType) => void) => {
  var xhr = new XMLHttpRequest();
  xhr.onload = () => {
    var reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', `https://cors-anywhere.herokuapp.com/${url}`);
  xhr.responseType = 'blob';
  xhr.send();
}

// toDataURL(image_url, (dataUrl) => dataUrl)

//dataUrl return base64 string of image