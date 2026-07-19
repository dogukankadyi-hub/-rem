// =========================
// İREMVERSE - main.js
// BÖLÜM 1
// =========================

// EKRANLAR
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

// BUTON
const startBtn = document.getElementById("startBtn");

// ALANLAR
const questionText = document.getElementById("questionText");
const answersDiv = document.getElementById("answers");
const questionCount = document.getElementById("questionCount");
const progressBar = document.getElementById("progressBar");

const resultTitle = document.getElementById("resultTitle");
const resultDescription = document.getElementById("resultDescription");

// DEĞİŞKENLER
let currentQuestion = 0;
let score = 0;
let selectedQuestions = [];

// =========================
// SORU HAVUZU
// =========================

const questionPool = [

{
question:"❤️ İrem'i seviyor musun?",
answers:[
"Biraz",
"Çok",
"Deliler gibi ❤️"
],
correct:2
},

{
question:"👑 Dünyanın en tatlı insanı kim?",
answers:[
"Bir başkası",
"Bilmiyorum",
"İrem"
],
correct:2
},

{
question:"😂 İrem sana ne yapsın istersin?",
answers:[
"Beni sevsin ❤️",
"Hiçbir şey",
"Dövsün yine razıyım 😂"
],
correct:0
},

{
question:"📱 En çok kimden mesaj gelsin istersin?",
answers:[
"Arkadaş",
"Aile",
"İrem"
],
correct:2
},

{
question:"🎂 İrem'in doğum günü ne olmalı?",
answers:[
"Normal gün",
"Parti",
"Resmî tatil 😂"
],
correct:2
}

];

// =========================
// DİZİ KARIŞTIR
// =========================

function shuffle(array){

for(let i=array.length-1;i>0;i--){

const j=Math.floor(Math.random()*(i+1));

[array[i],array[j]]=[array[j],array[i]];

}

return array;

}
// =========================
// İREMVERSE - main.js
// BÖLÜM 2
// =========================

// TEST İÇİN RASTGELE SORULARI HAZIRLA
function prepareQuestions(){

    selectedQuestions = [...questionPool];

    shuffle(selectedQuestions);

    // En fazla 20 soru göster
    selectedQuestions = selectedQuestions.slice(
        0,
        Math.min(20, selectedQuestions.length)
    );

}

// TESTİ BAŞLAT
startBtn.addEventListener("click",()=>{

    currentQuestion = 0;
    score = 0;

    prepareQuestions();

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();

});

// SORUYU GÖSTER
function showQuestion(){

    const q = selectedQuestions[currentQuestion];

    questionCount.innerHTML =
    `Soru ${currentQuestion+1} / ${selectedQuestions.length}`;

    progressBar.style.width =
    `${((currentQuestion)/selectedQuestions.length)*100}%`;

    questionText.innerHTML = q.question;

    answersDiv.innerHTML = "";

    q.answers.forEach((answer,index)=>{

        const btn = document.createElement("div");

        btn.className = "answer";

        btn.innerHTML = answer;

        btn.onclick = ()=>{

            if(index===q.correct){

                score++;

            }

            currentQuestion++;

            if(currentQuestion>=selectedQuestions.length){

                finishQuiz();

            }else{

                showQuestion();

            }

        };

        answersDiv.appendChild(btn);

    });

}// =========================
// İREMVERSE - main.js
// BÖLÜM 3
// =========================

// TESTİ BİTİR
function finishQuiz(){

    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    const percent = Math.round(
        (score / selectedQuestions.length) * 100
    );

    resultTitle.innerHTML = `❤️ ${percent}%`;

    if(percent >= 100){

        resultDescription.innerHTML = `
        👑 <b>İREMVERSE LİDERİ</b><br><br>
        💎 Kusursuz skor yaptın!<br>
        💖 İyi ki varsın İrem.
        `;

    }else if(percent >= 90){

        resultDescription.innerHTML = `
        👑 <b>ELMAS SEVİYE İREM EFSANESİ</b><br><br>
        🌹 Gerçek bir İrem hayranısın.
        `;

    }else if(percent >= 75){

        resultDescription.innerHTML = `
        💖 <b>İREM FANI</b><br><br>
        Çok iyi gidiyorsun.
        `;

    }else if(percent >= 50){

        resultDescription.innerHTML = `
        🌸 <b>İREM DOSTU</b><br><br>
        Fena değilsin.
        `;

    }else{

        resultDescription.innerHTML = `
        😂 <b>Tekrar çöz bakalım.</b><br><br>
        Belki bu sefer daha yüksek puan alırsın.
        `;

    }

    progressBar.style.width = "100%";

}
