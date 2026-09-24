const { generarListaPedidos, generarPedido } = require('../models/pedidos.model');

const listarPedidos = (req, res) => {
  const pedidos = generarListaPedidos(15);
  res.status(200).json(pedidos);
};

const obtenerPedidoPorId = (req, res) => {
  const pedido = generarPedido();
  pedido.id = req.params.id;
  res.status(200).json(pedido);
};

const crearPedido = (req, res) => {
  const nuevoPedido = { id: Date.now().toString(), ...req.body };
  res.status(201).json(nuevoPedido);
};

module.exports = { listarPedidos, obtenerPedidoPorId, crearPedido };
