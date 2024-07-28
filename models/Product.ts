export default class Product {
  id = "";
  cod = "";
  description = "";
  internCode = "";
  codeBar = "";
  brand = "";
  price = 0.0;
  salePrice = 0.0;
  gain = 0.0;
  unit = "unidades";
  image = "";
  amount: number = 0;
  last_update = new Date(Date.now());
  category = "";
}
