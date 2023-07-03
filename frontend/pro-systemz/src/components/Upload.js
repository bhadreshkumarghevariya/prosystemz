const Upload = () => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      //Make http request to upload file
      fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.file.path);
          return data.file.path;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="upload">
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default Upload;
