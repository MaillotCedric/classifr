document.getElementById("input-file-image").addEventListener("change", (event) => {
    let src = URL.createObjectURL(event.target.files[0]);

    document.getElementById("image-preview-container").innerHTML = `
        <img id="image-preview" class="img-thumbnail" src="`+ src +`" alt="image preview">
    `;
});
