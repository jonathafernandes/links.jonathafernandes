let isModalOpen = false;

export function toggleModal() {
    var modal = document.getElementById("myModal");
    isModalOpen = !isModalOpen;

    if (isModalOpen) {
        modal.style.display = "block";
    } else {
        modal.style.display = "none";
    }
}

    function closeModal() {
        const modal = document.getElementById("myModal");
        modal.style.display = "none";
        isModalOpen = false;
    }

    window.addEventListener("click", function(event) {
        const modal = document.getElementById("myModal");
        if (event.target === modal) {
            closeModal();
    }
});