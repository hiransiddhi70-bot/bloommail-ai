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

    const name = document.getElementById("name").value.trim();
    const company = document.getElementById("company").value.trim();
    const role = document.getElementById("role").value.trim();
    const skills = document.getElementById("skills").value.trim();
    const purpose = document.getElementById("purpose").value;
    const tone = document.getElementById("tone").value;
    const details = document.getElementById("details").value.trim();

    if (!name || !company || !role || !skills) {

        output.innerHTML = `
        <p style="color:#ff4d6d;font-weight:600;">
        Please fill all required fields 🌸
        </p>
        `;

        return;
    }

    showLoader();

    const prompt = `
You are an expert email writer.

Generate a professional cold email.

Name: ${name}

Company: ${company}

Role: ${role}

Skills: ${skills}

Purpose: ${purpose}

Tone: ${tone}

Extra Details: ${details}

Rules:
1. Generate an attractive Subject line.
2. Write a personalized email.
3. Keep it concise.
4. End politely.
5. Return plain text only.
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

        const email =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response received.";

        output.innerHTML = `<pre>${email}</pre>`;

    } catch (error) {

        output.innerHTML = `
        <p style="color:red;">
        ❌ Something went wrong.<br>
        Check your API key or internet connection.
        </p>
        `;

        console.log(error);

    }

}
