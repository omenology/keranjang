import barang from "./barang";
import user from "./user";
import keranjang from "./keranjang";

user.hasMany(keranjang, {
  constraints: true,
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

keranjang.belongsTo(barang, {
  constraints: true,
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});

export { barang, user, keranjang };
