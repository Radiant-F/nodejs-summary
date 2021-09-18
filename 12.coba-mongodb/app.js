const { ObjectID, ObjectId } = require("bson");
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const dbName = "cobadatabase";

client.connect((error, client) => {
  if (error) {
    return console.log("Koenksi gagal!");
  }

  // pilih nama database
  const db = client.db(dbName);

  // Membuat satu data
  //   db.collection("mahasiswa").insertOne(
  //     {
  //       nama: "Aing",
  //       email: "aing@gmail.com",
  //     },
  //     (error, result) => {
  //       if (error) {
  //         return console.log("Data gagal ditambah!");
  //       }

  //       console.log(result);
  //     }
  //   );

  // Membuat banyak data
  //   db.collection("mahasiswa").insertMany(
  //     [
  //       {
  //         nama: "Siswa",
  //         email: "siswa@gmail.com",
  //       },
  //       {
  //         nama: "Siswi",
  //         email: "siswi@gmail.com",
  //       },
  //     ],
  //     (error, result) => {
  //       if (error) {
  //         return console.log(error);
  //       }

  //       console.log(result);
  //     }
  //   );

  // Membaca data di koleksi database
  //   console.log(
  //     db
  //       .collection("mahasiswa")
  //       .find()
  //       .toArray((error, result) => {
  //         console.log(result);
  //       })
  //   );

  // Membaca data di koleksi database dengan kriteria
  //   console.log(
  //     db
  //       .collection("mahasiswa")
  //       .find({ _id: ObjectID("614558179ebd4ad27b044df8") })
  //       .toArray((error, result) => {
  //         console.log(result);
  //       })
  //   );

  // Memperbarui data di koleksi database
  //   const updateData = db
  //     .collection("mahasiswa")
  //     .updateOne(
  //       { _id: ObjectID("614558179ebd4ad27b044df8") },
  //       { $set: { nama: "Nama Diedit Lagi" } }
  //     );
  //   updateData
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log(error));

  // Memperbarui lebih dari satu data di koleksi database
  //   const updateData = db
  //     .collection("mahasiswa")
  //     .updateMany({ nama: "Siswa" }, { $set: { nama: "Siswa Teladan" } });
  //   updateData
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log(error));

  // Menghapus data
  //   db.collection("mahasiswa")
  //     .deleteOne({ _id: ObjectID("6145577902afb7edfcf07312") })
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log(error));
});
