const firebaseConfig = {
    apiKey: "AIzaSyDMlhB0dNigS2SJmkMvcUpl9z1CLN0fhcM",
    authDomain: "sona-dst-sti-hub.firebaseapp.com",
    databaseURL: "https://sona-dst-sti-hub-default-rtdb.firebaseio.com",
    projectId: "sona-dst-sti-hub",
    storageBucket: "sona-dst-sti-hub.appspot.com",
    messagingSenderId: "171152885658",
    appId: "1:171152885658:web:1324d8dba760c07f60dc23",
    measurementId: "G-SXBXLDN7XF"
  };

  
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  const auth = firebase.auth()
  const db = firebase.firestore()
  var database = firebase.database();
  var storage = firebase.storage();


// home plan=================================================================================================
function yearplandisplay() {
  const eventplan = document.getElementById('eventplan');
  const dbRef = firebase.database().ref();

  let plaintext = `
  <div class="row justify-content-center" data-aos="fade-up" data-aos-delay="150">
                <div class="col-xl-8 col-lg-8">
                    <center><h3>Science Technology and Innovation Hub for livelihood enhancement of SC community in Omalur and Kadayampatti Blocks, Salem District, TamilNadu.</h3></center>
                </div>
            </div>
`;

eventplan.insertAdjacentHTML('beforeend', plaintext);

  // Function to fetch data and return a promise
  function fetchData(path) {
    return dbRef.child(path).get().then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    });
  }

  // Create an empty list for "upevent"
  let eventList = [];

  // Create an empty list for "yearplan"
  let yearplanList = [];

  Promise.all([fetchData("upevent"), fetchData("yearplan")])
    .then(([upeventData, yearplanData]) => {
      // Populate the "upevent" list
      if (upeventData) {
        const indexArray = Object.keys(upeventData);

        for (let i = 0; i < indexArray.length; i++) {
          const id = indexArray[i];
          dbRef.child("upevent").child(id).get().then(snapshot => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const name = data.eventName;
              const url = data.eventPdfURL;
              const listItem = `<li><a href="${url}">${name}</a></li>`;
              eventList.push(listItem);

              if (i < indexArray.length - 1) {
                // If there's another item after this one, add a horizontal line
                eventList.push("<hr>");
              }



              if (i === indexArray.length - 1) {
                // Insert the list into the message
                let eventMsg = `
                  <div class="col-xl-4 col-md-4">
                    <div class="icon-box iconlist">
                    <h4 style="font-style: italic;font-weight: bold;">Upcoming Events</h4>
                      <div class="scrolling-list">
                        <ul>
                          ${eventList.join('')} <!-- List of events goes here -->
                        </ul>
                      </div>
                    </div>
                  </div>
                `;

                eventplan.insertAdjacentHTML('beforeend', eventMsg);
              }
            }
          });
        }
      }
      // Populate the "yearplan" list
      if (yearplanData) {
        const yearplanIndexArray = Object.keys(yearplanData);

        for (let j = 0; j < yearplanIndexArray.length; j++) {
          const yearplanId = yearplanIndexArray[j];
          dbRef.child("yearplan").child(yearplanId).get().then(snapshot => {
            if (snapshot.exists()) {
              const yearplanData = snapshot.val();
              const yearplanName = yearplanData.name;
              const yearplanUrl = yearplanData.planPDFURL;
              const yearplanListItem = `<li><a href="${yearplanUrl}">${yearplanName}</a></li>`;
              yearplanList.push(yearplanListItem);

              if (j < yearplanIndexArray.length - 1) {
                // If there's another item after this one, add a horizontal line
                yearplanList.push("<hr>");
              }

              if (j === yearplanIndexArray.length - 1) {
                // Insert the list into the message
                let yearplanMsg = `
                  <div class="col-xl-4 col-md-4">
                    <div class="icon-box iconlist">
                      <h4 style="font-style: italic;font-weight: bold;">YearPlan</h4>
                      <div class="scrolling-list">
                      
                        <ul>
                        <li><a href="https://www.indiablooms.com/life-details/E/7490/sona-college-to-drive-government-s-s-t-initiatives-in-2-salem-blocks.html">Sona Group of Institute</a></li><hr>
                          ${yearplanList.join('')} <!-- List of yearplan goes here -->
                        </ul>
                      </div>
                    </div>
                  </div>
                `;

                eventplan.insertAdjacentHTML('beforeend', yearplanMsg);
              }
            }
          });
        }
      }
    })
    .catch(error => console.error('Error fetching data:', error)).then(()=>{
      let cursor = `
      <a class="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
              <span class="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
            </a>
      
            <a class="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
              <span class="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
            </a>
    `;
    
    eventplan.insertAdjacentHTML('beforeend', cursor);
    })
}


