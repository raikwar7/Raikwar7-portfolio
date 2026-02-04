document.addEventListener("DOMContentLoaded", () => {

    /* ================= TYPING ANIMATION ================= */
    const words = ["Problem Solver", "Software Developer", "Fresher"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById("typing");

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (!isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex++);
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex--);
        }

        if (charIndex === currentWord.length + 1) {
            isDeleting = true;
            setTimeout(typeEffect, 800);
            return;
        }

        if (charIndex === 0 && isDeleting) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(typeEffect, isDeleting ? 80 : 120);
    }

    typeEffect();


    /* ================= HAMBURGER MENU ================= */
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");

    hamburger.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
    });

});


// Scroll animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".hidden").forEach(el => observer.observe(el));
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete-btn")) {
        const projectId = e.target.dataset.id;
        deleteProject(projectId);
    }
});

function deleteProject(id) {
    if (!confirm("Are you sure you want to delete this project?")) return;

    fetch(`/delete_project/${id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const card = document.querySelector(`.project-card[data-id="${id}"]`);
                card.classList.add("remove");
                setTimeout(() => card.remove(), 400);
            } else {
                alert("Delete failed");
            }
        })
        .catch(err => console.error(err));
}