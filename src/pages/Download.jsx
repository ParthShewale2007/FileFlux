import logo from "../assets/Fileflux1.png";

export default function Download() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-8 rounded-xl border text-center w-80">
        <div className="px-8 py-6 flex items-center">
              <img
                src={logo}
                alt="FileFlux Logo"
                className="h-10 object-contain"
              />
      </div>
        <p className="text-sm text-gray-500 mb-2">
          Game Play shared the file with you
        </p>

        <p className="font-medium mb-4">
          📄
        </p>

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md mb-4"
        />

        <button className="w-full bg-gray-300 py-2 rounded-md">
          Download
        </button>
      </div>
    </div>
  );
}



// export default function Download() {
//   return <h1>Download Page</h1>;
// }
