const searchFilter = {
  jobsList: [],
  filterData: {
    keyword: '',
    city: '不限',
    industryCategory: '不限',
    jobCategory: '不限',
    workExp: '不限',
    education: '不限',
    workType: '不限',
    workTime: '不限',
    salaryLow: null,
    salaryHight: null,
    salaryInterView: false,
  },
  filter(jobsList, filterData) {
    this.getJobsList(jobsList);
    this.getFilterData(filterData);
    this.startFilter();
    return this.jobsList;
  },
  getJobsList(temArray) {
    this.jobsList = temArray;
  },
  sendJobsList() {
    return this.jobsList;
  },
  getFilterData(temFilter) {
    this.cleanFilter();
    this.filterData = temFilter;
  },
  cleanFilter() {
    this.filterData = {
      keyword: '',
      city: '不限',
      industryCategory: '不限',
      jobCategory: '不限',
      workExp: '不限',
      education: '不限',
      workType: '不限',
      workTime: '不限',
      salaryLow: null,
      salaryHight: null,
      salaryInterView: false,
    };
  },
  returnFilter() {
    return this.filterData;
  },
  startFilter() {
    this.filterKeyword(this.filterData);
    this.filterCity(this.filterData);
    this.filterWorkTime(this.filterData);
    this.filterWorkType(this.filterData);
    this.filterWorkExp(this.filterData);
    this.filterEducation(this.filterData);
    this.filterJobCategory(this.filterData);
    this.filterIndustryCategory(this.filterData);
    this.filterSalary(this.filterData);
    this.filterSalaryInterView(this.filterData);
  },
  filterKeyword(filterData) {
    let temData = [];
    if (filterData.keyword !== '') {
      temData = this.jobsList.filter((item) => {
        const text = item.title + item.options.company.companyName;
        const searchText = filterData.keyword.toLowerCase();
        const textResult = text.toLowerCase().includes(searchText);
        return textResult;
      });
    } else {
      temData = this.jobsList;
    }
    this.jobsList = temData;
  },
  filterCity(filterData) {
    let temData = [];
    if (filterData.city !== '不限') {
      temData = this.jobsList.filter(
        (item) => item.options.company.companyAddressCity === filterData.city,
      );
    } else {
      temData = this.jobsList;
    }
    this.jobsList = temData;
  },
  filterWorkTime(filterData) {
    let temData = [];
    if (filterData.workTime !== '不限') {
      temData = this.jobsList.filter((item) => item.options.job.workTime === filterData.workTime);
    } else {
      temData = this.jobsList;
    }
    this.jobsList = temData;
  },
  filterWorkExp(filterData) {
    let temData = [];
    if (filterData.workExp !== '不限') {
      temData = this.jobsList.filter((item) => item.options.job.workExp === filterData.workExp);
    } else {
      temData = this.jobsList;
    }
    this.jobsList = temData;
  },
  filterWorkType(filterData) {
    let temData = [];
    if (filterData.workType !== '不限') {
      temData = this.jobsList.filter((item) => item.options.job.workType === filterData.workType);
    } else {
      temData = this.jobsList;
    }
    this.jobsList = temData;
  },
  filterEducation(filterData) {
    let temData = [];
    if (filterData.education !== '不限') {
      temData = this.jobsList.filter((item) => item.options.job.education === filterData.education);
    } else {
      temData = this.jobsList;
    }
    this.jobsList = temData;
  },
  filterJobCategory(filterData) {
    let temData = [];
    if (filterData.jobCategory !== '不限') {
      temData = this.jobsList.filter((item) => item.category === filterData.jobCategory);
    } else {
      temData = this.jobsList;
    }
    this.jobsList = temData;
  },
  filterIndustryCategory(filterData) {
    let temData = [];
    if (filterData.industryCategory !== '不限') {
      temData = this.jobsList.filter(
        (item) => item.options.company.industryCategory === filterData.industryCategory,
      );
    } else {
      temData = this.jobsList;
    }
    this.jobsList = temData;
  },
  filterSalary(filterData) {
    let temData = [];
    const numLow = filterData.salaryLow;
    const numHight = filterData.salaryHight;
    if (numLow !== null && numHight !== null) {
      temData = this.jobsList.filter((item) => item.price > numLow && item.price < numHight);
    } else if (numLow !== null || numHight !== null) {
      if (numLow !== null) {
        temData = this.jobsList.filter((item) => item.price > numLow);
      } else if (numHight !== null) {
        temData = this.jobsList.filter((item) => item.price < numHight);
      }
    } else {
      temData = this.jobsList;
    }
    this.jobsList = temData;
  },
  filterSalaryInterView(filterData) {
    let temData = [];
    if (filterData.salaryInterView) {
      temData = this.jobsList.filter((item) => item.options.job.salaryInterView === true);
    } else {
      temData = this.jobsList;
    }
    this.jobsList = temData;
  },
};
export default searchFilter;
