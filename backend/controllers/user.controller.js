const userRepository = require('../repositories/user.repository');
const AppError = require('../errors/AppError');

const userController = {
  getProfile,
  updateProfile,
  deleteProfile
};

async function getProfile(req, res, next) {
  try {
    const user = await userRepository.findById(req.user.id);
    if (!user) throw new AppError('Utilisateur introuvable', 404);

    res.json({ user });
  } catch (err) {
    next(err);
  }
}

async function updateProfile(req, res, next) {
  try {
    const { name, email } = req.body;

    if (email) {
      const existing = await userRepository.findByEmail(email);
      if (existing && existing.id !== req.user.id) {
        throw new AppError('Cet email est déjà utilisé', 409);
      }
    }

    const updated = await userRepository.update(req.user.id, { name, email });
    res.json({ user: updated });
  } catch (err) {
    next(err);
  }
}

async function deleteProfile(req, res, next) {
  try {
    await userRepository.remove(req.user.id);
    res.json({ message: 'Compte supprimé avec succès.' });
  } catch (err) {
    next(err);
  }
}

module.exports = userController;
