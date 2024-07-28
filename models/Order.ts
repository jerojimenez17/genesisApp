import Product from "@/models/Product";

export enum Status {
  pendiente = "pendiente",
  confirmado = "confirmado",
  entregado = "entregado",
}
export enum PaidStatus {
  pago = "pago",
  inpago = "inpago",
}

export default class Order {
  id = "";
  products: Product[] = [];
  date = new Date();
  total = 0;
  status: Status = Status.pendiente;
  paidStatus: PaidStatus = PaidStatus.inpago;
}
