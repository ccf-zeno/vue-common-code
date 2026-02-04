export default {
  name: 'Jina',
  tel: 'Simu',
  save: 'Hifadhi',
  clear: 'Futa',
  cancel: 'Ghairi',
  confirm: 'Thibitisha',
  delete: 'Futa',
  loading: 'Inapakia...',
  noCoupon: 'Hakuna kuponi',
  nameEmpty: 'Tafadhali jaza jina',
  addContact: 'Ongeza mawasiliano',
  telInvalid: 'Tafadhali jaza nambari sahihi ya simu',
  vanCalendar: {
    end: 'Mwisho',
    start: 'Anza',
    title: 'Chagua Tarehe',
    weekdays: [
      'Jumapili',
      'Jumatatu',
      'Jumanne',
      'Jumatano',
      'Alhamisi',
      'Ijumaa',
      'Jumamosi',
    ],
    monthTitle: (year: number, month: number) => `Mwaka ${year} Mwezi ${month}`,
    rangePrompt: (maxRange: number) => `Chagua siku zisizozidi ${maxRange}`,
  },
  vanCascader: {
    select: 'Tafadhali chagua',
  },
  vanPagination: {
    prev: 'Ukurasa uliopita',
    next: 'Ukurasa unaofuata',
  },
  vanPullRefresh: {
    pulling: 'Vuta chini ili kusasisha...',
    loosing: 'Achilia ili kusasisha...',
  },
  vanSubmitBar: {
    label: 'Jumla:',
  },
  vanCoupon: {
    unlimited: 'Bila kikomo',
    discount: (discount: number) => `Punguzo la ${discount}%`,
    condition: (condition: number) =>
      `Inapatikana kwa ununuzi wa zaidi ya ${condition}`,
  },
  vanCouponCell: {
    title: 'Kuponi',
    count: (count: number) => `${count} Zinazopatikana`,
  },
  vanCouponList: {
    exchange: 'Badilisha',
    close: 'Usitumie',
    enable: 'Inapatikana',
    disabled: 'Haipatikani',
    placeholder: 'Ingiza msimbo wa kuponi',
  },
  vanAddressEdit: {
    area: 'Eneo',
    areaEmpty: 'Tafadhali chagua eneo',
    addressEmpty: 'Tafadhali jaza anwani kamili',
    addressDetail: 'Anwani kamili',
    defaultAddress: 'Weka kama anwani chaguo-msingi',
  },
  vanAddressList: {
    add: 'Ongeza anwani mpya',
  },
};
