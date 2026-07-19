// =========================
// İREMOLOJİ
// main.js
// BÖLÜM 1/5
// =========================


// EKRANLAR

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");


// BUTON

const startBtn = document.getElementById("startBtn");


// YAZI ALANLARI

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
"Hayır",
"Biraz",
"Deliler gibi ❤️"
],
correct:2
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
question:"👑 Dünyanın en tatlı insanı kim?",
answers:[
"Başka biri",
"Bilmiyorum",
"İrem"
],
correct:2
},


{
question:"🎂 İrem'in doğum günü nasıl olmalı?",
answers:[
"Normal gün",
"Küçük kutlama",
"Festival gibi olsun 😂"
],
correct:2
},


{
question:"😂 İrem sana şaka yaptı.",
answers:[
"Kızarım",
"Gülerim",
"Ben de şaka yaparım 😂"
],
correct:2
}

];


// =========================
// KARIŞTIRMA
// =========================

function shuffle(array){

    for(let i=array.length-1;i>0;i--){

        let j=Math.floor(Math.random()*(i+1));

        [array[i],array[j]] =
        [array[j],array[i]];

    }

    return array;

}
// =========================
// İREMOLOJİ
// main.js
// BÖLÜM 2/5
// =========================


// SORULARI HAZIRLA

function prepareQuestions(){

    selectedQuestions = [...questionPool];

    shuffle(selectedQuestions);


    // 20 soru olana kadar hepsini kullanır

    selectedQuestions =
    selectedQuestions.slice(
        0,
        Math.min(20, selectedQuestions.length)
    );

}



// =========================
// BAŞLAT BUTONU
// =========================


startBtn.addEventListener("click",()=>{


    currentQuestion = 0;

    score = 0;


    prepareQuestions();


    startScreen.classList.remove("active");

    quizScreen.classList.add("active");


    showQuestion();


});




// =========================
// SORU GÖSTER
// =========================


function showQuestion(){


    const q = selectedQuestions[currentQuestion];


    questionCount.innerHTML =
    `Soru ${currentQuestion + 1} / ${selectedQuestions.length}`;



    progressBar.style.width =
    `${(currentQuestion / selectedQuestions.length) * 100}%`;



    questionText.innerHTML =
    q.question;



    answersDiv.innerHTML = "";



    q.answers.forEach((answer,index)=>{


        const button = document.createElement("div");


        button.className = "answer";


        button.innerHTML = answer;



        button.onclick = ()=>{


            if(index === q.correct){

                score++;

                heartExplosion();

                showCorrectMessage();

            }
            else{

                showWrongMessage();

            }



            currentQuestion++;



            if(currentQuestion >= selectedQuestions.length){


                finishQuiz();


            }
            else{


                showQuestion();


            }


        };



        answersDiv.appendChild(button);


    });


}
// =========================
// İREMOLOJİ
// main.js
// BÖLÜM 3/5
// SONUÇ SİSTEMİ
// =========================


function finishQuiz(){


    quizScreen.classList.remove("active");

    resultScreen.classList.add("active");



    let percent = Math.round(
        (score / selectedQuestions.length) * 100
    );



    resultTitle.innerHTML =
    `❤️ ${percent}%`;



    if(percent === 100){


        resultDescription.innerHTML =

        `
        👑 İREMOLOJİ USTASI 👑
        <br><br>
        💎 Mükemmel sonuç!
        <br>
        ❤️ İrem'i çok iyi tanıyorsun.
        `;


    }

    else if(percent >= 80){


        resultDescription.innerHTML =

        `
        💖 İrem Uzmanı
        <br><br>
        Çok yüksek skor!
        `;


    }

    else if(percent >= 50){


        resultDescription.innerHTML =

        `
        🌸 İrem Dostu
        <br><br>
        Fena değil 😄
        `;


    }

    else{


        resultDescription.innerHTML =

        `
        😂 Biraz daha çalışmalısın.
        <br><br>
        İremoloji seni bekliyor.
        `;


    }



    progressBar.style.width="100%";


}// =========================
// İREMOLOJİ
// main.js
// BÖLÜM 4/5
// EFEKTLER
// =========================


// DOĞRU CEVAP MESAJI

function showCorrectMessage(){


    const messages = [

        "💖 Çok iyi seçim!",
        "👑 Efsane cevap!",
        "🌸 İrem puanı arttı!",
        "✨ Harika gidiyorsun!",
        "❤️ Kalp kombosu!"

    ];



    createPopup(
        messages[Math.floor(Math.random()*messages.length)],
        "#ff2f7d"
    );


}



