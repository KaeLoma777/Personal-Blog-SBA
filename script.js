let posts = []; // This holds all blog posts.
let postToEdit = null; // This keeps track of which post is being edited.

//How to grab your elements from HTML (make sure the id matches).
const postForm = document.getElementById("postForm");
const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const postContainer = document.getElementById("posts");


//To load posts from the local storage and render the posts.
const savedPosts = localStorage.getItem("posts");
if (savedPosts) {
  posts = JSON.parse(savedPosts); //This will convert any string back to an object.
  renderPosts(); //This shows the post on the page.
}

//function to save all the posts to a local storage.
function savePostsToLocalStorage() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function renderPosts() { //shows the blog post on the page.
  postContainer.innerHTML = ""; //clears the blog post area for another blog entry.
  posts.forEach(function (post, index) {
    const postDiv = document.createElement("div"); //creates a new div for each post.
    
    //This adds title of the post, the content and allows the edit button and delete button.
 postDiv.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;
    
    //This allows you to edit your post when "edit" is clicked.
    const editBtn = postDiv.querySelector(".edit-btn");
    editBtn.addEventListener("click", function () {
      postTitle.value = post.title; //allows you to add your blog title.
      postContent.value = post.content; //allows you to add your blog content.
      postToEdit = index; //allows you to save the post you're currently editing.
    });

    const deleteBtn = postDiv.querySelector(".delete-btn");//finds the delete button inside the div and allows you to add the click event to this specific button.
    deleteBtn.addEventListener("click", function () { //adds the click event listener for the delet button and allows functionality of the delete button.
      const confirmed = confirm("Are you sure you want to delete this post?");//confirms with the poster if they want to delet a post.
      if (confirmed) { //if yes or true, then,
        posts.splice(index, 1); //removes the post from the array and, 
        savePostsToLocalStorage();// updates the local storage to remove the deleted post from storage, then,
        renderPosts(); //refreshes the page and sets it for a new post.
      }
    });

    postContainer.appendChild(postDiv); //Adds the updated info to the page.
  });
}


//listens for when the submit button is clicked to submit a post.
postForm.addEventListener("submit", function (event) {
  event.preventDefault(); //stops the page from reloading.

  const titleValue = postTitle.value.trim(); //gets the blogger's blog title and removes any unnecessary space from the beginning or end of the blog entry.
  const contentValue = postContent.value.trim(); //does the same thing but keeps it clean and avoids saving blank posts.

//This shows an alert if the post field is left empty.
  if (!titleValue || !contentValue) {
    alert("Please fill out the title and content fields.");
    return;
  }

  if (postToEdit !== null) { //This is a rule, if you're editing an existing post, make sure:
    posts[postToEdit].title = titleValue; //the title is updated.
    posts[postToEdit].content = contentValue; //the content is updated.
    postToEdit = null; // clears the area for a new post.
  } else { // or else, add a new post.
    posts.push({ title: titleValue, content: contentValue }); //Adds a new post.
  }

  savePostsToLocalStorage(); //saves the updated posts.
  renderPosts(); //shows the updated posts.
  postForm.reset(); //clears the entire post form and prepares for a new post entry.
});
