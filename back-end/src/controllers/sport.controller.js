import Sport from "../models/Sport.model.js";

class SportController {
  async createSport(req, res) {
    // création d'un sport
    try {
      const { name } = req.body;
      if (!name) {
        return res
          .status(400)
          .json({ message: "Tous les champs sont obligatoires" });
      }
      const sportExists = await Sport.findOne({ name }).collation({
        locale: "fr",
        strength: 1,
      });
      if (sportExists) {
        return res.status(400).json({ message: "Sport déjà créé." });
      }
      const newSport = new Sport({
        name,
      });
      await newSport.save();
      res.status(201).json({ message: "Sport créé." });
    } catch (error) {
      console.error("Create sport error : ", error);
      res.status(500).json({ message: "Impossible d'enregistrer le sport." });
    }
  }

  async updateSport(req, res) {
    // mise à jour d'un sport

    try {
      const sportExists = await Sport.findOne({
        name: req.body.name,
        _id: { $ne: req.params.id }, // opérateur + not equal
      }).collation({ locale: "fr", strength: 1 });
      if (sportExists) {
        return res.status(400).json({ message: "Sport déjà créé." });
      }

      const sport = await Sport.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
      );

      if (!sport) {
        return res.status(404).json({ message: "Aucun sport trouvé." });
      }
      res.json({
        message: "Sport modifié avec succès.",
        sport: { name: sport.name },
      });
    } catch (error) {
      console.error("Update sport error : ", error);
      res.status(500).json({ message: "Impossible de modifier le sport." });
    }
  }

  async deleteSport(req, res) {
    // suppression d'un sport
    try {
      const sport = await Sport.findByIdAndDelete(req.params.id);

      if (!sport) {
        return res.status(404).json({ message: "Aucun sport trouvé." });
      }
      res.status(200).json({ message: "Sport supprimé." });
    } catch (error) {
      console.error("Delete sport error : ", error);
      res.status(500).json({ message: "Impossible de supprimer le sport." });
    }
  }

  async getAllSports(req, res) {
    // afficher tous les sports
    try {
      const sports = await Sport.find()
        .collation({ locale: "fr", strength: 1 })
        .sort({ name: 1 });

      if (sports.length === 0) {
        return res.status(404).json({ message: "Aucun sport trouvé." });
      }

      res.status(200).json(sports);
    } catch (error) {
      console.error("GetAll sport error : ", error);
      res.status(500).json({ message: "Impossible d'afficher les sports" });
    }
  }

  async getSportById(req, res) {
    // afficher un sport avec son id
    try {
      const sport = await Sport.findById(req.params.id);

      if (!sport) {
        return res.status(404).json({ message: "Aucun sport trouvé." });
      }
      res.status(200).json(sport);
    } catch (error) {
      console.error("GetById sport error : ", error);
      res.status(500).json({ message: "Impossible d'afficher le sport" });
    }
  }
}

export default new SportController();