// ==========================================================================================================
// home gallery==============================================================================================
function homeimgdis() {
  const displayhero = document.getElementById('displayhero');
  const dbRef = firebase.database().ref();

  dbRef.child("homeimg").get().then((snapshot) => {
    if (snapshot.exists()) {
      const sydata = snapshot.val();
      const indexArray = [];

      // Iterate through the keys of the sydata object and store them in indexArray
      for (const key in sydata) {
        if (sydata.hasOwnProperty(key)) {
          indexArray.push(key);
        }
      }



      for (let i = 0; i < indexArray.length; i++) {
        const id = indexArray[i];
        const isActive = i === 0 ? 'active' : ''; // Set active for the first item

        dbRef.child("homeimg").child(id).get().then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const url = data.imageURL;
            const msg = `
              <div class="carousel-item ${isActive}" style="background-image: url('${url}')">
              </div>
            `;
            displayhero.insertAdjacentHTML('beforeend', msg);
          }
        });
      }

      // Initialize the carousel
      const carousel = new bootstrap.Carousel(document.getElementById('heroCarousel'));
      
      // Automatically slide the carousel every 3 seconds
      setInterval(() => {
        carousel.next(); // Move to the next slide
      }, 3000);
    }
  }).catch(error => console.error('Error fetching data:', error)).then(()=>{
    yearplandisplay()
  })
  
}


// ==========================================================================================================

// //////////////////////////////////////////////////////////////////////////////////////////////
function getgalldata() {
  const storageRef = firebase.storage().ref().child('gallery');
  const fileList = [];
  const imageContentTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const videoContentTypes = ['video/mp4', 'video/webm', 'video/mpeg'];

  storageRef
    .listAll()
    .then((res) => {
      const promises = res.items.map((itemRef) => {
        const fileName = itemRef.name;
        return itemRef
          .getMetadata()
          .then((metadata) => {
            const fileType = metadata.contentType;

            let fileCategory = 'other'; // Default category

            // Check if it's an image content type
            if (imageContentTypes.includes(fileType)) {
              fileCategory = 'image';
            }
            // Check if it's a video content type
            else if (videoContentTypes.includes(fileType)) {
              fileCategory = 'video';
            }

            // Get the download URL for the file
            return itemRef.getDownloadURL().then((downloadURL) => {
              fileList.push({ fileName, fileType: fileCategory, downloadURL });
            });
          })
          .catch((error) => {
            console.error('Error getting file metadata:', error);
          });
      });

      // Wait for all promises to resolve before calling displayimggall
      return Promise.all(promises);
    })
    .then(() => {
      // Now that fileList is populated, call displayimggall
      displayimggall(fileList);
    })
    .catch((error) => {
      console.error('Error listing files:', error);
    });
}

function displayimggall(fileList) {
  const galleryContainer = document.getElementById('inallimggall');

  if (fileList.length > 0) {
    for (var i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      let msg = '';

      if (file.fileType === 'image') {
        // Display an image
        msg = `
          <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6 portfolio-item filter-app" style="display:inline">
            <div class="portfolio-wrap">
              <img src="${file.downloadURL}" class="img-fluid" alt="">
              <div class="portfolio-info">
                <div class="portfolio-links">
                  <a href="${file.downloadURL}" data-gallery="portfolioGallery" class="portfolio-lightbox"><i class="bx bi-textarea-resize"></i></a>
                </div>
              </div>
            </div>
          </div>
        `;
      } else if (file.fileType === 'video') {
        // Display a video
        msg = `
          <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6 portfolio-item filter-card">
            <div class="portfolio-wrap">
              <video controls>
                <source src="${file.downloadURL}" type="video/mp4">
              </video>
              <div class="portfolio-info">
                <div class="portfolio-links">
                  <a href="${file.downloadURL}" target="_self" data-gallery="portfolioGallery" class="portfolio-lightbox"><i class="bx bx-play"></i></a>
                </div>
              </div>
            </div>
          </div>
        `;
      }

      galleryContainer.insertAdjacentHTML('beforeend', msg);
    }
  } else {
    console.log('The array is empty.');
  }

  initializefilter();
  
}


