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
