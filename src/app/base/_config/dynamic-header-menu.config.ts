export const DynamicHeaderMenuConfig = {
  items: [
    {
      title: 'Inicio',
      root: true,
      alignment: 'left',
      page: '/admin',
      //translate: 'MENU.DASHBOARD',
    },
    {
      title: 'Custom',
      root: true,
      alignment: 'left',
      toggle: 'click',
      page: '',
      submenu: [
        {
          title: 'Error Pages',
          bullet: 'dot',
          icon: 'flaticon2-list-2',
          page: '/error',
          submenu: [
            {
              title: 'Error 1',
              page: '/error/error-1'
            },
            {
              title: 'Error 2',
              page: '/error/error-2'
            },
            {
              title: 'Error 3',
              page: '/error/error-3'
            },
            {
              title: 'Error 4',
              page: '/error/error-4'
            },
            {
              title: 'Error 5',
              page: '/error/error-5'
            },
            {
              title: 'Error 6',
              page: '/error/error-6'
            },
          ]
        }
      ]
    }
  ]
};
