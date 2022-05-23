const express = require("express");
const { Historiesuser, Gameuser } = require("../models");
const router = express.Router();

//Session login

//Session home
router.get("/", (req, res) => {
  res.render("pages/home/index");
});

router.get("/home", (req, res) => {
  res.render("pages/home/index");
});

//Session Usergame

router.get("/gameusers/create", (req, res) => {
  res.render("pages/users/create", { pageTitle: "Create User Game" });
});

router.get("/gameusers", (req, res) => {
  const alertSuccess = req.flash("alertSuccess");
  Gameuser.findAll({
    order: [["name", "ASC"]],
  }).then((gameusers) => {
    res.render("pages/users/index", {
      pageTitle: " Daftar Biodata Table User",
      gameusers,
      alertSuccess,
    });
  });
});

//api get all data gameuser
router.get("/api/gameusers", (req, res) => {
  Gameuser.findAll({
    order: [["name", "ASC"]],
  }).then((gameusers) => {
    res.status(200).json(gameusers);
  });
});

router.get("/gameusers/:id", (req, res) => {
  Gameuser.findOne({
    where: { id: req.params.id },
  }).then((gameuser) => {
    res.render("pages/users/detail", {
      pageTitle: `User Game ${gameuser.name}`,
      gameuser,
    });
  });
});

router.get("/gameusers/:id/edit", (req, res) => {
  Gameuser.findOne({
    where: { id: req.params.id },
  }).then((gameuser) => {
    res.render("pages/users/edit", {
      pageTitle: "Edit Data Game User",
      gameuser,
    });
  });
});

router.put("/gameusers/:id", (req, res) => {
  let dateOfBirth;
  if (!req.body.tanggal_lahir) {
    dateOfBirth = null;
  } else {
    dateOfBirth = req.body.tanggal_lahir;
  }

  Gameuser.update(
    {
      name: req.body.name,
      placeOfBirth: req.body.tempat_lahir,
      dateOfBirth,
      address: req.body.alamat,
      email: req.body.email,
      phoneNumber: req.body.no_telepon,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then(() => {
    req.flash("alertSuccess", "Berhasil mengubah data game user");
    res.redirect("/gameusers");
  });
});

router.post("/gameuser", (req, res) => {
  let dateOfBirth;
  if (!req.body.tanggal_lahir) {
    dateOfBirth = null;
  } else {
    dateOfBirth = req.body.tanggal_lahir;
  }

  Gameuser.create({
    name: req.body.name,
    placeOfBirth: req.body.tempat_lahir,
    dateOfBirth,
    address: req.body.alamat,
    email: req.body.email,
    phoneNumber: req.body.no_telepon,
  }).then(() => {
    req.flash("alertSuccess"," Berhasil tambah data game user")
    res.redirect("/gameusers");
  });
});

// Api Create data gameuser
router.post("/gameuser/api/create", (req, res) => {
  const { name, placeOfBirth, dateOfBirth, address, email, phoneneNumber } =
    req.body;
  Gameuser.create({
    name: name,
    placeOfBirth: placeOfBirth,
    dateOfBirth: dateOfBirth,
    address: address,
    email: email,
    phoneNumber: phoneneNumber,
  }).then((gameusers) => {
    res.status(200).json(gameusers);
  });
});

router.delete("/gameusers/:id", (req, res) => {
  Gameuser.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    req.flash("alertSuccess","Berhasil menghapus data game user")
    res.redirect("back");
  });
});

//Session Historygame
router.get("/histories/create", (req, res) => {
  Gameuser.findAll().then((gamesuser) => {
    res.render("pages/history/create", {
      pageTitle: "Buat Histori Games",
      gamesuser,
    });
  });
});

router.get("/histories", (req, res) => {
  const alertSuccess = req.flash("alertSuccess");

  Historiesuser.findAll({
    include: ["gameuser"],
  }).then((historiusers) => {
    res.render("pages/history/index", {
      pageTitle: "Daftar table History",
      historiusers,
      alertSuccess,
    });
  });
});

router.get("/histories/:id", (req, res) => {
  Historiesuser.findOne({
    where: { id: req.params.id },
  }).then((historiuser) => {
    res.render("pages/history/detail", {
      pageTitle: `History Game`,
      historiuser,
    });
  });
});

router.post("/histories", (req, res) => {
  let joinDate;
  if (!req.body.joinDate) {
    joinDate = null;
  } else {
    joinDate = req.body.joinDate;
  }

  Historiesuser.create({
    idgameuser: req.body.id_user,
    nameOfGame: req.body.nama_game,
    level: req.body.level,
    joinDate,
  }).then(() => {
    req.flash("alertSuccess","Berhasil membuat Histori game user");
    res.redirect("/histories");
  });
});

router.get("/histories/:id/edit", (req, res) => {
  Historiesuser.findOne({
    where: { id: req.params.id },
  }).then((historiuser) => {
    res.render("pages/history/edit", {
      pageTitle: "Edit Data histori",
      historiuser,
    });
  });
});

router.put("/histories/:id", (req, res) => {
  let joinDate;
  if (!req.body.joinDate) {
    joinDate = null;
  } else {
    joinDate = req.body.joinDate;
  }

  Historiesuser.update(
    {
      idgameuser: req.body.id_user,
      nameOfGame: req.body.nama_game,
      level: req.body.level,
      joinDate,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then(() => {
    req.flash("alertSuccess","Berhasil mengubah data ");
    res.redirect("/histories");
  });
});

router.delete("/histories/:id", (req, res) => {
  Historiesuser.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    req.flash("alertSuccess","berhasil hapus data");
    res.redirect("back");
  });
});

module.exports = router;
