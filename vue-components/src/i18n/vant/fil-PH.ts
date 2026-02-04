export default {
  name: 'Pangalan',
  tel: 'Telepono',
  save: 'I-save',
  clear: 'I-clear',
  cancel: 'Kanselahin',
  confirm: 'Kumpirmahin',
  delete: 'Tanggalin',
  loading: 'Naglo-load...',
  noCoupon: 'Walang available na kupon',
  nameEmpty: 'Pakilagay ang pangalan',
  addContact: 'Magdagdag ng contact',
  telInvalid: 'Pakilagay ang tamang numero ng telepono',
  vanCalendar: {
    end: 'Wakas',
    start: 'Simula',
    title: 'Pumili ng Petsa',
    weekdays: [
      'Linggo',
      'Lunes',
      'Martes',
      'Miyerkules',
      'Huwebes',
      'Biyernes',
      'Sabado',
    ],
    monthTitle: (year: number, month: number) => `${year} Taon ${month} Buwan`,
    rangePrompt: (maxRange: number) =>
      `Maaari ka lamang pumili ng ${maxRange} na araw`,
  },
  vanCascader: {
    select: 'Pumili',
  },
  vanPagination: {
    prev: 'Nakaraang pahina',
    next: 'Susunod na pahina',
  },
  vanPullRefresh: {
    pulling: 'Hilahin pababa upang i-refresh...',
    loosing: 'Pakawalan upang i-refresh...',
  },
  vanSubmitBar: {
    label: 'Kabuuan:',
  },
  vanCoupon: {
    unlimited: 'Walang limitasyon',
    discount: (discount: number) => `${discount} na diskwento`,
    condition: (condition: number) =>
      `Magagamit para sa mga pagbili na higit sa ${condition} piso`,
  },
  vanCouponCell: {
    title: 'Kupon',
    count: (count: number) => `${count} na magagamit`,
  },
  vanCouponList: {
    exchange: 'Palitan',
    close: 'Huwag gamitin',
    enable: 'Magagamit',
    disabled: 'Hindi magagamit',
    placeholder: 'Ilagay ang kupon code',
  },
  vanAddressEdit: {
    area: 'Lugar',
    areaEmpty: 'Pumili ng lugar',
    addressEmpty: 'Pakilagay ang kumpletong address',
    addressDetail: 'Detalyadong address',
    defaultAddress: 'Itakda bilang default na address ng pagpapadala',
  },
  vanAddressList: {
    add: 'Magdagdag ng bagong address',
  },
};
