const adminNewItem = {
  processNewJobData(jobData) {
    const temObj = JSON.parse(JSON.stringify(jobData));
    if (jobData.options.job.salaryInterView) {
      temObj.options.job.salary = 24000; // 薪資不得低於2萬4
    }
    const newJobItem = {
      data: {
        title: temObj.options.job.jobName,
        category: temObj.options.job.jobCategory,
        origin_price: temObj.options.job.salary,
        price: temObj.options.job.salary,
        unit: '元',
        description: '職位',
        content: temObj.options.job.jobContent,
        is_enabled: 1,
        imageUrl: temObj.options.job.jobImageUrl,
        imagesUrl: [],
        num: temObj.options.job.needPerson,
        options: {
          company: {
            companyName: temObj.options.company.companyName,
            industryCategory: temObj.options.company.industryCategory,
            companyLogoUrl: temObj.options.company.companyLogoUrl,
            companyImagesUrl: temObj.options.company.companyImagesUrl,
            companyAddressCity: temObj.options.company.companyAddressCity,
            companyAddressDetail: temObj.options.company.companyAddressDetail,
            companyAddress:
              temObj.options.company.companyAddressCity
              + temObj.options.company.companyAddressDetail,
            companyContact: temObj.name,
            contactPosition: temObj.options.company.contactPosition,
            companyTel: temObj.tel,
            companyEmail: temObj.email,
            companyJobToken: temObj.options.jobToken,
          },
          job: {
            otherRequirement: temObj.options.job.otherRequirement,
            workExp: temObj.options.job.workExp,
            workType: temObj.options.job.workType,
            workTime: temObj.options.job.workTime,
            education: temObj.options.job.education,
            salaryInterView: temObj.options.job.salaryInterView,
            promote: temObj.options.job.costToken,
            create: Math.floor(Date.now() / 1000),
            otherApplyInfo: temObj.options.job.otherApplyInfo,
          },
        },
      },
    };
    return newJobItem;
  },
  processNewCompanyData(companyData) {
    const temObj = JSON.parse(JSON.stringify(companyData));
    const newCompanyItem = {
      data: {
        title: temObj.options.company.companyName,
        category: temObj.options.company.industryCategory,
        origin_price: 0,
        price: 0,
        unit: '間',
        description: '企業',
        content: temObj.options.company.companyInfo,
        is_enabled: 1,
        imageUrl: temObj.options.company.companyLogoUrl,
        imagesUrl: temObj.options.company.companyImagesUrl,
        options: {
          companyAddressCity: temObj.options.company.companyAddressCity,
          companyAddressDetail: temObj.options.company.companyAddressDetail,
          companyContact: temObj.name,
          companyContactPosition: temObj.options.company.contactPosition,
          companyTel: temObj.tel,
          companyEmail: temObj.email,
          companyJobToken: temObj.options.jobToken,
          create: Math.floor(Date.now() / 1000),
        },
      },
    };
    return newCompanyItem;
  },
  justNewJobData(jobData) {
    const temObj = JSON.parse(JSON.stringify(jobData));
    if (jobData.user.options.job.salaryInterView) {
      temObj.user.options.job.salary = 24000; // 薪資不得低於2萬4
    }
    const newJobItem = {
      data: {
        title: temObj.user.options.job.jobName,
        category: temObj.user.options.job.jobCategory,
        origin_price: temObj.user.options.job.salary,
        price: temObj.user.options.job.salary,
        unit: '元',
        description: '職位',
        content: temObj.user.options.job.jobContent,
        is_enabled: 1,
        imageUrl: temObj.user.options.job.jobImageUrl,
        imagesUrl: [],
        num: temObj.user.options.job.needPerson,
        options: {
          company: {
            companyName: temObj.user.options.company.companyName,
            industryCategory: temObj.user.options.company.industryCategory,
            companyLogoUrl: temObj.user.options.company.companyLogoUrl,
            companyImagesUrl: temObj.user.options.company.companyImagesUrl,
            companyAddressCity: temObj.user.options.company.companyAddressCity,
            companyAddressDetail: temObj.user.options.company.companyAddressDetail,
            companyAddress:
              temObj.user.options.company.companyAddressCity
              + temObj.user.options.company.companyAddressDetail,
            companyContact: temObj.user.name,
            contactPosition: temObj.user.options.company.contactPosition,
            companyTel: temObj.user.tel,
            companyEmail: temObj.user.email,
            companyJobToken: temObj.user.options.company.companyJobToken,
          },
          job: {
            otherRequirement: temObj.user.options.job.otherRequirement,
            workExp: temObj.user.options.job.workExp,
            workType: temObj.user.options.job.workType,
            workTime: temObj.user.options.job.workTime,
            education: temObj.user.options.job.education,
            salaryInterView: temObj.user.options.job.salaryInterView,
            promote: temObj.user.options.company.costToken,
            create: Math.floor(Date.now() / 1000),
            otherApplyInfo: temObj.user.options.job.otherApplyInfo,
          },
        },
      },
    };
    return newJobItem;
  },
  justNewCompanyData(companyData) {
    const temObj = JSON.parse(JSON.stringify(companyData));
    const newCompanyItem = {
      data: {
        title: temObj.user.options.company.companyName,
        category: temObj.user.options.company.industryCategory,
        origin_price: 0,
        price: 0,
        unit: '間',
        description: '企業',
        content: temObj.user.options.company.companyInfo,
        is_enabled: 1,
        imageUrl: temObj.user.options.company.companyLogoUrl,
        imagesUrl: temObj.user.options.company.companyImagesUrl,
        options: {
          companyAddressCity: temObj.user.options.company.companyAddressCity,
          companyAddressDetail: temObj.user.options.company.companyAddressDetail,
          companyContact: temObj.user.name,
          companyContactPosition: temObj.user.options.company.contactPosition,
          companyTel: temObj.user.tel,
          companyEmail: temObj.user.email,
          companyJobToken: temObj.user.options.jobToken,
          create: Math.floor(Date.now() / 1000),
        },
      },
    };
    return newCompanyItem;
  },
};
export default adminNewItem;
