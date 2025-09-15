export function generateUnauthenticatedNavigationListTemplate() {
  return `
  <li><a href="#/add-story" class="hover:underline">Add Story</a></li>
      <li><a href="#/login" class="hover:underline">Login</a></li>
      <li><a href="#/register" class="hover:underline">Register</a></li>
    `;
}
export function generateAuthenticatedNavigationListTemplate() {
  return `
      <li><a href="#/home" class="hover:underline">Home</a></li>
      <li><a href="#/add-story" class="hover:underline">Add Story</a></li>
      <li id="user-container">
            <a id="logout-button" class="bg-red-500 rounded-lg text-white cursor-pointer" href="">Logout</a>
      </li>
    `;
}
