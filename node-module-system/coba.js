function cetakNama(nama) {
  return `manen is ${nama}. `;
}

class Orang {
  constructor() {
    console.log("object orang");
  }
}

const mahasiswa = {
  nama: "Aku",
  umur: 25,
  cetakMhs() {
    return `halo nama saya ${this.nama}, umur saya ${this.umur} tahun. `;
  },
};

module.exports = { Orang, cetakNama, mahasiswa };
