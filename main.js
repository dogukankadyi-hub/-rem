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
// =========================
// İREMVERSE - main.js
// BÖLÜM 4
// Kalpler + Rastgele Bildirim
// =========================

// Rastgele mesajlar
const randomMessages = [

"💖 İrem bu cevabı beğendi!",
"👑 Efsane seçim!",
"🌸 İrem gülümsedi.",
"❤️ Kalp Kombosu x5",
"✨ Aura +999",
"🎉 Çok iyi gidiyorsun!",
"💌 İremVerse bunu onayladı.",
"🔥 Süper cevap!",
"🌹 İrem mutlu oldu.",
"💖 Doğru seçim!"

];

// Bildirim Göster
function showMessage(){

    if(Math.random()>0.35) return;

    const div=document.createElement("div");

    div.className="popup";

    div.innerHTML=
    randomMessages[
    Math.floor(Math.random()*randomMessages.length)
    ];

    div.style.position="fixed";
    div.style.top="70px";
    div.style.left="50%";
    div.style.transform="translateX(-50%)";

    div.style.background="#ff2f7d";
    div.style.color="white";

    div.style.padding="15px 30px";

    div.style.borderRadius="18px";

    div.style.fontWeight="bold";

    div.style.zIndex="99999";

    div.style.boxShadow="0 10px 30px rgba(0,0,0,.25)";

    document.body.appendChild(div);

    setTimeout(()=>{

        div.remove();

    },1800);

}

// Kalp Efekti
function heartExplosion(){

    for(let i=0;i<10;i++){

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

            heart.style.transform=
            `translateY(-${500+Math.random()*300}px)
            rotate(${Math.random()*720}deg)`;

            heart.style.opacity="0";

        },50);

        setTimeout(()=>{

            heart.remove();

        },2200);

    }

}// =========================
// İREMVERSE - main.js
// BÖLÜM 5A
// KONFETİ
// =========================

function confetti(){

    for(let i=0;i<150;i++){

        const c=document.createElement("div");

        c.style.position="fixed";
        c.style.left=Math.random()*100+"vw";
        c.style.top="-20px";

        c.style.width="10px";
        c.style.height="10px";

        c.style.background=
        `hsl(${Math.random()*360},100%,60%)`;

        c.style.borderRadius="50%";

        c.style.zIndex="999999";

        c.style.transition=
        (3+Math.random()*2)+"s linear";

        document.body.appendChild(c);

        setTimeout(()=>{

            c.style.transform=
            `translateY(${window.innerHeight+100}px)
            rotate(${Math.random()*1000}deg)`;

        },30);

        setTimeout(()=>{

            c.remove();

        },5000);

    }

}// =========================
// İREMVERSE - main.js
// BÖLÜM 5B
// ÖZEL FİNAL ANİMASYONU
// =========================

