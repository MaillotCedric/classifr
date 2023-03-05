$.ajax({
    type: "GET",
    url: "../api/image",
    success: (data) => {
        afficher(data);
    },
    error: () => {
        afficher("error");
    }
});
