class View {
  constructor() {

    this.app = document.getElementById('app');

    this.searchLine = this.createElement('div','search-line');
    this.searchInputWrap = this.createElement('div','search-input-wrap');
    this.searchInputDescription = this.createElement('input','search-input');
    this.searchInputDescription.setAttribute('placeholder','Введите описание вакансии');
    this.searchInputLocation = this.createElement('input','search-input');
    this.searchInputLocation.setAttribute('placeholder','Введите местоположение');
    this.searchInputBusy= this.createElement('label','busy-label');
    this.searchInputBusy.innerHTML = `<input class="busy-input" type="checkbox"> Full-time`;

      
    this.searchLine.append(this.searchInputWrap);
    this.searchInputWrap.append(this.searchInputDescription);
    this.searchInputWrap.append(this.searchInputLocation);
    this.searchInputWrap.append(this.searchInputBusy);

    this.jobsWrapper = this.createElement('div','jobs-wrapper');
    this.jobsList = this.createElement('ul','jobs');
    this.jobsWrapper.append(this.jobsList);
      
    this.main = this.createElement('div','main');
    this.main.append(this.jobsWrapper);
    
    this.loadMore = this.createElement('button','pagination');
    this.loadMore.innerHTML = 'Показать ещё';
    this.loadMore.style.display = 'none';
    this.jobsWrapper.append(this.loadMore);

    this.app.append(this.searchLine);
    this.app.append(this.main);
    
  }

  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if (elementClass){
        element.classList.add(elementClass);   
    }
    return element;
  }

  createJob(jobData) {

    this.jobElement = this.createElement('li','job-item');
    this.jobHead = this.createElement('div','job-head');
    this.jobWrap = this.createElement('div','job-wrap');
    this.jobElement.append(this.jobHead);
    this.jobHead.append(this.jobWrap);

    this.jobType = this.createElement('div','job-busy');
    this.jobType.innerHTML = `${jobData.type}`;

    this.jobTitle = this.createElement('div','job-title');
    this.jobTitle.innerHTML = `<a href="${jobData.url}">${jobData.title}</a>`;

    this.jobCompany = this.createElement('div','job-company');
    this.jobCompany.innerHTML = `<a href="${jobData.company_url}">${jobData.company}</a>`;

    this.jobLocation = this.createElement('div','job-location');
    this.jobLocation.innerHTML = `${jobData.location}`;

    const jobLogo = this.createElement('div','company-img');
    jobLogo.innerHTML = `<a href="${jobData.company_url}" >
                            <img class="logo" src="${jobData.company_logo}" alt="Логотип ${jobData.company}">
                        </a>`;
    this.jobHead.append(jobLogo);

    this.jobWrap.append(this.jobType);
    this.jobWrap.append(this.jobTitle);
    this.jobWrap.append(this.jobCompany);
    this.jobWrap.append(this.jobLocation);
            

    this.jobApply = this.createElement('div','job-apply');
    this.jobApply.innerHTML = `${jobData.how_to_apply}`;

    this.jobFavorite = this.createElement('button','chosen-btn');

    this.jobDatePosting = this.createElement('div','job-date');
    var DatePosting = jobData.created_at;
    var splits = [] = DatePosting.split(' ', 6);
    this.jobDatePosting.innerHTML = `${splits[2]} ${splits[1]} ${splits[5]}`;

    this.jobElement.append(this.jobApply);
    this.jobElement.append(this.jobFavorite);
    this.jobElement.append(this.jobDatePosting);

    this.jobsList.append(this.jobElement);
       
  } 

  toogleLoadMore(show) {
    this.loadMore.style.display = show ? 'block' : 'none';
  }

}


class Searchjob {
 
  setCurrentPage(pageNumber) {
    this.currentPage = pageNumber;
  }

  constructor(view) {
    this.view = view;
   
    this.view.searchInputDescription.addEventListener('keyup', this.debounce(this.loadJobs.bind(this), 500));
    this.view.searchInputLocation.addEventListener('keyup', this.debounce(this.loadJobs.bind(this), 500));
    
    document.querySelector('input[type=checkbox]').addEventListener('click',this.debounce(this.loadJobs.bind(this), 500));
    this.view.loadMore.addEventListener('click', this.loadMoreJobs.bind(this));
    this.currentPage = 1;
  }

    