function specialEnding(){

    const screen=document.createElement("div");

    screen.style.position="fixed";
    screen.style.left="0";
    screen.style.top="0";
    screen.style.width="100%";
    screen.style.height="100%";
    screen.style.background="rgba(255,80,170,.92)";
    screen.style.display="flex";
    screen.style.justifyContent="center";
    screen.style.alignItems="center";
    screen.style.flexDirection="column";
    screen.style.zIndex="999999";

    screen.innerHTML=`
    <h1 style="
    color:white;
    font-size:55px;
    text-align:center;
    animation:pulse 1s infinite;
    ">
    💖 İYİ Kİ VARSIN 💖
    <br>
    İREM
    </h1>

    <p style="
    color:white;
    font-size:24px;
    margin-top:20px;
    ">
    🌸 Test başarıyla tamamlandı. 🌸
    </p>
    `;

    document.body.appendChild(screen);

    // 200 kalp oluştur
    for(let i=0;i<200;i++){

        const heart=document.createElement("div");

        heart.innerHTML="❤️";

        heart.style.position="fixed";
        heart.style.left=Math.random()*100+"vw";
        heart.style.top="100vh";
        heart.style.fontSize=(20+Math.random()*25)+"px";
        heart.style.transition=(2+Math.random()*2)+"s linear";
        heart.style.zIndex="999999";

        document.body.appendChild(heart);

        setTimeout(()=>{

            heart.style.transform=
            `translateY(-${window.innerHeight+200}px)
             rotate(${Math.random()*720}deg)`;

            heart.style.opacity="0";

        },20);

        setTimeout(()=>{

            heart.remove();

        },4500);

    }

    setTimeout(()=>{

        screen.remove();

    },4000);

}
,
{
question:"☕ İrem kahve içmeye çağırsa?",
answers:["Sonra giderim","Olur","Koşa koşa giderim ☕"],
correct:2
},
{
question:"🌧️ Yağmur yağıyor. İrem'in şemsiyesi yok.",
answers:["Yoluma devam ederim","Şemsiyeyi paylaşırım","Şemsiyeyi tamamen ona veririm ☂️"],
correct:2
},
{
question:"🎵 İrem şarkı açmanı istedi.",
answers:["Açmam","Rastgele açarım","En sevdiği şarkıyı açarım 🎶"],
correct:2
},
{
question:"🍔 Son hamburger kaldı.",
answers:["Ben yerim","Paylaşırım","İrem'e veririm 🍔"],
correct:2
},
{
question:"📸 İrem selfie çekilelim dedi.",
answers:["Olur","2 fotoğraf","100 tane çekiliriz 😂"],
correct:2
},
{
question:"🎮 İrem oyun oynamaya çağırdı.",
answers:["Hayır","Belki","Hemen geliyorum 🎮"],
correct:2
},
{
question:"🌸 İrem güldüğünde ne yaparsın?",
answers:["Bakarım","Ben de gülerim","Dünyanın en güzel anı derim ❤️"],
correct:2
},
{
question:"🎁 İrem'e hediye alacaksın.",
answers:["Anahtarlık","Çiçek","En güzel hediyeyi seçerim 🎁"],
correct:2
},
{
question:"🍦 Dondurma alacaksın.",
answers:["Kendime","İkimize","Önce İrem'e 🍦"],
correct:2
},
{
question:"😂 İrem 'Küs müyüz?' dedi.",
answers:["Evet","Bilmiyorum","Asla küsmeyiz 😄"],
correct:2
},
{
question:"🌙 İrem gece 'Canım sıkıldı.' dedi.",
answers:[
"Uyurum",
"Mesaj atarım",
"Sohbet ederim 🌙"
],
correct:2
},

{
question:"🍿 Film izlenecek.",
answers:[
"Ben seçerim",
"Rastgele açarım",
"İrem ne isterse onu açarım 🎬"
],
correct:2
},

{
question:"🚶 İrem yürüyüşe çağırdı.",
answers:[
"Gitmem",
"Belki",
"Hemen geliyorum 🚶"
],
correct:2
},

{
question:"🎂 İrem pasta yaptı.",
answers:[
"Yemem",
"Bir dilim yerim",
"Övgü yağdırırım 🍰"
],
correct:2
},

{
question:"😂 İrem sana 'Mal mısın?' dedi.",
answers:[
"Küserim",
"Gülerim",
"'Biraz olabilir.' der gülerim 😂"
],
correct:2
},

{
question:"🎡 İrem lunaparka gitmek istedi.",
answers:[
"Gitmem",
"Olabilir",
"Gün boyu gezeriz 🎡"
],
correct:2
},

{
question:"🌊 İrem denize gitmek istedi.",
answers:[
"Hayır",
"Belki",
"Hazırım 🌊"
],
correct:2
},

{
question:"📱 İrem mesaj attı.",
answers:[
"Sonra bakarım",
"10 dk sonra",
"Anında cevap veririm ⚡"
],
correct:2
},

{
question:"❤️ İrem üzgün.",
answers:[
"Bir şey yapmam",
"Teselli ederim",
"Mutlu olması için elimden geleni yaparım ❤️"
],
correct:2
},

{
question:"👑 İrem bir kelimeyle anlatılacak olsa?",
answers:[
"İyi",
"Güzel",
"Efsane 👑"
],
correct:2
},
{
question:"☀️ Sabah ilk günaydın mesajını kime atarsın?",
answers:[
"Kimseye",
"Arkadaşıma",
"İrem'e 🌞"
],
correct:2
},

{
question:"🎤 İrem karaoke yapmak istedi.",
answers:[
"İzlerim",
"Bir şarkı söylerim",
"Gece boyunca söyleriz 🎤"
],
correct:2
},