function initializefilter() {
  const galleryContainer = document.getElementById('inallimggall');
  let eventgalleryIsotope = new Isotope(galleryContainer, {
    itemSelector: '.portfolio-item',
  });
  let eventgalleryFilters = document.querySelectorAll('#portfolio-flters li');

  eventgalleryFilters.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      eventgalleryFilters.forEach(function (el) {
        el.classList.remove('filter-active');
      });
      this.classList.add('filter-active');

      let filterValue = this.getAttribute('data-filter');

      eventgalleryIsotope.arrange({
        filter: filterValue,
      });
    });
  });
  const eventgalleryLightbox = GLightbox({
    selector: '.portfolio-lightbox',
  });
}

getgalldata();


// ////////////////////////////////////////////////////////////////////////////////////////////////

// ===============================================Event Details===============================================
function fetchEventData() {
  const displayevent = document.getElementById('displayevent');
  const dbRef = firebase.database().ref();
  dbRef.child("eventlist").get().then((snapshot) => {
    if (snapshot.exists()) {
      const sydata = snapshot.val();
      const indexArray = [];
  
      // Iterate through the keys of the sydata object and store them in indexArray
      for (const key in sydata) {
        if (sydata.hasOwnProperty(key)) {
          indexArray.push(key);
        }
      }
      for (let i = 0; i < indexArray.length; i++) {
        const id = indexArray[i];
        const isActive = i === 0 ? 'active' : ''; // Set active for the first item

        dbRef.child("eventlist").child(id).get().then((snapshot) => { 
          if (snapshot.exists()) {
            const data = snapshot.val();
            const title = data.title;
            const content = data.content;
            const url = data.imageURLs;
            const date = data.date;
            const place = data.place;
            const msg = `
            <div class="carousel-item ${isActive}">
            <div class="container" style="background-color: white; display: flex; justify-content: center; align-items: center;">
              <div class="row">
              <div class="col-lg-12 col-md-12" style="display:inline">
                <center><img src="${url[0]}" class="eventimg"></center>
              </div>
              <div class="col-12">
                <center><h3 class="eventhead" style="font-size:20px">${title}</h3></center>
                <div class="event-con">
                  <i class="bi bi-geo-alt-fill event-icon ci"></i>
                  <p class="event-text" style="font-size:20px">${place}</p>
                </div>
                <div class="event-con">
                  <i class="bi bi-calendar-date event-icon ci"></i>
                  <p class="event-text" style="font-size:20px">${date}</p>
                </div>  
                <p class="eventdetaildisplay">${content}</p>
                <center><a href="#" class="btn-get-started scrollto animate__animated animate__fadeInUp" onclick="eventdatapass('${id}')">Get Started</a></center>
              <br>
              </div>
            </div>
            </div>
            `;
            displayevent.insertAdjacentHTML('beforeend', msg);
          }
        });
      }
      const carousel=new bootstrap.Carousel(document.getElementById('eventCarousel'));
      setInterval(() => {
        carousel.next(); // Move to the next slide
      }, 5000);
    }
  }).catch(error => console.error('Error fetching data:', error));
}
fetchEventData(); 






// ==========================================================================================================
const galleryContainer = document.getElementById('galleryevent');

