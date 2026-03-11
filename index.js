import{S as m,i as c,a as g}from"./assets/vendor-CxlTi7MH.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const y="54877624-db5c35cc993578690bbd7a10b",b=document.querySelector("#submit"),w=document.querySelector("input"),p=document.querySelector(".loader"),d=document.querySelector(".gallery"),n=document.querySelector(".load-more");let u=new m(".gallery a",{captionsData:"alt",captionDelay:250}),i=1,h="";async function f(o,r){return(await g.get("https://pixabay.com/api/",{params:{key:y,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:20}})).data}b.addEventListener("click",async o=>{o.preventDefault(),p.hidden=!1,d.innerHTML="",n.hidden=!0,i=1;const r=w.value.trim();h=r;try{const s=await f(r,i);if(s.totalHits===0)throw new Error("No images found!");n.hidden=!1;const a=s.hits.map(e=>`
                    <li class="card">
                    <a href="${e.largeImageURL}">
                      <div class="image-wrapper">
                        <img src="${e.webformatURL}" alt="${e.tags}" width="360" height="200" />
                      </div>
                    </a>
                        <ul class="info">
                            <li><span>Likes</span> <br> ${e.likes}</li>
                            <li><span>Views</span> <br> ${e.views}</li>
                            <li><span>Comments</span> <br> ${e.comments}</li>
                            <li><span>Downloads</span> <br> ${e.downloads}</li>
                        </ul>
                    </li>
                    `).join("");d.innerHTML=a,u.refresh()}catch{c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}finally{p.hidden=!0}});n.addEventListener("click",async()=>{i+=1;try{const o=await f(h,i),r=o.hits.map(t=>`
                    <li class="card">
                    <a href="${t.largeImageURL}">
                      <div class="image-wrapper">
                        <img src="${t.webformatURL}" alt="${t.tags}" width="360" height="200" />
                      </div>
                    </a>
                        <ul class="info">
                            <li><span>Likes</span> <br> ${t.likes}</li>
                            <li><span>Views</span> <br> ${t.views}</li>
                            <li><span>Comments</span> <br> ${t.comments}</li>
                            <li><span>Downloads</span> <br> ${t.downloads}</li>
                        </ul>
                    </li>
                    `).join("");d.insertAdjacentHTML("beforeend",r),u.refresh();const a=document.querySelector(".card").getBoundingClientRect().height;window.scrollBy({top:a*3,behavior:"smooth"});const e=Math.ceil(o.totalHits/20);i>=e&&(n.hidden=!0,c.warning({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{c.error({message:"Failed to load images",position:"topRight"})}});
//# sourceMappingURL=index.js.map
