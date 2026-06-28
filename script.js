let historyEmails = [];
// ======================================
// 🌸 BloomMail AI
// Smart Email Generator
// Part 1
// ======================================

// Elements
const themeBtn = document.getElementById("themeBtn");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const output = document.getElementById("output");

// =======================
// 🌙 Dark Mode
// =======================

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.innerHTML = "☀️";
    } else {
        themeBtn.innerHTML = "🌙";
    }

});

// =======================
// 🍞 Toast Notification
// =======================

const toast = document.createElement("div");
toast.className = "toast";
toast.innerHTML = "💖 Email Copied!";
document.body.appendChild(toast);

function showToast(){

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

// =======================
// 📋 Copy Email
// =======================

copyBtn.addEventListener("click",()=>{

    const text = output.innerText;

    if(text===""){
        return;
    }

    navigator.clipboard.writeText(text);

    showToast();

});

// =======================
// ⏳ Loader
// =======================

function showLoader(){

output.innerHTML=`

<div class="loader"></div>

<p style="text-align:center;margin-top:20px;">
Crafting your beautiful email...
</p>

`;

}
// ======================================
// 🌸 BloomMail AI
// Smart Email Generator
// Part 2
// ======================================

generateBtn.addEventListener("click", generateEmail);

function generateEmail(){

    const name = document.getElementById("name").value.trim();
    const company = document.getElementById("company").value.trim();
    const role = document.getElementById("role").value.trim();
    const skills = document.getElementById("skills").value.trim();
    const purpose = document.getElementById("purpose").value;
    const tone = document.getElementById("tone").value;
    const details = document.getElementById("details").value.trim();

    if(name==="" || company==="" || role==="" || skills===""){

        output.innerHTML=`
        <h3 style="color:#ff5fa2;">
        🌸 Please fill all required fields.
        </h3>
        `;

        return;
    }

    showLoader();

    setTimeout(()=>{

        let greeting;
        let intro;
        let ending;

        // Tone

        if(tone==="Professional"){

            greeting="Dear Hiring Manager,";

            intro=`I hope you are doing well. My name is ${name}, and I am excited to express my interest in the ${role} opportunity at ${company}.`;

            ending="Thank you for your time and consideration. I look forward to hearing from you.";

        }

        else if(tone==="Friendly"){

            greeting="Hello Team,";

            intro=`Hope you're having a wonderful day! I'm ${name}, and I'd love to connect regarding the ${role} opportunity at ${company}.`;

            ending="Thanks for reading my email. Looking forward to connecting soon!";

        }

        else{

            greeting="Greetings,";

            intro=`I'm ${name}, a passionate individual eager to contribute as a ${role} at ${company}.`;

            ending="I would truly appreciate the opportunity to discuss how I can contribute to your team.";

        }

        // Purpose

        let purposeText="";

        switch(purpose){

            case "Internship":

                purposeText=`I am currently looking for an internship where I can apply my knowledge and continue learning through real-world experience.`;

                break;

            case "Job Application":

                purposeText=`I would like to formally apply for this position and believe my experience makes me a strong candidate.`;

                break;

            case "Networking":

                purposeText=`I admire the work your team is doing and would love the opportunity to connect and learn from your journey.`;

                break;

            case "Freelance":

                purposeText=`I'd love to collaborate with your company and help deliver quality work through my freelance services.`;

                break;

        }

        const email =

`📌 Subject: Application for ${role} at ${company}

${greeting}

${intro}

${purposeText}

My key skills include ${skills}.

${details ? details + "\n\n" : ""}

I would be grateful for the opportunity to contribute to ${company} and grow professionally while delivering meaningful results.

${ending}

Best Regards,

${name}
`;

     const score = Math.floor(Math.random()*11)+90;

document.getElementById("score").innerText = score;  
 typeWriter(email);
historyEmails.unshift(email);

if(historyEmails.length>5){

historyEmails.pop();

}

updateHistory();
    },1800);

}
// ======================================
// 🌸 BloomMail AI
// Part 3 - Premium Features
// ======================================

// ✨ Random Subjects

const subjects = [

"Application for an Exciting Opportunity 🌸",

"Interested in Joining Your Team 💼",

"Let's Connect Regarding a Career Opportunity ✨",

"Passionate About Contributing to Your Team 💖",

"Application for Internship Opportunity 🚀",

"Looking Forward to Working Together 🌷"

];

// 💌 Random Greetings

const greetings = [

"Dear Hiring Manager,",

"Hello Team,",

"Greetings,",

"Good Day,",

"Respected Sir/Madam,"

];

// 🌸 Random Closings

const closings = [

"Looking forward to hearing from you.",

"Thank you for your valuable time.",

"Have a wonderful day ahead!",

"I truly appreciate your consideration.",

"Excited to connect with you soon!"

];

// 🎲 Random Picker

function randomItem(arr){

    return arr[Math.floor(Math.random()*arr.length)];

}

// ======================
// Typewriter Effect
// ======================

function typeWriter(text){

    output.innerHTML="";

    let i=0;

    const speed=12;

    function typing(){

        if(i<text.length){

            output.innerHTML+=text.charAt(i);

            i++;

            setTimeout(typing,speed);

        }

    }

    typing();

}

// ======================
// Download Email
// ======================

const downloadBtn=document.createElement("button");

downloadBtn.innerHTML="📄 Download Email";

downloadBtn.id="downloadBtn";

downloadBtn.style.marginTop="15px";

document.querySelector(".outputCard").appendChild(downloadBtn);

downloadBtn.addEventListener("click",()=>{

    const text=output.innerText;

    const blob=new Blob([text],{type:"text/plain"});

    const link=document.createElement("a");

    link.href=URL.createObjectURL(blob);

    link.download="BloomMail_Email.txt";

    link.click();

});
function updateHistory(){

const historyList=document.getElementById("historyList");

historyList.innerHTML="";

historyEmails.forEach((mail)=>{

const li=document.createElement("li");

li.innerText=mail.substring(0,60)+"...";

li.onclick=()=>{

output.innerHTML="<pre>"+mail+"</pre>";

};

historyList.appendChild(li);

});

}