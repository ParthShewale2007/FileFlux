// import { useEffect, useState } from "react";

// export default function Files() {
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     const stored =
//       JSON.parse(localStorage.getItem("uploadHistory")) || [];
//     setHistory(stored);
//   }, []);

//   return (
//     <>
//       <h1 className="text-2xl font-semibold mb-1">
//         Upload History
//       </h1>

//       <p className="text-gray-500 mb-8">
//         Total Files: {history.length}
//       </p>

//       {history.length === 0 ? (
//         <p className="text-gray-500">
//           No uploads yet.
//         </p>
//       ) : (
//         <div className="bg-white rounded-xl border overflow-hidden">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50 border-b">
//               <tr>
//                 <th className="px-6 py-4 text-left">File</th>
//                 <th>Type</th>
//                 <th>Size</th>
//                 <th>Date</th>
//                 <th>Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {history.map((file, i) => (
//                 <tr key={i} className="border-b">
//                   <td className="px-6 py-4 font-medium">
//                     {file.name}
//                   </td>
//                   <td>{file.type}</td>
//                   <td>{file.size}</td>
//                   <td>{file.date}</td>
//                   <td className="text-green-600 font-medium">
//                     {file.status}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </>
//   );
// }

import { useEffect, useState } from "react";

export default function Files() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/files")
      .then((res) => res.json())
      .then((data) => setHistory(data));
  }, []);

  return (
    <>
      <h1 className="text-2xl font-semibold mb-1">Upload History</h1>
      <p className="text-gray-500 mb-8">
        Total Files: {history.length}
      </p>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left">File</th>
              <th>Type</th>
              <th>Size</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {history.map((file) => (
              <tr key={file._id} className="border-b">
                <td className="px-6 py-4 font-medium">
                  {file.filename}
                </td>
                <td>{file.mimetype}</td>
                <td>{file.size_mb} MB</td>
                <td>
                  {new Date(file.uploadedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
