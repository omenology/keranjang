import { user, barang, keranjang } from "../data/models";
export const syncModels = async () => {
  await user.sync({ force: true });
  await barang.sync({ force: true });
  await keranjang.sync({ force: true });
};
