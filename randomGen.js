document.addEventListener("DOMContentLoaded", function () {
    const h1El = document.querySelector("#head h1");
    const h1Text = h1El.textContent;
    h1El.innerHTML = h1Text
        .split("")
        .map((char, i) => {
            if (char === " ") return " "; // preserve spaces
            return `<span class="jiggle-char" style="animation-delay: ${i * 0.06}s">${char}</span>`;
        })
        .join("");
    
    const nameEl = document.getElementById("name");
    const names = ["이 편지는 영국에서 시작되어…", "다른 사람인 척 하기", "온갖 곳에 구글리 아이 붙이기", "화장실 두루마리 휴지에 메시지 쓰기", "쿠션과 옷으로 가짜 사람 만들기"];
    let shuffled = [...names].sort(() => Math.random() - 0.5);
    let index = 0;

    const chars = "";

    function confetti() {
        const colors = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff922b", "#cc5de8"];
        const rect = nameEl.getBoundingClientRect(); // get position of name text
        const originX = rect.left + rect.width / 2;  // center of the text
        const originY = rect.top + rect.height / 2;

        for (let i = 0; i < 60; i++) {
            const el = document.createElement("div");
            const angle = Math.random() * 360; // random direction
            const distance = Math.random() * 150 + 50; // how far it flies
            const dx = Math.cos(angle * Math.PI / 180) * distance;
            const dy = Math.sin(angle * Math.PI / 180) * distance;

            el.style.cssText = `
                position: fixed;
                width: ${Math.random() * 8 + 5}px;
                height: ${Math.random() * 8 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${originX}px;
                top: ${originY}px;
                border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
                pointer-events: none;
                z-index: 9999;
                opacity: 1;
                transition: transform ${Math.random() * 0.5 + 0.5}s ease-out, opacity ${Math.random() * 0.3 + 0.5}s ease-out;
            `;
            document.body.appendChild(el);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    el.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random() * 720}deg)`;
                    el.style.opacity = "0";
                });
            });
            setTimeout(() => el.remove(), 1500);
        }
    }

    function burst() {
    nameEl.classList.remove("burst");
    void nameEl.offsetWidth;
    nameEl.classList.add("burst");
    }

    const barContainer = document.getElementById("loading-bar-container");
    const bar = document.getElementById("loading-bar");

    function load(finalText) {
        nameEl.textContent = "😙";
        barContainer.style.opacity = "1";
        bar.style.width = "0%";

        // Start growing the bar
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                bar.style.width = "100%";
            });
        });

        // When bar finishes, reveal text and burst
        setTimeout(() => {
            nameEl.textContent = finalText;
            burst();
            confetti();
            // Fade bar out
            barContainer.style.opacity = "0";
            setTimeout(() => { bar.style.width = "0%"; }, 200);
        }, 650); // match this to the bar's transition duration
    }

    window.generateStats = function () {
        if (index >= shuffled.length) {
            shuffled = [...names].sort(() => Math.random() - 0.5);
            index = 0;
        }
        const next = shuffled[index];
        index++;
        load(next);
    };
});
