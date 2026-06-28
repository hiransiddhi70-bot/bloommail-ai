// ===============================
// BloomMail AI 🌸
// Part 1
// ===============================

// Elements

const themeBtn = document.getElementById("themeBtn");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");
const output = document.getElementById("output");

// ===============================
// Dark Mode
// ===============================

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeBtn.innerHTML = "☀️";

    }else{

        themeBtn.innerHTML = "🌙";

    }

});

// ===============================
// Toast Notification
// ===============================

const toast = document.createElement("div");

toast.className = "toast";

toast.innerText = "💖 Email Copied!";

document.body.appendChild(toast);

function showToast(){

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

// ===============================
// Copy Email
// ===============================

copyBtn.addEventListener("click",()=>{

    const text = output.innerText;

    if(text.trim()==="") return;

    navigator.clipboard.writeText(text);

    showToast();

});

// ===============================
// Loading Animation
// ===============================

function showLoader(){

    output.innerHTML=`

        <div class="loader"></div>

        <p style="text-align:center;margin-top:15px;">
        BloomMail AI is writing your email...
        </p>

    `;

}
// ===============================
// Gemini AI
// ===============================

generateBtn.addEventListener("click", generateEmail);

async function generateEmail() {

    const name = document.getElementById("name").value;
    const company = document.getElementById("company").value;
    const role = document.getElementById("role").value;
    const skills = document.getElementById("skills").value;
    const purpose = document.getElementById("purpose").value;
    const tone = document.getElementById("tone").value;
    const details = document.getElementById("details").value;

    showLoader();

    const prompt = `
Write a ${tone} cold email.

Name: ${name}
Company: ${company}
Role: ${role}
Skills: ${skills}
Purpose: ${purpose}
Extra Details: ${details}

Generate:
1. Subject
2. Email
`;

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        output.innerHTML =
        `<pre>${data.candidates[0].content.parts[0].text}</pre>`;

    }

    catch(error){

        output.innerHTML =
        "❌ Error generating email.";

        console.log(error);

    }

}