

export default class SearchJob {

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



  loadJobs(descriptionValue, locationValue, fulltimeValue) {
    this.jobRequest(descriptionValue, locationValue, fulltimeValue).then(r => r)
    // const descriptionValue = this.view.searchInputDescription.value;
    // const locationValue = this.view.searchInputLocation.value;

    // this.setCurrentPage(1);
    // const fulltime = document.querySelector('input[type=checkbox]');
    // var fulltimeValue = '';
    // if (fulltime.checked) {
    //   fulltimeValue = 'on';
    // }
    // if (descriptionValue && locationValue){
    //   this.clearJobs();
    //   this.view.toogleLoadMore(false);
    //   this.jobRequest(descriptionValue, locationValue, fulltimeValue);
    // } else if (locationValue) {
    //   this.clearJobs();
    //   this.view.toogleLoadMore(false);
    //   this.jobRequest('', locationValue, fulltimeValue);
    // } else if(descriptionValue) {
    //   this.clearJobs();
    //   this.view.toogleLoadMore(false);
    //   this.jobRequest(descriptionValue, '', fulltimeValue);
    // }
    // else {
    //   this.clearJobs();
    //   this.view.toogleLoadMore(false);
    // }
  }

  loadMoreJobs() {
    this.setCurrentPage(this.currentPage + 1);
    const fulltime = document.querySelector('input[type=checkbox]');
    let fulltimeValue = '';
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
          return res
          console.log(res)
          // res.forEach(jobData => this.view.createJob(jobData));
          //
          // let mod = document.querySelectorAll('.chosen-btn')
          // let modArray = [];
          // for (let i = 0; i < mod.length; i++) {
          //   modArray[i] = mod[i];
          // }
          //
          //
          // for (let i = 0; i < modArray.length; i++) {
          //   if (localStorage.getItem(`${res[i].id}`) != null){
          //     modArray[i].classList.add("pressed-button");
          //     modArray[i].addEventListener('click', () => {
          //       if(localStorage.getItem(`${res[i].id}`) == null){
          //         modArray[i].classList.add("pressed-button");
          //         localStorage.setItem(`${res[i].id}`, JSON.stringify(res[i]));
          //       }else {
          //         modArray[i].classList.remove("pressed-button");
          //         localStorage.removeItem(`${res[i].id}`);
          //       }
          //     });
          //   }
          //   else {
          //     modArray[i].addEventListener('click', () => {
          //       if(localStorage.getItem(`${res[i].id}`) == null){
          //         modArray[i].classList.add("pressed-button");
          //         localStorage.setItem(`${res[i].id}`, JSON.stringify(res[i]));
          //       }else {
          //         modArray[i].classList.remove("pressed-button");
          //         localStorage.removeItem(`${res[i].id}`);
          //       }
          //     });
          //   }
          // }
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