function eventdatapass(id) {
  document.getElementById('header').style.backgroundColor = "rgba(41, 66, 112, 255)";
  document.getElementById('main').style.display = "none";
  const eventexpand = document.getElementById('eventexpand');
  eventexpand.style.display = "block";

  const dbRef = firebase.database().ref();
  dbRef.child("eventlist").child(id).get().then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const title = data.title;
      const content = data.content;
      const url = data.imageURLs;
      const date = data.date;
      const place = data.place;

      const msg = `
      <div class="container" data-aos="fade-up" id="maineventcontent">
      <div class="section-title"><h1></h1></div><div class="section-title"><h1></h1></div>
       
        <div class="container">
          <center><h2 style="background-color: rgba(41,66,112,255);padding: 1%;color: white;font-style: italic;font-weight: bold;border-radius: 10px;">${title}</h2>
          <img src="${url[0]}" class="eventimgexp" alt="">
          <h4 style="padding: 1%;color: rgb(7, 6, 6);font-style: italic;font-weight: bold;border-radius: 10px;">${place} - ${date}</h4>
        </center>
        <h2 style="color: rgba(41,66,112,255);padding: 1%;font-style: italic;font-weight: bold;border-radius: 10px;">${title}</h2>
        <h5>${content}</h5>
        </div>
      </div>
      `;
      eventexpand.insertAdjacentHTML('beforebegin', msg);
      getdata(id);
      // After inserting event details, initialize gallery filtering
     
    }
  }).catch(error => console.error('Error fetching data:', error));
}
function initializeGalleryFilter() {
    let eventgalleryIsotope = new Isotope(galleryContainer, {
      itemSelector: '.eventgallery-item'
    });
    let eventgalleryFilters = document.querySelectorAll('#eventgallery-flters li');

    eventgalleryFilters.forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        eventgalleryFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        let filterValue = this.getAttribute('data-filter');

        eventgalleryIsotope.arrange({
          filter: filterValue
        });
      });
      
    })
  
}

function dis(galleryItems) {
  galleryItems.forEach((item) => {
    const galleryItemDiv = document.createElement('div');
    galleryItemDiv.className = 'col-lg-3 col-md-6 eventgallery-item filter-' + (item.type === 'video' ? 'card' : 'app');
  
    const galleryItemWrapDiv = document.createElement('div');
    galleryItemWrapDiv.className = 'eventgallery-wrap';
  
    if (item.type === 'video') {
      // Create video element for video items
      const videoElement = document.createElement('video');
      videoElement.setAttribute('controls', false);
  
      const sourceElement = document.createElement('source');
      sourceElement.src = item.source;
      sourceElement.type = 'video/mp4';
  
      videoElement.appendChild(sourceElement);
  
      galleryItemWrapDiv.appendChild(videoElement);
    } else if (item.type === 'image') {
      // Create image element for image items
      const imgElement = document.createElement('img');
      imgElement.src = item.source;
      imgElement.className = 'img-fluid';
      imgElement.alt = 'Image Description';
  
      galleryItemWrapDiv.appendChild(imgElement);
    }
  
    const galleryInfoDiv = document.createElement('div');
    galleryInfoDiv.className = 'eventgallery-info';
  
    const galleryLinksDiv = document.createElement('div');
    galleryLinksDiv.className = 'eventgallery-links';
  
    const aElement = document.createElement('a');
    aElement.href = item.source;
    aElement.target = '_self';
    aElement.setAttribute('data-gallery', 'eventgalleryGallery');
    aElement.className = 'eventgallery-lightbox';
  
    if (item.type === 'video') {
      // Add a play icon for video items
      const playIcon = document.createElement('i');
      playIcon.className = 'bx bx-play';
      aElement.appendChild(playIcon);
    }
    else{
      const playIcon = document.createElement('i');
      playIcon.className = 'bx bi-textarea-resize';
      aElement.appendChild(playIcon);
    }
  
    galleryLinksDiv.appendChild(aElement);
    galleryInfoDiv.appendChild(galleryLinksDiv);
    galleryItemWrapDiv.appendChild(galleryInfoDiv);
    galleryItemDiv.appendChild(galleryItemWrapDiv);
  
    // Append the created gallery item to the gallery container
    galleryContainer.appendChild(galleryItemDiv);
  });


  // Initialize GLightbox
  const eventgalleryLightbox = GLightbox({
    selector: '.eventgallery-lightbox'
  });
    initializeGalleryFilter();
}

