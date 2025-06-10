import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    perfil: '',
    oferta: '',
    cvBase: '',
    nombre: '',
    empresa: ''
  });
  const [resultados, setResultados] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResultados(null);
    setError('');

    try {
      const res = await fetch('/api/adaptar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Error en la respuesta del servidor');

      const data = await res.json();
      setResultados(data);
    } catch (err) {
      setError('❌ Ocurrió un error al generar los documentos. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-xl rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Adaptador de CV con IA</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre completo"
            className="w-full border rounded p-2"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="empresa"
            placeholder="Nombre de la empresa"
            className="w-full border rounded p-2"
            onChange={handleChange}
            required
          />

          <textarea
            name="perfil"
            placeholder="Perfil profesional"
            rows={3}
            className="w-full border rounded p-2"
            onChange={handleChange}
            required
          />

          <textarea
            name="oferta"
            placeholder="Texto de la oferta laboral"
            rows={4}
            className="w-full border rounded p-2"
            onChange={handleChange}
            required
          />

          <textarea
            name="cvBase"
            placeholder="Tu CV base sin formato (texto plano)"
            rows={6}
            className="w-full border rounded p-2"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            {loading ? 'Generando con IA...' : 'Adaptar con IA'}
          </button>
        </form>

        {loading && <p className="text-center mt-4 text-blue-500">⌛ Procesando, por favor espera...</p>}
        {error && <p className="text-center mt-4 text-red-600">{error}</p>}

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
