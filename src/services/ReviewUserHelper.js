/**
 * Transormes the userObject into useable Object.
 *
 * @param {Object} userObject - Contains reviewer information.
 * @returns {Object} - Filtered object
 */
export function ReviewUserHelper(userObject) {
  if (!userObject) {
    return {};
  }

  return {
    username: userObject.username,
    avatar: userObject.avatar,
    full_name: userObject.full_name,
  };
}
