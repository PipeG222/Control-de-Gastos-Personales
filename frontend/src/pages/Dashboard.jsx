import React, { useEffect, useState } from "react";
import { getMovimientos, createMovimiento, fetchCategorias } from "../services/api";

const Dashboard = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    cargarMovimientos();
    cargarCategorias();
  }, []);

  const cargarMovimientos = async () => {
    const token = localStorage.getItem("token");
    const data = await getMovimientos(token);
    setMovimientos(data);
  };

  const cargarCategorias = async () => {
    const data = await fetchCategorias();
    setCategorias(data);
  };

  const handleFiltro = (e) => {
    setFiltro(e.target.value);
  };

  const movimientosFiltrados = filtro
    ? movimientos.filter((m) => m.id_categoria == filtro)
    : movimientos;

  const totalIngresos = movimientosFiltrados
    .filter((m) => m.tipo === "ingreso")
    .reduce((acc, m) => acc + Number(m.monto), 0);

  const totalGastos = movimientosFiltrados
    .filter((m) => m.tipo === "gasto")
    .reduce((acc, m) => acc + Number(m.monto), 0);

  const balance = totalIngresos - totalGastos;

  const handleCrearMovimiento = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    const data = {
      descripcion,
      monto: Number(monto),
      id_categoria: categoriaId,
      fecha,
    };
    console.log("Datos del movimiento:", data);

    const nuevo = await createMovimiento(data, token);
    setMovimientos([...movimientos, nuevo]);

    // Cerrar el modal
    document.querySelector("#crearMovimientoModal .btn-close").click();

    // Limpiar formulario
    setDescripcion("");
    setMonto("");
    setCategoriaId("");
    setFecha("");
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 className="mb-4 text-center">Resumen de Movimientos</h2>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <label htmlFor="categoria" className="form-label me-2">
                Filtrar por categoría:
              </label>
              <select
                className="form-select d-inline-block w-auto"
                id="categoria"
                value={filtro}
                onChange={handleFiltro}
              >
                <option value="">Todas</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre} ({cat.tipo})
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#crearMovimientoModal"
            >
              + Agregar Movimiento
            </button>
          </div>

          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Tipo</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {movimientosFiltrados.map((mov) => (
                <tr key={mov.id}>
                  <td>{mov.fecha}</td>
                  <td>{mov.descripcion}</td>
                  <td>{mov.categoria_nombre}</td>
                  <td>{mov.tipo}</td>
                  <td>${mov.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <p><strong>Total Ingresos:</strong> ${totalIngresos}</p>
            <p><strong>Total Gastos:</strong> ${totalGastos}</p>
            <p><strong>Balance:</strong> ${balance}</p>
          </div>
        </div>
      </div>

      {/* Modal de crear movimiento */}
      <div
        className="modal fade"
        id="crearMovimientoModal"
        tabIndex="-1"
        aria-labelledby="crearMovimientoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleCrearMovimiento}>
              <div className="modal-header">
                <h5 className="modal-title" id="crearMovimientoModalLabel">
                  Nuevo Movimiento
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Cerrar"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <input
                    type="text"
                    className="form-control"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Monto</label>
                  <input
                    type="number"
                    className="form-control"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Categoría</label>
                  <select
                    className="form-select"
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                    required
                  >
                    <option value="">Seleccione una</option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre} ({cat.tipo})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Fecha</label>
                  <input
                    type="date"
                    className="form-control"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
