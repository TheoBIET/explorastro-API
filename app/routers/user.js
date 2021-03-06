const express = require("express");

const router = express.Router();
const { userController, followController, searchController } = require("../controllers");
const { userMiddleware, rateLimit } = require("../middlewares");

router
  /**
   * Get informations about a user by his id
   * @route GET /api/v1/user/1
   * @group User - Operations about users
   * @param {integer} id.param.required - The id of the user.
   * @returns {User.model} 200 - An object containing the user's information
   * @returns {Error.model}  default - An object containing the error message
   * @security JWT
   */
  .get(
    "/:id(\\d+)",
    userMiddleware.checkIfExists,
    userController.getInformations
  )

  /**
   * Search user by name
   * @route GET /api/v1/user/search
   * @group User - Operations about users
   * @param {string} name.param.required - The name of the researched user
   * @returns {User.model} 200 - An object containing the user's information
   * @returns {Error.model}  default - An object containing the error message
   * @security JWT
   */
  .get("/search", searchController.searchUserByName)

  /**
   * Update informations about a user by his id
   * @route PATCH /api/v1/user/1/update
   * @group User - Operations about users
   * @param {integer} id.param.required - The id of the user.
   * @param {string} firstname - Firstname
   * @param {string} lastname - Lastname
   * @param {string} email - Email
   * @param {avatar_url} avatar_url - Avatar URL
   * @param {string} bio - Bio
   * @param {string} city - City
   * @param {string} zipcode - ZipCode
   * @param {string} twitter - Twitter Username
   * @param {string} instagram - Instagram Username
   * @param {string} facebook - Facebook Username
   * @param {string} tiktok - TikTok Username
   * @param {string} astrobin - Astrobin Username
   * @returns {User.model} 200 - An object containing the updated user's information
   * @returns {Error.model}  default - An object containing the error message
   * @security JWT
   */
  .patch(
    "/:id(\\d+)/update",
    rateLimit.updateProfile,
    userMiddleware.checkPermissions,
    userMiddleware.checkIfExists,
    userController.update
  )

  /**
   * Update user's password by his id
   * @route PATCH /api/v1/user/1/update/password
   * @group User - Operations about users
   * @param {integer} id.param.required - The id of the user.
   * @param {string} old_password.body.required - Old password
   * @param {string} new_password.body.required - The new password you want to set
   * @returns {Object} 200 - An object containing a success message
   * @returns {Error.model}  default - An object containing the error message
   * @security JWT
   */
  .patch(
    "/:id(\\d+)/update/password",
    rateLimit.updatePassword,
    userMiddleware.checkPermissions,
    userMiddleware.checkIfExists,
    userController.updatePassword
  )

  /**
   * Update user's password by his id
   * @route PATCH /api/v1/user/1/update/username
   * @group User - Operations about users
   * @param {integer} id.param.required - The id of the user.
   * @param {string} username.body.required - The new username you want to set
   * @param {string} password.body.required - The password
   * @returns {Object} 200 - An object containing a success message
   * @returns {Error.model}  default - An object containing the error message
   * @security JWT
   */
  .patch(
    "/:id(\\d+)/update/username",
    rateLimit.updateUsername,
    userMiddleware.checkPermissions,
    userMiddleware.checkIfExists,
    userController.updateUsername
  )

  /**
   * Update user's avatar
   * @route PUT /api/v1/user/1/update/avatar
   * @group User - Operations about users
   * @param {integer} id.param.required - The id of the user.
   * @param {file} file.body.required - The file you want to set as avatar (only jpg/png/gif/webp)
   * @returns {Object} 200 - An object containing a success message
   * @returns {Error.model}  default - An object containing the error message
   * @security JWT
   */
  .put(
    "/:id(\\d+)/update/avatar",
    rateLimit.updateAvatar,
    userMiddleware.checkPermissions,
    userMiddleware.checkIfExists,
    userController.updateAvatar
  )

  /**
   * Delete a user by his id
   * @route DELETE /api/v1/user/1/delete
   * @group User - Operations about users
   * @param {integer} id.param.required - The id of the user.
   * @param {string} password.body.required - The password
   * @returns {Object} 200 - An object containing a success message
   * @returns {Error.model}  default - An object containing the error message
   * @security JWT
   */
  .delete(
    "/:id(\\d+)/delete",
    userMiddleware.checkPermissions,
    userMiddleware.checkIfExists,
    userController.delete
  )

  /**
   * Follow a user by his id
   * @route POST /api/v1/user/:id/follow/:toFollowId
   * @group User - Operations about users
   * @param {integer} id.param.required - The id of the user.
   * @returns {Object} 200 - An object containing a success message
   * @returns {Error.model}  default - An object containing the error message
   * @security JWT
   */
  .post(
    "/:id(\\d+)/follow/:toFollowId(\\d+)",
    userMiddleware.checkPermissions,
    userMiddleware.checkIfExists,
    followController.follow
  )

  /**
   * Unfollow a user by his id
   * @route DELETE /api/v1/user/:id/unfollow/:toUnfollowId
   * @group User - Operations about users
   * @param {integer} id.param.required - The id of the user.
   * @returns {Object} 200 - An object containing a success message
   * @returns {Error.model}  default - An object containing the error message
   * @security JWT
   */
  .delete(
    "/:id(\\d+)/unfollow/:toUnfollowId(\\d+)",
    userMiddleware.checkPermissions,
    userMiddleware.checkIfExists,
    followController.unfollow
  );

module.exports = router;
