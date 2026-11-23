// 1. الموسيقى
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.innerText = '🎵';
        isPlaying = true;
    } else {
        bgMusic.pause();
        musicBtn.innerText = '🔇';
        isPlaying = false;
    }
}

// 2. التنقل بين الصفحات الـ 6
function goToStep(stepNum) {
    if (!isPlaying && bgMusic) {
        bgMusic.play().then(() => { isPlaying = true; }).catch(() => {});
    }

    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step${stepNum}`).classList.add('active');

    if (stepNum === 2) {
        revealSequentialLines();
    }

    if (stepNum === 6) {
        startFinalLetter();
    }
}

// 3. عداد العمر (1/9/2005)
const birthDate = new Date('2005-09-01T00:00:00');
function updateAgeCounter() {
    const now = new Date();
    const diff = now - birthDate;

    document.getElementById('years').innerText = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    document.getElementById('days').innerText = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
    document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
}
setInterval(updateAgeCounter, 1000);
updateAgeCounter();

// 4. إظهار السطور تحت بعضها بالتدريج (صفحة 2)
let linesRevealed = false;
function revealSequentialLines() {
    if (linesRevealed) return;
    linesRevealed = true;
    const lines = document.querySelectorAll('.seq-line');
    const nextBtn = document.getElementById('seqNextBtn');

    lines.forEach((line, idx) => {
        setTimeout(() => {
            line.classList.add('visible');
        }, (idx + 1) * 1100);
    });

    setTimeout(() => {
        nextBtn.style.opacity = '1';
        nextBtn.style.pointerEvents = 'auto';
    }, (lines.length + 1) * 1100);
}

// 5. رسمة Hello Kitty المتحركة (صفحة 3)
const kCanvas = document.getElementById('kittyCanvas');
if (kCanvas) {
    const ctx = kCanvas.getContext('2d');
    let eyeScale = 1, bowAngle = 0, isJumping = false, kittyY = 0, time = 0;

    function drawKitty() {
        ctx.clearRect(0, 0, kCanvas.width, kCanvas.height);
        ctx.save();
        ctx.translate(kCanvas.width / 2, kCanvas.height / 2 + 18 + kittyY);

        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#3a3238';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.ellipse(0, 0, 78, 60, 0, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-55, -36); ctx.lineTo(-74, -74); ctx.lineTo(-28, -53);
        ctx.moveTo(55, -36); ctx.lineTo(74, -74); ctx.lineTo(28, -53);
        ctx.fill(); ctx.stroke();

        ctx.fillStyle = '#3a3238';
        ctx.beginPath();
        ctx.ellipse(-34, 5, 7, 11 * eyeScale, 0, 0, Math.PI * 2);
        ctx.ellipse(34, 5, 7, 11 * eyeScale, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFCC00';
        ctx.beginPath();
        ctx.ellipse(0, 14, 8, 5.5, 0, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();

        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-55, 4); ctx.lineTo(-82, 0);
        ctx.moveTo(-57, 16); ctx.lineTo(-84, 18);
        ctx.moveTo(55, 4); ctx.lineTo(82, 0);
        ctx.moveTo(57, 16); ctx.lineTo(84, 18);
        ctx.stroke();

        ctx.save();
        ctx.translate(46, -46);
        ctx.rotate(bowAngle);
        ctx.fillStyle = '#b56576';
        ctx.beginPath();
        ctx.arc(-18, 0, 16, 0, Math.PI * 2);
        ctx.arc(18, 0, 16, 0, Math.PI * 2);
        ctx.arc(0, 0, 11, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        ctx.restore();

        ctx.restore();
    }

    function animateKitty() {
        time += 0.05;
        bowAngle = Math.sin(time) * 0.12;
        if (Math.random() < 0.015) eyeScale = 0.1;
        else eyeScale += (1 - eyeScale) * 0.2;
        kittyY = isJumping ? Math.sin(time * 3.5) * 18 : 0;
        drawKitty();
        requestAnimationFrame(animateKitty);
    }
    animateKitty();

    kCanvas.addEventListener('click', (e) => {
        isJumping = true;
        popHearts(e);
        setTimeout(() => { isJumping = false; }, 1200);
    });
}

// 6. رسمة Pinkie Pie المتحركة (صفحة 5)
const pCanvas = document.getElementById('pinkieCanvas');
if (pCanvas) {
    const pCtx = pCanvas.getContext('2d');
    let pTime = 0;

    function animatePinkie() {
        pTime += 0.08;
        const bounce = Math.abs(Math.sin(pTime)) * -14;
        pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
        pCtx.save();
        pCtx.translate(pCanvas.width / 2, pCanvas.height / 2 + 10 + bounce);

        pCtx.fillStyle = '#FF99C8';
        pCtx.strokeStyle = '#b56576';
        pCtx.lineWidth = 3;
        pCtx.beginPath();
        pCtx.arc(0, 0, 40, 0, Math.PI * 2);
        pCtx.fill(); pCtx.stroke();

        pCtx.fillStyle = '#d81b60';
        pCtx.beginPath();
        pCtx.arc(-22, -30, 24, 0, Math.PI * 2);
        pCtx.arc(8, -36, 28, 0, Math.PI * 2);
        pCtx.arc(28, -24, 20, 0, Math.PI * 2);
        pCtx.fill();

        pCtx.fillStyle = '#00B4D8';
        pCtx.beginPath();
        pCtx.ellipse(10, -4, 9, 14, 0, 0, Math.PI * 2);
        pCtx.fill();

        pCtx.restore();
        requestAnimationFrame(animatePinkie);
    }
    animatePinkie();
}

// 7. الشمعة والتورتة
function toggleCandle() {
    const flame = document.getElementById('flame');
    const hint = document.getElementById('cakeHint');
    flame.classList.toggle('lit');
    if (flame.classList.contains('lit')) {
        hint.innerText = "الشمعة نورت بنورك يا إيمو! اتمني أمنية حلوة ✨🎂";
        celebrateFinal();
    } else {
        hint.innerText = "المسي الشمعة ونوري عيد ميلادك يا إيمو! 🕯️";
    }
}

// 8. الخطاب الطويل في الصفحة الأخيرة (غزل خفيف وشيك لبداية تعارف)
const longLetter = `إيمو.. ✨\n\nيمكن عيد ميلادك عدى بكام يوم، بس بصراحة في ناس وجودهم يستاهل يتحتفل بيه في أي وقت مش في يوم واحد بس.\n\nمن وقت ما بدأنا نتكلم وأنا ملاحظ فيكي هدوء ورقة بتخلي أي كلام معاكي مريح وممتع.. عندك حضور لطيف وضحكة بتخلي اليوم كله يروق.\n\nحبيت أعملك الحاجة البسيطة دي كتهنئة متأخرة شوية، وعشان أقولك إنك بجد شخصية مميزة وتستاهلي كل حاجة حلوة.\n\nكل سنة وأنتِ طيبة وبألف خير يا أجمل بنت في برج العذراء.. ويا رب السنة دي تكون مليانة نجاح وأيام شبه ضحكتك. 🤍✨`;

let letterStarted = false;
function startFinalLetter() {
    if (letterStarted) return;
    letterStarted = true;
    const target = document.getElementById('finalLetterText');
    target.innerHTML = "";
    let i = 0;

    function typeNext() {
        if (i < longLetter.length) {
            target.innerHTML += longLetter.charAt(i);
            i++;
            setTimeout(typeNext, 35);
        }
    }
    typeNext();
}

// 9. التفاعلات والحيوانات العائمة
function chirpEffect(el) {
    el.style.transform = 'scale(1.4) rotate(15deg)';
    setTimeout(() => { el.style.transform = ''; }, 300);
    const rect = el.getBoundingClientRect();
    for (let i = 0; i < 8; i++) spawnCreature(rect.left + 20, rect.top);
}

function popHearts(e) {
    for (let i = 0; i < 8; i++) {
        spawnCreature(e.clientX + (Math.random() * 50 - 25), e.clientY + (Math.random() * 50 - 25), '💖');
    }
}

function createFloatingCreatures() {
    const container = document.getElementById('floating-creatures');
    const icons = ['🦋', '🕊️', '✨', '🌸', '🤍'];
    for (let i = 0; i < 15; i++) {
        const el = document.createElement('div');
        el.className = 'bg-creature';
        el.innerText = icons[i % icons.length];
        el.style.left = Math.random() * 95 + 'vw';
        el.style.top = Math.random() * 95 + 'vh';
        el.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(el);
    }
}
createFloatingCreatures();

function spawnCreature(x, y, customIcon) {
    const icons = ['🦋', '🕊️', '✨', '🤍', '🌸'];
    const s = document.createElement('div');
    s.className = 'mouse-trail';
    s.innerText = customIcon || icons[Math.floor(Math.random() * icons.length)];
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1100);
}

function celebrateFinal() {
    for (let i = 0; i < 28; i++) {
        setTimeout(() => {
            spawnCreature(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        }, i * 70);
    }
}

document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.12) spawnCreature(e.clientX, e.clientY);
});