import Post from "../models/Post.model.js";
import mongoose from "mongoose";

class PostController {
  async createPost(req, res) {
    //création d'une annonce
    try {
      const author = req.user.id;
      const {
        type,
        title,
        sport,
        level,
        gender,
        dateStart,
        dateEnd,
        body,
        isActive,
        visibleByAll,
      } = req.body;
      const { address, city, postCode } = req.body.location;
      if (
        !type ||
        !title ||
        !sport ||
        !level ||
        !gender ||
        !dateStart ||
        !dateEnd ||
        !body ||
        !city ||
        !postCode ||
        isActive === undefined ||
        visibleByAll === undefined
      ) {
        return res.status(400).json({
          message: "Tous les champs sont obligatoires.",
        });
      }
      const newPost = new Post({
        type,
        author,
        title,
        sport,
        level,
        gender,
        dateStart,
        dateEnd,
        body,
        location: { address, city, postCode },
        isActive,
        visibleByAll,
      });

      await newPost.save();
      return res.status(201).json({ message: "Annonce créée.", post: newPost });
    } catch (error) {
      console.error("Create post error : ", error);
      res.status(500).json({ message: "Impossible d'enregistrer le post." });
    }
  }
  async updatePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Aucun post trouvé." });
      }
      if (!post.author || !req.user || !req.user.id) {
        return res
          .status(403)
          .json({ message: "Accès refusé (auteur inconnu)." });
      }
      if (post.author.toString() !== req.user.id.toString()) {
        return res.status(403).json({ message: "Accès refusé." });
      }

      const allowedFields = [
        "type",
        "title",
        "sport",
        "level",
        "gender",
        "dateStart",
        "dateEnd",
        "body",
        "isActive",
        "visibleByAll",
      ];

      const value = {};

      allowedFields.forEach((f) => {
        if (req.body[f] !== undefined) {
          value[f] = req.body[f];
        }
        if (req.body.location) {
          value.location = { ...post.location, ...req.body.location };
        }
      });

      const updatedPost = await Post.findByIdAndUpdate(
        { _id: req.params.id },
        value,
        { new: true }
      );

      res
        .status(200)
        .json({ message: "Post modifié avec succès.", post: updatedPost });
    } catch (error) {
      console.error("Update post error : ", error);
      res.status(500).json({ message: "Impossible de modifier le post." });
    }
  }
  async deletePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Aucun post trouvé." });
      }
      if (!post.author || !req.user || !req.user.id) {
        return res
          .status(403)
          .json({ message: "Accès refusé (auteur inconnu)." });
      }
      if (post.author.toString() !== req.user.id.toString()) {
        return res.status(403).json({ message: "Accès refusé." });
      }

      const deletedPost = await Post.findByIdAndDelete(req.params.id);

      res.status(200).json({ message: "Post supprimé." });
    } catch (error) {
      console.error("Delete post error : ", error);
      res.status(500).json({ message: "Impossible de supprimer le post." });
    }
  }
  async suspendPost(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      );
      if (!post) return res.status(404).json({ message: "Aucun post trouvé." });

      res.status(200).json({ message: "Post suspendu.", post });
    } catch (error) {
      console.error("Suspend post error : ", error);
      res.status(500).json({ message: "Impossible de suspendre le post." });
    }
  }
  async getPosts(req, res) {
    try {
      const { sportId, gender, level, locationCity, locationPC, title } =
        req.query;
      const whereConditions = {};
      console.log(sportId);
      if (sportId) {
        whereConditions.sport = sportId;
      }
      if (gender) {
        whereConditions.gender = gender;
      }
      if (level) {
        whereConditions.level = level;
      }
      if (locationCity) {
        whereConditions["location.city"] = locationCity;
      }
      if (locationPC) {
        whereConditions["location.postCode"] = locationPC;
      }
      if (title) {
        whereConditions.title = title;
      }
      const posts = await Post.find(whereConditions).populate('sport');
      res.status(200).json(posts);
    } catch (error) {
      console.error("Get posts error : ", error);
      res.status(500).json({ message: "Impossible d'afficher les posts" });
    }
  }
  async getPostById(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res
          .status(404)
          .json({ message: "Impossible d'afficher le post" });
      }
      res.status(200).json(post);
    } catch (error) {
      console.error("GetById post error : ", error);
      res.status(500).json({ message: "Impossible d'afficher le post" });
    }
  }
}

export default new PostController();
