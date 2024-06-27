const navBtns = document.querySelectorAll('.control');
const allSecs = document.querySelectorAll('.section');

function PageTransitions() {
    // Button click active class
    for (const btn of navBtns) {
        btn.addEventListener("click", (e) => {
            const currentBtn = document.querySelector('.actived-btn');
            currentBtn.className = currentBtn.className.replace("actived-btn", "");
            e.currentTarget.className += " actived-btn";
            // console.log(`${e.target.dataset.id}`);

            const id = e.currentTarget.dataset.id;
            for (const sec of allSecs) {
                sec.classList.remove('active');
                if (sec.id === id) {
                    sec.classList.add('active');
                }
            }
            
        })
    }


}

function renderProgressBar() {
    const allProgressBars = document.querySelectorAll(".progress-bar");
    for (const progressBar of allProgressBars) {
        const childs = progressBar.children;
        const p = childs[0];
        const span = childs[1].firstChild;
        span.style.width = p.textContent;
    }
}

PageTransitions();
renderProgressBar();