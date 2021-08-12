import barang from "./barang";
import user from "./user";
import keranjang from "./keranjang";

user.hasMany(keranjang, {
  constraints: true,
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

barang.belongsTo(keranjang, {
  constraints: true,
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

export const models = {
  barang,
  user,
  keranjang,
};
