const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

// Track state
let currentStep = "category";
let selectedCategory = "";

// Laptop -> Amazon link mapping
const amazonLinks = {
  "Student Basic 14": "https://www.amazon.com/HP-Business-Student-Computer-Earphones/dp/B0F16WXFYH/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.avV7qtUvR9xTZl_sSxsXcGVPy6dTQyGI9rpMkME2yfyzlqM_BFXLGMNXtAYIaOMEG5ZCB8aXWZrv0lde4qGFBWQHgAS5WAOVTNx7gl_vFh9qdsmbY0eYpQLj-sIlR1_QJNwEXrg1uKEFfHs2GltGY5WkROOe6nxfJdzmv0qAq8meuWRzjuvrfGCGE55giHnxArJeD4JO1qXprlFfhM4AdSTRy5iL3N-TnYuriBKx_88.yOsx9zf7CgulW_ah7PLWwffJLRD3Y5y4y0_ryyFXjoY&dib_tag=se&hvadid=693883761831&hvdev=c&hvexpln=67&hvlocphy=9032151&hvnetw=g&hvocijid=10242610231137640161--&hvqmt=b&hvrand=10242610231137640161&hvtargid=kwd-970797292&hydadcr=18031_13447380&keywords=best%2Bstudent%2Blaptops&mcid=f1fb9dcfc2c63b44bd9c373650d7db7d&qid=1756333193&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1",
  "Everyday SlimBook": "https://www.amazon.com/HP-Business-Microsoft-Included-Earphones/dp/B0FK6Z1KJ7/ref=sr_1_2_sspa?dib=eyJ2IjoiMSJ9.avV7qtUvR9xTZl_sSxsXcGVPy6dTQyGI9rpMkME2yfyzlqM_BFXLGMNXtAYIaOMEG5ZCB8aXWZrv0lde4qGFBWQHgAS5WAOVTNx7gl_vFh9qdsmbY0eYpQLj-sIlR1_QJNwEXrg1uKEFfHs2GltGY5WkROOe6nxfJdzmv0qAq8meuWRzjuvrfGCGE55giHnxArJeD4JO1qXprlFfhM4AdSTRy5iL3N-TnYuriBKx_88.yOsx9zf7CgulW_ah7PLWwffJLRD3Y5y4y0_ryyFXjoY&dib_tag=se&hvadid=693883761831&hvdev=c&hvexpln=67&hvlocphy=9032151&hvnetw=g&hvocijid=10242610231137640161--&hvqmt=b&hvrand=10242610231137640161&hvtargid=kwd-970797292&hydadcr=18031_13447380&keywords=best%2Bstudent%2Blaptops&mcid=f1fb9dcfc2c63b44bd9c373650d7db7d&qid=1756333193&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1n.com/dp/B0FK6Z1KJ7",
  "LightPro Air": "https://www.amazon.com/Lenovo-IdeaPad-Student-Processor-Bluetooth/dp/B0CF62H34N/ref=sr_1_3?dib=eyJ2IjoiMSJ9.avV7qtUvR9xTZl_sSxsXcGVPy6dTQyGI9rpMkME2yfyzlqM_BFXLGMNXtAYIaOMEG5ZCB8aXWZrv0lde4qGFBWQHgAS5WAOVTNx7gl_vFh9qdsmbY0eYpQLj-sIlR1_QJNwEXrg1uKEFfHs2GltGY5WkROOe6nxfJdzmv0qAq8meuWRzjuvrfGCGE55giHnxArJeD4JO1qXprlFfhM4AdSTRy5iL3N-TnYuriBKx_88.yOsx9zf7CgulW_ah7PLWwffJLRD3Y5y4y0_ryyFXjoY&dib_tag=se&hvadid=693883761831&hvdev=c&hvexpln=67&hvlocphy=9032151&hvnetw=g&hvocijid=10242610231137640161--&hvqmt=b&hvrand=10242610231137640161&hvtargid=kwd-970797292&hydadcr=18031_13447380&keywords=best%2Bstudent%2Blaptops&mcid=f1fb9dcfc2c63b44bd9c373650d7db7d&qid=1756333193&sr=8-3&th=1",

  "Gaming Beast 5000": "https://www.amazon.com/i7-13620H-Processor-GeForce-Display-ANV15-52-76NK/dp/B0F6PLQ93N/ref=sr_1_3?crid=3PFJ9EOQTOHMB&dib=eyJ2IjoiMSJ9.JVMjBA_8rCau8AQvWyV5FqgCJhSTqOrSz61mpiRjUUd1nUgjmrq-OGha3S0BnOA5ofRSrukOZ6tI9MOlz06GVdeYbE0pcpXMpqpeKltiFY1O-TJSK4umiNBHKESnTTAIs8C95R9OCVyJN1wgL7RJThkaoEHm-o25DgKzpI_-Tm8C5hvunIi-iNxX6o3BdrhqZAcdd-A4jErblScqMBbLz66j_2LXjuk48uG837UlyQ0.zGtxTTk59VQ5I4rBJ3T5y2Z3kIaD4M5J_0twwkEZnHM&dib_tag=se&keywords=gaming+laptop&qid=1756333234&sprefix=gaming+laptop%2Caps%2C238&sr=8-3",
  "Pro Gamer Ultra": "https://www.amazon.com/ASUS-ROG-Strix-Gaming-Laptop/dp/B0DZZWMB2L/ref=sr_1_5?crid=3PFJ9EOQTOHMB&dib=eyJ2IjoiMSJ9.JVMjBA_8rCau8AQvWyV5FqgCJhSTqOrSz61mpiRjUUd1nUgjmrq-OGha3S0BnOA5ofRSrukOZ6tI9MOlz06GVdeYbE0pcpXMpqpeKltiFY1O-TJSK4umiNBHKESnTTAIs8C95R9OCVyJN1wgL7RJThkaoEHm-o25DgKzpI_-Tm8C5hvunIi-iNxX6o3BdrhqZAcdd-A4jErblScqMBbLz66j_2LXjuk48uG837UlyQ0.zGtxTTk59VQ5I4rBJ3T5y2Z3kIaD4M5J_0twwkEZnHM&dib_tag=se&keywords=gaming+laptop&qid=1756333234&sprefix=gaming+laptop%2Caps%2C238&sr=8-5",
  "Stealth RTX": "https://www.amazon.com/NIMO-FHD-Gaming-Laptop-Graphics-Business-Fingerprint/dp/B0FLK613GD/ref=sxin_16_pa_sp_search_thematic_sspa?content-id=amzn1.sym.c1fe32ab-66ad-42fa-93b0-e2dbd9921c2b%3Aamzn1.sym.c1fe32ab-66ad-42fa-93b0-e2dbd9921c2b&crid=3PFJ9EOQTOHMB&cv_ct_cx=gaming%2Blaptop&keywords=gaming%2Blaptop&pd_rd_i=B0FLK613GD&pd_rd_r=4dc94703-9a7a-4091-89d4-bd1724402c23&pd_rd_w=og1O8&pd_rd_wg=q4Lkm&pf_rd_p=c1fe32ab-66ad-42fa-93b0-e2dbd9921c2b&pf_rd_r=YNAR65R3MD1WRNQ0SKXS&qid=1756333234&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=gaming%2Blaptop%2Caps%2C238&sr=1-1-7ca77689-fea2-4d18-a31c-8e756e3a3e87-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9zZWFyY2hfdGhlbWF0aWM&th=1",

  "UltraSlim Pro": "https://www.amazon.com/Lenovo-V15-Business-Display-Numeric/dp/B0D3JLHQ8K/ref=sr_1_3?crid=1SFSQPGTP7G7I&dib=eyJ2IjoiMSJ9.cuxyd88DaxyoFXsY6YQy9hIloGNpBFrPKJ5FVnoKIAd-QeD2E2I9GugLOTXSko3Jl2T25AMkLX-E3pvckwTyU1vzeb4a23ZddLb1aVVRo0Rv2TXYvIqUAliXvA74g4uYD7YTmDoQkQd3jQgHWH-cCUiQ-W0Deu6Y9iHmjq56kqfA-87T5COLmicSpLgnUwgdOMwYW2BQ_STWuD52zqDQGlMR_tmssw0825sXPQYeGY4.het4mkh_eSENmEJvaymNkkN_ReaK1HhwHh3eijAaHW0&dib_tag=se&keywords=business%2Blaptop&qid=1756333209&sprefix=busine%2Caps%2C180&sr=8-3&th=1",
  "ExecBook Elite": "https://www.amazon.com/HP-Business-Touchscreen-Numeric-Keyboard/dp/B0D98FZYT4/ref=sr_1_4?crid=1SFSQPGTP7G7I&dib=eyJ2IjoiMSJ9.cuxyd88DaxyoFXsY6YQy9hIloGNpBFrPKJ5FVnoKIAd-QeD2E2I9GugLOTXSko3Jl2T25AMkLX-E3pvckwTyU1vzeb4a23ZddLb1aVVRo0Rv2TXYvIqUAliXvA74g4uYD7YTmDoQkQd3jQgHWH-cCUiQ-W0Deu6Y9iHmjq56kqfA-87T5COLmicSpLgnUwgdOMwYW2BQ_STWuD52zqDQGlMR_tmssw0825sXPQYeGY4.het4mkh_eSENmEJvaymNkkN_ReaK1HhwHh3eijAaHW0&dib_tag=se&keywords=business+laptop&qid=1756333209&sprefix=busine%2Caps%2C180&sr=8-4",
  "WorkMate Plus": "https://www.amazon.com/Dell-Inspiron-Touchscreen-i5-1155G7-Processor/dp/B0CTPCTW66/ref=sr_1_6?crid=1SFSQPGTP7G7I&dib=eyJ2IjoiMSJ9.cuxyd88DaxyoFXsY6YQy9hIloGNpBFrPKJ5FVnoKIAd-QeD2E2I9GugLOTXSko3Jl2T25AMkLX-E3pvckwTyU1vzeb4a23ZddLb1aVVRo0Rv2TXYvIqUAliXvA74g4uYD7YTmDoQkQd3jQgHWH-cCUiQ-W0Deu6Y9iHmjq56kqfA-87T5COLmicSpLgnUwgdOMwYW2BQ_STWuD52zqDQGlMR_tmssw0825sXPQYeGY4.het4mkh_eSENmEJvaymNkkN_ReaK1HhwHh3eijAaHW0&dib_tag=se&keywords=business%2Blaptop&qid=1756333209&sprefix=busine%2Caps%2C180&sr=8-6&th=1"
};

