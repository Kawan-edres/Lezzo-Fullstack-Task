export const getBase64 = (file, setImage) => {
  return new Promise((resolve) => {
    let baseURL = "";

    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    reader.onload = () => {
      // Make a fileInfo Object
      // console.log("Called", reader);
      baseURL = reader.result;
      setImage(baseURL);
      resolve(baseURL);
    };
  });
};
