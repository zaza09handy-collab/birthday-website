const defaults={name:"حبيبتي",sender:"حبيبك",intro:"النهارده مش يوم عادي… النهارده اليوم اللي الدنيا بقت أحلى فيه.",letter:"كل سنة وإنتِ أجمل حاجة حصلت في حياتي. أتمنى السنة الجديدة من عمرك تكون مليانة ضحك وراحة ونجاح، وأفضل دايمًا أشوفك مبسوطة. وجودك في حياتي نعمة كبيرة، وكل لحظة معاكي ليها مكان خاص في قلبي. ❤️",surprise:"لو كنت أقدر أديكي هدية تليق بيكي، كنت هديكي كل لحظة حلوة في الدنيا. كل سنة وإنتِ معايا، وكل سنة وإنتِ السبب في ابتسامتي. بحبك أكتر مما الكلام يقدر يوصف. ❤️",date:"2026-12-31T20:00",music:"",password:"1409",images:[]};
let data=JSON.parse(localStorage.getItem("birthdayFinal")||localStorage.getItem("birthdayPro")||"null")||defaults;
document.body.classList.add("locked");
const $=id=>document.getElementById(id);

function render(){
 $("heroName").textContent=data.name;$("heroIntro").textContent=data.intro;$("letterText").textContent=data.letter;$("signature").textContent="بحبك، "+data.sender+" ❤️";
 $("fName").value=data.name;$("fSender").value=data.sender;$("fIntro").value=data.intro;$("fLetter").value=data.letter;$("fSurprise").value=data.surprise;$("fDate").value=data.date;$("fMusic").value=data.music;$("fPassword").value=data.password||defaults.password;
 $("gallery").innerHTML=[0,1,2].map((i)=>data.images[i]?`<figure class="photo"><img src="${data.images[i]}" alt="ذكرى"><figcaption>ذكرى جميلة ❤️</figcaption></figure>`:`<figure class="photo"><div class="empty">📸<br>أضيفي الصورة ${i+1} من ⚙️</div></figure>`).join("");
 $("audio").src=data.music||"";
 updateCountdown();
}
function unlock(){
  const typed=$("passwordInput").value;
  if(typed===data.password){
    $("lockScreen").style.display="none";
    document.body.classList.remove("locked");
  }else{
    $("wrongPassword").textContent="كلمة السر مش صحيحة ❤️ جرّبي تاني";
  }
}
$("passwordInput").addEventListener("keydown",e=>{if(e.key==="Enter")unlock()});
function openEditor(){$("editor").classList.remove("hidden")}
function closeEditor(){$("editor").classList.add("hidden")}
function save(){
 data={name:$("fName").value||defaults.name,sender:$("fSender").value||defaults.sender,intro:$("fIntro").value||defaults.intro,letter:$("fLetter").value||defaults.letter,surprise:$("fSurprise").value||defaults.surprise,date:$("fDate").value||defaults.date,music:$("fMusic").value.trim(),password:$("fPassword").value||defaults.password,images:data.images||[]};
 localStorage.setItem("birthdayFinal",JSON.stringify(data));render();$("status").textContent="تم الحفظ ❤️";setTimeout(()=>$("status").textContent="",2000);
}
function resetData(){localStorage.removeItem("birthdayFinal");localStorage.removeItem("birthdayPro");data={...defaults,images:[]};render();$("status").textContent="رجعنا البيانات التجريبية"}
function pickImage(e,i){const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=()=>{data.images=data.images||[];data.images[i]=r.result;render();};r.readAsDataURL(file)}
function showSurprise(){$("surpriseText").textContent=data.surprise}
let playing=false;
async function toggleMusic(){if(!data.music){alert("أضيفي رابط MP3 من الإعدادات أولًا 🎵");return}if(playing){$("audio").pause();playing=false;$("musicBtn").textContent="🎵"}else{try{await $("audio").play();playing=true;$("musicBtn").textContent="⏸️"}catch(e){alert("اضغطي مرة ثانية لتشغيل الأغنية")}}}
function updateCountdown(){let d=new Date(data.date).getTime()-Date.now();if(d<=0){$("countdown").innerHTML='<div class="time"><b>🎉</b><small>كل سنة وإنتِ بخير!</small></div>';return}let a=[["يوم",Math.floor(d/86400000)],["ساعة",Math.floor(d%86400000/3600000)],["دقيقة",Math.floor(d%3600000/60000)],["ثانية",Math.floor(d%60000/1000)]];$("countdown").innerHTML=a.map(x=>`<div class="time"><b>${x[1]}</b><small>${x[0]}</small></div>`).join("")}
setInterval(updateCountdown,1000);
setInterval(()=>{let s=document.createElement("span");s.className="particle";s.textContent=["❤","💗","💕","✨"][Math.floor(Math.random()*4)];s.style.left=Math.random()*100+"vw";s.style.fontSize=14+Math.random()*20+"px";s.style.animationDuration=5+Math.random()*6+"s";$("particles").appendChild(s);setTimeout(()=>s.remove(),12000)},700);
render();
