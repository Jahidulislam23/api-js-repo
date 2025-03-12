console.log("index is connected");

const showLoader = ()=>{
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("video-container").classList.add("hidden");
}

const hideLoader = ()=>{
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("video-container").classList.remove("hidden");
}

function removeActiveClass(){
    const activeButton=document.getElementsByClassName("active");
    for(let btn of activeButton){
        btn.classList.remove("active");
    }
}


function loadCategories(){
    //1-fetch the data
fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //2-convert promise to json
    .then((res)=>res.json())
    //2-send data to display
    .then((data)=>displayCategories(data.categories));

}

function loadVideos(searchText = ""){
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res)=>res.json())
    .then((data)=>{
        document.getElementById("btn-all").classList.add("active");
        displayVideos(data.videos)

    });
    
}

const loadCategoryVideos=(id)=>{
    showLoader();
    const url=`
    https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        removeActiveClass();
        const clickButton= document.getElementById(`btn-${id}`);
        clickButton.classList.add("active")

        displayVideos(data.category)
    });
};


const loadVideoDetails=(videosId)=>{
    console.log(videosId);
    const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videosId}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayVideoDetails(data.video));
}

const displayVideoDetails=(video)=>{
    console.log(video)
    document.getElementById("video_details").showModal();

    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML=`
    <div class="card bg-base-100 image-full  shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.authors[0].profile_name}</h2>
    <p>Building a Winning UX Strategy Using the Kano Model</p>
    <div class="card-actions justify-end">
    </div>
  </div>
</div>
    
    `

}


function displayCategories(categories){
    //get the container
    const categoryContainer=document.getElementById("category-container");
    //loop operation on array object
    for(let cat of categories){
        // console.log(cat)

        //create element
        const categoryDiv= document.createElement("div");
        categoryDiv.innerHTML=`
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        //append the element
        categoryContainer.append(categoryDiv);

    }
    
}
// {
//     "category_id": "1001",
//     "video_id": "aaab",
//     "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//     "title": "Midnight Serenade",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//             "profile_name": "Noah Walker",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "543K",
//         "posted_date": ""
//     },
//     "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
// }

const displayVideos=(videos)=>{
    const videoContainer = document.getElementById("video-container");

    videoContainer.innerHTML="";

    if(videos.length==0){
        videoContainer.innerHTML=`
        <div class=" py-20 col-span-full flex flex-col text-current justify-center items-center">
            <img class="w-[140px]" src="assest/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
        `
        hideLoader();
        return;
    }


    videos.forEach(video => {
        //element 
        console.log(video);

        const videoCard = document.createElement("div");

        videoCard.innerHTML=`
        <div class="card bg-base-100 ">
            <figure class="relative">
            <img class="w-full h-[180px] object-cover"
            src="${video.thumbnail}" alt="shoes" />
            <span class="absolute bottom-2 right-2 text-white text-sm bg-black px-2 rounded">3hrs 56 min ago</span>
            </figure>
            <div class=" flex gap-3 px-0 py-5">
            <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                    <img src="${video.authors[0].profile_picture}" />
                    </div>
                </div>
            </div>
            <div class="intro">
                <h2 class="text-1xl font-semibold">Building a Winning UX Strategy Using the Kano Model</h2>
                <p class="text-sm text-gray-400 flex gap-1">
                ${video.authors[0].profile_name}
                ${video.authors[0].verified==true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="">`:``}
                </p>
                <p class="text-sm text-gray-400">${video.others.views} views</p>
            </div>
            
            </div>
            <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
        </div>
        `;
        videoContainer.append(videoCard)
    });
    hideLoader();
};
document.getElementById("search-input").addEventListener("keyup",(e)=>{
    const input=e.target.value;
    loadVideos(input);
});

loadCategories();
