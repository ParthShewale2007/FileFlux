export default function Files() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-1">My Files</h1>
      <p className="text-gray-500 mb-8">Total Files: 2</p>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left">File Name</th>
              <th>Type</th>
              <th>Size</th>
            </tr>
          </thead>

          <tbody>
            {["file1.png", "file2.png"].map((f) => (
              <tr key={f} className="border-b">
                <td className="px-6 py-4">{f}</td>
                <td>image/png</td>
                <td>0.7 MB</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
