export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Tailwind Test</h1>
        <p className="text-gray-700 text-lg">If you see this styled, Tailwind is working!</p>
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
          ✅ Green background means Tailwind is working
        </div>
      </div>
    </div>
  );
}
