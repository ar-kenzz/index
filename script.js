// ===== Daftar dokumen =====
const docs = [
  { title: "Revisi", link: "https://ar-kenzz.github.io/Thoughts/Doc1/" },
  { title: "Revisi", link: "https://ar-kenzz.github.io/Thoughts/Doc1/" },
  { title: "Revisi", link: "https://ar-kenzz.github.io/Thoughts/Doc1/" },
  { title: "Menuju Indonesia Emas", link: "https://ar-kenzz.github.io/Thoughts/Doc2/" }
];

const body = document.body;
const toggleBtn = document.getElementById("toggleBtn");
const cardGrid = document.getElementById("cardGrid");
const searchInput = document.getElementById("searchInput");

// === Fungsi buat card ===
function createCard(doc,index,isNew=false){
  const card = document.createElement("div");
  card.className="card";
  card.style.animationDelay=`${index*0.15}s`;

  const inner=document.createElement("div");
  inner.className="card-inner";
  if(isNew) inner.classList.add("new-card");
  inner.style.animationDelay=`${index*0.15+0.05}s`;
  inner.innerHTML=`<a href="${doc.link}" target="_blank" rel="noopener noreferrer">${doc.title}</a>`;
  inner.dataset.title=doc.title;

  card.appendChild(inner);
  cardGrid.appendChild(card);

  // Modal click
  inner.addEventListener("click",e=>{
    e.preventDefault();
    modal.classList.add("show");
    modalTitle.textContent=inner.dataset.title;
    modalLink.href=inner.querySelector("a").href;
  });

  return card;
}

// === Generate semua card ===
docs.forEach((doc,i)=>createCard(doc,i));
let cards=document.querySelectorAll(".card-inner");

// === Toggle Light/Dark ===
toggleBtn.addEventListener("click",()=>{
  body.classList.toggle("dark");
  body.classList.toggle("light");
  toggleBtn.textContent=body.classList.contains("dark")?"☽":"☼";
});

// === Search + Highlight ===
function escapeRegExp(str){ return str.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"); }
searchInput.addEventListener("input",()=>{
  const q=searchInput.value.trim().toLowerCase();
  cards.forEach(inner=>{
    const link=inner.querySelector("a");
    const original=inner.dataset.title;
    if(q!=="" && original.toLowerCase().includes(q)){
      inner.parentElement.style.display="block";
      const safe=escapeRegExp(q);
      const regex=new RegExp(`(${safe})`,"gi");
      link.innerHTML=original.replace(regex,"<mark>$1</mark>");
    }else if(q===""){
      inner.parentElement.style.display="block";
      link.innerHTML=original;
    }else{
      inner.parentElement.style.display="none";
      link.innerHTML=original;
    }
  });
});

// === Add new card runtime ===
function addNewDoc(title,link){
  const index=cardGrid.children.length;
  createCard({title,link},index,true);
  cards=document.querySelectorAll(".card-inner");
}

// === Modal ===
const modal=document.getElementById("modal");
const modalTitle=document.getElementById("modalTitle");
const modalLink=document.getElementById("modalLink");
const modalClose=document.getElementById("modalClose");

modalClose.addEventListener("click",()=>modal.classList.remove("show"));
modal.addEventListener("click",e=>{if(e.target===modal) modal.classList.remove("show");});