  loadJobs() {
    const descriptionValue = this.view.searchInputDescription.value;
    const locationValue = this.view.searchInputLocation.value;
    
    this.setCurrentPage(1);
    const fulltime = document.querySelector('input[type=checkbox]');
    var fulltimeValue = '';
    if (fulltime.checked) {
      fulltimeValue = 'on';
    } 
    if (descriptionValue && locationValue){
        this.clearJobs();
        this.view.toogleLoadMore(false);
        this.jobRequest(descriptionValue, locationValue, fulltimeValue);
    } else if (locationValue) {
        this.clearJobs();
        this.view.toogleLoadMore(false);
        this.jobRequest('', locationValue, fulltimeValue);
    } else if(descriptionValue) {
        this.clearJobs();
        this.view.toogleLoadMore(false);
        this.jobRequest(descriptionValue, '', fulltimeValue);
    }
    else {
        this.clearJobs();
        this.view.toogleLoadMore(false);
    }
  }

  loadMoreJobs() {
    this.setCurrentPage(this.currentPage + 1);
    const fulltime = document.querySelector('input[type=checkbox]');
    var fulltimeValue = '';
    if (fulltime.checked) {
      fulltimeValue = 'on';
    } 
    this.jobRequest(this.view.searchInputDescription.value, this.view.searchInputLocation.value, fulltimeValue);
  }
    
  async jobRequest(descriptionValue, locationValue, fulltimeValue) {
    try {
      return await fetch(`http://localhost:7000/api?description=${descriptionValue}
                                                    &location=${locationValue}
                                                    &page=${this.currentPage}
                                                    &full_time=${fulltimeValue}
                                                    `).then((res) => {                             
          res.json().then(res => {
              
              this.view.toogleLoadMore(res.length >= 50);
              res.forEach(jobData => this.view.createJob(jobData));

              var mod = document.querySelectorAll('.chosen-btn');
              var modArray = [];
              for (let i = 0; i < mod.length; i++) {
                modArray[i] = mod[i];
              }
              
              
              for (let i = 0; i < modArray.length; i++) {
                if (localStorage.getItem(`${res[i].id}`) != null){
                  modArray[i].classList.add("pressed-button");
                  modArray[i].addEventListener('click', () => {
                    if(localStorage.getItem(`${res[i].id}`) == null){
                      modArray[i].classList.add("pressed-button");
                      localStorage.setItem(`${res[i].id}`, JSON.stringify(res[i]));
                    }else {
                      modArray[i].classList.remove("pressed-button");
                      localStorage.removeItem(`${res[i].id}`);  
                    }                                          
                  });
                }      
                else {
                  modArray[i].addEventListener('click', () => {
                    if(localStorage.getItem(`${res[i].id}`) == null){
                      modArray[i].classList.add("pressed-button");
                      localStorage.setItem(`${res[i].id}`, JSON.stringify(res[i]));
                    }else {
                      modArray[i].classList.remove("pressed-button");
                      localStorage.removeItem(`${res[i].id}`);  
                    }                                          
                  });
                }    
              }                   
          });
      });
    } catch (err) {
        console.log('Error:' + err);
    }
  }

  clearJobs() {
    this.view.jobsList.innerHTML ='';
  }

    
  debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
  } 
}


var returnButton = document.getElementById("title-text");
returnButton.addEventListener('click', () => {
  document.getElementById('fav').hidden = true;
  document.getElementById('app').hidden = false;
});

     
var favButton = document.getElementById("fav-btn");
favButton.addEventListener('click', () => {
  
  document.getElementById('app').hidden = true;
  document.getElementById('fav').hidden = false;
  document.getElementById('fav-jobs').innerHTML = '';
  var keys = Object.keys(localStorage);
  for(let key of keys) {
  var object = JSON.parse(`${localStorage.getItem(key)}`);

    let favElement = document.createElement('li');
    favElement.classList.add("job-item");

    let company = document.createElement('div');
    favElement.append(company);
    company.classList.add("job-company");
    

    let apply = document.createElement('div');
    favElement.append(apply);
    apply.classList.add("job-apply");
    
    company.append(`${object.title}, `);
    company.append(`${object.company}`);
    apply.innerHTML = `${object.how_to_apply}`;
    
    document.getElementById("fav-jobs").append(favElement);   
  }  
});

new Searchjob(new View());
 






