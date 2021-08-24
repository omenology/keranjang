import { user, barang, keranjang } from "../data/models";

// sync db with model
export const syncModels = async () => {
  await user.sync({ force: true });
  await barang.sync({ force: true });
  await keranjang.sync({ force: true });
};

export const TOKEN_LIFE = process.env.TOKEN_LIFE || 8; // hour
export const TOKEN_SECREAT = process.env.TOKEN_SECREAT || "tokenscreat123";