// YANLIŞ CEVAP MESAJI

function showWrongMessage(){


    const messages = [

        "😅 Bu cevap olmadı.",
        "😂 Daha iyi bir seçenek vardı.",
        "🤔 İrem bunu beklemiyordu.",
        "🌸 Bir sonraki soruya bak."

    ];



    createPopup(
        messages[Math.floor(Math.random()*messages.length)],
        "#555"
    );


}



// ORTAK POPUP

function createPopup(text,color){


    const box = document.createElement("div");


    box.innerHTML = text;


    box.style.position="fixed";

    box.style.top="60px";

    box.style.left="50%";

    box.style.transform="translateX(-50%)";

    box.style.background=color;

    box.style.color="white";

    box.style.padding="15px 25px";

    box.style.borderRadius="20px";

    box.style.fontWeight="bold";

    box.style.zIndex="9999";



    document.body.appendChild(box);



    setTimeout(()=>{

        box.remove();

    },1500);


}




// KALP PATLAMA EFEKTİ

function heartExplosion(){


    for(let i=0;i<15;i++){


        const heart=document.createElement("div");


        heart.innerHTML="❤️";


        heart.style.position="fixed";

        heart.style.left=
        Math.random()*100+"vw";


        heart.style.top="90vh";


        heart.style.fontSize=
        (20+Math.random()*25)+"px";


        heart.style.transition="2s";


        heart.style.zIndex="9999";



        document.body.appendChild(heart);



        setTimeout(()=>{


            heart.style.transform =
            `
            translateY(-${500+Math.random()*300}px)
            rotate(${Math.random()*720}deg)
            `;


            heart.style.opacity="0";


        },50);



        setTimeout(()=>{

            heart.remove();

        },2200);


    }


}




// KONFETİ

function confetti(){


    for(let i=0;i<80;i++){


        const piece=document.createElement("div");


        piece.style.position="fixed";

        piece.style.left=Math.random()*100+"vw";

        piece.style.top="-20px";

        piece.style.width="10px";

        piece.style.height="10px";

        piece.style.background=
        `hsl(${Math.random()*360},100%,60%)`;

        piece.style.zIndex="9999";

        piece.style.transition="3s";



        document.body.appendChild(piece);



        setTimeout(()=>{

            piece.style.transform=
            `
            translateY(${window.innerHeight+100}px)
            rotate(720deg)
            `;

        },50);



        setTimeout(()=>{

            piece.remove();

        },3500);


    }


}
// =========================
// İREMOLOJİ
// main.js
// BÖLÜM 5/5
// FİNAL
// =========================


function specialEnding(){


    const finalBox = document.createElement("div");


    finalBox.style.position="fixed";

    finalBox.style.left="0";

    finalBox.style.top="0";

    finalBox.style.width="100%";

    finalBox.style.height="100%";

    finalBox.style.background=
    "rgba(255,80,160,.92)";

    finalBox.style.display="flex";

    finalBox.style.flexDirection="column";

    finalBox.style.justifyContent="center";

    finalBox.style.alignItems="center";

    finalBox.style.zIndex="99999";



    finalBox.innerHTML = `

    <h1 style="
    color:white;
    font-size:45px;
    text-align:center;
    ">

    💖 İYİ Kİ VARSIN İREM 💖

    </h1>


    <p style="
    color:white;
    font-size:22px;
    ">

    👑 İREMOLOJİ USTASI

    </p>

    `;



    document.body.appendChild(finalBox);



    // Kalpler

    for(let i=0;i<100;i++){


        const heart=document.createElement("div");


        heart.innerHTML="❤️";


        heart.style.position="fixed";

        heart.style.left=
        Math.random()*100+"vw";


        heart.style.top="100vh";


        heart.style.fontSize=
        (20+Math.random()*25)+"px";


        heart.style.transition="3s";

        heart.style.zIndex="99999";



        document.body.appendChild(heart);



        setTimeout(()=>{


            heart.style.transform=
            `
            translateY(-${window.innerHeight+200}px)
            rotate(720deg)
            `;


            heart.style.opacity="0";


        },50);



        setTimeout(()=>{

            heart.remove();

        },4000);



    }



    setTimeout(()=>{

        finalBox.remove();

    },5000);


}
