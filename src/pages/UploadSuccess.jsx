import { useLocation } from "react-router-dom";

export default function UploadSuccess() {
  const { state } = useLocation();

  if (!state) return <p>No file data found</p>;

  const { name, size, type, url } = state;
  const isImage = type?.startsWith("image");

  function copyLink() {
    navigator.clipboard.writeText("https://fileapp.io/f/demo123");
    alert("Link copied!");
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">
        File <span className="text-blue-600">Uploaded</span> Successfully
      </h1>

      <div className="max-w-xl bg-white rounded-xl p-8 border">
        {isImage && (
          <img
            src={url}
            alt="preview"
            className="w-48 mx-auto mb-6 rounded-md"
          />
        )}

        <p className="font-medium text-center">{name}</p>
        <p className="text-sm text-gray-500 text-center mb-6">
          {(size / 1024 / 1024).toFixed(2)} MB · {type}
        </p>

        <div className="flex gap-2 mb-6">
          <input
            readOnly
            value="https://fileapp.io/f/demo123"
            className="flex-1 px-4 py-2 border rounded-md bg-gray-50 text-sm"
          />
          <button
            onClick={copyLink}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
          >
            Copy
          </button>
        </div>
      </div>
    </>
  );
}
