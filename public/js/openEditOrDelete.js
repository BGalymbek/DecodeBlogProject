function openMoreDetails(){
    const editOrDelete = document.querySelector('.edit-or-delete');

    editOrDelete.classList.toggle('active')
}

function openEditBlog(authorId, blogId){
    axios.get(`/editOrDelete/${authorId}`).then(response => {
        if (response.data === 'ok') {
            window.location.href = `/edit/${blogId}`;
        }
    }).catch(error => {
        alert(error.response.data);
    });
    console.log("AuthorID: " , authorId);
    console.log("BlogID: " , blogId);
}

function deleteBlog(authorId, blogId){
    axios.get(`/editOrDelete/${authorId}`).then(response => {
        if (response.data === 'ok') {
            window.location.href = `/edit/${blogId}`;
        }
    }).catch(error => {
        alert(error.response.data);
    });
    console.log("AuthorID: " , authorId);
    console.log("BlogID: " , blogId);
}