function getdata(id) {
  const dbRef = firebase.database().ref();
  dbRef.child("eventlist").child(id).get().then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const imageURLs = data.imageURLs || [];
      const galleryItems = [];
      imageURLs.forEach(imageURL => {
        const fileType = getImageFileType(imageURL);
        const imageInfo = {
          source: imageURL,
          type: fileType
        };
        galleryItems.push(imageInfo);
      });
      dis(galleryItems);
    }
  }).catch(error => console.error('Error fetching data:', error));
}

function getImageFileType(imageURL) {
  const parts = imageURL.split('.');
  const extension = parts[parts.length - 1].toLowerCase();
  if (extension.includes("jpg") || extension.includes("jpeg") || extension.includes("png") || extension.includes("gif") || extension.includes("bmp")) {
    return 'image';
  } else if (extension.includes("mp4") || extension.includes("avi") || extension.includes("mov") || extension.includes("wmv") || extension.includes("flv")) {
    return 'video';
  } else {
    return 'unknown'; // Default to "unknown" if file type cannot be determined
  }
}


const navbar = document.getElementById('navbar');
navbar.addEventListener('click', (event) => {
  event.preventDefault();

  // Remove the dynamically created eventDetails div
  const eventDetails = document.getElementById('maineventcontent');
  if (eventDetails) {
    eventDetails.remove();
  }

  // Remove dynamically created gallery items
  const dynamicallyCreatedElements = document.querySelectorAll('.eventgallery-item');
  dynamicallyCreatedElements.forEach((element) => {
    element.remove();
  });

  // Set main as block and eventexpand as display none
  document.getElementById('main').style.display = "block";
  document.getElementById('eventexpand').style.display = "none";
});


// ////////////////////////////  INTERVISION //////////////////////////////////////////////////////////////////

// ...
fetchDataFromFirebase()
// Function to fetch data from Firebase and populate your HTML
function fetchDataFromFirebase() {
  const dbRef = firebase.database().ref();
  dbRef.child("Intervention").get().then((snapshot) => {
    if (snapshot.exists()) {
      const sydata = snapshot.val();
      const indexArray = [];
  
      for (const key in sydata) {
        if (sydata.hasOwnProperty(key)) {
          indexArray.push(key);
        }
      }


      for (let i = 0; i < indexArray.length; i++) {
        const id = indexArray[i];

        dbRef.child("Intervention").child(id).get().then((snapshot) => { 
          if (snapshot.exists()) {
            const data = snapshot.val();
            intervisionselect(data,i)
          }
        });
      }
    }
  }).catch(error => console.error('Error fetching data:', error));
}

function intervisionselect(data,i)
{
  console.log(data.title)
  const intervisionselect=document.getElementById('intervisionselect')
  const intervisioncontent=document.getElementById('intervisioncontent')
  const title=data.title
  const url=data.imageURL
  let active="";
  if(i==0)
  {
    active="active"
  }
  const msg=`
  <li class="nav-item" data-aos="fade-left" data-aos="fade-left">
                    <a class="nav-link ${active} show" data-bs-toggle="tab" href="#tabs-${i}">${title}</a>
                  </li>
  `

  const msgc=`
  <div class="tab-pane ${active} show" id="tabs-${i}" data-aos="fade-left">
                    <div class="row gy-4">
                      <div class="col-lg-12 details order-2 order-lg-1">
                        <h3>${title}</h3>
                        <div class="col-lg-12 text-center order-1 order-lg-2" data-aos="fade-up">
                        <center><img src="${url}" alt="" class="img-fluid"></center>
                      </div>
                        <div id="intervisionpoint${i}">
                        </div>
                       
                        </div>
                    </div>
                  </div>
  `

  intervisionselect.insertAdjacentHTML('beforeend', msg);
  intervisioncontent.insertAdjacentHTML('beforeend', msgc);
  const pointsdis=document.getElementById('intervisionpoint'+i)
  const points=data.points;
  for(var j=0;j<points.length;j++)
  {
    const msgp=`
    <p><i class="ri-check-double-line" style="color:#ffc451"></i> ${points[j]}</p>
    `
    pointsdis.insertAdjacentHTML('beforeend', msgp);
  }
  
}