//laptop details
const laptopDetails = {
    "Student Basic 14": "HP Student Basic 14 – ✅ Lightweight, affordable, great for everyday tasks.",
    "Everyday SlimBook": "HP SlimBook – ✅ Sleek design, strong battery, perfect for school and browsing.",
    "LightPro Air": "Lenovo LightPro Air – ✅ Ultra-thin, fast startup, ideal for students on the go.",
    
    "Gaming Beast 5000": "Gaming Beast 5000 – 🎮 High-end GPU, RGB keyboard, built for extreme gaming.",
    "Pro Gamer Ultra": "Pro Gamer Ultra – 🎮 Fast refresh display, liquid cooling, ultimate gaming machine.",
    "Stealth RTX": "Stealth RTX – 🎮 Slim gaming powerhouse, RTX graphics, high performance in portable form.",
    
    "UltraSlim Pro": "UltraSlim Pro – 💼 Lightweight, all-day battery, perfect for travel & work.",
    "ExecBook Elite": "ExecBook Elite – 💼 Premium build, enhanced security, designed for professionals.",
    "WorkMate Plus": "WorkMate Plus – 💼 Reliable performance, expandable storage, great for office multitasking."
};

// Append message
function appendMessage(sender, text) {
  let msg = document.createElement("div");
  msg.classList.add("message", sender);

  let bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.innerText = text;

  msg.appendChild(bubble);
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Append quick replies
function appendQuickReplies(options) {
  let container = document.createElement("div");
  container.classList.add("quick-replies");

  options.forEach(option => {
    let btn = document.createElement("button");
    btn.innerText = option.label;
    if (option.isBack) btn.classList.add("back");
    btn.onclick = () => {
      appendMessage("user", option.label);
      option.action();
      container.remove();
    };
    container.appendChild(btn);
  });

  chatBox.appendChild(container);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Step 1: Ask category
function askCategory() {
  currentStep = "category";
  appendMessage("bot", "What type of laptop are you looking for?");
  appendQuickReplies([
    { label: "Browsing", action: () => showLaptops("browsing") },
    { label: "Gaming", action: () => showLaptops("gaming") },
    { label: "Business", action: () => showLaptops("business") }
  ]);
}

// Step 2: Show laptops
function showLaptops(category) {
  currentStep = "laptopList";
  selectedCategory = category;

  let laptops = {
    browsing: ["Student Basic 14", "Everyday SlimBook", "LightPro Air"],
    gaming: ["Gaming Beast 5000", "Pro Gamer Ultra", "Stealth RTX"],
    business: ["UltraSlim Pro", "ExecBook Elite", "WorkMate Plus"]
  };

  appendMessage("bot", `Here are some ${category} laptops I recommend:`);
  appendQuickReplies(
    laptops[category].map(name => ({
      label: name,
      action: () => showLaptopDetails(name)
    })).concat([
      { label: "⬅️ Back", action: () => askCategory(), isBack: true }
    ])
  );
}

// Step 3: Laptop details
function showLaptopDetails(laptopName) {
    currentStep = "details";
    const details = laptopDetails[laptopName] || `The ${laptopName} is a great choice! ✅`;
    appendMessage("bot", details);
  
    appendQuickReplies([
      { 
        label: "🔗 Buy on Amazon", 
        action: () => {
          window.open(amazonLinks[laptopName], "_blank"); // opens Amazon
          // 🔹 Also keep the Back button visible after Buy
          appendQuickReplies([
            { label: "⬅️ Back", action: () => showLaptops(selectedCategory), isBack: true }
          ]);
        }
      },
      { label: "⬅️ Back", action: () => showLaptops(selectedCategory), isBack: true }
    ]);
  }
  

// Send message manually (typing fallback)
function sendMessage() {
    const input = userInput.value.trim();
    if (!input) return;
  
    appendMessage("user", input);
    userInput.value = "";
  
    const lowerInput = input.toLowerCase();
  
    // Synonyms & free typing support
    if (lowerInput.includes("browse") || lowerInput.includes("school") || lowerInput.includes("student")) {
      showLaptops("browsing");
    } else if (lowerInput.includes("game") || lowerInput.includes("gamer")) {
      showLaptops("gaming");
    } else if (lowerInput.includes("work") || lowerInput.includes("business") || lowerInput.includes("office")) {
      showLaptops("business");
    } 
    // Fallback for unexpected input
    else {
      appendMessage("bot", "🤔 Sorry, I didn’t get that. Please choose one of the options below:");
      appendQuickReplies([
        { label: "Browsing", action: () => showLaptops("browsing") },
        { label: "Gaming", action: () => showLaptops("gaming") },
        { label: "Business", action: () => showLaptops("business") }
      ]);
    }
  }
  

// Enter key support
userInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});

// Initial greeting
appendMessage("bot", "Welcome 👋 I’m your Laptop Advisor!");
askCategory();