{
question:"🍟 Son patates kızartması kaldı.",
answers:[
"Ben yerim",
"Paylaşırız",
"İrem'e bırakırım 🍟"
],
correct:2
},

{
question:"🎆 İrem havai fişek izlemeye çağırdı.",
answers:[
"Gitmem",
"Olabilir",
"Hemen giderim 🎆"
],
correct:2
},

{
question:"🚴 İrem bisiklet sürmeye çağırdı.",
answers:[
"Hayır",
"Belki",
"Tabii 🚴"
],
correct:2
},

{
question:"📚 İrem yardım istedi.",
answers:[
"Sonra",
"Müsait olunca",
"Hemen yardım ederim 📚"
],
correct:2
},

{
question:"🌸 İrem sana çiçek verdi.",
answers:[
"Teşekkür ederim",
"Gülümserim",
"Ömür boyu saklarım 😂"
],
correct:2
},

{
question:"📷 İrem 'Bir fotoğraf daha' dedi.",
answers:[
"Yeter",
"Son bir tane",
"100 tane daha çekelim 😂"
],
correct:2
},

{
question:"🍕 İrem acıktı.",
answers:[
"Bir şey yapmam",
"Bir şeyler alırız",
"En sevdiği yemeği ısmarlarım 🍕"
],
correct:2
},

{
question:"💖 İrem'in gülüşü kaç puan?",
answers:[
"10/10",
"100/10",
"Sonsuz ♾️"
],
correct:2
},
{
question:"🎮 İrem '1v1 atak mı?' dedi.",
answers:[
"Hayır",
"Belki",
"Hemen başlıyoruz 🎮"
],
correct:2
},

{
question:"🍩 Son donut kaldı.",
answers:[
"Ben yerim",
"Paylaşırız",
"İrem'e veririm 🍩"
],
correct:2
},

{
question:"🚙 Uzun yola çıkacaksın.",
answers:[
"Tek giderim",
"Arkadaşımı alırım",
"İrem ile giderim 🚗"
],
correct:2
},

{
question:"🎧 İrem sana kulaklığını uzattı.",
answers:[
"Almam",
"Bir şarkı dinlerim",
"Playlist'in tamamını dinlerim 🎵"
],
correct:2
},

{
question:"😂 İrem sana 'Manyak mısın?' dedi.",
answers:[
"Küserim",
"Gülerim",
"'Biraz.' der gülerim 😂"
],
correct:2
},

{
question:"🎈 İrem'in doğum günü geldi.",
answers:[
"Mesaj atarım",
"Hediye alırım",
"Unutulmaz bir gün yaparım 🎉"
],
correct:2
},

{
question:"🌅 Gün batımı izlenecek.",
answers:[
"Gitmem",
"Olabilir",
"İrem ile izlemek isterim 🌅"
],
correct:2
},

{
question:"📱 İrem 'Nasılsın?' diye yazdı.",
answers:[
"Sonra cevap veririm",
"Biraz sonra",
"Hemen cevap veririm ❤️"
],
correct:2
},

{
question:"🍰 İrem tatlı yapmak istedi.",
answers:[
"İzlerim",
"Yardım ederim",
"Beraber yaparız 🍰"
],
correct:2
},

{
question:"👑 İrem için tek kelime seç.",
answers:[
"İyi",
"Güzel",
"Efsane 👑"
],
correct:2
},
{
question:"📞 İrem seni arıyor. Telefonun çaldı.",
answers:[
"Sonra dönerim",
"Hemen açarım",
"İlk saniyede açarım 😂"
],
correct:2
},

{
question:"🍿 İrem 'Film seç.' dedi.",
answers:[
"Ben seçerim",
"Rastgele seçerim",
"İrem hangi filmi isterse onu açarım 🎬"
],
correct:2
},

{
question:"🎉 İrem bugün çok mutlu.",
answers:[
"İzlerim",
"Sevinirim",
"Beraber kutlarız 🎉"
],
correct:2
},

{
question:"😂 İrem sana 'Çok konuşuyorsun.' dedi.",
answers:[
"Küserim",
"Gülerim",
"'Tamam ama son bir şey söyleyeceğim.' derim 😂"
],
correct:2
},

{
question:"💖 Son soru... İrem için hangisi doğru?",
answers:[
"İyi biri",
"Çok iyi biri",
"İyi ki var ❤️"
],
correct:2
}
