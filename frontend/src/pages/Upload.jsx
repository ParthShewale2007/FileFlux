// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Upload() {
//   const [file, setFile] = useState(null);
//   const navigate = useNavigate();

//   function handleUpload() {
//     if (!file) return;

//     navigate("/uploaded", {
//       state: {
//         name: file.name,
//         size: file.size,
//         type: file.type,
//         url: URL.createObjectURL(file),
//       },
//     });
//   }

//   return (
//     <>
//       <h1 className="text-2xl font-semibold mb-6">Upload File</h1>

//       <input
//         type="file"
//         onChange={(e) => setFile(e.target.files[0])}
//         className="mb-4"
//       />

//       <button
//         onClick={handleUpload}
//         className="bg-blue-600 text-white px-6 py-2 rounded-md"
//       >
//         Upload
//       </button>
//     </>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  // Add new files without removing old ones
  function addFiles(newFiles) {
    setFiles((prev) => [...prev, ...Array.from(newFiles)]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  }

  async function handleUpload() {
  if (!files.length) return;

  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  await fetch("http://localhost:5000/api/upload", {
    method: "POST",
    body: formData,
  });

  const firstFile = files[0];
  navigate("/uploaded", {
    state: {
      name: firstFile.name,
      size: firstFile.size,
      type: firstFile.type,
      url: URL.createObjectURL(firstFile),
    },
  });
}



  function removeFile(index) {
    setFiles(files.filter((_, i) => i !== index));
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Upload Files</h1>

      {/* Drag & Drop Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-10 text-center transition
          ${dragOver ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-white"}
        `}
      >
        <p className="text-gray-600 mb-2">
          Drag & drop files here
        </p>

        <label className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md text-sm cursor-pointer">
          Browse Files
          <input
            type="file"
            multiple
            hidden
            onChange={(e) => addFiles(e.target.files)}
          />
        </label>
      </div>

      {/* Selected Files Preview */}
      {files.length > 0 && (
        <div className="mt-6">
          <p className="font-medium mb-2">
            Selected Files ({files.length})
          </p>

          <div className="bg-white border rounded-lg divide-y">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-gray-500">
                    {file.type || "Unknown type"}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-gray-600">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 text-xs hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleUpload}
          disabled={!files.length}
          className={`px-8 py-2 rounded-md text-white font-medium
            ${files.length ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"}
          `}
        >
          Upload {files.length > 0 && `(${files.length})`}
        </button>
      </div>
    </>
  );
}


