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
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  function handleUpload() {
    if (!file) return;

    navigate("/uploaded", {
      state: {
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      },
    });
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Upload File</h1>

      {/* Drag & Drop Box */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition
          ${dragOver ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-white"}
        `}
      >
        <p className="text-gray-600 mb-2">
          Drag & drop your file here
        </p>
        <p className="text-sm text-gray-400 mb-4">or</p>

        <label className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md text-sm cursor-pointer">
          Browse File
          <input
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {file && (
          <p className="mt-4 text-sm text-gray-700">
            Selected: <strong>{file.name}</strong>
          </p>
        )}
      </div>

      {/* Upload Button */}
      <div className="flex justify-center mt-6">
      <button
        onClick={handleUpload}
        disabled={!file}
        className={`px-6 py-2 rounded-md text-white text-sm font-medium
        ${file ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"}
        `}
      >
    Upload
  </button>
</div>

    </>
  );
}
