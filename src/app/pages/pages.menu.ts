export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'addMoneyflow',
        data: {
          menu: {
            title: 'Geldbewegung hinzufügen',
            icon: 'ion-cash',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      }
    ]
  }
];
