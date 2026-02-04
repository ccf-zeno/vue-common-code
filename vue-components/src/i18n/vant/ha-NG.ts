export default {
  name: 'Suna',
  tel: 'Lambobin waya',
  save: 'Ajiye',
  clear: 'Goge',
  cancel: 'Soke',
  confirm: 'Tabbatar',
  delete: 'Share',
  loading: 'Ana loda...',
  noCoupon: 'Babu wata rangwame',
  nameEmpty: 'Da fatan za a cika sunan',
  addContact: 'Ƙara lamba',
  telInvalid: 'Da fatan za a cika lambar waya daidai',
  vanCalendar: {
    end: 'Ƙarshe',
    start: 'Fara',
    title: 'Zaɓin Kwanan Wata',
    weekdays: [
      'Lahadi',
      'Litinin',
      'Talata',
      'Laraba',
      'Alhamis',
      "Jumma'a",
      'Asabar',
    ],
    monthTitle: (year: number, month: number) =>
      `${year} Shekara ${month} Wata`,
    rangePrompt: (maxRange: number) =>
      `Za a iya zaɓar kwanaki ${maxRange} kawai`,
  },
  vanCascader: {
    select: 'Zaɓi',
  },
  vanPagination: {
    prev: 'Shafin baya',
    next: 'Shafin gaba',
  },
  vanPullRefresh: {
    pulling: 'Ja ƙasa don sabunta...',
    loosing: 'Saki don sabunta...',
  },
  vanSubmitBar: {
    label: 'Jimla:',
  },
  vanCoupon: {
    unlimited: 'Babu iyaka',
    discount: (discount: number) => `${discount} rangwame`,
    condition: (condition: number) =>
      `Ana iya amfani da shi akan ₦${condition} ko sama`,
  },
  vanCouponCell: {
    title: 'Rangwame',
    count: (count: number) => `${count} ana iya amfani da su`,
  },
  vanCouponList: {
    exchange: 'Musanya',
    close: 'Kada a yi amfani',
    enable: 'Ana iya amfani da shi',
    disabled: 'Ba za a iya amfani da shi ba',
    placeholder: 'Shigar da lambar rangwame',
  },
  vanAddressEdit: {
    area: 'Yanki',
    areaEmpty: 'Da fatan za a zaɓi yanki',
    addressEmpty: 'Da fatan za a cika cikakken adireshi',
    addressDetail: 'Cikakken adireshi',
    defaultAddress: 'Saita azaman adireshin tura ta tsohuwa',
  },
  vanAddressList: {
    add: 'Ƙara sabon adireshi',
  },
};
