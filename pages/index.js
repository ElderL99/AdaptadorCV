import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ perfil: '', oferta: '', cvBase: '' });
  const [resultados, setResultados] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResultados(null);

    const res = await fetch('/api/adaptar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setResultados(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-xl rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Adaptador de CV con IA</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-semibold">Perfil profesional:</label>
            <textarea
              name="perfil"
              rows={4}
              className="w-full border rounded p-2"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-semibold">Oferta laboral:</label>
            <textarea
              name="oferta"
              rows={4}
              className="w-full border rounded p-2"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-semibold">CV base:</label>
            <textarea
              name="cvBase"
              rows={6}
              className="w-full border rounded p-2"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            {loading ? 'Generando...' : 'Adaptar con IA'}
          </button>
        </form>

        {loading && (
          <p className="text-center mt-4 text-blue-600 font-medium">🧠 Procesando con IA, un momento...</p>
        )}

        {resultados && (
          <div className="mt-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">✅ CV Adaptado</h2>
              <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{resultados.cvAdaptado}</pre>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">📄 Carta de Presentación</h2>
              <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{resultados.carta}</pre>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">✉️ Correo Profesional</h2>
              <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{resultados.email}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
